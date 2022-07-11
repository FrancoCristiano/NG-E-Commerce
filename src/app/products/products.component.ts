import { Component, OnInit } from '@angular/core';
import { StoreItemsService } from '../store-items.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  store: any;

  constructor(private storeService: StoreItemsService) {
    this.store = storeService.store;
  }

  ngOnInit(): void {
    this.storeService.newStore.subscribe(() => {
      this.store = this.storeService.storeFiltered;
    });
  }

  pushOnCart(id: string) {
    this.storeService.pushOnCart(id);
  }

  filterForCategory(category: string) {
    this.storeService.filterForCategory(category);
  }

  showAll() {
    this.storeService.showAll();
  }
}
