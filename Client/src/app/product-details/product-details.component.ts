import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:any;
  id:any;

  constructor(private prodcctApi:StoreService , public ar:ActivatedRoute) {
    this.id = ar.snapshot.params["id"]

  }

  ngOnInit(): void {
    this.prodcctApi.getById(this.id).subscribe(res=>{
      this.product=res
    },err=>{
      prompt(err)
    })
  }

}
