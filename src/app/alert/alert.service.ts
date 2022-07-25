import { Injectable } from '@angular/core';
import { Alert } from '../shared/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  // alertShow: boolean = false;
  // alertMessage: string ="";
  // alertColor: string ="";
  private alert: Alert = {
    alertMessage: 'Utente Non esistente!',
    alertColor: 'red',
    alertShow: false,
  };

  constructor() {}

  getAlert() {
    return this.alert;
  }

  setShowAlert(message: string, color: string) {
    this.alert.alertMessage = message;
    this.alert.alertColor = color;
    this.alert.alertShow = true;
    this.setHideAlert();
  }

  setHideAlert(time: number = 2000) {
    window.scrollTo(0, 0);
    setTimeout(() => (this.alert.alertShow = false), time);
  }
}
