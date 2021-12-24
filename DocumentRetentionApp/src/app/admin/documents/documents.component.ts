import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { docsTable } from '@shared/interfaces/tablesInterface';

import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PopUpEditDocComponent } from '../pop-ups/documents/pop-up-edit-doc/pop-up-edit-doc.component';
import { DocumentsHandlerService } from '@shared/services/documentshandler/documents-handler.service';
import { SweetAlertsService } from '../../shared/services/alerts/sweet-alerts.service';
import { ShowCommentsComponent } from '@shared/popups/show-comments/show-comments.component';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  public docsList:  docsTable[];

  constructor(
    private _dialog: MatDialog,
    private _auth: AuthSericeService,
    private _sweetAlert: SweetAlertsService,
    private _tableService: TableServiceService,
    private _documentsHandler: DocumentsHandlerService,
  ) { }

  ngOnInit(): void {
    this._fillTable();
  }

  // Método que realiza las peticiones necesarias para llenar el contenido de los Dropdowns
  private _fillTable(): void {
    this._tableService.getAdminDocsTable().subscribe(
      (data) => {
        this.docsList = [...data];
        console.log(this.docsList);
      }
    )
  }

  // Método de eliminación del documento
  public deleteDocument = ( idDoc: number ): void => {
    console.log('Eliminación del documento: ', idDoc);
    this._documentsHandler.deleteDocument( idDoc ).subscribe(
      (data) => {
        this._sweetAlert.successfulDeletion(data.message);
        this._fillTable();
      }
    )
  }

  // Método que muestra el popUp de editado del documento
  public editPopUp(docId: number, docName: string, docStartDate: string, docDueDate: string): void {
    const dialogRef = this._dialog.open(PopUpEditDocComponent, {width: '40%', height: '78%', data: {docId, docName, docStartDate, docDueDate} });
    dialogRef.afterClosed().subscribe(
      (res) => {
        this._fillTable();
        console.log('Actualizando tabla');
        console.log('Contenido de res:', res);
      }
    );
    // this._dialog.open(PopUpEditDocComponent, {data: idDoc});
    // const dialogRef = this._dialog.open(PopUpEditDocComponent, {});
    // dialogRef.afterClosed().subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // )
  }

  // Visualizacio´n del popup con la información de los cambios realizados en el documento
  public showComments( docName: string, comment: string, modifyDate: string ): void {
    const fialogRef = this._dialog.open(ShowCommentsComponent, { width: '40%', height: '46%', data: { docName, comment, modifyDate } });
  }
}
