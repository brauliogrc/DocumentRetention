// // En desuso hasta el momento
// export interface AddNewDoc {
//     docName:    string;
//     dueDate:    string;
//     startDate:  string;
//     project:    number;
//     process:    number;
//     docType:    number;
//     creationUser:  number;
// }

export interface editedDocInfo {
    idDoc:   number;
    newStatus:  number;
    newDueDate: string;
    newProject: number;
    newProcess: number;
    newDocType: number;
    newStartDate: string;
}