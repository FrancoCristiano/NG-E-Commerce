import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProdServService } from './prod-serv.service';
import { Item } from './shared/item.model';
import { ShoppingServiceDBService } from './shopping-service-db.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class StoreItemsService {
  url = 'https://62d00b811cc14f8c08832d2a.mockapi.io/E-mercato/Store';

  urlUsers = 'https://62d00b811cc14f8c08832d2a.mockapi.io/E-mercato/Users';
  storeX: Item[] = [];
  newStore = new EventEmitter<Item[]>();
  storeFiltered: Item[] = [];

  singleUser2X: any;
  finalUserX: any;
  foundInTheCart: boolean | undefined;

  constructor(
    private cartService: ProdServService,
    private http: HttpClient,
    private userServ: UsersService,
    private shopService: ShoppingServiceDBService
  ) {
    if (localStorage.getItem('userLogged')) {
      this.singleUser2X = localStorage.getItem('userLogged');
      this.finalUserX = JSON.parse(this.singleUser2X);

      this.userServ.fetchSingleUser();
      this.userServ.singleUserStream.subscribe(() => {
        this.finalUserX = this.userServ.singleUserFetch;
      });
    }
  }

  fetchData() {
    this.http.get(this.url, { observe: 'response' }).subscribe((response) => {
      const data: any = response.body;
      this.storeX = data;
      this.newStore.emit(data);
    });
  }

  getStoreList() {
    return this.storeX;
  }

  //Metodo per pushare nel carrello GENERICO
  pushOnCart(id: string) {
    this.storeX.find((item) => {
      if (item.id === id) {
        if (this.cartService.cart.includes(item)) {
          this.cartService.addSingleItem(item.id);
        } else {
          this.cartService.cart.push(item);
          this.cartService.addSingleItem(item.id);
        }
      }
    });
  }

  pushOnSingleUserCart(id: string) {
    const itemFound = this.storeX?.find((item) => {
      return item.id === id;
    });

    console.log(itemFound);
    if (itemFound) {
      const itemInTheCart = this.finalUserX.shoppingCart.find((itemZ: any) => {
        return itemZ.id === itemFound.id;
      });
      console.log(itemInTheCart);

      //RIDONDANTE E NON NECESSARIO.
      if (itemInTheCart) {
        this.foundInTheCart = true;
      } else {
        this.foundInTheCart = false;
      }
      // }
      console.log(this.foundInTheCart);

      if (this.foundInTheCart === true) {
        this.shopService.addSingleItem(itemFound.id);

        console.log('NON PUSHO');
      } else {
        console.log('STO PUSHANDO');
        this.finalUserX.shoppingCart.push(itemFound);

        this.shopService.addSingleItem(itemFound.id);
      }
    }
  }
  // }

  editSingleAmountItem(id: string) {
    this.storeX?.find((item) => {
      if (item.id === id) {
        if (this.finalUserX.shoppingCart.includes(item)) {
          this.shopService.addSingleItem(item.id);

          // this.userServ.fetchUpdateSingleData2(
          //   this.finalUserX.id,
          //   this.finalUserX
          // );
        } else {
          this.finalUserX.shoppingCart.push(item);

          this.shopService.addSingleItem(item.id);
          // this.userServ.fetchUpdateSingleData2(
          //   this.finalUserX.id,
          //   this.finalUserX
          // );
        }
      }
    });
  }

  // pushOnSingleUserCart(id: string) {
  //   this.storeX.find((item) => {
  //     if (item.id === id) {
  //       // if (this.finalUserX.shoppingCart.includes(item))
  //       // {
  //       this.cartService.addSingleItem(item.id);
  //       // this.finalUserX?.shoppingCart.push(item);
  //       item.amount += 1;
  //       this.userServ.fetchUpdateSingleData2(
  //         this.finalUserX.id,
  //         this.finalUserX
  //       );
  //     } else {
  //       // this.cartService.cart.push(item);
  //       this.cartService.addSingleItem(item.id);
  //       this.finalUserX?.shoppingCart.push(item);
  //       this.userServ.fetchUpdateSingleData2(
  //         this.finalUserX.id,
  //         this.finalUserX
  //       );
  //     }
  //   });
  // }

  showCart() {
    return this.finalUserX.shoppingCart;
  }
  //metodi per filtrare gli elementi dello store!
  filterForCategory(category: string) {
    if (category === 'Mostra tutto') {
      this.storeFiltered = this.storeX;
    }

    this.storeFiltered = this.storeX.filter(
      (item) => item.category === category
    );

    this.newStore.emit(this.storeFiltered);
  }

  showAll() {
    this.storeFiltered = this.storeX;
    this.newStore.emit(this.storeFiltered);
  }

  setItemById(id: string = '1') {
    const item = this.storeX.find((item) => item.id === id);
    this.userServ.setLocalStorage('singleproduct', item);
    console.log(item);
  }

  getItemById() {
    return this.userServ.getLocalStorage('singleproduct');
  }
}
