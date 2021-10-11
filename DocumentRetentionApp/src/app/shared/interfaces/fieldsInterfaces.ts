export interface projectField {
    IDProject: number;
    projectName: string;
}

export interface processField {
    IDProcess: number;
    processName: string;
}

export interface docTypeField {
    IDDT: number;
    docTypeMenu: string; 
}

export interface filterDocs {
    docID:              number;
    dueDate:            string;   // El método para la conversión al formato de fecha requerito para comparación retorna un string
    startDate:          string;   // El método para la conversión al formato de fecha requerito para comparación retorna un string
    selectedProject:    number;
    selectedProcess:    number;
    selectedDocType:    number;
}