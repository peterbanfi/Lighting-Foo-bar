import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  datas: any;
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http) {
    this.listAll();
  }

  ngOnInit() {
  }

  listAll() {
    this.http.get(`${this.baseUrl}listAll`)
      .subscribe(data => {
        this.errorHandling(data);
      }
      );
  }

  removeUser(id, name) {
    if (confirm(`Are you sure to delete ${name}?`)) {
      this.http.delete(`${this.baseUrl}remove/${id}`)
        .subscribe(data => {
          this.errorHandling(data);
        });
      location.reload();
    }
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
      console.log(this.datas);
    }
  }

}
