import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: 'docViewer', pathMatch: 'full' },
  { path: 'docViewer', component: DocsViewerComponent },
  { path: 'pdfViewer', component: PdfViewerComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstViewRoutingModule { }
