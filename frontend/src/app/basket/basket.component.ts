import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { registerLocaleData } from '@angular/common';
import { localeHu } from '@angular/common/locales/hu';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

 basket: any;
 totalPrice: Number = 0;

  constructor(public http: OrderService) {
    this.getBasketFromStorage();
    // this.getTotalPrice();
   }

  ngOnInit() {
  }

// mevizsgálom, h. van-e a sessionStorage-ban basket key, ha van, lekérem belőle az adatokat
  getBasketFromStorage() {
    this.basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    console.log(sessionStorage.basket, 'basket');
    return this.basket;
  }

  // a kosárba helyezett termékek összegét hozzáadom a totalCost változóhoz
  // getTotalPrice() {
  //   this.getBasketFromStorage();
  //   this.basket.map(item =>
  //     this.totalPrice += parseInt(item.totalCost))
  //   console.log(this.totalPrice, 'végösszeg');
  // }

}
