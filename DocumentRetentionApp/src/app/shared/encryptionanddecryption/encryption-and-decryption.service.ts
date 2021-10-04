import { Injectable, enableProdMode } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


const jwtHelper = new JwtHelperService();

interface UserData {
  IDUser: number | null;
  UID:    string | null;
  Name:   string | null;
  Email:  string | null;
  Role:   number | null;
}

@Injectable({
  providedIn: 'root'
})
export class EncryptionAndDecryptionService {
  private user: UserData = {
    IDUser: null,
    UID: null,
    Name: null,
    Email: null,
    Role: null,
  }

  private decryptFlag: boolean = false;

  constructor() { }

  decrypToken() {
    // let data: any = jwtHelper.decodeToken(sessionStorage.getItem('token'));
    let data = jwtHelper.decodeToken(sessionStorage.getItem('token'));

    if (data) {
      this.user.IDUser  = Number(data.IDUser);
      this.user.UID     = String(data.nameid);
      this.user.Name    = String(data.Name);
      this.user.Email   = String(data.Email);
      this.user.Role    = Number(data.Role);
    }
    this.decryptFlag = true;
  }

  get userName(): string | null {
    this.isDecrytp();
    if (this.verifyNullValues(this.user.Name)) {
      return null;
    }
    return this.user.Name;
  }

  get userEmail(): string | null {
    this.isDecrytp();
    if (this.verifyNullValues(this.user.Email)) {
      return null;
    }
    return this.user.Email;
  }

  get userUID(): string | null {
    this.isDecrytp();
    if (this.verifyNullValues(this.user.UID)) {
      return null;
    }
    return this.user.UID;
  }

  get userIDUser(): number | null {
    this.isDecrytp();
    if (this.verifyNullValues(this.user.IDUser)) {
      return null;
    }
    return this.user.IDUser;
  }

  get userRole(): number | null {
    this.isDecrytp();
    if (this.verifyNullValues(this.user.Role)) {
      return null;
    }
    return this.user.Role;
  }

  private verifyNullValues = (value): boolean => {
    if (value == null || value == undefined) {
      return true;
    }
    return false;
  }

  private isDecrytp(): void {
    if (!this.decryptFlag) {
      this.decrypToken();
    }
  }
}
