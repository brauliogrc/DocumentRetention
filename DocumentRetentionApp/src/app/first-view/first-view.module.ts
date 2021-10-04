import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';
import { FirstViewRoutingModule } from './first-view-routing.module';
import { FormsModule } from '@angular/forms';

// Importaciones de Primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    DocsViewerComponent
  ],
  imports: [
    CommonModule,
    FirstViewRoutingModule,
    FormsModule,
    // Importaciones de Primeng
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,

  ]
})
export class FirstViewModule { }
