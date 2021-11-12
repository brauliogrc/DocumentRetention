import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstViewRoutingModule } from './first-view-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatIconModule } from'@angular/material/icon';

// Componentes
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';
import { ShowResultsComponent } from './show-results/show-results.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

// Importación de pipes
import { SliceStringPipe } from '@shared/pipes/slice-string.pipe';

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
    PdfViewerComponent,
    // Impotación de pipes
    SliceStringPipe
  ],
  imports: [
    CommonModule,
    FirstViewRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    // Importaciones de Primeng
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    NgxExtendedPdfViewerModule

  ],
  exports: [
    ShowResultsComponent,
    DocsViewerComponent,
    SliceStringPipe,
  ],
  providers: [
    DatePipe,
  ],
})
export class FirstViewModule { }
