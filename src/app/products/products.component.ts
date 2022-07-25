import { Component, OnInit } from '@angular/core';
import { single } from 'rxjs';
import { ProdServService } from '../prod-serv.service';
import { Item } from '../shared/item.model';
import { User } from '../shared/user.model';
import { StoreItemsService } from '../store-items.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  store: Item[] = [];
  singleUser2X: any | undefined;

  finalUserX: User | undefined;
  isLogged: boolean = false;

  constructor(
    private storeService: StoreItemsService,
    private userService: UsersService,
    private prodServ: ProdServService
  ) {
    this.storeService.fetchData();
    this.storeService.newStore.subscribe(() => {
      this.store = this.storeService.getStoreList();
    });

    if (localStorage.getItem('userLogged')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    // this.userService.singleUserStream.subscribe(() => {
    //   this.finalUserX = this.userService.singleUserLogged;
    // });
  }

  ngOnInit(): void {
    // console.log(this.store);
    // console.log(this.finalUserX);
  }

  // pushOnCart(id: string) {
  //   this.storeService.pushOnCart(id);
  // }

  pushOnSingleUserCart(idItem: string) {
    this.storeService.pushOnSingleUserCart(idItem);
  }

  filterForCategory(category: string) {
    this.storeService.newStore.subscribe(() => {
      this.store = this.storeService.storeFiltered;
    });
    this.storeService.filterForCategory(category);
  }

  showAll() {
    this.storeService.showAll();
  }

  onSetSingleItem(id: string) {
    console.log(id);
    this.storeService.setItemById(id);
  }
}
