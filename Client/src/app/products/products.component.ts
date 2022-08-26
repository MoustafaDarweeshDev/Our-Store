import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { LoginService } from '../login.service';
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
  userId:any;
  cartIdd:any;
 constructor(private productsApi:StoreService , private rout:Router , private CartApi:CartService , private _loginAPI:LoginService) { }


  ngOnInit(): void {
    this.userId= this._loginAPI.userData._value.ID
    this.updatingpage();

  }

  updatingpage(){
    this.productsApi.getAllProdcts().subscribe((res)=>{
      this.prodcts = res;

    }, err=>{
      // console.log(err);
    });

    this.productsApi.getCartById(2).subscribe(res=>{
        this.cart=res;
        // console.log(res);
        this.itemsNumber = this.cart.itemsCount;
        this.productsApi.SetNumber(this.itemsNumber)

    },err=>{

    })

    this.CartApi.getcartbyuserid(this.userId).subscribe({
      next:(res:any)=>{
        this.cartIdd = res.id;
      }
    })

    this.CartApi.createCartSession(this.userId).subscribe({
      next:(res)=>{
      },
      error(err) {
      },
    });

  }
errormsg:string="";

  addToCart(Prodid:any , Cartid:any){
    this.CartApi.addToCart(Prodid,this.cartIdd).subscribe(res=>{
      this.updatingpage()
      this.CartApi.newEvent("s");
    },err=>{
      // console.log(err);
      this.errormsg = "this item already in the cart"
      console.log(this.errormsg);

    })
  }
  details(id:any){
      this.rout.navigate(['/products/'+id])

  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
