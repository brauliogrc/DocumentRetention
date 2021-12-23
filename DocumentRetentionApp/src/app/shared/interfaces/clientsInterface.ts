export interface clientsList {
    idClient:           number;
    clientName:         string;
    clientCreationAt:   string;
    clientUpdateAt:     string;
    userName:           string;
}

export interface filterClients {
    clientId:           number;
    clientName:         string;
}

export interface dataNewClient {
    name:               string;
    creationUser:       number;
}

export interface editedClientInfo {
    clientId:           number;
    newName:            string;
}

export interface clientData {
    clientId:          number;
    clientName:        string;
}