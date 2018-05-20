import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  options: any = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/';
  userId: any = '';
  datas: any;
  pastOrder: any = [];
  pastOrderPrices: any = [];
  openClose: Boolean = false;

  constructor(public http: HttpClient, public router: Router, private LServ: LoginService, private cookieService: CookieService) {
    this.profile();
    this.getAll();
  }

  ngOnInit() {
  }

  profile() {
    this.http.get(`${this.baseUrl}user/profile`, this.options)
      .subscribe(data => {
        this.userId = data['user']._id;
      });
  }

  getAll() {
    this.http.get(`${this.baseUrl}orders/`).subscribe(
      (data) => {
        this.datas = data;
        this.findPastOrders(this.datas)
      }
    );
  }

  findPastOrders(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]['user']._id === this.userId) {
        this.pastOrder.push(data[i]);
      }
    }
    this.sumPastOrders(this.pastOrder);
  }

  sumPastOrders(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i]['products'].length; j++) {
        total = total + (data[i]['products'][j].product.productPrice * data[i]['products'][j].quantity);
      }
      this.pastOrderPrices.push(total);
      total = 0;
    }
  }
  orders() {
    this.openClose = !this.openClose;
  }

}
