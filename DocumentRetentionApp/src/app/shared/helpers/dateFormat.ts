import { docInformation } from '@shared/interfaces/fieldsInterfaces';

export class DateFormat {
    
    // Formateo de la fecha pasada como string para solo obtener yyyy-mm-dd
    public formatDate( date: string ): string {
        let auxDate: string[] = date.split("T");
        date = auxDate[0];

        return date;
    }

    // Validación de fechas al momento de crear un nuevo documento
    public setNewDate( startDate: Date, dueDate: Date ): boolean {
        if ( dueDate < startDate ) {
            return false
          }
          if ( dueDate >= startDate ) {
            return true;
          }
    }

    // Validación de fechas al momento de actualizar la información de un documento
    public updateDateValidations( {docStartDate, docDueDate}: docInformation, newStartDate: string, newDueDate: string ): boolean {
        let dateIsValid: boolean = true;
    
        // Validación si se modifican startDate y dueDate
        if ( newStartDate == undefined && newDueDate == undefined ) {
            return dateIsValid;
        }

        // Validación si solo de modifica el startDate
        if ( newStartDate != undefined ) {
            if ( newStartDate.length > 0 && newDueDate == undefined ) {
                console.log('solo tiene start date');
                if ( new Date( newStartDate ) > new Date( docDueDate ) ) {
                    // alert( 'Startdate no puede ser mayor que la actual Duedate' );
                    dateIsValid = false;
                }
            }
        }
        // Validación si solo de modifica el dueDate
        if ( newDueDate != undefined ) {
            if ( newDueDate.length > 0 && newStartDate == undefined ) {
                console.log('solo tiene due date');
                if ( new Date( newDueDate ) < new Date( docStartDate ) ) {
                    // alert( 'Startdate no puede ser mayor que la actual Duedate x2' );
                    dateIsValid = false;
                }
            }
        }
        // Validación si se modifican startDate y dueDate
        if ( newStartDate != undefined && newDueDate != undefined ) {
            if ( newStartDate.length > 0 && newDueDate.length > 0 ) {
                console.log('solo tiene ambas fechas');
                if ( new Date( newStartDate ) > new Date( newDueDate ) ) {
                    // alert( 'Startdate no puede ser mayor que la actual Duedate x3' );
                    dateIsValid = false;
                }
            }
        }

        return dateIsValid;
    }
}