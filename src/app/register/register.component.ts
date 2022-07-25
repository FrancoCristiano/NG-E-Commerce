import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  domande: string[] = [
    'primo animale domestico?',
    'cognome di tua madre?',
    'colore preferito?',
  ];
  favoriteQuestion: string = '';
  nomeX: string = '';
  mailX: string = '';
  passwordX: string = '';
  statusX: string = '';
  domandaSegretaX: string = '';
  rispostaSegretaX: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      status: new FormControl('user'),
      domandaSegreta: new FormControl(null, Validators.required),
      rispostaSegreta: new FormControl(null, Validators.required),
    });
  }

  onRegister() {
    this.nomeX = this.registerForm.get('username')?.value;
    this.mailX = this.registerForm.get('email')?.value;
    this.passwordX = this.registerForm.get('password')?.value;
    this.statusX = this.registerForm.get('status')?.value;
    this.domandaSegretaX = this.registerForm.get('domandaSegreta')?.value;
    this.rispostaSegretaX = this.registerForm.get('rispostaSegreta')?.value;

    let newUser: User = new User(
      this.nomeX,
      this.mailX,
      this.passwordX,
      this.statusX,
      this.domandaSegretaX,
      this.rispostaSegretaX
    );

    this.usersService.postSingleUser(newUser);

    this.registerForm.reset();
  }
}
