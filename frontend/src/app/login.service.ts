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

  constructor(public http: HttpClient, public router: Router, private cookieService: CookieService) { }

  /*   login(url, user, options, set, log) {
      this.http.post(url, user, options)
        .subscribe(data => {
          if (data['login']) {
            this.admin(set, log);
          }
        });
    }
  
    admin(set, log) {
      this.http.get(this.baseUrl + 'profile', this.options)
        .subscribe((data2) => {
          data2 = data2['user'];
          if (data2['rights']) {
            this.cookieService.put('xyz', 'true');
            set = true;
            log = true;
            console.log(set, log);
          }
          if (!data2['rights']) {
            this.cookieService.put('xyz', 'false');
            set = false;
            log = true;
            console.log(set, log);
          }
        });
      return this.rights = [set, log]
    } */

  /*   auth(set, log) {
      console.log('hé');
      if (this.cookieService.get('xyz') === 'true') {
        set = true;
        log = true;
        console.log(set, log);
      }
      if (this.cookieService.get('xyz') === 'false') {
        set = false;
        log = true;
        console.log(set, log);
      } else {
        log = false;
      }
    } */

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
