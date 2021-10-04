import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ProcessesComponent } from './processes/processes.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { DocTypesComponent } from './doc-types/doc-types.component';
import { DocumentsComponent } from './documents/documents.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    ProcessesComponent,
    ClientsComponent,
    ProjectsComponent,
    DocTypesComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
