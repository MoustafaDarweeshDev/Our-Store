import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { max } from 'rxjs';
import { CartService } from '../cart.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    username:new FormControl(null ,[Validators.minLength(3)  , Validators.required]),
    password:new FormControl(null ,[Validators.required]),
  });
  gender:any[]=[{key:0,value:'Male'},{key:1,value:'female'}];
  errorMessage:string='';

  registerForm:FormGroup=new FormGroup({
    'firstName':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'lastName':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'username':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'birthDay':new FormControl(null,Validators.required),
    'gender':new FormControl(null,Validators.required),
    'phone':new FormControl(null,[Validators.required,Validators.pattern(/^(002)?01[0125][0-9]{8}$/)]),
    'city':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'street':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'stateOrProvince':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'country':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'password':new FormControl(null,[Validators.required , Validators.pattern(/m/)]),
  })

  error=''
  userId:any
  constructor(private loginAPI:LoginService , private _router:Router ,private cartApi:CartService) { }

  ngOnInit(): void {

  }


  Login(userLogin:any){
    if(this.loginForm.valid){

      this.loginAPI.Login(userLogin.value).subscribe({
          next:(res:any)=>{
            localStorage.setItem('userToken', res.token)
            this.loginAPI.saveUserData();
            this._router.navigate(['products'])

      }
    });
  }


  }

  register(data:FormGroup){
    if(this.registerForm.invalid) return;
    let obj={
      'firstName':data.value.firstName,
      'lastName':data.value.lastName,
      'username':data.value.username,
      'email':data.value.email,
      'birthDay':data.value.birthDay,
      'gender':data.value.gender,
      'phone':data.value.phone,
      "address": {
        "city": data.value.city,
        "street": data.value.street,
        "stateOrProvince": data.value.stateOrProvince,
        "country": data.value.country
      },
      'password':data.value.password,
    }
    this.loginAPI.register(obj).subscribe({
      next:(data)=>{
          if(data.message == 'success'){
            this._router.navigate(['/login']);
          }
          else{
            this.errorMessage="User is Aready registered";
          }
      }
    })
  }
}
