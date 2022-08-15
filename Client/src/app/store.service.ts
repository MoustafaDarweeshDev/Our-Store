import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
#BasURL = 'https://localhost:7296/api/Product';

  constructor(private productApi:HttpClient) { }

  getAllProdcts(){
    return this.productApi.get(this.#BasURL);
  }

  getById(id:any){
    return this.productApi.get(this.#BasURL+"/"+id);
  }

  edit(user:any  , id:any){
    return this.productApi.put(this.#BasURL+"/"+id , user);

  }

  delete(id:any){
    return this.productApi.delete(this.#BasURL+"/"+id);
  }

  //categorey
  getAllCategory(){
    return this.productApi.get(this.#BasURL+"/"+"category");
  }
  //brands
  getAllBrand(){
    return this.productApi.get(this.#BasURL+"/"+"brand");
  }
}
