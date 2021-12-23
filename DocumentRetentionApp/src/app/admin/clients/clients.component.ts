import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { clientsList, filterClients } from '@shared/interfaces/clientsInterface';
import { ClientTableFilter } from '@shared/helpers/clientTableFilter';
import { MatDialog } from '@angular/material/dialog';

import { PopUpCreateClientComponent } from '@admin/pop-ups/clients/pop-up-create-client/pop-up-create-client.component';
import { PopUpEditClientComponent } from '@admin/pop-ups/clients/pop-up-edit-client/pop-up-edit-client.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  // Contenedores del listado de clientes registrados
  private back:       clientsList[];
  public clientsList: clientsList[];

  constructor(
    private _dialog: MatDialog,
    private _tableService: TableServiceService,
  ) { }

  // 1. llenado de la tabla          - COMPETE
  // 2. filtrado                     - COMPETE
  // 3. reseteo del filtrado         - COMPETE
  // 4. registro de nuevo elemento   - INCOMPLETE
  // 5. modificación de un elemento  - INCOMPLETE
  // 6. eliminación de un elemento   - INCOMPLETE (NA)

  private _clientFilterTable = new ClientTableFilter();

  ngOnInit(): void {
    this._fillTable();
  }

  // Llenado de la tabla con los datos retornados de la API
  private _fillTable(): void {
    this._tableService.getClientList().subscribe(
      (data) => {
        this.back = [... data];
        this.clientsList = [... data];
        console.log( this.clientsList );
      }
    );
  }

  // Variables que contienen los datos para el filtrado
  public clientId:      number;
  public clientName:    string;
  private _filterData:  filterClients;

  // Filtrado de la tabla de clientes según lo indiquen los valores del formulario
  public filterClientTable(): void {
    this._filterData = {
      clientId:   this.clientId,
      clientName: this.clientName,
    }

    console.log( this._filterData );
    
    this.clientsList = [...this.back];
    this.clientsList = this._clientFilterTable.clientsFilter( this.clientsList, this._filterData );
    this._filterData = null;
  }

  // Reseteo del filtrado para mostrar de nuevo todos los clientes
  public resetTable(): void {
    this.clientsList = [... this.back];
  }

  // TODO: Muestra popup para registar un uevo proyecto
  public clientRegisterPopUp(): void {
    const dialog = this._dialog.open( PopUpCreateClientComponent, { width: '38%', height: '40%' } );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }
  
  // TODO: Muestra popup para editar un proyecto
  public editClientPopUp( clientId: number, clientName: string ): void {
    const dialog = this._dialog.open( PopUpEditClientComponent, { width: '38%', height: '40%', data: { clientId, clientName } } );
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }
}
