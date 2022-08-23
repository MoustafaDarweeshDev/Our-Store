import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  ngOnInit(): void {
  }
  constructor(myvalue:FormsModule) { }
  e:any;
  valueChanged(e:any){
      this.e= e.target.value;
     }
}
