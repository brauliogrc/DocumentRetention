import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { AuthModule } from '@app/auth/auth.module';

// Importación de componentes
import { HomeComponent } from './home.component';
import { HeaderBarComponent } from '@app/shared/header-bar/header-bar.component';

// Importación de elementos "Primeng"
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule,
    // Modulos de "Primeng"
    SidebarModule,
    ButtonModule,
  ],
  exports: [
    HeaderBarComponent
  ]
})
export class HomeModule { }
