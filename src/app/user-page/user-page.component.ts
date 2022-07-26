import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  userIsLogged2: boolean = false;
  singleUser2: any | undefined;
  finalUser: any;
  singleUserLogged: any;
  updateForm: FormGroup = new FormGroup({});
  domande: string[] = [
    'primo animale domestico?',
    'cognome di tua madre?',
    'colore preferito?',
  ];
  nomeX: string = '';
  mailX: string = '';
  passwordX: string = '';
  statusX: string = '';
  domandaSegretaX: string = '';
  rispostaSegretaX: string = '';
  idX: string = '';

  viewValue: string = 'userInfo';

  constructor(private userService: UsersService) {
    if (localStorage.getItem('userLogged')) {
      this.singleUser2 = localStorage.getItem('userLogged');
      this.finalUser = JSON.parse(this.singleUser2);
      this.userIsLogged2 = true;
    }
  }

  ngOnInit(): void {
    this.userService.newUserLogged.subscribe(() => {
      this.userService.getLocalStorage('userLogged');
      this.finalUser = JSON.parse(this.userService.singleUserLogged);
      this.userIsLogged2 = true;
      // console.log(this.singleUser);
    });
    // this.userService.singleUserStream.subscribe(() => {
    //   this.finalUser = this.userService.singleUserLogged;
    //   console.log('ciao' + this.finalUser);
    // });
    // console.log(this.finalUser.id);
    if (this.finalUser) {
      this.updateForm = new FormGroup({
        username: new FormControl(this.finalUser.username, Validators.required),
        email: new FormControl(this.finalUser.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(this.finalUser.password, Validators.required),
        status: new FormControl(this.finalUser.status),
        domandaSegreta: new FormControl(
          this.finalUser.domandaSegreta,
          Validators.required
        ),
        rispostaSegreta: new FormControl(
          this.finalUser.rispostaSegreta,
          Validators.required
        ),
      });
      // this.userService.newUserLogged.subscribe(() => {
      //   this.userService.getLocalStorage('userLogged');
      //   this.singleUser2 = localStorage?.getItem('userLogged');
      //   this.userIsLogged2 = true;
      // });
    }
  }

  onUpdate(id: string, user: User) {
    this.userService.fetchUpdateSingleData(id, user);
  }

  onRegister(id: string) {
    this.nomeX = this.updateForm.get('username')?.value;
    this.mailX = this.updateForm.get('email')?.value;
    this.passwordX = this.updateForm.get('password')?.value;
    this.statusX = this.updateForm.get('status')?.value;
    this.domandaSegretaX = this.updateForm.get('domandaSegreta')?.value;
    this.rispostaSegretaX = this.updateForm.get('rispostaSegreta')?.value;

    let newUser: User = new User(
      this.nomeX,
      this.mailX,
      this.passwordX,
      this.statusX,
      this.domandaSegretaX,
      this.rispostaSegretaX,
      this.finalUser.shoppingCart
    );

    this.onUpdate(id, newUser);
  }

  changeView(string: string) {
    this.viewValue = string;
  }
}
