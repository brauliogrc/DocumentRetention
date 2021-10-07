import { Component, OnInit } from '@angular/core';
import { FieldsServiceService } from '@app/shared/services/fieldsservice/fields-service.service';
import { 
  projectField,
  processField,
  docTypeField,
  filterDocs,
} from '@shared/interfaces/fieldsInterfaces';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-docs-viewer',
  templateUrl: './docs-viewer.component.html',
  styleUrls: ['./docs-viewer.component.css']
})
export class DocsViewerComponent implements OnInit {
  // Variables que contienen el listado de los "dropdrown"
  public docTypeMenu:       docTypeField[];
  public projectsMenu:      projectField[];
  public processesMenu:     processField[];

  // Variables que contienen los valores del form
  public docID:             number;
  public dueDate:           Date;
  public startDate:         Date;
  public selectedProject:   number;
  public selectedProcess:   number;
  public selectedDocType:   number;

  public filterData:        filterDocs;

  // searchValues = this._fb.group({
  //   docID:     [''],
  //   projectID: [''],
  //   processID: [''],
  //   docTypeID: [''],
  //   startDate: [''],
  //   dueDate:   [''],
  // });

  constructor(
    private _fb: FormBuilder,
    private _fieldsService: FieldsServiceService,
    private _crypt: EncryptionAndDecryptionService,
  ) {}
  
  private _userRole: number = this._crypt.userRole;

  ngOnInit(): void {
    this.fillDropdowns();
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

    this._fieldsService.getGeneralDocTypeField().subscribe(
      (data) => {
        this.docTypeMenu = [...data];
        console.log(this.docTypeMenu);
      }
    )
  }

  metodos(){
    console.log(this.selectedProject);
    
  }
}