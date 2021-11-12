import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldsServiceService } from '@shared/services/fieldsservice/fields-service.service';
import { 
  projectField,
  processField,
  docTypeField,
  clientField,
  filterDocs,
} from '@shared/interfaces/fieldsInterfaces';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { FormBuilder } from '@angular/forms';
import { ShowResultsComponent } from '../show-results/show-results.component';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-docs-viewer',
  templateUrl: './docs-viewer.component.html',
  styleUrls: ['./docs-viewer.component.css']
})
export class DocsViewerComponent implements OnInit {
  // Referencia a la clase ShowResultsComponent del componente show-results para poder ejecutar sus métodos
  // y propiedades desde este componente
  @ViewChild(ShowResultsComponent) showResults: ShowResultsComponent;

  // Variables que contienen el listado de los "dropdrown"
  public clientMenu:        clientField[];
  public docTypeMenu:       docTypeField[];
  public projectsMenu:      projectField[];
  public processesMenu:     processField[];

  // Variables que contienen los valores del form
  public docID:             number;
  public dueDate:           Date;
  public startDate:         Date;
  public selectedClient:    number;
  public selectedProject:   number;
  public selectedProcess:   number;
  public selectedDocType:   number;

  public filterData:        filterDocs 

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _fieldsService: FieldsServiceService,
    private _crypt: EncryptionAndDecryptionService,
  ) {}
  
  private _userRole: number = this._crypt.userRole;

  ngOnInit(): void {
    this.fillDropdowns();
  }

  // Método llamado desde "doc-creation.component.ts" depues de cerrar el pop up "pop-up-create-doc.component-ts"
  public refillTable(): void {
    this.showResults.refillTable();
  }

  // Llenado de los dropdowns con los datos de la DB retornados por la API
  private fillDropdowns = (): void => {

    if ( this._userRole === 1 ) {
      // Ejecución del metodo de obtención de lista de projectos admin
      this._fieldsService.getAdminProjectField().subscribe(
        (data) => {
          this.projectsMenu = [...data];
        }
      );
      // Ejecución del metodo de obtención de lista de procesos admin
      this._fieldsService.getAdminProcessField().subscribe(
        (data) => {
          this.processesMenu = [...data];
        }
      );
    }

    else {
      // Ejecución del metodo de obtención de lista de projectos user
      this._fieldsService.getUserProjectField().subscribe(
        (data) => {
          this.projectsMenu = [...data];
          console.log(this.projectsMenu);
          
        }
      );
      // Ejecución del metodo de obtención de lista de procesos user
      this._fieldsService.getUserProcessField().subscribe(
        (data) => {
          this.processesMenu = [...data];
          console.log(this.processesMenu);
          
        }
      );
    }

    // Ejecución del método de obtención de la lista de clientes
    this._fieldsService.getUserClients().subscribe(
      (data) => {
        this.clientMenu = [...data];
        console.log(this.clientMenu);
        
      }
    )

    // Ejecución del metodo de obtención de la lista de tipos de documentos
    this._fieldsService.getGeneralDocTypeField().subscribe(
      (data) => {
        this.docTypeMenu = [...data];
        console.log(this.docTypeMenu);
      }
    )
  }

  // Llamado al metodo de filtrado del componente show-results
  filter(): void {
    // console.log( typeof this._datePipe.transform(this.dueDate, 'yyyy-MM-dd') );
    
    this.filterData = {
      docID: this.docID,
      dueDate: this._datePipe.transform(this.dueDate, 'yyyy-MM-dd'),
      startDate: this._datePipe.transform(this.startDate, 'yyyy-MM-dd'),
      selectedClient: this.selectedClient,
      selectedProject: this.selectedProject,
      selectedProcess: this.selectedProcess,
      selectedDocType: this.selectedDocType,
    }
    this.showResults.filterTable(this.filterData);
  }
}