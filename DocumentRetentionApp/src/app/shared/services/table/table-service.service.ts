import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { EncryptionAndDecryptionService } from '../encryptionanddecryption/encryption-and-decryption.service';
import { docsTable } from '@shared/interfaces/tablesInterface';
import { filterDocs } from '@shared/interfaces/fieldsInterfaces';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  // Ruta del controlador de la API
  private controllerRoute:  string = 'Table/';
  // Rutas de los metodos que contiene el controlador de la API
  private userTable:        string = 'userTable';
  private adminTable:       string = 'adminTable';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  });
  
  constructor(
    private _http: HttpClient,
    private _sweedAlert: SweetAlertsService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

  private _userRole: number = this._crypt.userRole;

  // Peticion HTTP a la API para obtener el lisado de documentos segun los datos de filtro admin
  getAdminDocsTable(): Observable<docsTable[]> {
    return this._http.get<docsTable[]>(`${environment.API}` + this.controllerRoute + this.adminTable, {headers: this.headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler(err) )
        })
      )
  }

  // Peticion HTTP a la API para obtener el lisado de documentos segun los datos de filtro usuarios
  getUserDocsTable(): Observable<docsTable[]> {
    return this._http.get<docsTable[]>(`${environment.API}` + this.controllerRoute + this.userTable)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweedAlert.errorsHandler(err) )
        })
      )
  }

}
