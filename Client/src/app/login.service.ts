import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable ,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
#baseURL = 'https://localhost:7296/api/Admin/';
userData:any =new BehaviorSubject(null);
saveUserData(){
  let encodedoken = JSON.stringify(localStorage.getItem('userToken'));
  let decodedoken =  jwtDecode(encodedoken);
  this.userData.next(decodedoken);

}
  constructor( private httpClientt :HttpClient ,private _router:Router) {

    if(localStorage.getItem('userToken')){
      this.saveUserData()
    }

  }

  register(registerForm:any):Observable<any>
  {
    return this.httpClientt.post(this.#baseURL + "register" , registerForm);

  }

  Login(loginForm:any):Observable<any>
  {
    return this.httpClientt.post(this.#baseURL + "login" , loginForm);

  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['login'])
  }
}
