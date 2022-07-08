import { EventEmitter, Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdServService {
  cart: any[] = [
    {
      id: 'rec1JZlfCIBOPdcT2',
      title: 'Samsung Galaxy S8',
      price: '399.99',
      img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
      amount: 0,
    },
    {
      id: 'recB6qcHPxb62YJ75',
      title: 'google pixel',
      price: '499.99',
      img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
      amount: 0,
    },
    {
      id: 'recdRxBsE14Rr2VuJ',
      title: 'Xiaomi Redmi Note 2',
      price: '699.99',
      img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
      amount: 0,
    },
    {
      id: 'recwTo160XST3PIoW',
      title: 'Samsung Galaxy S7',
      price: '599.99 ',
      img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
      amount: 0,
    },
  ];

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
  }

  removeSingleItem(id: string) {
    const itemSingolo = this.cart.find((item) => item.id === id);
    itemSingolo.amount -= 1;
    this.removeItem();
    this.cartTotalX -= +itemSingolo.price;
    this.newAmountItems.emit(this.totalItemsX);
    this.newAmountMoney.emit(this.cartTotalX);
  }
  printCart() {
    this.cart.map((item) => console.log(item));
  }
}
