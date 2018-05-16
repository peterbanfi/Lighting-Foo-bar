import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
  Orders: any;
  Products: any;
  Users: any;
  constructor(public http: Http) {
    this.getAll();
  }

  getAll() {
    this.http.get(`http://localhost:8080/orders/`).forEach(data =>
      this.Orders = JSON.parse(data['_body']));
    /*this.http.get(`http://localhost:8080/products/`).subscribe(
      data => this.Products = JSON.parse(data['_body']));
    this.http.get(`http://localhost:8080/user/listAll`).subscribe(
      data => this.Users = JSON.parse(data['_body']));*/
  }

  createNew(data) {
    this.http.post(`http://localhost:8080/orders/`, data);
  }

  update(id, data) {
    this.http.put(`http://localhost:8080/orders/${id}`, data);
  }

  delete(id) {
    this.http.delete(`http://localhost:8080/orders/${id}`);
  }

}
