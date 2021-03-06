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
  ownersAndNewUsers,
  generalStatus,
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
  public docTypeMenu:   docTypeField[];     // Lista de los tipos de documetnos
  public projectMenu:   projectField[];     // Lista de los projectos
  public processMenu:   processField[];     // Lista de los procesos
  public statusMenu:    generalStatus[];    // Lista de los estatus de los documentos
  
  // Variable que contiene elos valores del form
  public dueDate:         string;   // Fecha de fin seleccionada
  public startdDate:      string;   // Fecha de inicio del documetos selecionada
  public selectedStatus:  string;   // ID del status seleccionado (1->habilidato->true, 0->deshabilitado->false)
  public selectedProject: string;   // ID del projecto seleccionado
  public selectedProcess: string;   // ID del proceso seleccionado
  public selectedDocType: string;   // ID del tipo de documento seleccionado

  private _editedDocInfo:   editedDocInfo;  // Contiene los valores de cada uno de los campos del form
  // Almacenamos el nombre el documento para mostrarlo en l PopUp
  public docName:         string = this._arrData.docName;
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

  // Cancela la modificaci??n del documento y cierra el popup
  public clickCancel(): void {
    this._dialogRef.close();
  }

  // Guarda los datos del formulario y los almacena en la variable _editedDocInfo
  public saveChanges(): void {
    console.log('Aplicacndo cambios al documento');
    
    this._editedDocInfo = {
      // FIXME: Sujeto a cambios, crear clase auxiliar para filtrar con base en el nombre para obtener el id (Queda a consireci??n de Mike)
      
      idDoc:         this._arrData.docId,
      newStatus:     Number(this.selectedStatus),
      newDocType:    Number(this.selectedDocType),
      newDueDate:    this.dueDate,
      newProcess:    Number(this.selectedProcess),
      newProject:    Number(this.selectedProject),
      newStartDate:  this.startdDate,
    }

    console.log('Start date: ', this.startdDate, ' Due date: ', this.dueDate);
    
    if ( this._dateValidation() ) {
      this._updateDocument();
    }

    console.log(this._editedDocInfo);
  }

  // Validaci??n de fechas
  private _dateValidation(): boolean {
    let isDateValid = this._dateFormat.updateDateValidations( this._arrData, this.startdDate, this.dueDate );
    
    if ( !isDateValid ) {
      this._sweetAlert.dateValidationError();
      return isDateValid;
    }

    return isDateValid;
  }

  // Llama el m??todo que ejecuta la petici??n HTTP para editar el documento
  private _updateDocument(): void {
    this._documentHandler.editDocument( this._editedDocInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate(data.message);
        // this._dialogRef.close();
        this.docupdated = true;
        this.dueDate          = '';
        this.startdDate       = '';
        this.selectedStatus   = '';
        this.selectedProject  = '';
        this.selectedProcess  = '';
        this.selectedDocType  = '';
      }
    )
  }

  // M??todo que realiza las peticiones necesarias para llenar el contenido de los Dropdowns
  private _fillDropdowns(): void {
    // Ejecuci??n del m??todo de obtenci??n de la lista de procesos
    this._fieldsService.getAdminProcessField().subscribe(
      (data) => {
        this.processMenu = [...data];
      }
    );

    // Ejecuci??n de m??todo de obtenci??n de la lista de projectos
    this._fieldsService.getAdminProjectField().subscribe(
      (data) => {
        this.projectMenu = [...data];
      }
    );

    // Ejecuci??n del m??todo de obtenci??n de la lista de tipos de documentos
    this._fieldsService.getGeneralDocTypeField().subscribe(
      (data) => {
        this.docTypeMenu = [...data];
      }
    );

    // Asignaci??n de valores al menu de status del documento
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
}
