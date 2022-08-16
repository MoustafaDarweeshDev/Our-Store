import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  #BaseUrl = 'https://localhost:7296/api/Cart';

  constructor(private cartApi:HttpClient) { }

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
}
