import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

declare const google: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = 'Kapcsolat';
  lat = 47.461889;
  lng = 19.053167;
  msg: any = {
    email: '',
    message: '',
  };

  baseUrl = 'http://localhost:8080/contact/';

  constructor(public http: Http,
              public router: Router) { }

  sendMsg() {
    this.http.post(this.baseUrl + 'sendMessage', this.msg)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }

  ngOnInit() {
  }

}
