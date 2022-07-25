import { Component, OnInit } from '@angular/core';
import { Alert } from '../shared/alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alert: Alert | undefined;
  constructor(private alertServ: AlertService) {
    this.alert = this.alertServ.getAlert();
  }

  ngOnInit(): void {}
}
