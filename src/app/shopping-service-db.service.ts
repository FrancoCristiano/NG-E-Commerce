import { EventEmitter, Injectable } from '@angular/core';
import { Item } from './shared/item.model';
import { StoreItemsService } from './store-items.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingServiceDBService {
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
  totalItemsX: number = this.totalX.totalItems;

  singleUserX: any | undefined;
  storeX: Item[] | undefined;

  singleUser2X: any;
  finalUserX: any;

  newAmountItems = new EventEmitter<number>();
  newAmountMoney = new EventEmitter<number>();
  newCart = new EventEmitter<Item[]>();

  constructor(private userService: UsersService) {
    if (localStorage.getItem('userLogged')) {
      this.singleUser2X = localStorage.getItem('userLogged');
      this.finalUserX = JSON.parse(this.singleUser2X);

      this.userService.fetchSingleUser();
      this.userService.singleUserStream.subscribe(() => {
        this.finalUserX = this.userService.singleUserFetch;
      });
      this.userService.newShoppingCart.subscribe(() => {
        this.cart = this.userService.singleUserFetchShoppingCart;
        this.userService.setLocalStorage('cart', this.cart);
        // this.userService.setLocalStorage('totalItemsX', this.totalItemsX);
      });
    }

    // console.log('il tot ' + this.totalItemsX);
    // console.log(this.cart);
    // console.log(this.totalX);
    // this.userService.newShoppingCart.subscribe(() => {
    //   this.cart = this.userService.singleUserFetchShoppingCart;
    //   this.singleUserX = this.userService.singleUserFetch;
    // });
    // this.storeService.fetchData();
    // this.storeService.newStore.subscribe(() => {
    //   this.storeX = this.storeService.storeX;
    // });
  }

  getTotalItems() {
    return this.totalItemsX;
  }

  stampaCarrello() {
    console.log(this.cart);
  }
  addItem() {
    //LOGICA PER TENERE IL VALORE DEL TOTALE ITEMS NELLO STORAGE
    let pippo = localStorage.getItem('totalItemsX');
    if (pippo) {
      this.totalItemsX = parseInt(pippo);
    }
    this.totalItemsX += 1;
    this.newAmountItems.emit(this.totalItemsX);
    this.userService.setLocalStorage('totalItemsX', this.totalItemsX);
  }

  removeItem() {
    let pippo = localStorage.getItem('totalItemsX');
    if (pippo) {
      this.totalItemsX = parseInt(pippo);
    }
    this.totalItemsX -= 1;
    this.newAmountItems.emit(this.totalItemsX);
    this.userService.setLocalStorage('totalItemsX', this.totalItemsX);
  }

  addSingleItem(id: string) {
    const itemSingolo = this.cart.find((item) => item.id === id);
    if (itemSingolo) {
      itemSingolo.amount += 1;
      this.addItem();
      //LOGICA PER TENERE IL VALORE DEL TOTALE MONEY NELLO STORAGE
      let pippo2 = localStorage.getItem('totalMoneyX');
      if (pippo2) {
        this.cartTotalX = parseFloat(pippo2);
      }
      this.cartTotalX += +itemSingolo.price;
      this.newAmountItems.emit(this.totalItemsX);
      this.newAmountMoney.emit(this.cartTotalX);
      this.newCart.emit(this.cart);
      this.userService.setLocalStorage('totalMoneyX', this.cartTotalX);
      this.userService.fetchUpdateSingleData3(
        this.finalUserX.id,
        this.finalUserX
      );
      console.log(this.finalUserX);
      console.log(this.totalItemsX);

      // this.userService.setLocalStorage('totalItemsX', this.totalItemsX);
    }
  }

  removeSingleItem(id: string) {
    const itemSingolo = this.cart.find((item) => item.id === id);
    console.log(this.cart);
    console.log(this.finalUserX.shoppingCart);
    if (itemSingolo) {
      const index = this.cart.indexOf(itemSingolo);
      itemSingolo.amount -= 1;
      if (itemSingolo.amount < 1) {
        // console.log('BASSO');
        // this.cart = this.cart.filter((data) => data.id != itemSingolo.id);
        this.cart.splice(index, 1);
        this.newCart.emit(this.cart);
      }
      this.removeItem();
      //LOGICA PER TENERE IL VALORE DEL TOTALE MONEY NELLO STORAGE
      let pippo2 = localStorage.getItem('totalMoneyX');
      if (pippo2) {
        this.cartTotalX = parseFloat(pippo2);
      }
      this.cartTotalX -= +itemSingolo.price;
      this.newAmountItems.emit(this.totalItemsX);
      this.newAmountMoney.emit(this.cartTotalX);
      this.newCart.emit(this.cart);
      this.userService.setLocalStorage('totalMoneyX', this.cartTotalX);

      this.userService.fetchUpdateSingleData3(
        this.finalUserX.id,
        this.finalUserX
      );
    }
  }
}
