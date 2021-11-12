import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { DocTypesComponent } from './doc-types/doc-types.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProcessesComponent } from './processes/processes.component';
import { PopUpEditDocComponent } from './pop-ups/documents/pop-up-edit-doc/pop-up-edit-doc.component';

// Importación de modulos del proyecto
import { FirstViewModule } from '@first-view/first-view.module'

import { MatDialogModule } from '@angular/material/dialog';

// Importaciones de primeng
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    UsersComponent,
    ProcessesComponent,
    ClientsComponent,
    ProjectsComponent,
    DocTypesComponent,
    DocumentsComponent,
    PopUpEditDocComponent,
    // Importación de pipes
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatDialogModule,
    // Importación de modulos del proyecto
    FirstViewModule,
    //  Importaciones de primeng
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
  ],
})
export class AdminModule { }
