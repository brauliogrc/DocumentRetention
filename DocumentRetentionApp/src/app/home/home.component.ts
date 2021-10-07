import { Component, OnInit } from '@angular/core';

// Importaciones de "Primeng"

// Importación de servicios
import { AuthSericeService } from '@auth/autServices/auth-serice.service'
import { EncryptionAndDecryptionService } from '@app/shared/services/encryptionanddecryption/encryption-and-decryption.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sidebar01: boolean = false;
  public userName: string = '***';

  constructor(
    private _auth: AuthSericeService,
    private _crypting: EncryptionAndDecryptionService,
  ) { }


  ngOnInit(): void { 
    this.showName();
   }

  showName() {
    if (this._crypting.userName != null ) {
      this.userName = this._crypting.userName;
      return this.userName;
    }
  }

  get isLogged(): boolean {
    let value: boolean;
    this._auth.isLogged.subscribe(
      (data) => {
        value = data;
      }
    )
    // console.log('Value of data 2: ',value);
    return value;
  }

}
