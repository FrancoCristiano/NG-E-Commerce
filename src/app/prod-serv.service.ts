import { EventEmitter, Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdServService {
  cart: any[] = [];

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
  newAmountItems = new EventEmitter<number>();
  newAmountMoney = new EventEmitter<number>();
  newCart = new EventEmitter<any>();

  constructor() {}

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
    itemSingolo.amount += 1;
    this.addItem();
    this.cartTotalX += +itemSingolo.price;
    this.newAmountItems.emit(this.totalItemsX);
    this.newAmountMoney.emit(this.cartTotalX);
    this.newCart.emit(this.cart);
  }

  removeSingleItem(id: string) {
    const itemSingolo = this.cart.find((item) => item.id === id);
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
  printCart() {
    this.cart.map((item) => console.log(item));
  }
}
