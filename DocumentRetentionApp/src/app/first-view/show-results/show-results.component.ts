import { Component, Input, OnInit } from '@angular/core';
import { filterDocs } from '@app/shared/interfaces/fieldsInterfaces';
import { TableServiceService } from '../../shared/services/table/table-service.service';
import { EncryptionAndDecryptionService } from '../../shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { docsTable } from '../../shared/interfaces/tablesInterface';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {
  public docsList: docsTable[];

  @Input() filterData:  filterDocs;

  constructor(
    private _tableService: TableServiceService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

    private _userRole = this._crypt.userRole;

  ngOnInit(): void {
    this.fillTable();

  }

  // Llenado de a tabla con los datos de la DB retornados por la API
  private fillTable = (): void =>{

    if ( this._userRole === 1 ){
      // Ejecución del metodo de obtención de la lista de documentos admin
      this._tableService.getAdminDocsTable(this.filterData).subscribe(
        (data) => {
          this.docsList = [...data];
        }
      )
    }

    else{
      // Ejecución del metodo de obtención de la lista de documentos user
      this._tableService.getUserDocsTable(this.filterData).subscribe(
        (data) => {
          this.docsList = [...data];
          console.log(this.docsList);
          
        }
      )
    }
  }

}
