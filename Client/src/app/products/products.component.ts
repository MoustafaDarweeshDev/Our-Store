import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy {

  prodcts: any;
  subscription:any;

  constructor(private productsApi:StoreService) { }


  ngOnInit(): void {
    this.productsApi.getAllProdcts().subscribe((res)=>{
      this.subscription =this.prodcts = res;

    }, err=>{
      console.log(err);

    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unusubscribe();
  }


}
