import { Component, OnInit } from '@angular/core';
import { ProdServService } from '../prod-serv.service';
import { User } from '../shared/user.model';
import { ShoppingServiceDBService } from '../shopping-service-db.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  amountItems: number = 0;
  userIsLogged: boolean = false;
  singleUser: any | undefined;
  finalUser: any;
  editUser: any;
  amount2: any;

  constructor(
    private prodService: ProdServService,
    private userService: UsersService,
    private shopService: ShoppingServiceDBService
  ) {
    if (localStorage.getItem('userLogged')) {
      this.singleUser = localStorage.getItem('userLogged');
      this.finalUser = JSON.parse(this.singleUser);
      console.log(this.finalUser);
      this.userIsLogged = true;
      // this.amount2 = localStorage.getItem('totalItemsX');
      // this.amountItems = this.amount2;
    }

    if (localStorage.getItem('totalItemsX')) {
      this.amount2 = localStorage.getItem('totalItemsX');
      this.amountItems = this.amount2;
    }
    this.shopService.newAmountItems.subscribe(() => {
      this.amountItems = this.shopService.totalItemsX;
    });
  }

  ngOnInit(): void {
    //LOGICA COUNTER CARRELLO
    // this.shopService.newAmountItems.subscribe(() => {
    //   this.amountItems = this.shopService.totalItemsX;
    // });
    //SUBSCRIBE PER AGGIORNARE IL DATO IN NAVBAR

    this.userService.newUserLogged.subscribe(() => {
      this.userService.getLocalStorage('userLogged');
      this.finalUser = JSON.parse(this.userService.singleUserLogged);
      this.userIsLogged = true;
      console.log(this.singleUser);
    });
    //subscribe per aggiornare l'edit name in navbar
    // this.userService.singleUserStream.subscribe(() => {
    //   this.finalUser = this.userService.singleUser;
    // });
    // newUserLogged
  }

  logout() {
    this.userService.logout();
    this.amountItems = 0;
    this.userIsLogged = false;
  }
}
