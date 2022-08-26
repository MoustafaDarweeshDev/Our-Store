import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private _loginAPI:LoginService) { }

  ngOnInit(): void {
  }
  logout(){
    this._loginAPI.logOut();
  }
}
