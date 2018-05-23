import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  lat = 47.461889;
  lng = 19.053167;
  msg: any = {
    from: '',
    text: '',
    to: 'szeszpress@gmail.com',
    subject: '',
    email: ''
  };

  constructor(public http: HttpClient) { }

  ngOnInit() { }

  sendMsg() {
    this.http.post('http://localhost:8080/send', this.msg)
      .subscribe(data => {
        console.log(data);
      });
  }

}
