import { EventEmitter, Injectable } from '@angular/core';
import { ProdServService } from './prod-serv.service';

@Injectable({
  providedIn: 'root',
})
export class StoreItemsService {
  store: any[] = [
    {
      id: 'rec1JZlfCIBOPdcT2',
      title: 'Samsung Galaxy S8',
      price: '399.99',
      category: 'Laptop',
      img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
      amount: 0,
    },
    {
      id: 'recB6qcHPxb62YJ75',
      title: 'google pixel',
      price: '499.99',
      category: 'Cellulari',
      img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
      amount: 0,
    },
    {
      id: 'recdRxBsE14Rr2VuJ',
      title: 'Xiaomi Redmi Note 2',
      price: '699.99',
      category: 'Cellulari',

      img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
      amount: 0,
    },
    {
      id: 'recwTo160XST3PIoW',
      title: 'Samsung Galaxy S7',
      price: '599.99 ',
      category: 'Cellulari',

      img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
      amount: 0,
    },
    {
      id: 'rec1JZlfCIBgsdgdsOPdcT2',
      title: 'Samsung Galaxy S8',
      price: '399.99',
      category: 'Monitor',
      img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
      amount: 0,
    },
    {
      id: 'rec1JZlfCIBOsdaPdcT2',
      title: 'Samsung Galaxy S8',
      price: '399.99',
      category: 'Laptop',
      img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
      amount: 0,
    },
  ];
  newStore = new EventEmitter<any>();
  storeFiltered: any[] = [];
  constructor(private cartService: ProdServService) {}

  pushOnCart(id: string) {
    this.store.find((item) => {
      if (item.id === id) {
        if (this.cartService.cart.includes(item)) {
          this.cartService.addSingleItem(item.id);
        } else {
          this.cartService.cart.push(item);
          this.cartService.addSingleItem(item.id);
        }
        console.log('service log ');
      }
    });
  }

  filterForCategory(category: string) {
    if (category === 'Mostra tutto') {
      this.storeFiltered = this.store;
    }
    this.storeFiltered = this.store.filter(
      (item) => item.category === category
    );

    this.newStore.emit(this.storeFiltered);
    console.log(category);
  }

  showAll() {
    this.storeFiltered = this.store;
    this.newStore.emit(this.storeFiltered);
  }
}
