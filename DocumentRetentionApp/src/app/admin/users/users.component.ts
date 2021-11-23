import { Component, OnInit } from '@angular/core';
import { UsersHandlerService } from '@shared/services/usershandler/users-handler.service';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { userList, filterUsers } from '@shared/interfaces/userListInterface';
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

  constructor(
    private _dialog: MatDialog,
    private _auh: AuthSericeService,
    private _sweetAlert: SweetAlertsService,
    private _userService: UsersHandlerService,
    private _tableService: TableServiceService,
  ) { }

  private _userTableFilter = new UserTableFilter();

  ngOnInit(): void {
    this._fillTable();
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

  // Método de registro de un nuevo usuario
  public userRegisterPopUp(): void {
    const dialog = this._dialog.open( PopUpCreateUserComponent, {width: '40%', height: '78%'} );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
        console.log("Actualizando tabla");
        
      }
    )
  }

  // Método de actualización del usuario
  public editUserPopUp( userId: number, userName: string ): void {
    const dialog = this._dialog.open( PopUpEditUserComponent, {width: '38%', height: '60%%', data: { userId, userName }} );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
        console.log("Actualizando tabla");
        
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
