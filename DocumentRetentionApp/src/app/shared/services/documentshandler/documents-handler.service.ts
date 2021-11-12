import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { successMessages } from '@shared/interfaces/interfaces';
import { editedDocInfo } from '@shared/interfaces/forms-values';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHandlerService {
  // Ruta del controlador de la API
  private _controllerRoute:   string = 'Docs/';
  // Ruta de los métodos que contiene el controlaro de la API
  private _editDoc:           string = 'updateDocument';
  private _addDocRute:        string = 'addNewDocument';
  private _deleteDocRoute:    string = 'deleteDocment';

  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  })


  constructor(
    private _http: HttpClient,
    private _sweetAlert: SweetAlertsService,
  ) { }

  // Petición HTTP a la API para registrar un nuevo documento
  public addNewDocument(newDoc: FormData): Observable<successMessages> {
    return this._http.post<successMessages>(`${environment.API}` + this._controllerRoute + this._addDocRute, newDoc, {headers: this._headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler(err) );
        })
      )
  }

  // Petición HTTP a la API para editar la información de un documento
  public editDocument(editedDocInfo: editedDocInfo): Observable<successMessages> {
    return this._http.patch<successMessages>(`${environment.API}` + this._controllerRoute + this._editDoc, editedDocInfo, {headers: this._headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler(err) );
        })
      )
  }

  // Petición HTTP a la API para eliminación lógica de un documento (cambiar el estatus del documento a "false")
  public deleteDocument( idDocument: number ): Observable<successMessages> {
    return this._http.delete<successMessages>(`${environment.API}` + this._controllerRoute + this._deleteDocRoute + '/' + idDocument, {headers: this._headers})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler(err) );
        })
      )
  }
}
