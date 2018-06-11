import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'angular2-cookie/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id: any = '';
  baseUrl = 'http://localhost:8080/user/';
  options: any = new RequestOptions({ withCredentials: true });
  constructor(public http: HttpClient, private cookieService: CookieService, private LServ: LoginService) { }
  ngOnInit() {

    this.cookieService.remove('xyz');
    this.cookieService.remove('abc');
  }


}
