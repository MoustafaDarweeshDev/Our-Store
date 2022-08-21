import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  userId:any;
  items:any;
  cartSession:any;
  constructor(private cartApi:CartService , private ar:ActivatedRoute) {
   this.userId = this.ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.cartApi.getCartItems(this.userId).subscribe(res=>{
        this.items = res;
        console.log(res);

    } , err=>{
        console.log(err);

    });


    this.cartApi.getcartbyuserid(this.userId).subscribe(res=>{
      this.cartSession=res
      console.log(res);

  } , err=>{
      console.log(err);

  });
  }

  plus(id:any){
    this.cartApi.increase(id).subscribe(res=>{
      console.log(res);
      this.ngOnInit()
      console.log(" yes");


    },err=>{
      console.log(err);
      this.ngOnInit()
      console.log(" NO");

    })
  }

  minus(id:any){
    this.cartApi.Decrease(id).subscribe(res=>{
      console.log(" yes");
      console.log(res);
      this.ngOnInit()
    },err=>{
      console.log(" NO");

      console.log(err);
      this.ngOnInit()

    })
  }

  delete(id:any){
    this.cartApi.deleteCartItem(id).subscribe(res=>{
      this.cartApi.newEvent("clicked");
      this.getItems()
    },err=>{
      this.cartApi.newEvent("s");

      console.log(err);
      this.getItems()

    })
  }
}
