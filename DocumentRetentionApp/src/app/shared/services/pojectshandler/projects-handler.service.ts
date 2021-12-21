import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { Observable, throwError } from 'rxjs';
import { successMessages } from '@shared/interfaces/interfaces';
import { environment } from '@env/environment';
import { dataNewProject, editedProjectInfo } from '@shared/interfaces/projectsIterfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsHandlerService {
  // Ruta del controlador de la API
  private _controllerRoute:     string = 'Projects/';
  // Rutas de los métodos que contiene el controlador de la API
  private _addProject:          string = 'addNewProject';
  private _updateProject:       string = 'updateProject';
  private _deleteProyect:       string = 'deleteProject/';

  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  })

  constructor(
    private _http: HttpClient,
    private _sweetAlert: SweetAlertsService
  ) { }

  // 1. Metodo add
  // 2. Metodo update
  // 3. Metodo delete

  // Petición a la API para el registro de un nuevo proyecto
  public addNewProject( projectData: dataNewProject ): Observable<successMessages> {
    return this._http.post<successMessages>( `${environment.API}` + this._controllerRoute + this._addProject, projectData, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler(err) );
        })
      )
  }

  // Petición a la API para la actualización de un projecto
  public updateProject( newDataProject: editedProjectInfo ): Observable<successMessages> {
    return this._http.patch<successMessages>( `${environment.API}` + this._controllerRoute + this._updateProject, newDataProject, { headers: this._headers } )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler( err ) )
        })
      );
  }

  // Petición a la API para la eliminación lógica de un proceso
}
