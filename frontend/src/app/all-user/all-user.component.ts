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
  modal: any = {
    _id: '',
    userName: '',
    email: '',
    rights: Boolean,
  };
  user: any;
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

  update() {
    this.http.put(`${this.baseUrl}/update/${this.modal['_id']}`, this.modal)
      .subscribe(data => {
        this.errorHandling(data);
      });
    location.reload();
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

  selectChangeHandler(event: any) {
    this.modal.rights = event.target.value;
  }

  modalChange(id) {
    const choosen = this.datas.filter(item => item._id === id)[0];
    this.modal = Object.assign({}, choosen);
    /**
     * A select ablakot beállítom userre ha user, vagy adminra, ha admin.
      */
    if (this.modal.rights === false) {
      document.getElementById('user').selected = true;
    } else {
      document.getElementById('admin').selected = true;
    }
  }

}
