import { EventEmitter, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Item } from './shared/item.model';
import { User } from './shared/user.model';
import { StoreItemsService } from './store-items.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProdServService {
  cart: Item[] = [];

  totalX = this.cart.reduce(
    (total, cartItem) => {
      const { amount, price } = cartItem;

      total.totalItems += amount;
      total.cartTotal = amount * price;
      total.cartTotal = parseFloat(total.cartTotal.toFixed(2));
      return total;
    },
    {
      totalItems: 0,
      cartTotal: 0,
    }
  );

  cartTotalX = this.totalX.cartTotal;
  totalItemsX = this.totalX.totalItems;
  singleUserX: any | undefined;
  storeX: Item[] | undefined;

  newAmountItems = new EventEmitter<number>();
  newAmountMoney = new EventEmitter<number>();
  newCart = new EventEmitter<Item[]>();

  constructor() // private storeService: StoreItemsService // private userService: UsersService,
  {
    // this.userService.newShoppingCart.subscribe(() => {
    //   this.cart = this.userService.singleUserFetchShoppingCart;
    //   this.singleUserX = this.userService.singleUserFetch;
    // });
    // this.storeService.fetchData();
    // this.storeService.newStore.subscribe(() => {
    //   this.storeX = this.storeService.storeX;
    // });
  }

  addItem() {
    this.totalItemsX += 1;
    this.newAmountItems.emit(this.totalItemsX);
  }

  removeItem() {
    this.totalItemsX -= 1;
    this.newAmountItems.emit(this.totalItemsX);
  }

  addSingleItem(id: string) {
    const itemSingolo = this.cart.find((item) => item.id === id);
    if (itemSingolo) {
      itemSingolo.amount += 1;
      this.addItem();
      this.cartTotalX += +itemSingolo.price;
      this.newAmountItems.emit(this.totalItemsX);
      this.newAmountMoney.emit(this.cartTotalX);
      this.newCart.emit(this.cart);
    }
  }

  removeSingleItem(id: string) {
    const itemSingolo = this.cart.find((item) => item.id === id);
    if (itemSingolo) {
      itemSingolo.amount -= 1;
      if (itemSingolo.amount === 0) {
        this.cart = this.cart.filter((data) => data.id != itemSingolo.id);
      }
      this.removeItem();
      this.cartTotalX -= +itemSingolo.price;
      this.newAmountItems.emit(this.totalItemsX);
      this.newAmountMoney.emit(this.cartTotalX);
      this.newCart.emit(this.cart);
    }
  }

  pushOnSingleUserCart(id: string) {
    console.log('poba');
    console.log(this.cart);
    // console.log(this.singleUserX);

    // this.storeX?.find((item) => {
    //   if (item.id === id) {
    //     if (this.cart.includes(item)) {
    //       this.addSingleItem(item.id);
    //       this.userService.fetchUpdateSingleData2(
    //         this.singleUserX.id,
    //         this.singleUserX
    //       );
    //     } else {
    //       this.cart.push(item);
    //       this.addSingleItem(item.id);
    //       this.userService.fetchUpdateSingleData2(
    //         this.singleUserX.id,
    //         this.singleUserX
    //       );
    //     }
    //   }
    // });
  }

  // this.cart.find((item) => {
  //   console.log('CIAO2' + item);

  //   if (item.id === id) {
  //     console.log('CIAO2' + item);

  //     this.addSingleItem(item.id);
  //     // this.finalUserX?.shoppingCart.push(item);
  //     item.amount += 1;
  //     // this.singleUserX.shoppingCart = this.cart;

  //     this.userService.fetchUpdateSingleData2(
  //       this.singleUserX.id,
  //       this.singleUserX
  //     );
  //   } else {
  //     console.log('CIAO' + item);

  //     // this.cart.push(item);
  //     this.addSingleItem(item.id);
  //     this.singleUserX?.shoppingCart.push(item);
  //     this.userService.fetchUpdateSingleData2(
  //       this.singleUserX.id,
  //       this.singleUserX
  //     );
  //   }
  // });

  printCart() {
    this.cart.map((item) => console.log(item));
  }
}
