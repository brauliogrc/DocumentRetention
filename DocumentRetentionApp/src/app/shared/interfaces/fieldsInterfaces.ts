export interface projectField {
    IDProject:      number;
    projectName:    string;
}

export interface processField {
    IDProcess:      number;
    processName:    string;
}

export interface docTypeField {
    IDDT:           number;
    dtName:         string; 
}

export interface clientField {
    idClient:       number;
    clientName:     string;
}

export interface docOwnerField {
    employeeName:   string;
    employeeNumber: number;
}

export interface generalStatus {
    statusName:     string;
    statusValue:    number;
}

export interface filterDocs {
    docID:              number;
    dueDate:            string;   // El método para la conversión al formato de fecha requerito para comparación retorna un string
    startDate:          string;   // El método para la conversión al formato de fecha requerito para comparación retorna un string
    selectedClient:     number;
    selectedProject:    number;
    selectedProcess:    number;
    selectedDocType:    number;
}

export interface docInformation {
    docId:              number;
    docName:            string;
    docStartDate:       string;
    docDueDate:         string;
}