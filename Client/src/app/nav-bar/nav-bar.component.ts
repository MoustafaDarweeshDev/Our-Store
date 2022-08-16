import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  nmberOfItems:any
  constructor(private product:StoreService) { }

  ngOnInit(): void {
    this.nmberOfItems =this.product.GetNumber()
  }
}
