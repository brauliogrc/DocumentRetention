export interface processesList {
    idOwner:            number;
    idProcess:          number; // 1
    nameOwner:          string; // 5
    processCreationAt:  string; // 3
    processName:        string; // 2
    processStatus:      number; // 8
    processUpdaeAt:     string; // 4
    uid:                string; // 6
    userName:           string; // 7
}

export interface filterProcess {
    processId:         number;
    processName:       string;
}

export interface dataNewProcess {
    name:               string;
    ownerName:          string;
    ownerNumber:        number;
    creationUser:       number;
}

export interface processData {
    processId:          number;
    processName:        string;
}

export interface editedProcessInfo {
    newName:            string;
    processId:          number;
    newStatus:          number
    newOwnerName:       string;
    newOwnerNumber:     number;
}