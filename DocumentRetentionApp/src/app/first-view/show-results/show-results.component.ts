import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { filterDocs } from '@app/shared/interfaces/fieldsInterfaces';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { docsTable } from '@shared/interfaces/tablesInterface';
import { TablesFiltersHelper } from '@app/shared/helpers/tableFiltersHelper';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ConnectShowPdfService } from '@shared/services/connectshowresultpdfviewer/connect-show-pdf.service';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';
import { ShowCommentsComponent } from '@shared/popups/show-comments/show-comments.component'

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {
  // Arrelos que contienen el listado de todo los documentos
  private back: docsTable[];
  public docsList: docsTable[];

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _auth: AuthSericeService,
    private _connShowPdf: ConnectShowPdfService,
    private _tableService: TableServiceService,
    private _crypt: EncryptionAndDecryptionService,
  ) {
    // pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  private _userRole = this._crypt.userRole;
  private _tableFilterHelper = new TablesFiltersHelper();

  public userRole:   number;
  public isLogged:  boolean;

  ngOnInit(): void {
    this.fillTable();

    // Obtención de valores necesarios para hacer visibles campos de creación del documento
    // Esto se valida en los dos bloques "ng-template" dentro de las sentiencias "*ngIf"
    // TODO: 001-Aplicar modificación 001
    this._auth.isLogged.subscribe(
      (Logged) => {
        this.isLogged = Logged;
      }
    );
    this.userRole = this._crypt.userRole;
    console.log('Rol: ', this.userRole , ' is logged: ', this.isLogged);
  }

  // Método llamado desde "doc-viewer.component.ts" depues de cerrar el pop up "pop-up-create-doc.component-ts"
  public refillTable(): void {
    this.fillTable();
  }

  // Llenado de a tabla con los datos de la DB retornados por la API
  private fillTable = (): void => {

    if (this._userRole === 1) {
      // Ejecución del metodo de obtención de la lista de documentos admin
      this._tableService.getAdminDocsTable().subscribe(
        (data) => {
          this.docsList = [...data];
          this.back = [...data];
          console.log(this.docsList);
          
        }
      )
    }

    else {
      // Ejecución del metodo de obtención de la lista de documentos user
      this._tableService.getUserDocsTable().subscribe(
        (data) => {
          // this.docsList = this._tableFilterHelper.objectFilter(data, this.filterData);
          this.docsList = [...data];
          this.back = [...data];
        }
      )
    }
  }

  // Filtrado del arreglo de objetos que contiene los documentos (Método llamado desde el componente docs-viewer.component.ts)
  public filterTable(filterData: filterDocs): void {
    console.log(filterData);

    this.docsList = [...this.back];
    this.docsList = this._tableFilterHelper.docsFilter(this.docsList, filterData);
  }

  // Volver a mostar todos los documentos en la tabla
  public resetTable(): void {    
    this.docsList = [...this.back];
  }

  // Habre el panel de visualización de documentos
  showDocuments(docName: string): void {
    // console.log(docName);
    // let name: string = docName;

    // this.PDFV.shDoc(name);
    
    this._connShowPdf.setFileName(docName);
    this._router.navigate(['home/firstView/pdfViewer']);
  }

  public showComments( docName: string, comment: string, modifyDate: string ): void {
    const fialogRef = this._dialog.open(ShowCommentsComponent, { width: '40%', height: '46%', data: { docName, comment, modifyDate } });
  }
}
