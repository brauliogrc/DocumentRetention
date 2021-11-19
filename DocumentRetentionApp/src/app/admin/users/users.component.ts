import { Component, OnInit } from '@angular/core';
import { UsersHandlerService } from '@shared/services/usershandler/users-handler.service';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { userList } from '@shared/interfaces/userListInterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userList:    userList[];

  constructor(
    private _auh: AuthSericeService,
    private _userService: UsersHandlerService,
    private _tableService: TableServiceService,
  ) { }

  ngOnInit(): void {
    this._fillTable();
  }

  // Llenado de la tabla con los datos de la DB retornados por la API
  private _fillTable(): void {
    this._tableService.getAllUsers().subscribe(
      (data) => {
        this.userList = [...data];
        console.log(this.userList);
      }
    )
  }
}
