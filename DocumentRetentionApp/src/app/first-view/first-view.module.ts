import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';
import { FirstViewRoutingModule } from './first-view-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowResultsComponent } from './show-results/show-results.component';
import { DatePipe } from '@angular/common';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

// Importaciones de Primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DocsViewerComponent,
    ShowResultsComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    FirstViewRoutingModule,
    FormsModule,
    HttpClientModule,
    // Importaciones de Primeng
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    NgxExtendedPdfViewerModule

  ],
  providers: [
    DatePipe,
  ],
})
export class FirstViewModule { }
