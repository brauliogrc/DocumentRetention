import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { ProjectsHandlerService } from '@app/shared/services/pojectshandler/projects-handler.service';
import { clientField } from '@shared/interfaces/fieldsInterfaces';
import { dataNewProject } from '@shared/interfaces/projectsIterfaces';

@Component({
  selector: 'app-pop-up-create-project',
  templateUrl: './pop-up-create-project.component.html',
  styleUrls: ['./pop-up-create-project.component.css']
})
export class PopUpCreateProjectComponent implements OnInit {
  // Variables que contienen el listado de los dorpdowns
  public clientsList:     clientField[] = [];

  // Variables que contienen los valores del formulario
  public projectName:     string;
  public selectedClient:  string;

  constructor(
    private _dialogRef: MatDialogRef<PopUpCreateProjectComponent>,

    private _fields: FieldsServiceService,
    private _sweetAlert: SweetAlertsService,
    private _crypt: EncryptionAndDecryptionService,
    private _projectHandler: ProjectsHandlerService,
  ) { }

  // 1. llenado de fields - COMPLETE
  // 2. validaciones - INCOMPLETE
  // 3. registro - INCOMPLETE
  // 4. cerrar opup - COMPLETE

  ngOnInit(): void {
    this._fillDropdowns();
  }

  // Peticiones para el llenado de los dropdowns
  private _fillDropdowns(): void {
    // Petición a la api para obtener la lista de clientes
    this._fields.getUserClients().subscribe(
      (data) => {
        this.clientsList = [... data];
      }
    )
  }

  // Manejador del evento de registro de un nuevo projecto (ejecuta validaciones y llama al método del registro)
  public eventHandler(): void {
    if ( this._valiData() ) {
      this._registerProject();
    }
  }

  // Dalidación de los datos ingresados
  private _valiData(): boolean {
    if ( this.projectName && this.selectedClient ) return true;
    else {
      this._sweetAlert.invalidNewData();
      return false;
    }
  }

  // Registro del projecto en la DB
  private _registerProject(): void {
    let newProject: dataNewProject = {
      name: this.projectName,
      client: Number( this.selectedClient ),
      creationUser: this._crypt.userIDUser
    }

    this._projectHandler.addNewProject( newProject ).subscribe(
      (data) => {
        this._sweetAlert.successfulRegistration( data.message );
        this.projectName = '';
        this.selectedClient = '';
      }
    )
  }

  // Método que cierra el PopUp de creación de projectos
  public clickCancel(): void {
    this._dialogRef.close();
  }
}
