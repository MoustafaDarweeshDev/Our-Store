import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-ournav-bar',
  templateUrl: './ournav-bar.component.html',
  styleUrls: ['./ournav-bar.component.css']
})
export class OurnavBarComponent implements OnInit {
isLogin:boolean=false;
  constructor(private loginApi:LoginService) { }

  ngOnInit(): void {
 this.loginApi.userData.subscribe({
  next:()=>{
    if(this.loginApi.userData.getValue() !=null)
    {
      this.isLogin=true
    }
    else{this.isLogin=false}
  }
 });
  }

  logOut(){
    this.loginApi.logOut();
  }

}
