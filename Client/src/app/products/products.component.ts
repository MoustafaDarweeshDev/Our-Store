import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prodcts: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:7296/api/Product').subscribe((res)=>{
    this.prodcts = res;
console.log(res);

    }, err=>{
      console.log(err);

    });
  }

}
