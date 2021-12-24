import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { dataNewClient, editedClientInfo } from '@shared/interfaces/clientsInterface';
import { Observable, throwError } from 'rxjs';
import { successMessages } from '@shared/interfaces/interfaces';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsHandlerService {
  // Ruta del controlador de la API
  private _controllerRoute:     string = 'Clients/';
  // Ruta de los métodos que contiene el controlador de la API
  private _addClient:           string = 'addNewClient';
  private _updateClient:        string = 'updateClient';

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

  // Petición HTTP a la API para registrar un nuevo cliente
  public addNewClient( clientData: dataNewClient ): Observable<successMessages> {
    return this._http.post<successMessages>( `${ environment.API }` + this._controllerRoute + this._addClient, clientData, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler( err ) );
        })
      )
  }

  // Petición HTTP a la API para la actualización del cliente
  public updateClient( editedInfo: editedClientInfo ): Observable<successMessages> {
    return this._http.patch<successMessages>( `${ environment.API }` +this._controllerRoute + this._updateClient, editedInfo, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler( err ) )
        })
      )
  }
}
