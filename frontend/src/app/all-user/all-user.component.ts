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
  /**
   * Listing all users on admin page
   */
  listAll() {
    this.http.get(`${this.baseUrl}listAll`)
      .subscribe(data => {
        this.errorHandling(data);
      }
      );
  }
  /**
   * @param id ID needed to remove specified user
   * @param name Name needed for the confirmation window. More personal.
   */
  removeUser(id, name) {
    if (confirm(`Are you sure to delete ${name}?`)) {
      this.http.delete(`${this.baseUrl}remove/${id}`)
        .subscribe(data => {
          this.errorHandling(data);
        });
      location.reload();
    }
  }
  /**
   * Update specified user.
   */
  update() {
    this.http.put(`${this.baseUrl}/update/${this.modal['_id']}`, this.modal)
      .subscribe(data => {
        this.errorHandling(data);
      });
    location.reload();
  }
  /**
   * Basic error handling
   * @param res the function needs data, this is the res param.
   */
  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
      console.log(this.datas);
    }
  }
  /**
   * A helper function to set the user's rights.
   * @param event the event param is the selected option's value of select
   */
  selectChangeHandler(event: any) {
    this.modal.rights = event.target.value;
  }
  /**
   * Helper function, which is serve to fill the modal's input values.
   * @param id Specified user's ID.
   */
  modalChange(id) {
    const choosen = this.datas.filter(item => item._id === id)[0];
    this.modal = Object.assign({}, choosen);
  }
}