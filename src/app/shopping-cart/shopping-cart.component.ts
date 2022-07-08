import { Component, OnChanges, OnInit } from '@angular/core';
import { ProdServService } from '../prod-serv.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: any;
  amountItems: any;
  amountMoney: any;

  constructor(private prodService: ProdServService) {
    this.shoppingCart = prodService.cart;
    this.amountItems = this.prodService.totalItemsX;
    this.amountMoney = this.prodService.cartTotalX;
  }

  ngOnInit(): void {
    this.prodService.newAmountItems.subscribe(() => {
      this.amountItems = this.prodService.totalItemsX;
    });

    this.prodService.newAmountMoney.subscribe(() => {
      this.amountMoney = this.prodService.cartTotalX.toFixed(2);
    });
  }

  addSingleItemCount(id: string) {
    this.prodService.addSingleItem(id);
  }

  removeSingleItemCount(id: string) {
    this.prodService.removeSingleItem(id);
  }
}
