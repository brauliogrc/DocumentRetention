import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importacion de componentes del modulo
import { LoginComponent } from './login/login.component';

// Importación de modulos Primeng
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Importación de servicios
import { AuthSericeService } from './autServices/auth-serice.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    AuthSericeService,
  ]
})
export class AuthModule { }
