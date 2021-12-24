export interface docTypeList {
    iddt:           number;
    dtName:         string;
    dtCreationAt:   string;
    dtUpdateAt:     string;
    userName:       string;
}

export interface filterDocTypes {
    docTypeId:      number;
    docTypeName:    string;
}

export interface dataNewDocType {
    name:           string;
    creationUser:   number;
}

export interface editedDocTypeInfo {
    newName:        number;
    docTypeId:      number;
}