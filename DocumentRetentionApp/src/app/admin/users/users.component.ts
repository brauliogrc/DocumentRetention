import { Component, OnInit } from '@angular/core';
import { UsersHandlerService } from '@shared/services/usershandler/users-handler.service';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { userList, filterUsers } from '@shared/interfaces/userInterfaces';
import { UserTableFilter } from '@shared/helpers/userTableFilter';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { MatDialog } from '@angular/material/dialog';

import { PopUpCreateUserComponent } from '../pop-ups/users/pop-up-create-user/pop-up-create-user.component';
import { PopUpEditUserComponent } from '../pop-ups/users/pop-up-edit-user/pop-up-edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Contenedores del listado de usuarios
  private back:       userList[];
  public userList:    userList[];

  private userRole: number;
  private isLogged: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _auth: AuthSericeService,
    private _sweetAlert: SweetAlertsService,
    private _userService: UsersHandlerService,
    private _tableService: TableServiceService,
  ) { }

  // 1. llenado de la tabla        
  // 2. filtrado                   
  // 3. reseteo del filtrado       
  // 4. registro de nuevo elemento 
  // 5. modificación de un elemento
  // 6. eliminación de un elemento 

  private _userTableFilter = new UserTableFilter();

  ngOnInit(): void {

    // FIXME: Método sijeto a pruebas aún
    // Validación del rol para el acceso a esta sección
    let { isLoged, role } = this._auth.permision();
    this.userRole = role;
    this.isLogged = isLoged;
    if ( this.userRole != 1 ) this._auth.redirectToHome();
    else this._fillTable();
  }

  // Llenado de la tabla con los datos de la DB retornados por la API
  private _fillTable(): void {
    this._tableService.getAllUsers().subscribe(
      (data) => {
        this.back     = [...data];
        this.userList = [...data];
        console.log(this.userList);
      }
    )
  }

  // filtrado de los usuarios
  public userId:          number;
  public userName:        string;
  private _filterData:    filterUsers;

  // Filtrado de la tabla de usuario segun lo indiquen los valores del formulario
  public filterUsersTable(): void {
    this._filterData = {
      userId:     this.userId,
      userName:   this.userName
    }
    console.log(this._filterData);
    
    this.userList = [...this.back];
    this.userList = this._userTableFilter.usersFilter( this.userList, this._filterData );
    this._filterData = null;
  }

  // Reseteo del fultrado para mostrar de nuevo todos los usuarios
  public resetTable(): void {
    this.userList = [...this.back];
  }

  // Método de registro de un nuevo usuario
  public userRegisterPopUp(): void {
    const dialog = this._dialog.open( PopUpCreateUserComponent, {width: '38%', height: '40%'} );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }

  // Método de actualización del usuario
  public editUserPopUp( userId: number, userName: string ): void {
    const dialog = this._dialog.open( PopUpEditUserComponent, {width: '38%', height: '50%', data: { userId, userName }} );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }

  // Método de aliminación del usuario
  public deleteUser = ( idUser: number ): void => {
    this._userService.deleteUser( idUser ).subscribe(
      (data) => {
        this._sweetAlert.successfulDeletion( data.message );
        this._fillTable();
      }
    )
  }
}
