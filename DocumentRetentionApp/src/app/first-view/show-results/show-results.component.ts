import { Component, Input, OnInit } from '@angular/core';
import { filterDocs } from '@app/shared/interfaces/fieldsInterfaces';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { docsTable } from '@shared/interfaces/tablesInterface';
import { TablesFiltersHelper } from '@app/shared/helpers/tableFiltersHelper';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {
  // Arrelos que contienen el listado de todo los documentos
  private back:     docsTable[];
  public docsList:  docsTable[];

  constructor(
    private _tableService: TableServiceService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

    private _userRole = this._crypt.userRole;
    private _tableFilterHelper = new TablesFiltersHelper();

  ngOnInit(): void {
    this.fillTable();
  }

  // Llenado de a tabla con los datos de la DB retornados por la API
  private fillTable = (): void =>{

    if ( this._userRole === 1 ){
      // Ejecución del metodo de obtención de la lista de documentos admin
      this._tableService.getAdminDocsTable().subscribe(
        (data) => {
          this.docsList = [...data];
          this.back = [...data];
        }
      )
    }

    else{
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

  // Filtrado del arreglo de objetos que contiene los documentos
  public filterTable(filterData:  filterDocs){
    console.log(filterData);
    
    this.docsList = [...this.back];
    this.docsList = this._tableFilterHelper.objectFilter(this.docsList, filterData);
  }

  // Volver a mostar todos los documentos en la tabla
  public resetTable() {
    this.docsList = [...this.back];
  }
}
