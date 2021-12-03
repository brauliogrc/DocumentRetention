import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Importaciones de interfaces
import {
  loginData,
  bearer
} from '@shared/interfaces/interfaces';

// Importación de elementos para la Request
import { environment } from '@env/environment';
// import { environment } from '@env/environment.prod';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Importación de servicios
import { JwtHelperService } from '@auth0/angular-jwt';
import { SweetAlertsService } from '@app/shared/services/alerts/sweet-alerts.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthSericeService {
  private _controllerRoute: string = 'Login';

  private loggedIn = new BehaviorSubject<boolean>(false);
  // public _loggedIn: boolean = false;


  constructor(
    private _http: HttpClient,
    private _sweetAlert: SweetAlertsService,
  ) { this.checkToken(); }

  // Verificación si el usuario se encuentra logeado o no
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
    // return this._loggedIn;
  }

  // Método de obención del token desde la API (loggeo en la api)
  singIn(loginData: loginData): Observable<bearer> {
    return this._http.post<bearer>(`${environment.API}` + this._controllerRoute, loginData).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);

        // Manejo por el codigo de error
        if (err.status === 0) {
          return throwError(this._sweetAlert.errorsHandler(err));
        }
        return throwError(this._sweetAlert.loginError(err));
      })
    );
  }

  // Método para guardar el token el las variables de sesión
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Verificación del token
  verify(): void {
    this.checkToken();
  }

  // Método para cerrar sesión
  logout(): void {
    sessionStorage.clear();
    console.clear();
    this.loggedIn.next(false);
  }

  // Método para comprobar si el token ha expirado
  private checkToken(): void {
    const userToken: any = sessionStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('is Expired: ', isExpired);
    // isExpired ? this.logout() : this._loggedIn = true;
    isExpired ? this.logout() : this.loggedIn.next(true);
    // console.log('is Logged: ', this._loggedIn);

    let value: boolean;
    this.loggedIn.subscribe(
      (data) =>{
        value = data;
      }
    )
    console.log('Valor de loggueo: ', value);
    
  }
}
