import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbTagComponent, NbToastrService } from '@nebular/theme';
import { firstValueFrom, Observable, of } from 'rxjs';
import { CGIAREntity } from 'src/app/shared/interfaces/CGIAREntity';
import { Permission } from 'src/app/shared/interfaces/Permission';
import { Role } from 'src/app/shared/interfaces/Role';
import { CGIAREntityService } from 'src/app/shared/services/cgiar-entity.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Confirmation } from 'src/app/shared/interfaces/Confirmation';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {

  // html-bound variables
  @Input() public cgiarEntity: CGIAREntity = new CGIAREntity(0,"");
  @Input() public role: Role = new Role(0);

  // variables
  public defaultValue : string = "Select an option...";
  public cgiarEntityControl: FormControl = new FormControl({
      formState: this.defaultValue
  });
  public roleControl: FormControl = new FormControl({
    formState: this.defaultValue
  });
  public permissionControl: FormControl = new FormControl({
    formState: this.defaultValue
  });
  public entityList$!: Observable<CGIAREntity[]>;
  public roleList$!: Observable<Role[]>;
  public fullPermissionList!: Permission[];
  public currentPermissionList!: Permission[];
  public selectedPermissions: Set<Permission> = new Set<Permission>();

  constructor(
    private dialogService: NbDialogService,
    private roleService: RoleService,
    private entityService: CGIAREntityService,
    private permissionService : PermissionService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadEntityList();
  }

  private loadEntityList(): void {
    this.entityList$ = this.entityService.findAllActive();
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
          this.selectedPermissions = new Set(this.role.rolePermissions);
          this.currentPermissionList = permissions.filter(cp => !(this.role.rolePermissions?.find(rp => rp.id === cp.id)));
        }
      });
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

  async onPermissionRemove(tagToRemove: NbTagComponent) : Promise<void> {
    let data: Confirmation = {body: "Are you sure you want to remove this permission?"};
    //FIXME NG0100 on dialog open
    let dialogRef : NbDialogRef<ConfirmationDialogComponent> = this.dialogService.open(ConfirmationDialogComponent, {context: {data}});
    dialogRef.onClose.subscribe(result => {
      if(result){
        this.deleteByRoute(tagToRemove.text);
        this.currentPermissionList.push(this.fullPermissionList.find(p => tagToRemove.text === p.name)!);
        this.currentPermissionList.sort(this.permissionSorting);
      }
    });
  }

  onPermissionAdd(value: Permission): void {   
    if (value) {   
      this.selectedPermissions.add(this.fullPermissionList.find(p => value === p)!);
      this.currentPermissionList = this.currentPermissionList.filter(p => p !== value);
    }

    this.permissionControl.setValue(null);
  }

  showUpdateToast(){
    this.toastrService.show(
      `The permissions for the role ${this.role.acronym} - ${this.role.description} from ${this.cgiarEntity.acronym} has been updated successfully` ,
      'Permissions updated!',
      { duration: 5000, status: 'success' });
  }

  save(){
    if(this.role){
      this.role.rolePermissions = Array.from(this.selectedPermissions);
      this.roleService.updateRole(this.role).subscribe({
        next: (role) => {
          this.showUpdateToast();
          this.selectedPermissions.clear();
          this.cgiarEntity = new CGIAREntity(0,"");
          this.role = new Role(0);
        }
      });
    }
  }

}
