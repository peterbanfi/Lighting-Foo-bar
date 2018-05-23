import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
  passCheck: true;
  options: any = new RequestOptions({ withCredentials: true });
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
  }

  register() {
    this.http.post(this.baseUrl, this.user, this.options)
      .subscribe(data => {
        console.log(data);
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
      alert('Thank you! You can login now!');
      this.router.navigate(['/home']);
    }

  }

  selectChangeHandler(event: any) {
    this.user.rights = event.target.value;
  }

}
