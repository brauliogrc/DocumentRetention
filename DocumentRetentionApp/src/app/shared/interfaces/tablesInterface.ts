export interface docsTable {
    idDocument:         number;
    documentName:       string;
    documentStartDate:  string; // Se colocó como string para fines de facilitar la comparación de fechas
    documentDueDate:    string; // Se colocó como string para fines de facilitar la comparación de fechas
    documentStatus:     boolean;
    ownerName:          string;
    idProcess:          number;
    processName:        string;
    idProject:          number;
    projectName:        string;
        idClient:       number;
        clientName:     string;
    uid:                string;
    userName:           number;
    iddt:               number;
    dtName:             string;
}