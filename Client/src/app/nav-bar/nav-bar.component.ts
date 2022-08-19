import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  nmberOfItems:any
  userCart:any;
  itemscount:number=0;
  constructor(private product:StoreService ,private cart:CartService,private route:Router) {

  }

  ngOnInit(): void {
    this.nmberOfItems =this.product.GetNumber()
    this.getUserCart()
    this.cart.events$.forEach(event=>this.getUserCart());


  }

  userItems(id:any){
    this.route.navigate(['cart/'+id])
  }

  getUserCart(){
    this.cart.getcartbyuserid(11).subscribe(res=>{
      // console.log(res);
      this.userCart=res;
      this.itemscount=this.userCart.itemsCount;

    },err=>{
      console.log(err);

    })
  }
}
