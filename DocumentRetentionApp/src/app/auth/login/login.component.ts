import { Component, OnInit } from '@angular/core';
import { loginData } from '@shared/interfaces/interfaces';
import { AuthSericeService } from '../autServices/auth-serice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetAlertsService } from '@app/shared/services/alerts/sweet-alerts.service';
import { bearer } from '@shared/interfaces/interfaces';
import { EncryptionAndDecryptionService } from '@app/shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public viewLogin: boolean;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _sweetAlert: SweetAlertsService,
    private _authService: AuthSericeService,
    private _crypting: EncryptionAndDecryptionService,
  ) { }

  ngOnInit(): void {
    this.isLogged();
  }

  loginData = this._fb.group({
    uid: ['', [Validators.required]],
    pss: ['', [Validators.required]]
  });

  isLogged(): boolean {
    let value: boolean;
    this._authService.isLogged.subscribe(
      (data) => {
        this.viewLogin = data;
      }
    )
    console.log('value show login: ', value);
    
    return this.viewLogin;
  }

  logIn() {
    const userCredentials: loginData = {
      UID: this.loginData.get('uid').value,
      Pass: this.loginData.get('pss').value
    }

    this._authService.singIn(userCredentials).subscribe(
      (data: bearer) => {
        this._authService.saveToken(data.token);
        this._authService.verify();
        this._crypting.decrypToken();
        this._router.navigate(['home/firstView']);
        
        this.loginData.reset();
      }
    );

    this.loginData.reset();
  }

}
