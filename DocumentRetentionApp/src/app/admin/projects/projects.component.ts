import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { projectsList, filterProjects } from '@shared/interfaces/projectsIterfaces';
import { ProjectTableFilter } from '@shared/helpers/projectTableFilter';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsHandlerService } from '@shared/services/pojectshandler/projects-handler.service';

import { PopUpCreateProjectComponent } from '@admin/pop-ups/projects/pop-up-create-project/pop-up-create-project.component';
import { PopUpEditProjectComponent } from '@admin/pop-ups/projects/pop-up-edit-project/pop-up-edit-project.component';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  // Contenedores del listado de poryectos registradso
  private back:         projectsList[];
  public projectsList:  projectsList[];

  private userRole: number;
  private isLogged: boolean;

  constructor(
    private _dialog: MatDialog,
    private _auth: AuthSericeService,
    private _sweetAlert: SweetAlertsService,
    private _tableService: TableServiceService,
    private _projectHandler: ProjectsHandlerService,
  ) { }

  // 1. llenado de la tabla          - COMPLETE
  // 2. filtrado                     - COMPLETE
  // 3. reseteo del filtrado         - COMPLETE
  // 4. registro de nuevo elemento   - COMPLETE
  // 5. modificación de un elemento  - COMPLETE
  // 6. eliminación de un elemento   - COMPLETE

  private _projectFilterTable = new ProjectTableFilter();

  ngOnInit(): void {

    // FIXME: Método sijeto a pruebas aún
    // Validación del rol para el acceso a esta sección
    let { isLoged, role } = this._auth.permision();
    this.userRole = role;
    this.isLogged = isLoged;
    if ( this.userRole != 1 ) this._auth.redirectToHome();
    else this._fillTable();
  }

  // Llenado de la tabla con los datos de la DB retornados por la API
  private _fillTable(): void {
    this._tableService.getProjectsList().subscribe(
      (data) => {
        this.back = [...data];
        this.projectsList = [...data];
        console.log(this.projectsList);
      }
    )
  }
  
  // Variable que contienen los datos con para el fultrado
  public projectId:     number; 
  public projectName:   string;
  private _filterData:  filterProjects;

  // Filtrado de la tabla de projectos segun lo indiquen los valores del formulario
  public filterProjectTable(): void {
    this._filterData = {
      projectId: this.projectId,
      projectName: this.projectName,
    };

    console.log(this._filterData);
    
    this.projectsList = [...this.back]
    this.projectsList = this._projectFilterTable.projectFilter( this.projectsList, this._filterData );
    this._filterData = null;
  }
  
  // Reseteo del filtrado para mostrar de nuevo todos los proyectos
  public resetTable(): void {
    this.projectsList = [...this.back];
  }
  
  // Muestra popup para registar un uevo proyecto
  public projectRegisterPopUp(): void {
    const dialog = this._dialog.open( PopUpCreateProjectComponent, { width: '38%', height: '40%' } );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }
  
  // Muestra popup para editar un proyecto
  public editProjectPopUp( projectId: number, projectName: string ): void {
    const dialog = this._dialog.open( PopUpEditProjectComponent, { width: '38%', height: '40%', data: { projectId, projectName } } );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable()
      }
    );
  }

  // Método de eliminación de un proyecto
  public deleteProject( projectId: number ): void {
    this._projectHandler.deleteProject( projectId ).subscribe(
      (data) => {
        this._sweetAlert.successfulDeletion( data.message );
        this._fillTable();
      }
    )
  }

}
