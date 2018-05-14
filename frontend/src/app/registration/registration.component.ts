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
    rights: true
  };
  passwordConf: '';

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

  validation() {
    if (this.user.username === '' || this.user.email === '' || this.user.password === '' || this.passwordConf === '') {
      return alert('Please Fill the form!');
    }
    if (this.user.password !== this.passwordConf) {
      return alert('Confirm your password!');
    } else {
      this.register();
    }

  }

  selectChangeHandler(event: any) {
    this.user.rights = event.target.value;
  }

}
