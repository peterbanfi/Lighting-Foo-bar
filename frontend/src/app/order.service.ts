import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class OrderService {
  constructor(public http: HttpClient) { }

  getAll() {
    /*this.http.get(`http://localhost:8080/orders/`).forEach(data =>
      this.Orders = JSON.parse(data['_body']));
    this.http.get(`http://localhost:8080/products/`).subscribe(
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
