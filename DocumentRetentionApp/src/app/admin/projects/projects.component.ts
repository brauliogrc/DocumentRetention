import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@shared/services/table/table-service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private _tableService: TableServiceService,
  ) { }

  // 1. llenado de la tabla          - INCOMPLETE
  // 2. filtrado                     - INCOMPLETE
  // 3. reseteo del filtrado         - INCOMPLETE
  // 4. registro de nuevo elemento   - INCOMPLETE
  // 5. modificación de un elemento  - INCOMPLETE
  // 6. eliminación de un elemento   - INCOMPLETE

  ngOnInit(): void {
  }

  // TODO: Llenado de la tabla con los datos de la DB retornados por la API
  private _fillTable(): void {
    
  }
  
  // TODO: Variable que contienen los datos con para el fultrado
  public projectId:     number;
  public projectName:   string;

  // TODO: Filtrado de la tabla de procesos segun lo indiquen los valores del formulario
  public filterProjectTable(): void {
    
  }
  
  // TODO: Reseteo del filtrado para mostrar de nuevo todos los proyectos
  public resetTable(): void {
    
  }
  
  // TODO: Muestra popup para registar un uevo proyecto
  public projectRegisterPopUp(): void {
    
  }
  
  
  // TODO: Muestra popup para editar un proyecto
  public editProjectPopUp( projectId: number, projectName: string ): void {

  }

  // TODO: Método de eliminación de un proyecto
  public deleteProject( projectId: number ): void {

  }

}
