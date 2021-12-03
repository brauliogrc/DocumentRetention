import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { DocumentsHandlerService } from '@shared/services/documentshandler/documents-handler.service';
import { 
  docTypeField,
  projectField,
  processField,
  ownersAndNewUsers,
 } from '@shared/interfaces/fieldsInterfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFormat } from '@shared/helpers/dateFormat';

@Component({
  selector: 'app-pop-up-create-doc',
  templateUrl: './pop-up-create-doc.component.html',
  styleUrls: ['./pop-up-create-doc.component.css']
})
export class PopUpCreateDocComponent implements OnInit {
  // Variables que contienen el listado de los "dropdown"
  public docTypeMenu:   docTypeField[];     // Lista de los tipos de documetnos
  public projectMenu:   projectField[];     // Lista de los projectos
  public processMenu:   processField[];     // Lista de los procesos

  
  // Variables que contienen los valores del form
  // public docName:           string;
  public version:           string;   // Versión del documento
  public dueDate:           Date;     // Fecha de fin seleccionada
  public startDate:         Date;     // Fecha de inicio del documetos selecionada
  public selectedDocType:   string;   // ID del tipo de documento seleccionado
  public selectedProject:   string;   // ID del projecto seleccionado
  public selectedProcess:   string;   // ID del proceso seleccionado
  
  private _file:             File;
  private _newDocData = new FormData(); // Formato de datos necesatio para enviar un archivo adjunto a la API
  // Istancia de la clase para las validaciones de fechas
  private _dateFormat = new DateFormat();
  // Bandera para modificar los botones del popUp, cambia de estado cuando el documento es actualizado
  // public docCreated: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PopUpCreateDocComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData: string,
    
    private _datePipe: DatePipe,
    private _sweetAlert: SweetAlertsService,
    private _fieldsService: FieldsServiceService,
    private _crypt: EncryptionAndDecryptionService,
    private _documentsHandler: DocumentsHandlerService,
  ) { }
    
  ngOnInit(): void {
    this._fillDropdowns();
  }
    
  // Cancela la modificación del documento y cierra el popup
  public clickCancel(): void {
    this._dialogRef.close();
  }

  public fileName: string = '';
  // Manejo del archivo seleccionado
  public onFileSelected(event: any): void {
    console.log(event);
    
    this._file = event;
    
    if ( this._file ) {
      this.fileName = this._file.name;
    }
  }

  // Validación de los campos del formulario
  public validData(): void {
    if (  (String(this.selectedDocType)) &&
          (this._datePipe.transform( this.dueDate, 'yyyy-MM-dd' )) &&
          (String( this.selectedProcess )) &&
          (String( this.selectedProject )) &&
          (this._datePipe.transform( this.startDate, 'yyyy-MM-dd' )) &&
          (String( this._crypt.userIDUser )) &&
          (this._file)
     ) {
       this._dateValidation()
      // console.log('Datos del nuevo documento correctos');
     }
     else {
       this._sweetAlert.invalidNewData();
     }
  }

    // Validación de fechas, dueDate no puede ser menor que startDate
  private _dateValidation(): void {
    let isDateValid = this._dateFormat.setNewDate(this.startDate, this.dueDate);

    if ( !isDateValid ) {
      this._sweetAlert.dateValidationError();
    }
    else {
      this._registerDoc();
    }
  }

  // Asignación de valores objeto enviado a la API y validación de su contenido
  private _registerDoc(): void {
    // this._newDoc = {
    //   docName: this.docName,
    //   docType: this.selectedDocType,
    //   dueDate: this._datePipe.transform( this.dueDate, 'yyyy-MM-dd' ),
    //   process: this.selectedProcess,
    //   project: this.selectedProject,
    //   startDate: this._datePipe.transform( this.startDate, 'yyyy-MM-dd' ),
    //   creationUser: this._crypt.userIDUser
    // }
    // FIXME: Sujeto a cambios, crear clase auxiliar para filtrar con base en el nombre para obtener el id (Queda a consireción de Mike)
    
    this._newDocData.append('docType',        String( this.selectedDocType ) );
    this._newDocData.append('dueDate',        this._datePipe.transform( this.dueDate, 'yyyy-MM-dd' ) );
    this._newDocData.append('process',        String( this.selectedProcess ) );
    this._newDocData.append('project',        String( this.selectedProject ) );
    this._newDocData.append('startDate',      this._datePipe.transform( this.startDate, 'yyyy-MM-dd' ) );
    this._newDocData.append('creationUser',   String( this._crypt.userIDUser ) );
    this._newDocData.append('file',           this._file );
   
    if ( !!this.version ) {
      // console.log('La versión: ', this.version);
      this._newDocData.append('version',        this.version);
      // console.log(this._newDocData.get('version'));
    }
    
    // if ( this._validData() ) {
      this._registerDocument();
    // }
  }

  // Validación de los campos del formulario
  // private _validData(): boolean {
  //   let isValid: boolean = false;
  //   if ( (String( this.selectedOwner )) &&
  //         (String(this.selectedDocType)) &&
  //         (this._datePipe.transform( this.dueDate, 'yyyy-MM-dd' )) &&
  //         (String( this.selectedProcess )) &&
  //         (String( this.selectedProject )) &&
  //         (this._datePipe.transform( this.startDate, 'yyyy-MM-dd' )) &&
  //         (String( this._crypt.userIDUser )) &&
  //         (this._file) //&&
  //         // this._dateValidation()
  //    ) {
  //      isValid = true;
  //     // console.log('Datos del nuevo documento correctos');
  //    }
  //    else {
  //      this._sweetAlert.invalidNewData();
  //    }

  //    console.log('Validacion del formulario', isValid);
     
  //   return isValid;
  // }

  // Método que ejecuta el registro del documento en la DB
  private _registerDocument = (): void => {
    this._documentsHandler.addNewDocument(this._newDocData).subscribe(
      (data) => {
        this._sweetAlert.successfulRegistration(data.message);
        console.log('Archivo registrado con exito, mensaje: ', data.message);
        // this.docCreated = true;
        this.version          = '';
        this.selectedDocType  = '';
        this.selectedProject  = '';
        this.selectedProcess  = '';
        this._file = null;
      }
    )
  }
  
  // Método que realiza las peticiones necesarias para llenar el contenido de los Dropdowns
  private _fillDropdowns(): void {
    // Ejecución del método de obtención de la lista de procesos
    this._fieldsService.getUserProcessField().subscribe(
      (data) => {
        this.processMenu = [...data];
        console.log(this.processMenu);
        
      }
    );
    // Ejecución del método de obtención de la lista de projectos
    this._fieldsService.getUserProjectField().subscribe(
      (data) => {
        this.projectMenu = [...data];
        console.log(this.projectMenu);
        
      }
    );
    // Ejecución del método de obtención de la lista de tipos de documentos
    this._fieldsService.getGeneralDocTypeField().subscribe(
      (data) => {
        this.docTypeMenu = [...data];
        console.log(this.docTypeMenu);
        
      }
    );
  }
}
