import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { dataNewProcess, editedProcessInfo } from '@shared/interfaces/processesInterface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
// import { environment } from '@env/environment.prod';
import { successMessages } from '@shared/interfaces/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessesHandlerService {
  // Ruta del cotrolador de la API
  private _controllerRoute:     string = 'Processes/';
  // Rutas de los métodos que contiene el controlador de la API
  private _addProcess:             string = 'addNewProcess';
  private _updateProcess:          string = 'updateProcess';
  private _deleteProcessRoute:     string = 'deleteProcess/';

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
  
  // Petición a la API para el registtro de un nuevo proceso
  public addNewProcess( processData: dataNewProcess ): Observable<successMessages> {
    return this._http.post<successMessages>( `${environment.API}` + this._controllerRoute + this._addProcess, processData, { headers: this._headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }

  // Petición a la API para la actualización de un proceso
  public updateProcess( newDataProcess: editedProcessInfo ): Observable<successMessages> {
    return this._http.patch<successMessages>( `${environment.API}` + this._controllerRoute + this._updateProcess, newDataProcess, { headers: this._headers } )
      .pipe(
        catchError((err:HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err))
        })
      )
  }

  // Peticón a la API para la eliminación lógica de un proceso
  public deleteProces( processId: number ): Observable<successMessages>{
    return this._http.delete<successMessages>( `${environment.API}` + this._controllerRoute + this._deleteProcessRoute + processId, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err))
        })
      )
  }
}
