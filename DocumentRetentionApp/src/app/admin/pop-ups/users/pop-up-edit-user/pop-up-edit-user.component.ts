import { Component, Inject, OnInit } from '@angular/core';
import { generalStatus } from '@shared/interfaces/fieldsInterfaces';
import { 
  userRoles,
  editedUserInfo,
  filterUsers 
} from '@shared/interfaces/userInterfaces';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersHandlerService } from '@shared/services/usershandler/users-handler.service';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';

@Component({
  selector: 'app-pop-up-edit-user',
  templateUrl: './pop-up-edit-user.component.html',
  styleUrls: ['./pop-up-edit-user.component.css']
})
export class PopUpEditUserComponent implements OnInit {
  // Ccontenedores de listado de los "dropdown"
  public statusMenu:  generalStatus[];
  public rolesMenu:   userRoles[] ;

  // Variables que contienen los valores del form
  public newEmail:        string;
  public selectedRole:    string;
  public selectedStatus:  string;

  // Objeto que contendrála nuevainfomación delusuario
  private _editedUserInfo:    editedUserInfo;
  // Bandera para modificar los botones del popUp, cambia de estado cuando el usuario es actualizado
  public userUpdated: boolean = false;
  private _regex: RegExp = new RegExp('.(@)?conti.+?com');

  constructor(
    private _dialogRef: MatDialogRef<PopUpEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData: filterUsers,

    private _sweetAlert: SweetAlertsService,
    private _userHandler: UsersHandlerService,
    private _fieldsService: FieldsServiceService,
  ) { }

  // Almacenmos el nombre del usuario para mostrarlo en el popup
  public userName:      string = this._arrData.userName;

  ngOnInit(): void {
    this._fillDropdowns();
  }

  // Método que realiza las peticiones para llenar el contenido de los Dropdowns
  private _fillDropdowns = (): void => {
    // Asignación de valores al menu de status del usuario
    this.statusMenu = [
      {
        statusName: 'Habilitado',
        statusValue: 1
      },
      {
        statusName: 'Deshabilitado',
        statusValue: 0
      }
    ];

    // Asignación de valores al menu de roles del usuario
    this._fieldsService.getUsersRoles().subscribe(
      (data) => {
        this.rolesMenu = [...data];
        console.log(this.rolesMenu);
      }
    )
  }

  public clickCancel(): void {
    this._dialogRef.close();
  }

  // Manejador del evento de editar un usuario (ejecuta validaciones y llama al método de actualización)
  public eventHandler():void {

    if ( this.newEmail != undefined && !this._regex.test( this.newEmail ) ) {
      this._sweetAlert.invalidNewData();
      return;
    }

    this._saveChanges();
  }

  // Almacena los datos elfmulario en un variable para llamar al método que ejecuta una petición HTTP a la API parar actualizar el usuario
  private _saveChanges(): void {

    this._editedUserInfo = {
      userId:     this._arrData.userId,
      newRole:    Number(this.selectedRole),
      newEmail:   this.newEmail,
      
      newStatus:  Number(this.selectedStatus),
    }

    console.log(this._editedUserInfo);

    this._userHandler.updateUser( this._editedUserInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate( data.message );
        // Reseteo del formulario
        this.userUpdated = true;
        this.newEmail = '';
        this.selectedRole = '';
        this.selectedStatus = '';
      }
    );
  }
}
