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
  connectionRefused = () => {
    Swal.fire({
      icon: 'error',
      title: 'Conección rechasada a la API del sistema',
      text: 'Favor de contactar a soporte'
    });
  }
}