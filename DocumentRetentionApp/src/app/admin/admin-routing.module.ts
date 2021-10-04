import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de componentes para el ruteo
import { ClientsComponent } from './clients/clients.component';
import { DocTypesComponent } from './doc-types/doc-types.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProcessesComponent } from './processes/processes.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'docTypes', component: DocTypesComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'processes', component: ProcessesComponent },
  { path: 'projects', component: ProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
