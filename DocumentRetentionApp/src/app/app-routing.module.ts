import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones de componentes para el ruteo
// import { ClientsComponent } from './admin/clients/clients.component';
// import { DocTypesComponent } from './admin/doc-types/doc-types.component';
// import { DocumentsComponent } from './admin/documents/documents.component';
// import { ProcessesComponent } from './admin/processes/processes.component';
// import { ProjectsComponent } from './admin/projects/projects.component';
// import { UsersComponent } from './admin/users/users.component';
// import { LoginComponent } from './auth/login/login.component';
// import { DocsCreationComponent } from './capturist/docs-creation/docs-creation.component';
// import { DocsViewerComponent } from './first-view/docs-viewer/docs-viewer.component';
import { Page404Component } from './shared/components/page404/page404.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
