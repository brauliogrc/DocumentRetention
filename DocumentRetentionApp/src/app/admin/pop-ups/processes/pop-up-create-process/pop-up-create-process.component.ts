import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { ownersAndNewUsers } from '@shared/interfaces/fieldsInterfaces';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { dataNewProcess } from '@shared/interfaces/processesInterface';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { ProcessesHandlerService } from '@shared/services/processeshandler/processes-handler.service';

@Component({
  selector: 'app-pop-up-create-process',
  templateUrl: './pop-up-create-process.component.html',
  styleUrls: ['./pop-up-create-process.component.css']
})
export class PopUpCreateProcessComponent implements OnInit {
  // Varibles que contienen el listado de los dropdowns
  public ownersList:       ownersAndNewUsers[] = [];


  // Variables que contienen los datos de ca input
  public processName:     string;
  public selectedOwner:   string;

  constructor(
    private _dialog: MatDialogRef<PopUpCreateProcessComponent>,

    private _sweetAlert: SweetAlertsService,
    private _fieldsService: FieldsServiceService,
    private _crypt: EncryptionAndDecryptionService,
    private _processHandler: ProcessesHandlerService,
    ) { }

  // 1. llenado de fields - COMPLETE
  // 2. validaciones - COMPLETE
  // 3. registro - COMPLETE
  // 4. cerrar opup - COMPLETE

  ngOnInit(): void {
    this._fillDropdowns();
  }

  // Petiiones par ael llenado de los los dropdowns
  private _fillDropdowns(): void {
    // Petición a la api para obtener la lista de owners
    this._fieldsService.getOwnersList().subscribe(
      (data) => {
        this.ownersList = [...data];
        console.log(this.ownersList);
      }
    )
  }

  // Manejador del evento de registro de un nuevo proceso (ejecuta validaciones y llama al método del registro)
  public eventHandler(): void {
    if ( this._validData() ) {
      this._registerProcess();
    }
  }

  // Validaión de los datos ingresados
  private _validData(): boolean {
    // console.log(`Data registrada:\n${this.processName}\n${this.selectedOwner}`);
    if (this.processName && this.selectedOwner) {
      // console.log(`Data registrada:\n${this.processName}\n${this.selectedOwner}`);
      return true;
    }
    else {
      this._sweetAlert.invalidNewData();
      return false;
    }
  }

  // Registro del proceso en la db
  private _registerProcess(): void {
    // Obtenció de los datos del ownse seleccionado
    let owner: ownersAndNewUsers = this.ownersList.find( x => x.employeeNumber === Number(this.selectedOwner) );
    // console.log(owner.employeeNumber + ' ' + owner.employeeName);
    let newProcess: dataNewProcess = {
      name: this.processName,
      ownerName: owner.employeeName,
      ownerNumber: owner.employeeNumber,
      creationUser: this._crypt.userIDUser
    }
    
    this._processHandler.addNewProcess(newProcess).subscribe(
      (data) => {
        this._sweetAlert.successfulRegistration(data.message);
        this.processName = '';
        this.selectedOwner = '';
      }
    )
    
  }

  // Método que cierra el PopUp de creación de procesos
  public clickCancel(): void {
    this._dialog.close();
  }

}
