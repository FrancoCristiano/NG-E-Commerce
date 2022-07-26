import { Component, OnChanges, OnInit } from '@angular/core';
import { ProdServService } from '../prod-serv.service';
import { ShoppingServiceDBService } from '../shopping-service-db.service';
import { StoreItemsService } from '../store-items.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: any;
  shoppingCart2: any;
  newSingleShoppingCart: any;

  amountItems: any;
  amount2: any;
  amountMoney: any;
  amountM2: any;

  constructor(
    private prodService: ProdServService,
    private storeService: StoreItemsService,
    private userService: UsersService,
    private shopService: ShoppingServiceDBService
  ) {
    // if (localStorage.getItem('userLogged')) {
    // this.storeService.fetchData();
    this.userService.fetchSingleUser();

    // this.shopService.stampaCarrello();
    this.newSingleShoppingCart = this.shopService.cart;
    console.log(this.shopService.cart);

    // this.userService.newShoppingCart.subscribe(() => {
    //   this.newSingleShoppingCart =
    //     this.userService.singleUserFetchShoppingCart;
    //   console.log(this.newSingleShoppingCart);
    // });

    //carrello aggiornato del singolo user dal DB
    // this.shoppingCart2 = storeServ.showCart();
    // console.log(this.shoppingCart2);

    if (localStorage.getItem('totalItemsX')) {
      this.amount2 = localStorage.getItem('totalItemsX');
      this.amountItems = JSON.parse(this.amount2);
    }
    this.shopService.newAmountItems.subscribe(() => {
      this.amountItems = this.shopService.totalItemsX;
    });

    if (localStorage.getItem('totalMoneyX')) {
      this.amountM2 = localStorage.getItem('totalMoneyX');
      this.amountMoney = JSON.parse(this.amountM2);
    }
    this.shopService.newAmountMoney.subscribe(() => {
      this.amountMoney = this.shopService.cartTotalX;
    });
    // this.newSingleShoppingCart = shopService.cart;
    // this.amountItems = this.shopService.totalItemsX;
    // this.amountMoney = this.shopService.cartTotalX.toFixed(2);
  }
  // }
  ngOnInit(): void {
    this.shopService.newCart.subscribe(() => {
      this.newSingleShoppingCart = this.shopService.cart;
      console.log(this.newSingleShoppingCart);
    });

    this.shopService.newAmountMoney.subscribe(() => {
      this.amountMoney = this.shopService.cartTotalX.toFixed(2);
    });
  }

  stampa() {
    this.shopService.stampaCarrello();
  }
  addSingleItemCount(id: string) {
    this.shopService.addSingleItem(id);
  }

  removeSingleItemCount(id: string) {
    this.shopService.removeSingleItem(id);
  }
}
