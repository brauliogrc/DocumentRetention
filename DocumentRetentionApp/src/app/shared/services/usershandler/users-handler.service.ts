import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { successMessages } from '@shared/interfaces/interfaces';
import { catchError } from 'rxjs/operators';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { editedUserInfo, dataNewUser } from '@shared/interfaces/userInterfaces';
import { ownersAndNewUsers } from '@shared/interfaces/fieldsInterfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersHandlerService {
  // Ruta del cotrolador de la API
  private _controllerRoute:     string = 'Users/';
  // Rutas de los métodos que contiene el controlador de la API
  private _addUser:             string = 'addNewUser';
  private _updateUser:          string = 'updateUser';
  private _deleteUserRoute:     string = 'deleteUser/';

  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  })

  constructor(
    private _http: HttpClient,
    private _sweetAlert: SweetAlertsService,
  ) { }

  // 1. Metodo add
  // 2. Metodo update
  // 3. Metodo delete
  
  // TODO: Desarrollo del metodo para ejecutar la peticion en la api para crear un nuevo usuario
  public addNewuser( userData: dataNewUser ): Observable<successMessages>{
    return this._http.post<successMessages>( `${environment.API}` + this._controllerRoute + this._addUser, userData, { headers: this._headers } )
      .pipe(
        catchError( (err:HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }
  
  // Petición HTTP a la API para la actualización dlusuario
  public updateUser( editedInfo: editedUserInfo ): Observable<successMessages> {
    return this._http.patch<successMessages>( `${environment.API}` + this._controllerRoute + this._updateUser, editedInfo, {headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }

  // Petición HTTP a la API para eliminación lógica de un usuario (cambiar su campo "status" a false)
  public deleteUser( idUser: number ): Observable<successMessages> {
    return this._http.delete<successMessages>( `${environment.API}` + this._controllerRoute + this._deleteUserRoute + idUser, { headers: this._headers } )
      .pipe(
        catchError( (err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler( err ) );
        })
      )
  }

}
