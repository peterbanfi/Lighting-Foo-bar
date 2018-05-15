import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http: Http, private router: Router) {

  }
  ngOnInit() {
  }


}
