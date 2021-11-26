// import { DatePipe } from '@angular/common';
import { filterDocs } from '../interfaces/fieldsInterfaces';
import { docsTable } from '../interfaces/tablesInterface';


export class TablesFiltersHelper {
    
    private finalArray: docsTable[] = [];

    constructor(){}

    // Seteo de las fechas a un formato especifico (para eso las fechas deben ser string)
    private _formatDate = ( arr: docsTable[] ): void => {
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

    // TODO: Eliminar    
    public formatDate = ( date: string ): string => {
        let arr: string[] =  date.split("T");
        date = arr[0];
        return date;
    }

    // Concatenación del resultrado de filtrar por medio de cada parametro
    private _arrayConcat = ( arr1: docsTable[] ): void => {
        // console.log('_arrayConcat');
        
        this.finalArray = this.finalArray.concat( arr1 );
        console.log( this.finalArray );
    }

    // Remoción de los elementos duplicados en el arreglo final
    private _removeDuplicateItems = (): void => {
        // console.log('_removeDuplicateItems  ');

        this.finalArray = this.finalArray.filter( (item, index) => {
            return this.finalArray.indexOf(item) === index
        })
        
        console.log(this.finalArray);
        
    }

    // Filtrado del arreglo segun los parámetros del campo de filtrado
    public docsFilter = (dataTable: docsTable[], parameterF: filterDocs): docsTable[] => {
        
        let arrayAux: docsTable[];
        this._formatDate(dataTable);

        // Filtrado mediante id del documento
        if (typeof parameterF.docID != undefined && parameterF.docID >= 0) {
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.idDocument === parameterF.docID )

            // console.log(arrayAux);
            this._arrayConcat( arrayAux );
        }

        // Filtrado por el dua date
        if (parameterF.dueDate != null && typeof parameterF.dueDate != undefined){
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.documentDueDate === parameterF.dueDate )
            
            // console.log(arrayAux);
            this._arrayConcat( arrayAux );
        }

        // Filtrado por cliente
        if (typeof parameterF.selectedClient != undefined && parameterF.selectedClient != 0) {
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.idClient == parameterF.selectedClient )

            this._arrayConcat( arrayAux );
        }

        // Filtrado por tipo de documento
        if (typeof parameterF.selectedDocType != undefined && parameterF.selectedDocType >= 0){
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.iddt === parameterF.selectedDocType )
            
            // console.log(arrayAux);
            this._arrayConcat( arrayAux );
        }

        // Filtrado por proceso
        if (parameterF.selectedProcess >= 0 && typeof parameterF.selectedProcess != undefined){
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.idProcess === parameterF.selectedProcess )
            
            // console.log(arrayAux);
            this._arrayConcat( arrayAux );
        }

        // Filtrado por projecto
        if (parameterF.selectedProject >= 0 && typeof parameterF.selectedProject != undefined){ 
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.idProject === parameterF.selectedProject )
            
            
            // console.log(arrayAux);
            this._arrayConcat( arrayAux );
        }

        // Filtrado por start date
        if (parameterF.startDate != null &&  typeof parameterF.startDate != undefined){
            arrayAux = [...dataTable];
            arrayAux = dataTable.filter( (value) => value.documentStartDate === parameterF.startDate )

            // console.log(arrayAux);
            this._arrayConcat( arrayAux );
        }   

        this._removeDuplicateItems();
        return this.finalArray;
    }
}