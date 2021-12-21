import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { processData, editedProcessInfo, } from '@shared/interfaces/processesInterface';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { ownersAndNewUsers } from '@shared/interfaces/fieldsInterfaces';
import { generalStatus } from '@shared/interfaces/fieldsInterfaces';
import { ProcessesHandlerService } from '@shared/services/processeshandler/processes-handler.service';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';


@Component({
  selector: 'app-pop-up-edit-process',
  templateUrl: './pop-up-edit-process.component.html',
  styleUrls: ['./pop-up-edit-process.component.css']
})
export class PopUpEditProcessComponent implements OnInit {
  // Variables que contiene las lisatas de los Dropdowns
  public statusMenu:    generalStatus[] = [];  
  public ownerList:     ownersAndNewUsers[] = [];

  // Variables que contienen el valor de los campos del form
  public newName:         string;
  public selectedOwner:   string;
  public selectedStatus:  string;

  // Bandera para modificar los botones del popUp, cambia de estado cuando el proceso es actualizado
  public processUpdated: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PopUpEditProcessComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData: processData,

    private _sweetAlert: SweetAlertsService,
    private _fieldsService: FieldsServiceService,
    private _processHandler: ProcessesHandlerService,
  ) { }

  // Nombre del proceso a editar para mostrarlo en el popup
  public processName = this._arrData.processName;
  // Varible con el fomrato de datos para la actualización del proceso
  private _editedProcessInfo:   editedProcessInfo;


  ngOnInit(): void {
    this._fillDropdowns();
  }

  // Peticiones para el llenado de los dropdowns
  private _fillDropdowns(): void {
    // Obtención de la lista de los owners
    this._fieldsService.getOwnersList().subscribe(
      (data) => {
        this.ownerList = [...data];
      }
    );

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
    ]
  }

  // Manejador del evento, realiza un seteo de la información sependiente de si se ha seleccionado un nuevo propietario
  public eventHandler(): void {
    if ( this.selectedOwner ) {
      // Obtención de los datos del usuario seleccionado 
      let user: ownersAndNewUsers = this.ownerList.find( x => x.employeeNumber === Number(this.selectedOwner) );
      
      this._editedProcessInfo = {
        newName:          this.newName,
        processId:        this._arrData.processId,
        newStatus:        Number(this.selectedStatus),
        newOwnerName:     user.employeeName,
        newOwnerNumber:   user.employeeNumber,
      }

      this._saveChanges();
    }
    else {
      this._editedProcessInfo = {
        newName: this.newName,
        processId: this._arrData.processId,
        newOwnerName: null,
        newOwnerNumber: null,
        newStatus: Number(this.selectedStatus),
      }

      this._saveChanges();
    }
  }

  // Ejecuta el método para editar la información del proceso
  private _saveChanges(): void {
    this._processHandler.updateProcess( this._editedProcessInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate(data.message);
        this.processUpdated = true;
        this.newName = '';
        this.selectedOwner = '';
        this.selectedStatus = '';
      }
    )
  }

  // Método que cierra el popup
  public clickCancel(): void {
    this._dialogRef.close();
  }
}
