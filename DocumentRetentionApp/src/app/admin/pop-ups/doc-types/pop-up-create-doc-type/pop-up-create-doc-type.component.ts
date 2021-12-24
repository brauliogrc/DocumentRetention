import { Component, OnInit } from '@angular/core';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { DocTypeHandlerService } from '@shared/services/doctypehandler/doc-type-handler.service';
import { MatDialogRef } from '@angular/material/dialog';
import { dataNewDocType } from '@shared/interfaces/doctypesInterface';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';

@Component({
  selector: 'app-pop-up-create-doc-type',
  templateUrl: './pop-up-create-doc-type.component.html',
  styleUrls: ['./pop-up-create-doc-type.component.css']
})
export class PopUpCreateDocTypeComponent implements OnInit {
  // Variables que contienen los datos del formulario
  public docTypeName:       string;

  constructor(
    private _dialogRef: MatDialogRef<PopUpCreateDocTypeComponent>,

    private _sweetAlert: SweetAlertsService,
    private _docTypeHandler: DocTypeHandlerService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

  // 1. llenado de fields - INCOMPLETE (NA)
  // 2. validaciones      - COMPLETE
  // 3. registro          - COMPLETE
  // 4. cerrar opup       - COMPLETE

  ngOnInit(): void {
  }
  
  // Manejador del evento de registro de un nuevo tipo de documento (ejecuta validaciones y llama al método del registro)
  public eventHandler() : void {
    if ( this._validData() ) {
      this._registerDocType();
    }
  }

  // Validación de los datos ingresados
  private _validData(): boolean {
    if ( this.docTypeName ) return true;
    else {
      this._sweetAlert.invalidNewData();
      return false;
    }
  }

  // Registro del tipo de documento en la DB
  private _registerDocType(): void {
    let newDocType: dataNewDocType = {
      name:         this.docTypeName,
      creationUser: Number( this._crypt.userIDUser ),
    };

    this._docTypeHandler.addNewDocType( newDocType ).subscribe(
      (data) => {
        this._sweetAlert.successfulRegistration( data.message );
        this.docTypeName = '';
      }
    )
  }

  // Método que cierra el PopUp de creación de clientes
  public clickCancel(): void {
    this._dialogRef.close();
  }
}
