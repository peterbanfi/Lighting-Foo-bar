import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  user: any = {
    username: 'username',
    password: 'password',
    rights: true,
  };

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http) {

  }
  ngOnInit() {
  }

  profile() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }

  logout() {
    this.http.get(this.baseUrl + 'logout', this.options)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }
}
