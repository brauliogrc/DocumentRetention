import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@shared/services/table/table-service.service';
import { SweetAlertsService } from '@shared/services/alerts/sweet-alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { processesList, filterProcess } from '@shared/interfaces/processesInterface';
import { ProcessTableFilter } from '@shared/helpers/processTableFilter';
import { ProcessesHandlerService } from '@shared/services/processeshandler/processes-handler.service';

import { PopUpCreateProcessComponent } from '../pop-ups/processes/pop-up-create-process/pop-up-create-process.component';
import { PopUpEditProcessComponent } from '../pop-ups/processes/pop-up-edit-process/pop-up-edit-process.component';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {
  // Contenedores del listado de los procesos
  private back:         processesList[];
  public processesList: processesList[];

  constructor(
    private _dialog: MatDialog,
    private _sweetAlert: SweetAlertsService,
    private _tableService: TableServiceService,
    private _processesHandler: ProcessesHandlerService,
  ) { }
  
  // 1. llenado de la tabla - COMPLETE
  // 2. filtrado - COMPLETE
  // 3. reseteo del filtrado - COMPLETE
  // 4. registro de nuevo elemento - COMPLETE
  // 5. modificación de un elemento - COMPETE
  // 6. eliminación de un elemento - COMPLETE

  private _processFilterTable = new ProcessTableFilter();

  ngOnInit(): void {
    this._fillTable();
  }

  // Llenado de la tabla con los datos de la DB retornados por la API
  private _fillTable(): void {
    this._tableService.getProcessesList().subscribe(
      (data) => {
        this.back = [...data];
        this.processesList = [... data];
        console.log(this.processesList);
      }
    )
  }

  // Variables que contiene os valos con los que se filtrará la tabla
  public processId:     number;
  public processName:   string;
  private _filterData:  filterProcess;
  
  // Filtrado de la tabla de procesos segun lo indiquen los valores del formulario
  public filterProcessTable (): void {
    this._filterData = {
      processId:    this.processId,
      processName:  this.processName
    };

    this.processesList = [...this.back];
    this.processesList = this._processFilterTable.processFilter( this.processesList, this._filterData );
    this._filterData = null;
  }

  // Reseteo del filtrado para mostrar de nuevo todos los procesos
  public resetTable(): void {
    this.processesList = [...this.back];
  }

  // Muestra el popup para registrar un nuevo documento
  public processRegisterPopUp(): void {
    const dialog = this._dialog.open(PopUpCreateProcessComponent, {width: '38%', height: '40%'});
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }

  // Muestra el popup para editar la infomcación de un proceso
  public editProcessPopUp( processId: number, processName: string ): void {
    const dialog = this._dialog.open(PopUpEditProcessComponent, {width: '38%', height: '55%', data: { processId, processName }});
    dialog.afterClosed().subscribe(
      () => {
        this._fillTable();
      }
    )
  }

  // Método de eliminación del proceso
  public deleteProcess( processId: number ): void {
    this._processesHandler.deleteProces( processId ).subscribe(
      (data) => {
        this._sweetAlert.successfulDeletion(data.message);
        this._fillTable();
      }
    )
  }
}