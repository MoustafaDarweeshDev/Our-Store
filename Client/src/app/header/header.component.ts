import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userId:any
  constructor(private LoginApi:LoginService  , private router:Router) { }

  ngOnInit(): void {
    this.userId= this.LoginApi.userData._value.ID
  }

  openCart(){
    this.router.navigate(['cart/'+ this.userId])
  }
}
