import { DatePipe } from '@angular/common';
import { filterDocs } from '../interfaces/fieldsInterfaces';
import { docsTable } from '../interfaces/tablesInterface';


export class TablesFiltersHelper {
    
    // private dataTable: docsTable[];

    constructor(){}

    // Seteo de las fechas a un formato especifico (para eso las fechas deben ser string)
    private formatDate = ( arr: docsTable[] ): void => {
        let newDate: string;
        arr.forEach((item) => {
            let newDueDate: string[] = item.documentDueDate.split("T");
            newDate = newDueDate[0];
            item.documentDueDate = newDate;

            let newStartDate: string[] = item.documentStartDate.split("T");
            newDate = newStartDate[0];
            item.documentStartDate = newDate;

            // console.log(item.documentStartDate, item.documentDueDate);
            
        })
    }

    objectFilter = (dataTable: docsTable[], parameterF: filterDocs): docsTable[] => {
        this.formatDate(dataTable);

        // Filtrado mediante id del documento
        if (typeof parameterF.docID != undefined && parameterF.docID >= 0) {
            dataTable = dataTable.filter( (value) => value.idDocument === parameterF.docID )
            // console.log('dataTable');
        }
        // Filtrado por el dua date
        if (parameterF.dueDate != null && typeof parameterF.dueDate != undefined){
            dataTable = dataTable.filter( (value) => value.documentDueDate === parameterF.dueDate )
            // console.log(dataTable);
        }

        // Filtrado por tipo de documento
        if (typeof parameterF.selectedDocType != undefined && parameterF.selectedDocType >= 0){
            dataTable = dataTable.filter( (value) => value.iddt === parameterF.selectedDocType )
            // console.log('doctye');
        }

        // Filtrado por proceso
        if (parameterF.selectedProcess >= 0 && typeof parameterF.selectedProcess != undefined){
            dataTable = dataTable.filter( (value) => value.idProcess === parameterF.selectedProcess )
            // console.log('process');
        }

        // Filtrado por projecto
        if (parameterF.selectedProject >= 0 && typeof parameterF.selectedProject != undefined){
            dataTable = dataTable.filter( (value) => value.idProject === parameterF.selectedProject )
            // console.log('project');
        }

        // Filtrado por start date
        if (parameterF.startDate != null &&  typeof parameterF.startDate != undefined){
            dataTable = dataTable.filter( (value) => value.documentStartDate === parameterF.startDate )
            // console.log('start date');
        }
        return dataTable;
    }
}