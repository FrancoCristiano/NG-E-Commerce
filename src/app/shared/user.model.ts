import { Item } from './item.model';

export class User {
  username: string = '';
  email: string = '';
  password: string = '';
  status: string = '';
  domandaSegreta: string = '';
  rispostaSegreta: string = '';
  isLogged: boolean = false;
  shoppingCart?: Item[] = [];
  id?: string = '';

  constructor(
    username: string,
    email: string,
    password: string,
    status: string,
    domandaSegreta: string,
    rispostaSegreta: string,
    shoppingCart?: []
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.status = status;
    this.domandaSegreta = domandaSegreta;
    this.rispostaSegreta = rispostaSegreta;
    this.shoppingCart = shoppingCart;
  }

  login() {
    this.isLogged = true;
  }

  logout() {
    this.isLogged = false;
  }

  addShoppingCart(item: Item) {
    this.shoppingCart?.push(item);
  }

  removeShoppingCart(item: Item) {}
}
