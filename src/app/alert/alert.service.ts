import { EventEmitter, Injectable } from '@angular/core';
import { Alert } from '../shared/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  isOn: boolean = false;
  alertEmitter = new EventEmitter<boolean>();
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
    this.isOn = true;
    this.alertEmitter.emit(this.isOn);
    this.alert.alertMessage = message;
    this.alert.alertColor = color;
    this.alert.alertShow = true;
    this.setHideAlert();
  }

  setShowAlertStatic(message: string, color: string) {
    this.isOn = true;
    this.alertEmitter.emit(this.isOn);

    console.log(this.isOn);

    this.alert.alertMessage = message;
    this.alert.alertColor = color;
    this.alert.alertShow = true;
    this.setHideAlert(2000);
  }

  setHideAlert(time: number = 2000) {
    window.scrollTo(0, 0);
    setTimeout(
      () => (
        (this.alert.alertShow = false),
        (this.isOn = false),
        this.alertEmitter.emit(this.isOn)
      ),
      time
    );
  }
}
