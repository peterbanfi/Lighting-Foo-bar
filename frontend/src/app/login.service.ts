import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class LoginService {

  baseUrl = 'http://localhost:8080/user/';
  options: any = new RequestOptions({ withCredentials: true });
  rights: any = [];
  user: any;

  constructor(public http: HttpClient, public router: Router, private cookieService: CookieService) { }

  isLoggedIn(): boolean {
    if (this.cookieService.get('xyz') === 'true') {
      return true;
    }
    if (this.cookieService.get('xyz') === 'false') {
      return false;
    } else {
      return false;
    }
  }
  isLoggedInUser(): boolean {
    if (this.cookieService.get('xyz')) {
      return true;
    } else {
      return false;
    }
  }

  getOne() {
    const id = this.cookieService.get('abc');
    this.http.get(`${this.baseUrl}getOne/${id}`, this.options)
      .subscribe(data => {
        this.user = data;
      },
    );
    return this.user;
  }

  logout(url, options) {
    const logout = 'Sikeres kilépés';
    this.http.get(url, options)
      .subscribe(data => {
        console.log(data['success']);
        if (data['success'] === logout) {
          this.router.navigate(['/home']);
          this.cookieService.remove('xyz');
        }
      });
  }
}
