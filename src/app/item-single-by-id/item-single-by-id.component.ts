import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { StoreItemsService } from '../store-items.service';

@Component({
  selector: 'app-item-single-by-id',
  templateUrl: './item-single-by-id.component.html',
  styleUrls: ['./item-single-by-id.component.css'],
})
export class ItemSingleByIdComponent implements OnInit {
  singleItem: any | undefined;

  constructor(private itemServ: StoreItemsService) {
    this.itemServ.fetchData();
    const newSingleItem = this.itemServ.getItemById();
    if (newSingleItem) {
      this.singleItem = JSON.parse(newSingleItem);
    }
    console.log(this.singleItem);
  }

  ngOnInit(): void {}
}
