import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert/alert.service';
import { Item } from './shared/item.model';
import { User } from './shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  urlUsers = 'https://62d00b811cc14f8c08832d2a.mockapi.io/E-mercato/Users';
  usersList: User[] | undefined;
  newUsersList = new EventEmitter<User[]>();

  userLoggedMatch: User | undefined;
  singleUser: User | undefined;
  singleUserForFetch: User | undefined;
  usernameAlreadyExist: boolean = false;

  singleUserFetch: User | undefined;
  singleUserFetchShoppingCart: any;
  trovato: boolean = false;
  isUserMatched: boolean = false;
  singleUserLogged: any | undefined;
  newUserLogged = new EventEmitter<any>();
  newIsLogged = new EventEmitter<boolean>();
  singleUserStream = new EventEmitter<User>();
  newShoppingCart = new EventEmitter<any[]>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private alert: AlertService
  ) {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get(this.urlUsers, { observe: 'response' })
      .subscribe((response) => {
        const data: any = response.body;
        this.usersList = data;
        this.newUsersList.emit(data);
      });
  }

  fetchSingleUser() {
    this.getLocalStorage('userLogged');
    this.singleUserForFetch = JSON.parse(this.singleUserLogged);
    // console.log(this.singleUserForFetch?.id);

    this.http
      .get(`${this.urlUsers}/${this.singleUserForFetch?.id}`, {
        observe: 'response',
      })
      .subscribe((response) => {
        const data: any = response.body;
        this.singleUserFetch = data;
        this.singleUserFetchShoppingCart = this.singleUserFetch?.shoppingCart;
        this.singleUserStream.emit(this.singleUserFetch);
        this.newShoppingCart.emit(this.singleUserFetchShoppingCart);
        // console.log(this.singleUserFetch?.shoppingCart);
      });
  }

  getUsersList() {
    return this.usersList;
  }

  resolveAfter1Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }
  //REGISTRAZIONE USER:>
  postSingleUser(user: User) {
    const postUtente: User = user;

    this.findUsername(user.username);
    if (!this.usernameAlreadyExist) {
      this.http
        .post(
          this.urlUsers, //url della post
          postUtente //oggetto della post
        )
        .subscribe();
      this.alert.setShowAlert('registrazione avvenuta con successo', 'green');
    }
  }

  //check if username already exist

  findUsername(username: string) {
    this.usersList?.find((item) => {
      if (item.username === username) {
        this.alert.setShowAlert(
          'Questo Username è gia in uso, ritenta! ',
          'purple'
        );
        this.usernameAlreadyExist = true;
      }
    });
    console.log(this.usernameAlreadyExist);
    console.log(this.usersList);
  }

  //SETTING LOCALSTORAGE

  setLocalStorage(nameData: string, data: any) {
    localStorage.setItem(nameData, JSON.stringify(data));
  }

  getLocalStorage(nameData: string) {
    this.singleUserLogged = localStorage.getItem(nameData);
    if (this.singleUserLogged) {
      return localStorage.getItem(nameData);
    } else {
      return null;
    }
  }

  deleteLocalStorage(nameData: string) {
    localStorage.removeItem(nameData);
  }

  //LOGIN LOGICS
  findUser(username: string, password: string) {
    this.usersList?.find((item) => {
      if (item.username === username && item.password === password) {
        this.userLoggedMatch = item;

        this.userLoggedMatch.isLogged = true;
        this.isUserMatched = true;
      }
    });
    console.log(this.userLoggedMatch);
    return this.userLoggedMatch;
  }

  matchedUser() {
    if (this.isUserMatched) {
      this.setLocalStorage('userLogged', this.userLoggedMatch);
      this.fetchSingleUser();

      //   this.setLocalStorage('totalItemsX');
      // this.setLocalStorage('totalMoneyX');
      this.newUserLogged.emit(this.userLoggedMatch);
      this.router.navigate(['']);
      // this.trovato = true;
      // this.newIsLogged.emit(this.trovato);
    }
  }

  setAlertLogin() {
    if (localStorage.getItem('userLogged')) {
      let welcomeUser = JSON.parse(this.singleUserLogged);
      this.alert.setShowAlert('WELCOME BACK ' + welcomeUser.username, 'green');
      this.trovato = true;
      this.newIsLogged.emit(this.trovato);
    } else {
      this.alert.setShowAlert('ERRORE UTENTE NON TROVATO', 'red');
    }
  }

  login(xx: string, yy: string) {
    //FIND //SETTARE SINGOLO USER
    this.findUser(xx, yy);
    //SETTARE LOCALSTORAGE e redirect
    this.matchedUser();
    //SETTARE ALERT
    this.setAlertLogin();
  }

  logout() {
    // ELIMINARE I DATI DAL LOCAL STORAGE .
    this.isUserMatched = false;
    if (this.userLoggedMatch) {
      this.userLoggedMatch.isLogged = false;
    }

    this.deleteLocalStorage('userLogged');
    this.deleteLocalStorage('totalItemsX');
    this.deleteLocalStorage('totalMoneyX');
    this.deleteLocalStorage('singleproduct');
    this.deleteLocalStorage('cart');
    this.deleteLocalStorage('amountMoney');
    this.deleteLocalStorage('amountItems');

    this.trovato = false;
    this.newIsLogged.emit(this.trovato);
    console.log(this.trovato);
  }

  getUserLogged() {
    return this.userLoggedMatch;
  }

  // EDIT USER LOGIC
  fetchUpdateSingleData(id: string, user: User) {
    this.http.put(`${this.urlUsers}/${id}`, user).subscribe((response: any) => {
      this.singleUser = response;
      this.setLocalStorage('userLogged', this.singleUser);
      this.newUserLogged.emit(response);
      this.router.navigate(['']);
    });
  }

  fetchUpdateSingleData2(id: string, user: User) {
    this.http.put(`${this.urlUsers}/${id}`, user).subscribe((response: any) => {
      this.singleUser = response;
      this.singleUserStream.emit(response);
      this.setLocalStorage('userLogged', this.singleUser);
      this.router.navigate(['products']);
    });
  }

  fetchUpdateSingleData3(id: string, user: User) {
    this.http.put(`${this.urlUsers}/${id}`, user).subscribe((response: any) => {
      this.singleUser = response;
      this.singleUserStream.emit(response);
      this.setLocalStorage('userLogged', this.singleUser);
      this.router.navigate(['ShoppingCart']);
    });
  }
}

// this.usersList?.find((item) => {
//   if (item.username === username && item.password === password) {
//     this.setLocalStorage('userLogged', item);
//     this.singleUserLogged = localStorage.getItem('userLogged');
//     this.newUserLogged.emit(localStorage.getItem('userLogged'));
//
//     this.trovato = true;
//     this.newIsLogged.emit(this.trovato);
//   } else {
//   }
// });
