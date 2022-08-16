import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy {

  prodcts: any;
  subscription:any;
  cart:any;
  cartId:any;
  itemsNumber:any;



  constructor(private productsApi:StoreService , private rout:Router , private CartApi:CartService) { }


  ngOnInit(): void {
    // this.subscription =
    this.productsApi.getAllProdcts().subscribe((res)=>{
      this.prodcts = res;

    }, err=>{
      // console.log(err);
    });

    this.productsApi.getCartById(2).subscribe(res=>{
        this.cart=res;
        console.log(res);
        this.itemsNumber = this.cart.itemsCount;
        this.productsApi.SetNumber(this.itemsNumber)

    },err=>{

    })

    // this.productsApi.SetNumber(2)
  }

  addToCart(Prodid:any , Cartid:any){
    this.CartApi.addToCart(Prodid,Cartid).subscribe(res=>{

      console.log(this.cart);


    },err=>{
      console.log(err);

    })
  }
  details(id:any){
      this.rout.navigate(['/products/'+id])

  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
