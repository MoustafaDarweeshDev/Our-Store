import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
cartId:any
cart:any
items:any
userId:any
  constructor(private ar:ActivatedRoute , private cartApi:CartService , private _loginAPI :LoginService) {
    this.cartId = ar.snapshot.params['id']

  }

  ngOnInit(): void {
    this.userId= this._loginAPI.userData._value.ID
    this.getcart()
  }
  getcart(){

    this.cartApi.getcartsession(this.cartId).subscribe({
      next:(res:any)=>{
        this.cart=res
      }
    });

    this.cartApi.getCartItems(this.userId).subscribe({
      next:(res:any)=>{
        this.items=res

      }
    });


  }
}
