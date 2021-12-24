import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { successMessages } from '@shared/interfaces/interfaces';
import { environment } from '@env/environment';
import { dataNewDocType, editedDocTypeInfo } from '@shared/interfaces/doctypesInterface';

@Injectable({
  providedIn: 'root'
})
export class DocTypeHandlerService {
  // Ruta del controlador de la API
  private _controllerRoute:       string = 'DocTypes/';
  // Ruta de los métodos que contiene el controlador de la API
  private _addDocType:            string = 'addNewDocType';
  private _updateDoctType:        string = 'updateDocType';

  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  })

  constructor(
    private _http: HttpClient,
    private _sweetAlert: SweetAlertsService,
  ) { }

  // 1. Metodo add
  // 2. Metodo update
  // 3. Metodo delete (NA)

  // Petición HTTP a la API para registrar un nuevo tipo de documento
  public addNewDocType( docTypeData: dataNewDocType ): Observable<successMessages> {
    return this._http.post<successMessages>( `${ environment.API }` + this._controllerRoute + this._addDocType, docTypeData, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler( err ) );
        })
      )
  }

  // TODO: Petición HTTP a la API para la actualización del tipo de documento
  public updteDocType( editedInfo: editedDocTypeInfo ): Observable<successMessages> {
    return this._http.patch<successMessages>( `${ environment.API }` + this._controllerRoute + this._updateDoctType, editedInfo, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler( err ) );
        })
      )  
  }
}
