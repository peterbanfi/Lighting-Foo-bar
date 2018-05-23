import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: any;
  basketAll: any;
  price: Number = 0;
  product: any = {};
  totalPrice: any = 0;
  constructor(private cookieService: CookieService, public http: OrderService, public router: Router) {
    this.getBasket();
  }

  ngOnInit() {
  }
  getBasket() {
    this.basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    this.sortBasket(this.basket);
    return this.basket;
  }

  sortBasket(data) {
    let num = 0;
    for (let h = 0; h < data.length; h++) {
      this.totalPrice = this.totalPrice + (data[h][0]['productPrice'] * data[h][0]['quantity']);

    }
    for (num; num < data.length;) {
      for (let i = 0; i < data.length; i++) {
        if (num === i) {
        } else {
          if (num !== i && data[num] !== undefined) {
            if (data[num][0]['_id'] === data[i][0]['_id']) {
              data[i][0]['quantity'] = data[i][0]['quantity'] + data[num][0]['quantity'];
              data.splice(num, 1);
              this.basketAll = data;
            }
          }
        }
      }
      num++;
    }
  }

  addMore(num1) {
    this.totalPrice = this.totalPrice + num1;
  }

  countQuantity() {
    let price = 0;
    for (let i = 0; i < this.basket.length; i++) {
      price = price + (this.basket[i][0]['quantity'] * this.basket[i][0]['productPrice']);

    }
    this.totalPrice = price;
    console.log(price);
  }

  // Place a new order with the data of newOrder
  order() {
    const products = [];

    for (let i = 0; i < this.basket.length; i++) {
      products.push({
        product: this.basket[i][0]['_id'],
        quantity: this.basket[i][0]['quantity'],
      });
    }
    const userId = this.cookieService.get('abc');
    const newOrder = { user: userId, products: products };
    console.log(newOrder);
    this.http.post('http://localhost:8080/orders/', newOrder).then((data) => {
      sessionStorage.removeItem('basket');
      alert('Köszönjük a rendelését');
      this.router.navigate(['/home']);
    });
  }

}
