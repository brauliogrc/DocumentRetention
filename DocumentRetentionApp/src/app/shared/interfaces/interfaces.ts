export interface loginData {
    UID: string;
    Pass: string;
}

export interface bearer {
    token: string;
}

export interface successMessages {
    message: string;
}

export interface permision {
    isLoged:        boolean;
    role:           number;
}