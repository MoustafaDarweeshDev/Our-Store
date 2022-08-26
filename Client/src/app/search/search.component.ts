import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../store.service';
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit{
  e:any;
  term:string='';
  storeProducts:any;


  constructor(myvalue:FormsModule ,private _storeProduct:StoreService){

  }
  ngOnInit(): void {
    this.displayProducts()
  }

  displayProducts(){
    this._storeProduct.getAllProdcts().subscribe(
      (data)=>{this.storeProducts = data}
    ,(arr)=>{console.log(arr)}
 )
  }
  // updatingpage(){
  //   this.productsApi.getAllProdcts().subscribe((res)=>{
  //     this.prodcts = res;

  //   }, err=>{
  //     // console.log(err);
  //   });


  valueChanged(e:any){
      this.e= e.target.value;
  }

}

