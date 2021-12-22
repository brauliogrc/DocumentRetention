import { clientsList, filterClients } from '@shared/interfaces/clientsInterface';

export class ClientTableFilter {

    constructor() {}
    
    private _finalArray: clientsList[] = [];

    // Concatenamos los resultados de cada uno de los filtros
    private _arrayConcat = ( arr1: clientsList[] ) => {
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
    public clientsFilter = ( dataClientsTable: clientsList[], filterData: filterClients ): clientsList[] => {
        let arrayAux: clientsList[];
        // Filtrado basado en el id del usuario
        if ( typeof filterData.clientId != undefined && filterData.clientId >= 0 ) {
            arrayAux = [...dataClientsTable];
            arrayAux = dataClientsTable.filter( (value) => value.idClient === filterData.clientId );
            this._arrayConcat( arrayAux );
        }
        // Foltrado basado en el nombre del usuario
        if ( filterData.clientName != null && filterData.clientName != undefined ) {
            arrayAux = [...dataClientsTable];
            arrayAux = dataClientsTable.filter( (value) => value.clientName.toUpperCase().includes( filterData.clientName.toUpperCase() ) );
            this._arrayConcat( arrayAux );
        }

        this._removeDuplicateItems();
        let arrResult: clientsList[] = [...this._finalArray];
        this._finalArray = [];
        return arrResult;
    }
}