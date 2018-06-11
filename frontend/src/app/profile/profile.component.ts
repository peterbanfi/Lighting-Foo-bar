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
  openCloseUpdate: Boolean = false;
  details: Boolean = false;
  pass: Boolean = false;
  userDetails: any = {
    username: '',
    email: '',
    address_city: '',
    address_address: '',
    address_address2: '',
    address_zip: '',
    invoiceA_city: '',
    invoiceA_address: '',
    invoiceA_address2: '',
    invoiceA_zip: '',
    phone: '',
  };
  userPass: any = {
    update: true,
    oldPassword: '',
    newPassword: '',
  };
  passwordConf: '';
  updated: Boolean = false;
  updatedPass: Boolean = false;

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
        this.userDetails = data['user'];
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
    this.openCloseUpdate = false;
  }
  updatePage() {
    this.openCloseUpdate = !this.openCloseUpdate;
    this.openClose = false;
  }

  updateDetails() {
    this.details = !this.details;
    this.pass = false;
  }
  updatePassword() {
    this.pass = !this.pass;
    this.details = false;
  }

  changePassword() {
    if (this.userPass['oldPassword'].length === 0 && this.userPass['newPassword'].length === 0) {
      alert('You must fill all fields!');
      return;
    }
    if (this.userPass['newPassword'].length < 8) {
      alert('New password must be more than 8 characters!');
    } else {
      this.http.put(`${this.baseUrl}user/update/${this.userId}`, this.userPass, this.options)
        .subscribe(data => {
          this.updatedPass = true;
        });
    }
  }

  update() {
    this.http.put(`${this.baseUrl}user/update/${this.userId}`, this.userDetails, this.options)
      .subscribe(data => {
        this.updated = true;
      });
  }

}
