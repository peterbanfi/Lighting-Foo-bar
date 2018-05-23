import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }
  product: Array<object> = [{
    _id: '',
    productName: '',
    productPrice: '',
    productManufacturer: '',
    productUrl: '',
    createdAt: '',
    updatedAt: '',
    productImg: '',
  }];
  newOrder: any = [{
    _id: '5af9917fbb6b544b14321638',
    updatedAt: '2018-05-16T14:58:20.600Z',
    createdAt: '2018-05-14T13:39:11.952Z',
    productName: 'kalinka',
    productUrl: 'kalinka-vodka',
    productPrice: 3599,
    quantity: 5,
    productManufacturer: 'zwack unicum',
    productImg: 'http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg',
  }];
  newOrder2: any = [{
    _id: '5af99826722bf5522c3d40a1',
    updatedAt: '2018-05-16T14:58:20.600Z',
    createdAt: '2018-05-14T13:39:11.952Z',
    productName: 'jack',
    productUrl: 'whiskey',
    productPrice: 6666,
    quantity: 3,
    productManufacturer: 'zwack unicum',
    productImg: 'http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg',
  }];
  newOrder3: any = [{
    _id: '5b006ac8ea3bf407a47751b1',
    updatedAt: '2018-05-16T14:58:20.600Z',
    createdAt: '2018-05-14T13:39:11.952Z',
    productName: 'porto',
    productUrl: 'rum',
    productPrice: 2200,
    quantity: 2,
    productManufacturer: 'zwack unicum',
    productImg: 'http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg',
  }];

  ngOnInit() {
    this.list();
  }

  list() {
    let array = [{
      _id: '5af9917fbb6b544b14321638',
      updatedAt: '2018-05-16T14:58:20.600Z',
      createdAt: '2018-05-14T13:39:11.952Z',
      productName: 'kalinka',
      productUrl: 'kalinka-vodka',
      productPrice: 3599,
      productManufacturer: 'zwack unicum',
      productImg: 'http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg',
    }];
    this.product = array.map(doc => ({
      _id: doc['_id'],
      productName: doc['productName'],
      productPrice: doc['productPrice'],
      productManufacturer: doc['productManufacturer'],
      productUrl: doc['productUrl'],
      createdAt: doc['createdAt'],
      updatedAt: doc['updatedAt'],
      productImg: doc['productImg'],
    }));

    console.log(this.product);
  }

  addToBasket() {
    const basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    basket.push(this.newOrder);
    const session = JSON.stringify(basket);
    sessionStorage.setItem('basket', session);
    console.log(basket);
  }
  addToBasket2() {
    const basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    basket.push(this.newOrder2);
    const session = JSON.stringify(basket);
    sessionStorage.setItem('basket', session);
    console.log(basket);
  }
  addToBasket3() {
    const basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    basket.push(this.newOrder3);
    const session = JSON.stringify(basket);
    sessionStorage.setItem('basket', session);
    console.log(basket);
  }

}
