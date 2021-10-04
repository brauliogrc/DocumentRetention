import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsCreationComponent } from './docs-creation/docs-creation.component';
import { CapturistRoutingModule } from './capturist-routing.module';



@NgModule({
  declarations: [
    DocsCreationComponent
  ],
  imports: [
    CommonModule,
    CapturistRoutingModule
  ]
})
export class CapturistModule { }
