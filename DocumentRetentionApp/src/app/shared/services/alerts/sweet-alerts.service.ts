import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertsService {

  private messages: string = '';
  constructor() { }

  // Menjo del codigo de error
  errorsHandler = (err: HttpErrorResponse) => {
    if (err.status == 0) this.connectionRefused();
    if (err.status == 400) this.badRequest(err.error.message);
    if (err.status == 401) this.unauthorized(err.error.message);
  }

  // Manejo del error de logeo
  loginError = (err: HttpErrorResponse) => {
    if (err.error.errors) {
      const errorValues: any = err.error.errors;
      let i: number = 0;
      Object.keys(errorValues).forEach((key) => {
        (i < Object.keys(errorValues).length - 1)
          ? this.messages = 'The ' + this.messages + errorValues[key] + ' and '
          : this.messages = this.messages + errorValues[key];
        i++;
      });
    }

    if (err.error.message) {
      this.messages = String(err.error.message);
    }

    Swal.fire({
      title: this.messages,
    });
    this.messages = '';
  }

  // Manejo de error "conección rechasada a la API"
  private connectionRefused = () => {
    Swal.fire({
      icon: 'error',
      title: 'Conección rechasada a la API del sistema',
      text: 'Favor de contactar a soporte'
    });
  }

  // Manejo de error "Bad Request (400)"
  private badRequest = (error: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Fallo en la petición',
      text: error
    })
  }

  private unauthorized = (error: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Usuario no autorizado',
      text: error
    })
  }
}