import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../shared/item.model';
import { User } from '../shared/user.model';
import { ShoppingServiceDBService } from '../shopping-service-db.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  alreadyLogged: boolean = false;
  usersListFull: User[] | undefined;
  singleUser: User | undefined;
  cartTotalX: number | undefined;
  totalItemsX: number | undefined;
  cart: Item[] | undefined;

  constructor(
    private userService: UsersService,
    private shopService: ShoppingServiceDBService
  ) {
    this.userService.fetchData();
    this.cart = this.userService.singleUserFetchShoppingCart;
    this.userService.newShoppingCart.subscribe(() => {
      this.cart = this.userService.singleUserFetchShoppingCart;
      console.log(this.cart);
    });
    // this.alreadyLogged = this.userService.trovato;
    this.singleUser = this.userService.userLoggedMatch;

    console.log(this.alreadyLogged);
    console.log(this.userService.isUserMatched);

    this.alreadyLogged = this.userService.isUserMatched;
    this.userService.newUsersList.subscribe(() => {
      this.usersListFull = this.userService.getUsersList();

      console.log(this.usersListFull);
    });
    // this.userService.fetchSingleUser();
  }

  ngOnInit(): void {
    this.userService.newIsLogged.subscribe(() => {
      this.userService.getUserLogged();
      this.singleUser = this.userService.userLoggedMatch;
      console.log(this.singleUser);

      // if (this.userService.userLoggedMatch) {
      //   this.alreadyLogged = true;
      // }
    });
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  islogged() {
    console.log(this.alreadyLogged);
    console.log(this.userService.isUserMatched);
    console.log(this.singleUser);
    console.log(this.userService.userLoggedMatch);
  }

  async getCart() {
    if (localStorage.getItem('userLogged')) {
      // this.userService.fetchSingleUser();

      // this.cart = this.userService.singleUserFetchShoppingCart;
      this.cart = this.singleUser?.shoppingCart;
      console.log(this.cart);
      let totalX = this.cart?.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;

          total.totalItems += amount;
          total.cartTotal += amount * price;
          total.cartTotal = parseFloat(total.cartTotal.toFixed(2));
          return total;
        },
        {
          totalItems: 0,
          cartTotal: 0,
        }
      );
      this.cartTotalX = totalX?.cartTotal;
      if (this.cartTotalX) {
        this.shopService.totalItemsX = this.cartTotalX;
        // this.shopService.newAmountItems.emit(+this.shopService.totalItemsX);
      }
      this.totalItemsX = totalX?.totalItems;
      if (this.totalItemsX) {
        this.shopService.totalItemsX = this.totalItemsX;
        this.shopService.newAmountItems.emit(+this.shopService.totalItemsX);
      }
      console.log(this.cartTotalX);
      console.log(this.totalItemsX);
      console.log(this.cart);
    }
  }
  setLocalStorages() {
    if (localStorage.getItem('userLogged')) {
      console.log(3);

      this.getCart();
      console.log(4);
      console.log(this.cart);

      console.log(5);

      this.userService.setLocalStorage('totalMoneyX', this.cartTotalX);
      console.log(6);

      this.userService.setLocalStorage('totalItemsX', this.totalItemsX);

      // console.log(this.shopService.totalItemsX);
      // console.log(this.shopService.cart);
    }
  }
  async login() {
    this.userService.login(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value
    );
    console.log(1);
    console.log(this.singleUser);
    console.log(this.cart);

    // this.singleUser?.login();
    this.loginForm.reset();
    this.userService.resolveAfter1Seconds();
    console.log(2);
    this.setLocalStorages();
  }
}
