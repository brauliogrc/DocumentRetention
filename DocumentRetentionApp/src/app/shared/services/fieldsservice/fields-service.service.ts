import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { projectField, processField, docTypeField } from '@shared/interfaces/fieldsInterfaces';
import { EncryptionAndDecryptionService } from '../encryptionanddecryption/encryption-and-decryption.service';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsServiceService {
  // Ruta del controlador de la API
  private controllerRoute:  string = 'Fields/';
  // Rutas de los metodos que contiene del contrlador de la API
  private adminProjects:    string = 'getAdminProjects';
  private userProjects:     string = 'getUserProjects';
  private adminProcesses:   string = 'getAdminProcesses';
  private userProcesses:    string = 'getUserProcesses';
  private generalDocTypes:  string = 'getDocTypes';

  // Variables que contienen los campos
  private projectList:  projectField[] = [];
  private processList:  processField[] = [];

  // Header de la petición para enviar el token a los metodos de la API con decorador "Authorize"
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  });

  constructor(
    private _http: HttpClient,
    private _sweetAlert: SweetAlertsService,
    private _crypt: EncryptionAndDecryptionService
  ) { }

  private _userRole: number = this._crypt.userRole; // comprobación de rol de Administrador

  // Controlador de llamadas para la obtención de la lista de projectos
  get projectFields(): projectField[] {
    // Ejecución de petición de admin
    if (this._userRole === 1) {
      this.getAdminProjectField().subscribe(
        (data) => {
          this.projectList = data;
        }
      )
    }
    // Ejecución de petición de cualquier ususario
    this.getUserProjectField().subscribe(
      (data) => {
        this.projectList = [...data];
      }
    )
    console.log(this.projectList);
    
    return this.projectList;
  }

  // Controlador de llamadas para la obtención de la lista de projectos
  get processField(): processField[] {
    // Ejecución de petición de admin
    if (this._userRole === 1) {
      this.getAdminProcessField().subscribe(
        (data) => {
          this.processList = data;
        }
      )
      return this.processList;
    }
    // Ejecución de petición de cualquier ususario
    this.getUserProcessField().subscribe(
      (data) => {
        this.processList = data;
      }
    )
    return this.processList;
  }

  // Petición HTTP a la API para obtener la lista de projectos para el administrador
  getAdminProjectField(): Observable<projectField[]> {
    return this._http.get<projectField[]>(`${environment.API}` + this.controllerRoute + this.adminProjects, { headers: this.headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }

  // Petición HTTP a la API para obtener la lista de projectos para cualquier usuario
  getUserProjectField(): Observable<projectField[]> {
    return this._http.get<projectField[]>(`${environment.API}` + this.controllerRoute + this.userProjects)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }

  // Petición HTTP a la API para obtener la lista de procesos para el administrador
  getAdminProcessField(): Observable<processField[]> {
    return this._http.get<processField[]>(`${environment.API}` + this.controllerRoute + this.adminProcesses, { headers: this.headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }

  // Petición HTTP a la API para obtener la lista de procesos para cualquier usuario
  getUserProcessField(): Observable<processField[]> {
    return this._http.get<processField[]>(`${environment.API}` + this.controllerRoute + this.userProcesses)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(this._sweetAlert.errorsHandler(err));
        })
      )
  }

  // Petición HTTP a la API para obtener la lista de tipos de documentos para cualquier usuario y el admin
  getGeneralDocTypeField(): Observable<docTypeField[]> {
    return this._http.get<docTypeField[]>(`${environment.API}` + this.controllerRoute + this.generalDocTypes)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError( this._sweetAlert.errorsHandler(err) )
        })
      )
  }

}
