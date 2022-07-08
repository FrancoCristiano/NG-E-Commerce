import { Component, OnInit } from '@angular/core';
import { ProdServService } from '../prod-serv.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  amountItems: number = 0;
  constructor(private prodService: ProdServService) {}

  ngOnInit(): void {
    // this.amountItems = this.prodService.totalItemsX;
    this.prodService.newAmountItems.subscribe(() => {
      this.amountItems = this.prodService.totalItemsX;
    });
  }
}
