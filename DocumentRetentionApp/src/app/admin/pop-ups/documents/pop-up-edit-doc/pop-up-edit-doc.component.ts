import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editedDocInfo } from '@app/shared/interfaces/forms-values';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { DocumentsHandlerService } from '@shared/services/documentshandler/documents-handler.service';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import {
  docTypeField,
  projectField,
  processField,
  docOwnerField,
  docStatus,
  docInformation,
} from '@shared/interfaces/fieldsInterfaces';
import { DateFormat } from '@shared/helpers/dateFormat';

@Component({
  selector: 'app-pop-up-edit-doc',
  templateUrl: './pop-up-edit-doc.component.html',
  styleUrls: ['./pop-up-edit-doc.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PopUpEditDocComponent implements OnInit {
  // Variables que contienen el listado de los "dropdown"
  public docTypeMenu:   docTypeField[];
  public projectMenu:   projectField[];
  public processMenu:   processField[];
  public ownersList:     docOwnerField[];
  public statusMenu:        docStatus[];
  
  // Variable que contiene elos valores del form
  public dueDate:         string;
  public startdDate:      string;
  public selectedOwner:   number;
  public selectedStatus:  number;
  public selectedProject: number;
  public selectedProcess: number;
  public selectedDocType: number;

  private _editedDocInfo:   editedDocInfo;  // Contiene los valores de cada uno de los campos del form
  // Almacenamos el nombre el documento para mostrarlo en l PopUp
  public oldName:         string = this._arrData.docName;
  // Istancia de la clase para las validaciones de fechas
  private _dateFormat = new DateFormat();
  // Bandera para modificar los botones del popUp, cambia de estado cuando el documento es actualizado
  public docupdated: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PopUpEditDocComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData: docInformation,

    private _sweetAlert: SweetAlertsService,
    private _fieldsService: FieldsServiceService,
    private _documentHandler: DocumentsHandlerService
    ) { } 

  ngOnInit(): void {
    this._fillDropdowns();
    console.log('Objeto recivido: ', this._arrData);
  }

  // Cancela la modificación del documento y cierra el popup
  public clickCancel(): void {
    this._dialogRef.close();
  }

  // Guarda los datos del formulario y los almacena en la variable _editedDocInfo
  public saveChanges(): void {
    console.log('Aplicacndo cambios al documento');
    
    this._editedDocInfo = {
      idDoc:         this._arrData.docId,
      newStatus:     this.selectedStatus,
      newDocType:    this.selectedDocType,
      newDueDate:    this.dueDate,
      newProcess:    this.selectedProcess,
      newProject:    this.selectedProject,
      newStartDate:  this.startdDate,
      newOwnerEmployeeNumber:   this.selectedOwner,
    }

    console.log('Start date: ', this.startdDate, ' Due date: ', this.dueDate);
    
    // if ( this._dateValidation() ) {
    //   this._updateDocument();
    // }

    console.log(this._editedDocInfo);
  }

  // Validación de fechas
  private _dateValidation(): boolean {
    let isDateValid = this._dateFormat.updateDateValidations( this._arrData, this.startdDate, this.dueDate );
    
    if ( !isDateValid ) {
      this._sweetAlert.dateValidationError();
      return isDateValid;
    }

    return isDateValid;
  }

  // Llama el método que ejecuta la petición HTTP para editar el documento
  private _updateDocument(): void {
    this._documentHandler.editDocument( this._editedDocInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate(data.message);
        // this._dialogRef.close();
        this.docupdated = true;
      }
    )
  }

  // Método que realiza las peticiones necesarias para llenar el contenido de los Dropdowns
  private _fillDropdowns(): void {
    // Ejecución del método de obtención de la lista de procesos
    this._fieldsService.getAdminProcessField().subscribe(
      (data) => {
        this.processMenu = [...data];
      }
    );

    // Ejecución de método de obtención de la lista de projectos
    this._fieldsService.getAdminProjectField().subscribe(
      (data) => {
        this.projectMenu = [...data];
      }
    );

    // Ejecución del método de obtención de la lista de tipos de documentos
    this._fieldsService.getGeneralDocTypeField().subscribe(
      (data) => {
        this.docTypeMenu = [...data];
      }
    );
    
    // Ejecución del método de obtención de la lista de propietarios de los documentos
    this._fieldsService.getOwnersList().subscribe(
      (data) => {
        this.ownersList = [...data];
      }
    );

    // Asignación de valores al menu de estados del documento
    this.statusMenu = [
      {
        statusName: 'Habilitado',
        statusValue: 1
      },
      {
        statusName: 'Desabilitado',
        statusValue: 0
      }
    ];
  }
}
