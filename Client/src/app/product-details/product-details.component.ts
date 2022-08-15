import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:any;

  constructor(private prodcctApi:StoreService) { }

  ngOnInit(): void {
    this.prodcctApi.getById(3).subscribe(res=>{
      this.product=res
    },err=>{
      prompt(err)
    })
  }

}
