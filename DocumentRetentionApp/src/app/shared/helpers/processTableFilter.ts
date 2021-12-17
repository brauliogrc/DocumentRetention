import { filterProcess, processesList } from '@shared/interfaces/processesInterface';

export class ProcessTableFilter {

    constructor() {}
    
    private _finalArray: processesList[] = [];

    // Concatenamos los resultados de cada uno de los filtros
    private _arrayConcat = ( arr1: processesList[] ) => {
        this._finalArray = this._finalArray.concat( arr1 );
    }

    // Eliminamos los elementos repetidos del arreglo final
    private _removeDuplicateItems(): void {
        this._finalArray = this._finalArray.filter( (item, index) => {
            return this._finalArray.indexOf(item) === index;
        } )

        console.log(this._finalArray);
    }

    // Filtrado de la tabla de usuario dependiendo de los campos introducidos en el fomulario de busqueda
    public processFilter = ( dataProcessTable: processesList[], filterData: filterProcess ): processesList[] => {
        let arrayAux: processesList[];
        // Filtrado basado en el id del usuario
        if ( typeof filterData.processId != undefined && filterData.processId >= 0 ) {
            arrayAux = [...dataProcessTable];
            arrayAux = dataProcessTable.filter( (value) => value.idProcess === filterData.processId );
            this._arrayConcat( arrayAux );
        }
        // Foltrado basado en el nombre del usuario
        if ( filterData.processName != null && filterData.processName != undefined ) {
            arrayAux = [...dataProcessTable];
            arrayAux = dataProcessTable.filter( (value) => value.processName.toUpperCase().includes( filterData.processName.toUpperCase() ) );
            this._arrayConcat( arrayAux );
        }

        this._removeDuplicateItems();
        let arrResult: processesList[] = [...this._finalArray];
        this._finalArray = [];
        return arrResult;
    }
}