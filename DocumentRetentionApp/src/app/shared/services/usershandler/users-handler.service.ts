import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersHandlerService {
  // Ruta del cotrolador de la API
  private _controllerRoute:     string = 'Users/';
  // Rutas de los métodos que contiene el controlador de la API
  

  private _headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  })

  constructor(
    private _http: HttpClient,
  ) { }

  
}
