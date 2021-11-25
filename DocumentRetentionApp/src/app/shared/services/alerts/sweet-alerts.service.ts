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
  public errorsHandler = (err: HttpErrorResponse): void => {
    if (err.status == 0) this.connectionRefused();
    if (err.status == 400) this.badRequest(err.error.message);
    if (err.status == 401) this.unauthorized(err.error.message);
    if (err.status == 409) this.conflict(err.error.message);
  }

  // Manejo del error de logeo
  public loginError = (err: HttpErrorResponse): void => {
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
  private connectionRefused = (): void => {
    Swal.fire({
      icon: 'error',
      title: 'Conección rechasada a la API del sistema',
      text: 'Favor de contactar a soporte'
    });
  }

  // Manejo de error "Bad Request (400)"
  private badRequest = (error: string): void => {
    Swal.fire({
      icon: 'error',
      title: 'Fallo en la petición',
      text: error
    })
  }

  // Manejo de error "Unauthorized (401)"
  private unauthorized = (error: string): void => {
    Swal.fire({
      icon: 'error',
      title: 'Usuario no autorizado',
      text: error
    })
  }

  // Manjo de error "Conflict (409)"
  private conflict = (error: string): void => {
    Swal.fire({
      icon: 'info',
      title: 'Conflicto detectado',
      text: error
    })
  }
  
  // Manejo de error de la validación de fechas
  public dateValidationError = (  ): void => {
    Swal.fire({
      title: 'Fechas invalidas',
      icon: 'warning',
      text: 'La fecha de fin del documento no puede ser menor que la fecha de inicio del documento'
    })
  }

  // Manejo de ingreso de datos inválidos al crear un nuevoo documento
  public invalidNewData = (): void => {
    Swal.fire({
      title: 'Datos inváidos',
      icon: 'error',
      text: 'Los datos ingresados son inválidos, comprobar que no se encuentre algún campo vació y el formato de los mismos'
    })
  }

  // Mensaje de registro exitoso
  public successfulRegistration = ( message: string ): void => {
    Swal.fire({
      title: 'Registro exitoso',
      icon: 'success',
      text: message
    })
  }

  // Mensaje de actualización exitosa
  public successfulUpdate = ( message: string ): void => {
    Swal.fire({
      title: 'Actualización exitosa',
      icon: 'success',
      text: message
    })
  }

  // Mensaje de eliminación exitosa
  public successfulDeletion = ( message: string ): void => {
    Swal.fire({
      title: 'Eliminación Exitosa',
      icon: 'success',
      text: message
    })
  }
}