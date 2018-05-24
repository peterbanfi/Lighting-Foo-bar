import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../order.service';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

// Setting the local 'hu' for hungarian currency format.
registerLocaleData(localeHu, 'hu');

/**
 * Total pipe
 * @param {Object} order - Order object from which the pipe takes the product datas and calculates the total value.
 * @returns {number} - Returns the total value of the selected order
 */
@Pipe({ name: 'total' })
export class TotalPipe implements PipeTransform {
  transform(order: any) {
    let total = 0;
    for (let i = 0; i < order.products.length; i++) {
      total += order.products[i].product.productPrice * order.products[i].quantity;
    }
    return `${total}`;
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
  newOrderDisplay: any = { products: [], total: 0 };
  addNewProductToOrder: any;
  addNewProductQuantity = 1;
  orderToUpdate: any = { user: { username: 'valaki' }, products: [] };
  orderToUpdateDisplay: any = { user: { username: 'valaki' }, products: [] };

  constructor(public http: OrderService, public httpClient: HttpClient) {
    this.getAll();
    // this.countTotals(this.Orders);
  }

  // Get all users, products and orders
  getAll() {
    this.http.getAll(this.baseUrl)
      .then(data => this.Orders = data);
    this.http.getAll(`http://localhost:8080/products/`)
      .then(data => this.Products = data);
    this.http.getAll(`http://localhost:8080/user/listAll`)
      .then(data => this.Users = data);
  }

  // Place a new order with the data of newOrder
  placeOrder() {
    this.http.post(this.baseUrl, this.newOrder).then(data => this.getAll());
    this.clearOrder();
  }

  // Update order specified by order ID.
  updateOrder() {
    this.http.put(`${this.baseUrl}${this.orderToUpdate._id}`, this.orderToUpdate).then(data => this.getAll());
    this.orderToUpdate = {};
  }

  // Select order to be updated
  selectOrderToUpdate(row) {
    this.orderToUpdateDisplay = Object.assign({}, row);
    this.orderToUpdate = {
      _id: row._id, user: row.user._id, products: row.products
        .map(p => p = { quantity: p.quantity, product: p.product._id })
    };
  }

  // Removing product from the selected order
  removeProductFromOrder(i: number) {
    this.orderToUpdate.products.splice(i, 1);
    this.orderToUpdateDisplay.products.splice(i, 1);
  }

  // Update selected orders products
  addProductToOrder() {
    const qty = this.addNewProductQuantity;
    const prod = this.addNewProductToOrder;
    this.orderToUpdate.products.push({
      quantity: qty,
      product: prod._id
    });
    this.orderToUpdateDisplay.products.push({
      quantity: qty,
      product: prod
    });
    this.clear();
  }

  // Delete order specified by order ID.
  deleteOrder(order) {
    if (confirm(`Are you sure to delete the order of ${order.user.username}?`)) {
      this.http.delete(`${this.baseUrl}${order['_id']}`).then(data => this.getAll());
    }
  }

  // Add product to the new order
  addProduct() {
    const prod = this.addNewProductToOrder;
    const qty = this.addNewProductQuantity;
    const price = prod.productPrice;
    if (this.newOrder.products.filter(e => e.product === prod._id).length > 0) {
      const pos = this.newOrder.products.map(e => e.product).indexOf(prod._id);
      this.newOrderDisplay.products[pos].quantity += qty;
      this.newOrder.products[pos].quantity += qty;
    } else {
      this.newOrder.products.push({
        product: prod._id,
        quantity: qty
      });
      this.newOrderDisplay.products
        .push({
          name: prod.productName,
          quantity: qty,
          product: {
            productPrice: price
          }
        });
    }
    this.newOrderDisplay.total += price * qty;
    this.clear();
  }

  // Delete product from the new order
  deleteProduct(i: number) {
    const product = this.newOrderDisplay.products[i];
    this.newOrderDisplay.total -= product.quantity * product.product.productPrice;
    this.newOrder.products.splice(i, 1);
    this.newOrderDisplay.products.splice(i, 1);
  }

  clear() {
    this.addNewProductToOrder = {};
    this.addNewProductQuantity = 1;
  }

  clearOrder() {
    this.newOrder = { products: [] };
    this.newOrderDisplay = { products: [], total: 0 };
  }

  ngOnInit() {
  }

}
