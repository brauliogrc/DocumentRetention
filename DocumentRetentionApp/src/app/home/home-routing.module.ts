import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de componentes
import { HomeComponent } from './home.component';

// Importación de modulos para "Lasy load"
import { AdminModule } from '../admin/admin.module';
import { CapturistModule } from '../capturist/capturist.module';
import { FirstViewModule } from '../first-view/first-view.module';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'firstView', pathMatch: 'full' },
      { path: 'adm', loadChildren: () => import('../admin/admin.module').then(m => AdminModule) },
      { path: 'capturist', loadChildren: () => import('../capturist/capturist.module').then(m => CapturistModule) },
      { path: 'firstView', loadChildren: () => import('../first-view/first-view.module').then(m => FirstViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }