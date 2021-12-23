import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { ClientsHandlerService } from '@shared/services/clientshandler/clients-handler.service';
import { dataNewClient } from '@shared/interfaces/clientsInterface';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';

@Component({
  selector: 'app-pop-up-create-client',
  templateUrl: './pop-up-create-client.component.html',
  styleUrls: ['./pop-up-create-client.component.css']
})
export class PopUpCreateClientComponent implements OnInit {
  // Variables que contienen los datos del formulario
  public clientName:        string;

  constructor(
    private _dialogRef: MatDialogRef<PopUpCreateClientComponent>,

    private _sweetAlert: SweetAlertsService,
    private _clientHandler: ClientsHandlerService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

  // 1. llenado de fields - INCOMPLETE (NA)
  // 2. validaciones      - COMPLETE
  // 3. registro          - COMPLETE
  // 4. cerrar opup       - COMPLETE

  ngOnInit(): void {
  }
  
  // Manejador del evento de registro de un nuevo cliente (ejecuta validaciones y llama al método del registro)
  public eventHandler(): void {
    if ( this._validData() ) {
      this._registerClient();
    }
  }

  // Validación de los datos ingresados
  private _validData(): boolean {
    if ( this.clientName ) return true;
    else {
      this._sweetAlert.invalidNewData();
      return false;
    }
  }

  // Registro del cliente en la DB
  private _registerClient(): void {
    let newClient: dataNewClient = {
      creationUser: Number(  this._crypt.userIDUser ),
      name: this.clientName,
    };

    this._clientHandler.addNewClient( newClient ).subscribe(
      (data) => {
        this._sweetAlert.successfulRegistration( data.message );
        this.clientName = '';
      }
    );
  }

  // Método que cierra el PopUp de creación de clientes
  public clickCancel(): void {
    this._dialogRef.close();
  }
}
