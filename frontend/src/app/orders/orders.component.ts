import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  Orders: any;
  constructor(public http: Http, private service: OrderService) {
    this.getAll();
  }
  getAll() {
    this.http.get(`http://localhost:8080/orders/`)
      .subscribe(data => {
        this.errorHandling(data);
      }
      );
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
      this.Orders = res;
      console.log(this.Orders);
    }
  }

  ngOnInit() {
  }

}
