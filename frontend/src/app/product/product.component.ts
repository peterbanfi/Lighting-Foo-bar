import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { Globals } from '../globalvars';
import { CommentService } from '../comment.service';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public http: CommentService, private global: Globals) {
    this.getUser();
  }
  newComment: any = { text: '', user: '' };
  commentToUpdate: any = {};
  options: any = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/';
  Orders: any;
  userOrders: any;
  productsLength: any;
  canComment: Boolean = false;
  userId: String = '';
  username: any;
  product: Array<object> = [{
    _id: '',
    productName: '',
    productPrice: '',
    productManufacturer: '',
    productUrl: '',
    createdAt: '',
    updatedAt: '',
    productImg: '',
    productComments: [],
  }];

  ngOnInit() {
    this.list();
  }

  /**
   * Beolvassa a kiválasztott terméket
   */
  list() {
    this.product = [];

    this.http.getAll(`http://localhost:8080/products/${this.global.singleProductId}`)
      .then((res) => {
        console.log(res);
      });
    const array = [{
      _id: '5af9917fbb6b544b14321638',
      updatedAt: '2018-05-16T14:58:20.600Z',
      createdAt: '2018-05-14T13:39:11.952Z',
      productName: 'kalinka',
      productUrl: 'kalinka-vodka',
      productPrice: 3599,
      productManufacturer: 'zwack unicum',
      productImg: 'http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg',
      productComments: [{
        _id: '5b0432142e294b2e4c007bb0',
        createdAt: '2018-05-22T15:07:00.289Z',
        user: {
          _id: '5afd7867c788b011b4c4526c',
          username: 'Fredi'
        },
        text: 'Nagyon finom. Nagyon szeretem!'
      },
      {
        _id: '5b047dc5b881cc2e481a42bf',
        createdAt: '2018-05-22T20:29:57.640Z',
        user: {
          _id: '5af9f587c0ec4521c489ce90',
          username: 'Bánfi Péter'
        },
        text: 'Ha betötlöm a 18-at és anyukám megendgedi, hogy ihassak, akkor biztosan veszek egy doboz Borsodit!'
      }],
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
      productComments: doc['productComments']
    }));
    // console.log(this.product);
  }

  /**
   * Megvizsgálja, hogy ki a bejelentkezett felhasználó.
   */
  getUser() {
    this.http.getSingle(`${this.baseUrl}user/profile`, this.options)
      .then(data => {
        this.userId = data['user']._id;
        this.username = data['user'].username;
        this.getOrders();
      });
  }

  /**
   * Lekéri a rendeléseket
   */
  getOrders() {
    this.http.getAll(`${this.baseUrl}orders`)
      .then(data => {
        this.Orders = data;
        this.canUserComment();
      });
  }

  /**
   * Megvizsgálja, hogy a bejelentkezett  felhasználó kommentelhet-e.
   */
  canUserComment() {
    if (this.userHasProduct() > 0) {
      this.canComment = true;
    }
    console.log(this.username);
    console.log(this.canComment);
  }

  /**
   * Megvizsgálja, hogy a bejelentkezett felhasználó rendelt-e az adott termékből.
   */
  userHasProduct() {
    return this.Orders
      .filter(order => order.user._id === this.userId)
      .filter(order => order.products.filter(product => product.product._id === this.product[0]['_id']).length > 0)
      .length;
  }

  /**
   * Értékelés hozzáfűzése a termékhez.
   */
  addComment() {
    this.newComment.user = this.userId;
    this.http.post(`${this.baseUrl}comments/${this.product[0]['_id']}`, this.newComment)
      .then(data => {
        console.log(data);
        this.newComment = { text: '', user: '' };
      });
  }

  /**
   * Értékelés módosítása.
   */
  updateComment() {
    this.http.post(`${this.baseUrl}comments/${this.commentToUpdate._id}`, this.commentToUpdate)
      .then(data => console.log(data));
  }


  /**
   * Értékelés törlése, paraméter alapján.
   * @param comment - a törölni kívánt értékelés.
   */
  deleteComment(comment) {
    this.http.delete(`${this.baseUrl}comments/${this.product[0]['_id']}/${comment._id}`)
      .then(data => console.log(data));
  }

  /**
   * A módosítani kívánt értékelés értékének átadása egy ideiglenes objektumnak.
   * @param comment A módosítani kívánt értékelés
   */
  selectCommentToUpdate(comment) {
    this.commentToUpdate = Object.assign({}, comment);
  }

  /**
   * Az ideiglenes objektum ürítése.
   */
  clearCommentToUpdate() {
    this.commentToUpdate = {};
  }

}
