import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';

@Pipe({ name: 'total' })
export class TotalPipe implements PipeTransform {
  transform(order: any) {
    let total = 0;
    for (let i = 0; i < order.products.length; i++) {
      total += order.products[i].product.productPrice * order.products[i].quantity;
    }
    return `${total} HUF`;
  }
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  baseUrl = 'http://localhost:8080/orders/';
  Orders: any;
  Products: any;
  Users: any;
  newOrder: any = { products: [] };
  addNewProductToOrder: any = {};
  orderToUpdate: any = {};

  constructor(public http: Http, private Oservice: OrderService) {
    this.getAll();
    // this.countTotals(this.Orders);
  }
  // Get all users, products and orders
  getAll() {
    this.http.get(this.baseUrl).subscribe(
      data => this.Orders = JSON.parse(data['_body']));
    this.http.get(`http://localhost:8080/products/`).subscribe(
      data => this.Products = JSON.parse(data['_body']));
    this.http.get(`http://localhost:8080/user/listAll`).subscribe(
      data => this.Users = JSON.parse(data['_body']));
  }

  // Place a new order with the data of newOrder
  placeOrder() {
    this.http.post(`${this.baseUrl}`, this.newOrder);
    location.reload();
  }

  // Update order specified by order ID.
  updateOrder() {
    this.http.put(`${this.baseUrl}${this.orderToUpdate['_id']}`, this.orderToUpdate);
    location.reload();
  }

  // Delete order specified by order ID.
  deleteOrder(order) {
    if (confirm(`Are you sure to delete the order of${order.user.username}?`)) {
      this.http.delete(`${this.baseUrl}${order['_id']}`);
      location.reload();
    }
  }

  // Add product to the new order
  addProduct() {
    this.newOrder.products.push(this.addNewProductToOrder);
    this.addNewProductToOrder = {};
    console.log(this.newOrder);
  }

  // Delete product from the new order
  deleteProduct(i: number) {
    this.newOrder.products.splice(i, 1);
  }

  // Select order to be updated
  selectOrderToUpdate(row) {
    this.orderToUpdate = Object.assign({}, row);
  }
  /*
    countTotals(data) {
      data.map(order => {
        let count = 0;
        for (let i = 0; i < order.products.length; i++) {
          count += order.products[i].product.productPrice * order.products[i].quantity;
        }
        order.total = count;
      });
    }
  */

  muti() {
    // this.countTotals(this.Orders);
    console.log(this.Orders);
    console.log(this.Products);
    console.log(this.Users);
  }

  ngOnInit() {
  }

}
