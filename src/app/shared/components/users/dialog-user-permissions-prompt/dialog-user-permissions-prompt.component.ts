import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable, of } from 'rxjs';
import { CGIAREntity } from 'src/app/shared/interfaces/CGIAREntity';
import { Confirmation } from 'src/app/shared/interfaces/Confirmation';
import { Role } from 'src/app/shared/interfaces/Role';
import { User } from 'src/app/shared/interfaces/User';
import { CGIAREntityService } from 'src/app/shared/services/cgiar-entity.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserRoleService } from 'src/app/shared/services/user-role.service';
import { UserService } from '../../../services/user.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dialog-user-permissions-prompt',
  templateUrl: './dialog-user-permissions-prompt.component.html',
  styleUrls: ['./dialog-user-permissions-prompt.component.scss']
})
export class DialogUserPermissionsPromptComponent implements OnInit {
  @Input() user!: User;
  public defaultValue : string = "Select an option...";

  public cgiarEntityControl: FormControl = new FormControl({
    formState: this.defaultValue
  });
  public roleControl: FormControl = new FormControl({
    formState: this.defaultValue
  });

  @Input() public cgiarEntity: CGIAREntity = new CGIAREntity(0,"");
  @Input() public role: Role = new Role(0);

  public entityList$!: Observable<CGIAREntity[]>;
  public roleList$!: Observable<Role[]>;

  source: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external',
    // add: {
    //   addButtonContent: '<i class="fas fa-plus"></i>',
    //   createButtonContent: '<i class="fas fa-check"></i>',
    //   cancelButtonContent: '<i class="fas fa-times"></i>',
    // },
    actions: {
      edit: false,
      delete: false,
      custom: [
        {
          name: 'delete',
          title: '<i class="fas fa-trash-alt"></i>'
        }
      ]
    },
    // rowClassFunction: (row: any) => {
    //   var isCgiarUser = row.data.cgiarUser;
    //   if (!isCgiarUser) {
    //     return '';
    //   } else {
    //     return 'hide-action';
    //   }
    // },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '5%',
      },
      name: {
        title: 'Role Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      acronym: {
        title: 'Acronym',
        type: 'string',
      },
      // cgiarUser: {
      //   title: 'Is CGIAR',
      //   type: 'string',
      //   width: '11%',
      //   valuePrepareFunction: (value: any) => {
      //     return value ? 'Yes' : 'No';
      //   },
      // },
      globalUnit: {
        title: 'CGIAR Entity',
        type: 'string',
        valuePrepareFunction: (value: CGIAREntity) => {
          return value.acronym;
        }
      },
    },
  };

  constructor(
    @Optional() protected ref: NbDialogRef<any>, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private roleService: RoleService,
    private entityService: CGIAREntityService,
    private userRoleService: UserRoleService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.loadEntityList();
    this.loadUserRoles();
  }

  onCustom(event: any) {
    let action = event['action'];

    switch (action) {
      case 'delete':
        this.deleteRole(event.data);
        break;
    }
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

  public loadUserRoles(): void {
    this.userRoleService.getUserRolesByUser(this.user.id).subscribe({
      next: (x) => {
        //console.log(x);
        this.source.load(x);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public addRole(): void {
    if(this.role.id){
      this.userRoleService.saveUserRole({userId: this.user.id, roleId: this.role.id}).subscribe({
        next: (x) => {
          console.log(this.role);
          this.source.append(this.role).finally(() => {
            this.role = new Role(0);
            this.cgiarEntity = new CGIAREntity(0,"");
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  public deleteRole(role: Role){
    let data: Confirmation = {body: "Are you sure you want to remove this role?"};
    let dialogRef : NbDialogRef<ConfirmationDialogComponent> = this.dialogService.open(ConfirmationDialogComponent, {context: {data}});
    dialogRef.onClose.subscribe(result => {
      if(result){
        this.userRoleService.deleteUserRole({userId: this.user.id, roleId: role.id}).subscribe({
          next: (x) => {
            this.source.remove(role);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  close() {
    this.ref.close();
  }

}
