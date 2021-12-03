import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertsService } from '@app/shared/services/alerts/sweet-alerts.service';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { userRoles, dataNewUser } from '@shared/interfaces/userInterfaces';
import { ownersAndNewUsers } from '@shared/interfaces/fieldsInterfaces';
import { UsersHandlerService } from '@shared/services/usershandler/users-handler.service';

@Component({
  selector: 'app-pop-up-create-user',
  templateUrl: './pop-up-create-user.component.html',
  styleUrls: ['./pop-up-create-user.component.css']
})
export class PopUpCreateUserComponent implements OnInit {
  // Variables que contienen el lisatado de datos para ser mostrados en los dropdowns
  public rolesMenu:     userRoles[];
  public newUsersMenu:  ownersAndNewUsers[];

  // Variables que contienen los datos del form
  public selectedUserUID:   string;
  public selectedRole:      string;

  // Bandera para modificar los botones del popUp, cambia de estado cuando el documento es actualizado
  // public userCreated: boolean = false;

  constructor(
    private _dialog: MatDialogRef<PopUpCreateUserComponent>,

    private _sweetAlert: SweetAlertsService,
    private _userHandler: UsersHandlerService,
    private _fieldsService: FieldsServiceService,
  ) { }

  ngOnInit(): void {
    this._fillDropdowns();
  }

  // Método que ejecuta las peticiones para llenar cada uno de los dropdowns
  private _fillDropdowns(): void {
    // Ejecicón del método de obtencion de los usuarios que pueden ser registrados
    this._fieldsService.getNewUsersList().subscribe(
      (data) => {
        this.newUsersMenu = [...data];
        console.log(this.newUsersMenu);
      }
    )

    // Ejecicón del método de obtención de los roles del usuario
    this._fieldsService.getUsersRoles().subscribe(
      (data) => {
        this.rolesMenu = [...data];
        console.log(this.rolesMenu);
      }
    )

  }

  // Método que cierra el PopUp de creación de usuarios
  public clickCancel(): void {
    this._dialog.close();
  }

  // Manejador del evento de registro de un nuevo usuario (ejecuta validaciones y llama al método del registro)
  public eventHandler(): void {
    if ( this._validData() ) {
      this._registerUser();
    }
  }

  // Método que ejecuta el método del servicio para registrar el nuevo usuario en la DB
  private _registerUser(): void {
    // Obtención de los datos el usuario seleccionado
    let user: ownersAndNewUsers = this.newUsersMenu.find( x => x.employeeUID === this.selectedUserUID );

    // Seteo de datos al objeto esperdo por la API
    let newUser: dataNewUser = {
      UID: user.employeeUID,
      email: user.employeeEmail,
      name: user.employeeName,
      role: Number(this.selectedRole)
    }

    // Ejecución del método del service para registrar el usuario en la DB
    this._userHandler.addNewuser( newUser ).subscribe(
      (data) => {
        this._sweetAlert.successfulRegistration( data.message );
        // Reseteo del formulario
        this.selectedUserUID = '';
        this.selectedRole = '';
      }
    )
    
  }

  // Validación de que los datos ingresados sean correctos
  private _validData(): boolean {
    if ( this.selectedUserUID && this.selectedRole ) {
      return true;
    }
    else {
      this._sweetAlert.invalidNewData();
      return false;
    }
  }
  

}
