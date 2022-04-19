import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NbDialogRef, NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { CGIAREntity } from 'src/app/shared/interfaces/CGIAREntity';
import { Permission } from 'src/app/shared/interfaces/Permission';
import { Role } from 'src/app/shared/interfaces/Role';
import { CGIAREntityService } from 'src/app/shared/services/cgiar-entity.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsComponent implements OnInit {

  // html-bound variables
  @Input() public cgiarEntity: CGIAREntity = new CGIAREntity(0,"");
  @Input() public role: Role = new Role(0);
  @ViewChild(NbTagInputDirective, { read: ElementRef }) permissionInput!: ElementRef<HTMLInputElement>;

  // variables
  public defaultValue : string = "Select an option...";
  public cgiarEntityControl: FormControl = new FormControl({
      formState: this.defaultValue
  });
  public roleControl: FormControl = new FormControl({
    formState: this.defaultValue
  });
  public entityList$!: Observable<CGIAREntity[]>;
  public roleList$!: Observable<Role[]>;
  public fullPermissionList!: Permission[];
  public currentPermissionList!: Permission[];
  public selectedPermissions: Set<Permission> = new Set<Permission>();
  public roleUpdated: boolean = false;

  constructor(
    @Optional() protected ref: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private entityService: CGIAREntityService,
    private permissionService : PermissionService
  ) { }

  ngOnInit(): void {
    this.loadEntityList();
  }

  private loadEntityList(): void {
    this.entityList$ = this.entityService.findAll();
  }

  public loadRoleList(): void {    
    this.roleList$ = this.cgiarEntity ? 
      this.roleService.getRolesByCGIAREntity(this.cgiarEntity.id) :
      of();
    this.role = new Role(0);
  }

  validateField(control: FormControl): string {
    if (control.invalid) {
      return 'danger';
    } if (!control.invalid) {
      return 'success';
    } else {
      return 'basic';
    }
  }

  loadPermissionList() {
    if(this.role){
      this.permissionService.findAll().subscribe({
        next: (permissions) => {
          this.fullPermissionList = permissions;
          this.currentPermissionList = permissions;
        }
      });
      this.selectedPermissions = new Set(this.role.rolePermissions);
    }
  }
  
  deleteByRoute(route: string){
    for(let permission of this.selectedPermissions){
      if(permission.name === route){
        this.selectedPermissions.delete(permission);
        return;
      }
    }
  }

  permissionSorting(a: Permission, b: Permission){
    if (a.id > b.id) {
      return 1;
    }
    if (b.id > a.id) {
        return -1;
    }

    return 0;
  }

  onPermissionRemove(tagToRemove: NbTagComponent): void {
    this.deleteByRoute(tagToRemove.text);
    this.currentPermissionList.push(this.fullPermissionList.find(p => tagToRemove.text === p.name)!);
    this.currentPermissionList.sort(this.permissionSorting);
  }

  onPermissionAddByString(value: string): void { 
    if (value) {   
      this.selectedPermissions.add(this.fullPermissionList.find(p => value === p.name)!);
      this.currentPermissionList = this.currentPermissionList.filter(p => p.name !== value);
    }

    this.permissionInput.nativeElement.value = '';
  }

  onPermissionAdd(value: Permission): void { 
    if (value) {   
      this.selectedPermissions.add(this.fullPermissionList.find(p => value === p)!);
      this.currentPermissionList = this.currentPermissionList.filter(p => p !== value);
    }

    this.permissionInput.nativeElement.value = '';
  }

  save(){
    if(this.role){
      this.role.rolePermissions = Array.from(this.selectedPermissions);
      this.roleService.updateRole(this.role).subscribe({
        next: (role) => {
          this.roleUpdated = true;
        },
        complete: () => {
          setTimeout(() => {
            this.roleUpdated = false;
          }, 3000);
        }
      });
    } else {
      this.roleUpdated = false;
    }
  }

}
