import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { projectData, editedProjectInfo } from '@shared/interfaces/projectsIterfaces';
import { generalStatus } from '@shared/interfaces/fieldsInterfaces';
import { SweetAlertsService } from '@app/shared/services/alerts/sweet-alerts.service';
import { FieldsServiceService } from '@app/shared/services/fieldsservice/fields-service.service';
import { ProjectsHandlerService } from '@shared/services/pojectshandler/projects-handler.service';

@Component({
  selector: 'app-pop-up-edit-project',
  templateUrl: './pop-up-edit-project.component.html',
  styleUrls: ['./pop-up-edit-project.component.css']
})
export class PopUpEditProjectComponent implements OnInit {
  // Variables que contienen el listado de los dropdowns
  public statusMenu:      generalStatus[] = [];
  
  // Variables que contienen los alores del form
  public newName:         string;
  public selectedStatus:  string;

  // Bandera para modificar los botones del popUp, cambia de estado cuando el proyecto es actualizado
  public projectUpdated: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PopUpEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData: projectData,

    private _sweetAlert: SweetAlertsService,
    private _fieldsService: FieldsServiceService,
    private _projectHandler: ProjectsHandlerService,
  ) { }

  // Nombre del proceso a editar para mostrarlo en el popup
  public projectName = this._arrData.projectName;
  // Variable con el formato de los datos para la actualización del proyecto
  private _editedProjectInfo: editedProjectInfo;

  ngOnInit(): void {
    this._fillDropdowns();
  }

  // Peticiones para el llenado de los dropdowns
  private _fillDropdowns(): void {
    // Listado de status
    this.statusMenu = [
      {
        statusName: 'Habilitado',
        statusValue: 1
      },
      {
        statusName: 'Deshabilitado',
        statusValue: 0
      }
    ];
  }

  // Manejador del evento, realiza un seteo de la información del formulario
  public eventHandler(): void {
    this._editedProjectInfo = {
      projectId:    this._arrData.projectId,
      newName:      this.newName,
      newStatus:    Number( this.selectedStatus )
    }

    this._saveChanges();
  }

  // Ejecuta el método para editar la información del projecto
  private _saveChanges(): void {
    this._projectHandler.updateProject( this._editedProjectInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate( data.message );
        this.newName = '';
        this.selectedStatus = '';
        this.projectUpdated = true;
      }
    )
  }

  // Método que cierra el popup
  public clickCancel(): void {
    this._dialogRef.close();
  }
}
