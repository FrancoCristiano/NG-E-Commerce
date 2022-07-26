import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private alertServ: AlertService) {}

  ngOnInit(): void {
    this.alertServ.setShowAlertStatic('ERROR ERROR ERROR', 'purple');
  }
}
