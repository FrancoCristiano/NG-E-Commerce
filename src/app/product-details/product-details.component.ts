import { Component, OnInit } from '@angular/core';
import { StoreItemsService } from '../store-items.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private itemService: StoreItemsService) {}

  ngOnInit(): void {
    this.itemService.fetchData();
  }
}
