import { Component, OnInit } from '@angular/core';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  public viewLogin: boolean = false;
  public showSingin: boolean = false;

  constructor(
    private _auth: AuthSericeService
  ) { }

  ngOnInit(): void { 
    this.viewLogin = false;
    this.isLogged;
  }

  get isLogged() {
    let value: boolean;
    this._auth.isLogged.subscribe(
      (data) => {
        value = data;
      }
    )
    return value;
  }

}
