import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    rights: true
  };

  baseUrl = 'http://localhost:8080/user/register';
  constructor(public http: Http) { }

  ngOnInit() {
  }

  register() {
    console.log(this.user);
    this.http.post(this.baseUrl, this.user)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }

  selectChangeHandler(event: any) {
    this.user.rights = event.target.value;
  }

}
