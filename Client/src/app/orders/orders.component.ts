import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private _loginAPI:LoginService) { }
userToken:any;
  ngOnInit(): void {
  this.userToken= this._loginAPI.userData._value.ID


  }

}
