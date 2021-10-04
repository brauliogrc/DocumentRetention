import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: 'docViewer', pathMatch: 'full' },
  { path: 'docViewer', component: DocsViewerComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstViewRoutingModule { }
