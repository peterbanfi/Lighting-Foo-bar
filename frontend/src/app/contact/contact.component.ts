import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FlashMessagesService } from 'angular2-flash-messages';

declare const google: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  options = new RequestOptions({ withCredentials: true });
  currentUser = null;

  title = 'Kapcsolat';
  lat = 47.461889;
  lng = 19.053167;

  msg: any = {
    from: '',
    to: 'szeszpress@gmail.com',
    subject: '',
    html: '',
  };

  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http,
              public router: Router,
            private flashMessagesService: FlashMessagesService) { }

  sendMsg() {
    const flashMessagesService = this.flashMessagesService;
    this.http.post('http://localhost:8080/sendemail', this.msg).subscribe(data => {
      console.log(data);
    })
    .then( () => { flashMessagesService.show('Email elküldve.', { cssClass: 'alert-success' });
  })
    .catch( (error) => {console.error('Hiba a dokumentum írása közben: ', error);
  });
}

  ngOnInit() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        console.log(data['_body']);
        if (data.ok) {
          this.currentUser = JSON.parse(data['_body']);
          this.currentUser = this.currentUser.user.email;
          console.log(this.currentUser);
          this.msg.from = this.currentUser;
        }
      });
  }

}
