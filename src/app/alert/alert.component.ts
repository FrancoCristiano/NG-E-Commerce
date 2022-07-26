import { Component, OnInit } from '@angular/core';
import { Alert } from '../shared/alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  isOn: boolean | undefined;
  alert: Alert | undefined;
  constructor(private alertServ: AlertService) {
    this.alert = this.alertServ.getAlert();
    this.isOn = this.alertServ.isOn;
    this.alertServ.alertEmitter.subscribe(() => {
      this.isOn = this.alertServ.isOn;
    });
  }

  ngOnInit(): void {}
}
