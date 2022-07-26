import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-work-with-us',
  templateUrl: './work-with-us.component.html',
  styleUrls: ['./work-with-us.component.css'],
})
export class WorkWithUsComponent implements OnInit {
  reviewerForm: FormGroup = new FormGroup({});
  singleUser2: any | undefined;
  finalUser: any;
  nomeX: string | undefined;
  mailX: string | undefined;
  reasonX: string | undefined;
  disableForm: boolean = true;

  constructor(private alertServ: AlertService) {
    if (localStorage.getItem('userLogged')) {
      this.singleUser2 = localStorage.getItem('userLogged');
      this.finalUser = JSON.parse(this.singleUser2);
      this.disableForm = true;
    }
  }

  ngOnInit(): void {
    if (this.finalUser) {
      this.reviewerForm = new FormGroup({
        username: new FormControl(
          { value: this.finalUser.username, disabled: true },
          Validators.required
        ),
        email: new FormControl(
          { value: this.finalUser.email, disabled: true },
          [Validators.required, Validators.email]
        ),
        reason: new FormControl(null, Validators.required),
      });
    }
    if (localStorage.getItem('requestedRev')) {
      this.reviewerForm.disable();
      console.log('asasaas');
    }
  }

  sendRequest() {
    console.log(
      this.reviewerForm.get('username')?.value,
      this.reviewerForm.get('email')?.value,
      this.reviewerForm.get('reason')?.value
    );
    this.reviewerForm.reset();
    this.alertServ.setShowAlert(
      'Grazie per averci contattato, ti faremo sapere a breve!',
      'green'
    );
    this.reviewerForm.disable();
    localStorage.setItem('requestedRev', 'yes');
  }
}
