import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';

// Componentes
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { DocTypesComponent } from './doc-types/doc-types.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProcessesComponent } from './processes/processes.component';
import { PopUpEditDocComponent } from './pop-ups/documents/pop-up-edit-doc/pop-up-edit-doc.component';
import { PopUpEditUserComponent } from './pop-ups/users/pop-up-edit-user/pop-up-edit-user.component';
import { PopUpCreateUserComponent } from './pop-ups/users/pop-up-create-user/pop-up-create-user.component';

// Importación de servicios
import { UsersHandlerService } from '@shared/services/usershandler/users-handler.service';

// Importación de modulos del proyecto
import { FirstViewModule } from '@first-view/first-view.module'

// Importación de Pipes
import { ShowStatusPipe } from '../shared/pipes/show-status.pipe';
import { ToUpperCasePipe } from '../shared/pipes/to-upper-case.pipe';

import { MatDialogModule } from '@angular/material/dialog';

// Importaciones de primeng
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ShowCommentsComponent } from '../shared/popups/show-comments/show-comments.component';

@NgModule({
  declarations: [
    UsersComponent,
    ProcessesComponent,
    ClientsComponent,
    ProjectsComponent,
    DocTypesComponent,
    DocumentsComponent,
    PopUpEditDocComponent,
    ShowStatusPipe,
    ToUpperCasePipe,
    PopUpEditUserComponent,
    PopUpCreateUserComponent,
    ShowCommentsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    NgSelect2Module,
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
  providers: [
    UsersHandlerService
  ],
  exports: [
    ToUpperCasePipe
  ],
})
export class AdminModule { }
