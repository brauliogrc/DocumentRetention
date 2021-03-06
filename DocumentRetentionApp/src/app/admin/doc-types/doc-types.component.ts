import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { MatDialog } from '@angular/material/dialog';
import { docTypeList, filterDocTypes } from '@shared/interfaces/doctypesInterface';
import { DocTypeTableFilter } from '@shared/helpers/doctypeTableFilter';

import { PopUpCreateDocTypeComponent } from '@app/admin/pop-ups/doc-types/pop-up-create-doc-type/pop-up-create-doc-type.component';
import { PopUpEditDocTypeComponent } from '@app/admin/pop-ups/doc-types/pop-up-edit-doc-type/pop-up-edit-doc-type.component';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';

@Component({
  selector: 'app-doc-types',
  templateUrl: './doc-types.component.html',
  styleUrls: ['./doc-types.component.css']
})
export class DocTypesComponent implements OnInit {
  // Contenedores del listado de tipos de documentos registrados
  private back:       docTypeList[];
  public docTypeList: docTypeList[];

  private userRole: number;
  private isLogged: boolean;

  constructor(
    private _dialog: MatDialog,
    private _auth: AuthSericeService,
    private _tableService: TableServiceService,
  ) { }

  // 1. llenado de la tabla          - COMPLETE
  // 2. filtrado                     - COMPLETE
  // 3. reseteo del filtrado         - COMPLETE
  // 4. registro de nuevo elemento   - COMPLETE
  // 5. modificación de un elemento  - COMPLETE
  // 6. eliminación de un elemento   - INCOMPLETE (NA)

  private _docTypeFilterTable = new DocTypeTableFilter();

  ngOnInit(): void {

    // FIXME: Método sijeto a pruebas aún
    // Validación del rol para el acceso a esta sección
    let { isLoged, role } = this._auth.permision();
    this.userRole = role;
    this.isLogged = isLoged;
    if ( this.userRole != 1 ) this._auth.redirectToHome();
    else this._fillTable();
  }

  // Llenado de la tabla con los datos retornados de la API
  private _fillTable(): void {
    this._tableService.getDocTypeLst().subscribe(
      (data) => {
        this.back = [ ...data];
        this.docTypeList = [... data];
      }
    )
  }

  // Variables que contienen los daots para el filtrado
  public docTypeId:        number;
  public docTypeName:      string;
  private _filterData:      filterDocTypes;

  // Filtrado de la tabla de tipos de documentos según lo indiquen los valores del formulario
  public filterDocTypeTable(): void {
    this._filterData = {
      docTypeId:    this.docTypeId,
      docTypeName:  this.docTypeName,
    }

    this.docTypeList = [...this.back];
    this.docTypeList = this._docTypeFilterTable.docTypesFilter( this.docTypeList, this._filterData );
    this._filterData = null;
  }

  // Reseteo del filtrado para mostrar de nuevo todos los tipos de documentos
  public resetTable(): void {
    this.docTypeList = [... this.back];
  }

  // Muestra popup para registar un uevo cliente
  public docTypeRegisterPopUp(): void {
    const dialog = this._dialog.open( PopUpCreateDocTypeComponent );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }

  // Muestra popup para editar un cliente
  public editClientPopUp( docTypeId: number, docTypeName: string ): void {
    const dialog = this._dialog.open( PopUpEditDocTypeComponent, { width: '38%', height: '30%', data: { docTypeId, docTypeName } } );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }
}
