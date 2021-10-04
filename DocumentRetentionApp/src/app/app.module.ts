import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importaciones de modulos del proyecto
import { AdminModule } from './admin/admin.module';
import { FirstViewModule } from './first-view/first-view.module';
import { CapturistModule } from './capturist/capturist.module';

// Importacion de componentes de "shared"
import { Page404Component } from './shared/page404/page404.component';
import { HomeModule } from './home/home.module';

// Importaciones de Servicios

// Importacionde de "Primeng"

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Importaciones de modulos del proyecto
    AdminModule,
    CapturistModule,
    FirstViewModule,
    HomeModule,
    // Importaciones de "Primeng"
  ],
  exports: [
    Page404Component,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
