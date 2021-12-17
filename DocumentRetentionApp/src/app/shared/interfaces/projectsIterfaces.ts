export interface projectsList {
    idProject:          number;
    projectName:        string;
    projectCreationAt:  string;
    projecUpdateAt:     string;
    projectStatus:      boolean;
    clientName:         string;
    userName:           string;
}

export interface filterProjects {
    projectId:         number;
    projectName:        string;
}

export interface dataNewProject {
    name:               string;
    client:           number;
    creationUser:       number;
}