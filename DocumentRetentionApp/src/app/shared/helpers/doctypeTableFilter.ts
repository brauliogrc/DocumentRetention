import { docTypeList, filterDocTypes } from '@shared/interfaces/doctypesInterface';

export class DocTypeTableFilter {

    constructor() {}
    
    private _finalArray: docTypeList[] = [];

    // Concatenamos los resultados de cada uno de los filtros
    private _arrayConcat = ( arr1: docTypeList[] ) => {
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
    public docTypesFilter = ( dataDocTypesTable: docTypeList[], filterData: filterDocTypes ): docTypeList[] => {
        let arrayAux: docTypeList[];
        // Filtrado basado en el id del usuario
        if ( typeof filterData.docTypeId != undefined && filterData.docTypeId >= 0 ) {
            arrayAux = [...dataDocTypesTable];
            arrayAux = dataDocTypesTable.filter( (value) => value.iddt === filterData.docTypeId );
            this._arrayConcat( arrayAux );
        }
        // Foltrado basado en el nombre del usuario
        if ( filterData.docTypeName != null && filterData.docTypeName != undefined ) {
            arrayAux = [...dataDocTypesTable];
            arrayAux = dataDocTypesTable.filter( (value) => value.dtName.toUpperCase().includes( filterData.docTypeName.toUpperCase() ) );
            this._arrayConcat( arrayAux );
        }

        this._removeDuplicateItems();
        let arrResult: docTypeList[] = [...this._finalArray];
        this._finalArray = [];
        return arrResult;
    }
}