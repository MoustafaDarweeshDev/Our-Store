import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  cartSessionId:any
  constructor(private cartApi:CartService , private ar:ActivatedRoute , private router:Router) {
   this.userId = this.ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getItems()

  }

  getItems(){
    this.cartApi.getCartItems(this.userId).subscribe(res=>{
        this.items = res;

    } , err=>{

    });


      this.cartApi.getcartbyuserid(this.userId).subscribe((res:any)=>{
      this.cartSession=res
      this.cartSessionId = res.id;

  } , err=>{
      console.log(err);

  });
  }

  plus(id:any){
    this.cartApi.increase(id).subscribe(res=>{
      console.log(res);
      console.log(" yes");
      this.getItems()

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
  checkOut(){
    this.router.navigate(['check/'+ this.cartSessionId])
  }
}
