import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
// import { environment } from '@env/environment.prod';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { EncryptionAndDecryptionService } from '../encryptionanddecryption/encryption-and-decryption.service';
import { docsTable } from '@shared/interfaces/tablesInterface';
import { userList } from '@shared/interfaces/userInterfaces';
import { processesList } from '@shared/interfaces/processesInterface';
import { projectsList } from '@shared/interfaces/projectsIterfaces';
import { clientsList } from '@shared/interfaces/clientsInterface';
import { docTypeList } from '@shared/interfaces/doctypesInterface';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  // Ruta del controlador de la API
  private _controllerRoute:      string = 'Table/';
  // Rutas de los metodos que contiene el controlador de la API
  private _userTable:            string = 'userTable';
  private _adminTable:           string = 'adminTable';
  private _userList:             string = 'getUsersList';
  private _processList:          string = 'getProcessesList';
  private _projectsList:         string = 'getProjectList';
  private _clientList:           string = 'getClientsList';
  private _docTypeList:          string = 'getDTList';


  private headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  });
  
  constructor(
    private _http: HttpClient,
    private _sweedAlert: SweetAlertsService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

  private _userRole: number = this._crypt.userRole;

  // Peticion HTTP a la API para obtener el lisado de documentos disponibles para el Admin
  public getAdminDocsTable(): Observable<docsTable[]> {
    return this._http.get<docsTable[]>(`${environment.API}` + this._controllerRoute + this._adminTable, {headers: this.headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler(err) )
        })
      )
  }

  // Peticion HTTP a la API para obtener el lisado de documentos disponibles para el capturista y cualquier usuario
  public getUserDocsTable(): Observable<docsTable[]> {
    return this._http.get<docsTable[]>(`${environment.API}` + this._controllerRoute + this._userTable)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler(err) )
        })
      )
  }

  // Petición a las API para obtener el listado de los usuarios
  public getAllUsers(): Observable<userList[]> {
    return this._http.get<userList[]>(`${environment.API}` + this._controllerRoute + this._userList, {headers: this.headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler(err) );
        })
      )
  }

  // Peticion a la API para obtener el listado de los procesos
  public getProcessesList(): Observable<processesList[]> {
    return this._http.get<processesList[]>( `${environment.API}` + this._controllerRoute + this._processList, { headers: this.headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweedAlert.errorsHandler(err));
        })
      )
  }
  
  // Petición a la API para btener el listado de los proyectos
  public getProjectsList(): Observable<projectsList[]> {
    return this._http.get<projectsList[]>( `${environment.API}` + this._controllerRoute + this._projectsList, { headers: this.headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler(err) );
        })
      )
  }

  // Petición a la API para obtener el listado de los clientes
  public getClientList(): Observable<clientsList[]> {
    return this._http.get<clientsList[]>( `${ environment.API }` + this._controllerRoute + this._clientList, { headers: this.headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler( err ) )
        })
      )
  }

  // Petición a la API para obtener el listado de los tipos de documentos
  public getDocTypeLst(): Observable<docTypeList[]> {
    return this._http.get<docTypeList[]>( `${ environment.API }` + this._controllerRoute + this._docTypeList, { headers: this.headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler( err ) );
        })
      )
  }
}
