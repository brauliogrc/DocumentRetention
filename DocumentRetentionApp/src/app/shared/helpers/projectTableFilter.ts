import { filterProjects, projectsList } from '@shared/interfaces/projectsIterfaces';

export class ProjectTableFilter {

    constructor() {}
    
    private _finalArray: projectsList[] = [];

    // Concatenamos los resultados de cada uno de los filtros
    private _arrayConcat = ( arr1: projectsList[] ) => {
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
    public projectFilter = ( dataProjectTable: projectsList[], filterData: filterProjects ): projectsList[] => {
        let arrayAux: projectsList[];
        // Filtrado basado en el id del usuario
        if ( typeof filterData.projectId != undefined && filterData.projectId >= 0 ) {
            arrayAux = [...dataProjectTable];
            arrayAux = dataProjectTable.filter( (value) => value.idProject === filterData.projectId );
            this._arrayConcat( arrayAux );
        }
        // Foltrado basado en el nombre del usuario
        if ( filterData.projectName != null && filterData.projectName != undefined ) {
            arrayAux = [...dataProjectTable];
            arrayAux = dataProjectTable.filter( (value) => value.projectName.toUpperCase().includes( filterData.projectName.toUpperCase() ) );
            this._arrayConcat( arrayAux );
        }

        this._removeDuplicateItems();
        let arrResult: projectsList[] = [...this._finalArray];
        this._finalArray = [];
        return arrResult;
    }
}