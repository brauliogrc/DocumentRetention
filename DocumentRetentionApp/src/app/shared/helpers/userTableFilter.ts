import { filterUsers, userList } from '@shared/interfaces/userInterfaces';

export class UserTableFilter {

    constructor() {}
    
    private _finalArray: userList[] = [];

    // Concatenamos los resultados de cada uno de los filtros
    private _arrayConcat = ( arr1: userList[] ) => {
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
    public usersFilter = ( dataUsersTable: userList[], filterData: filterUsers ): userList[] => {
        let arrayAux: userList[];
        // Filtrado basado en el id del usuario
        if ( typeof filterData.userId != undefined && filterData.userId >= 0 ) {
            arrayAux = [...dataUsersTable];
            arrayAux = dataUsersTable.filter( (value) => value.idUser === filterData.userId );
            this._arrayConcat( arrayAux );
        }
        // Foltrado basado en el nombre del usuario
        if ( filterData.userName != null && filterData.userName != undefined ) {
            arrayAux = [...dataUsersTable];
            arrayAux = dataUsersTable.filter( (value) => value.userName.toUpperCase().includes( filterData.userName.toUpperCase() ) );
            this._arrayConcat( arrayAux );
        }

        this._removeDuplicateItems();
        return this._finalArray;
    }
}