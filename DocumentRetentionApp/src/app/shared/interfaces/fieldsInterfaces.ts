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
    dueDate:            Date;
    startDate:          Date;
    selectedProject:    number;
    selectedProcess:    number;
    selectedDocType:    number;
}