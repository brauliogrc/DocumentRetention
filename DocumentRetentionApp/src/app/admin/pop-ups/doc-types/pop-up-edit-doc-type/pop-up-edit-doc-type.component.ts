import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editedDocTypeInfo, docTypeData } from '@shared/interfaces/doctypesInterface';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { DocTypeHandlerService } from '@shared/services/doctypehandler/doc-type-handler.service';

@Component({
  selector: 'app-pop-up-edit-doc-type',
  templateUrl: './pop-up-edit-doc-type.component.html',
  styleUrls: ['./pop-up-edit-doc-type.component.css']
})
export class PopUpEditDocTypeComponent implements OnInit {
  // Variables que contienen los valores del form
  public newName:       string;

  // Bandera para modificar los botones del popUp, cambia de estado cuando el tipo de documento es actualizado
  public docTypeUpdated:  boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PopUpEditDocTypeComponent>,
    @Inject(MAT_DIALOG_DATA) private _arrData:  docTypeData ,

    private _sweetAlert: SweetAlertsService,
    private _docTypeHandler: DocTypeHandlerService,
  ) { }

  // Nombre del tipo de documento a editar para mostrarlo en el popup
  public docTypeName = this._arrData.docTypeName;
  // Varible con el fomrato de datos para la actualización del tipo de documento
  private _editedDocTypeInfo: editedDocTypeInfo;

  ngOnInit(): void {
  }

  // Manejador del evento, realiza un seteo de la información
  public eventHandler(): void {
    this._editedDocTypeInfo = {
      docTypeId:    Number( this._arrData.docTypeId ),
      newName:      this.newName,
    };

    this._saveChanges();
  }

  // Ejecuta el método para editar la información del tipo de documento
  private _saveChanges(): void {
    this._docTypeHandler.updteDocType( this._editedDocTypeInfo ).subscribe(
      (data) => {
        this._sweetAlert.successfulUpdate( data.message );
        this.newName = '';
        this.docTypeUpdated = true;
      }
    )
  }

  // Método que cierra el PopUp 
  public clickCancel(): void {
    this._dialogRef.close();
  }

}
