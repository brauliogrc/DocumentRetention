import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de componentes para el ruteo
import { DocsCreationComponent } from './docs-creation/docs-creation.component';

const routes: Routes = [
  { path: '', redirectTo: 'docCreation', pathMatch: 'full' },
  { path: 'docCreation', component: DocsCreationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturistRoutingModule { }
