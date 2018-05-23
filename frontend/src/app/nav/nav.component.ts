import { Component, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CookieService } from 'angular2-cookie/core';
import { HostListener } from '@angular/core';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {
  user: any = {
    username: '',
    password: '',
  };
  tempAdmin: any = {
    username: 'admin@admin.com',
    password: 'admin',
  };
  dropdown: Boolean = true;
  dropdownK: Boolean = true;
  isAdmin: Boolean = false;
  options: any = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  loggedIn: Boolean = false;
  userName: any;
  wrong: Boolean = false;
  scrollPos: number;
  public categories: Array<String> = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    private LServ: LoginService,
    private cookieService: CookieService,
    private httpServ: HttpRequestService
  ) {

  }

  ngOnInit() {
    this.categoryLister();
  }

  @HostListener('change') ngOnChanges() {
    this.categoryLister();
  }

  dropdownToggle() {
    this.dropdown ? this.dropdown = false : this.dropdown = true;
  }

  dropdownToggleK() {
    this.dropdownK ? this.dropdownK = false : this.dropdownK = true;
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.tempAdmin, this.options)
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

  categoryLister() {
    let body;
    this.categories = [];
    this.httpServ.getAll('http://localhost:8080/categories')
      .then((res) => {
        body = res;
      })
      .then(() => {
        body.map(x => {
          this.categories.push(x.categoryName);
        });
      })
      .then(() => this.categories.unshift('Összes'));
  }

  //transparent navbar
  @HostListener('window:scroll') onScroll() {
    const navbar = document.querySelector('#navbar') as HTMLElement;
    this.scrollPos = document.documentElement.scrollTop;
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.6)';
    } else {
      navbar.style.backgroundColor = '#343A40';
    }
  };

  //listening scroll pos
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (this.scrollPos > 60) {
      if (event.clientY <= 60) {
        navbar.style.backgroundColor = '#343A40';
      } else {
        navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.6)';
      }
    }
  }

}
