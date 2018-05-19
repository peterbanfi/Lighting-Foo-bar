import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any = {
    username: '',
    password: '',
  };
  isAdmin: Boolean = false;
  options: any = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  loggedIn: Boolean = false;
  userName: any;
  wrong: Boolean = false;

  constructor(public http: HttpClient, public router: Router, private LServ: LoginService, private cookieService: CookieService) {

  }
  ngOnInit() {
  }

  profile() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options)
      .subscribe(data => {
        if (data['login']) {
          this.admin();
        }
      });
    setTimeout(() => {
      if (!this.loggedIn) {
        this.wrong = true;
      }
    }, 500);
  }

  admin() {
    const modal = document.getElementById('exampleModalLong');
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe((data2) => {
        data2 = data2['user'];
        this.userName = data2['username'];
        if (data2['rights']) {
          this.cookieService.put('xyz', 'true');
          this.isAdmin = true;
          this.loggedIn = true;
          this.wrong = false;
        }
        if (!data2['rights']) {
          this.cookieService.put('xyz', 'false');
          this.isAdmin = false;
          this.loggedIn = true;
          this.wrong = false;
        }
      });
  }

  logout() {
    this.LServ.logout(this.baseUrl + 'logout', this.options);
    this.loggedIn = false;
    this.isAdmin = false;
  }
}
