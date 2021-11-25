export interface userList {
    uid:            string;
    idRole:         number;
    idUser:         number;
    roleName:       string;
    userEmail:      string;
    userName:       string;
    userStatus:     boolean;
}

export interface filterUsers {
    userId:         number;
    userName:       string;
}

export interface userRoles {
    idRole:         number
    roleName:       string;
}

export interface editedUserInfo {
    userId:         number;
    newEmail:       string;
    newStatus:      number;
    newRole:        number;
}

export interface dataNewUser {
    UID:    string;
    name:   string;
    email:  string;
    role:   number;
}