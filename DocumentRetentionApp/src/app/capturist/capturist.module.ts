import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturistRoutingModule } from './capturist-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';


// Modulos del proyecto
import { FirstViewModule } from '@app/first-view/first-view.module';

// Componentes
import { DocsCreationComponent } from './docs-creation/docs-creation.component';
import { PopUpCreateDocComponent } from './popUps/pop-up-create-doc/pop-up-create-doc.component';

// Importaciones de primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [
    DocsCreationComponent,
    PopUpCreateDocComponent
  ],
  imports: [
    // Modulos del proyecto
    FirstViewModule,
    // Modulos de angular
    CommonModule,
    CapturistRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    // Importaciones de primeng
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
  ]
})
export class CapturistModule { }
