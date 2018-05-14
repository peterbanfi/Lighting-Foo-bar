import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  datas: any;
  baseUrl = 'http://localhost:8080/user/listAll';

  constructor(public http: Http) {
    this.listAll();
  }

  ngOnInit() {
  }

  listAll() {
    this.http.get(this.baseUrl)
      .subscribe(data => {
        this.datas = JSON.parse(data['_body']);
        console.log(this.datas);
      }
      );
  }

}
