import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  #BaseUrl = 'https://localhost:7296/api/Cart';
  #sessionURl = 'https://localhost:7296/api/CartSessions';

  constructor(private cartApi:HttpClient) {


   }

  addToCart(productId:any  , cartId:any){
    return this.cartApi.get(this.#BaseUrl+'/'+productId+'/'+cartId)
  }

  getCartItems(id:any){
    return this.cartApi.get(this.#BaseUrl+'/'+id)
  }

  increase(id:any){
    return this.cartApi.get(this.#BaseUrl+'/'+'Increase'+'/'+id)
  }
  Decrease(id:any){
    return this.cartApi.get(this.#BaseUrl+'/'+'Decrease'+'/'+id)
  }

  deleteCartItem(id:any){
    return this.cartApi.delete(this.#BaseUrl+'/'+id)
  }

  getcartbyuserid(id:any){
    return this.cartApi.get(this.#BaseUrl+"/user/"+id)
  }

  createCartSession(id:any ){
  return this.cartApi.post("https://localhost:7296/api/CartSessions/userId?userId="+id ,null)
  }

  getcartsession(id:any){
    return  this.cartApi.get(this.#sessionURl+"/" + id)
  }

  // makeing event for the cart iccon
  private _subject=new Subject<any>();

  newEvent(event:any) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }


}
