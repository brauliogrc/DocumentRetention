import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { clientData, editedClientInfo } from '@shared/interfaces/clientsInterface';
import { ClientsHandlerService } from '@shared/services/clientshandler/clients-handler.service';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';

@Component({
  selector: 'app-pop-up-edit-client',
  templateUrl: './pop-up-edit-client.component.html',
  styleUrls: ['./pop-up-edit-client.component.css']
})
export class PopUpEditClientComponent implements OnInit {
  // Variables que contienen los valores del form
  public newName:         string;

  // Bandera para modificar los botones del popUp, cambia de estado cuando el cliente es actualizado
  public clientUpdated:  boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PopUpEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData: clientData,

    private _sweetAlert: SweetAlertsService,
    private _clientHandler: ClientsHandlerService,

  ) { }

  // Nombre del cliente a editar para mostrarlo en el popup
  public clientName = this._arrData.clientName;
  // Varible con el fomrato de datos para la actualización del cliente
  private _editedClientInfo:   editedClientInfo;

  ngOnInit(): void {
  }

  // Manejador del evento, realiza un seteo de la información
  public eventHandler(): void {
    this._editedClientInfo = {
      clientId:    this._arrData.clientId,
      newName:     this.newName,
    }
    this._saveChanges();
  }

  // Ejecuta el método para editar la información del cliente
  public _saveChanges(): void {
    this._clientHandler.updateClient( this._editedClientInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate( data.message );
        this.newName = '';
        this.clientUpdated = true;
      }
    )
  }

  // Método que cierra el PopUp 
  public clickCancel(): void {
    this._dialogRef.close();
  }
}
