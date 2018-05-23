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

  }
  newComment: any = { text: '', user: '' };
  commentToUpdate: any = {};
  options: any = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/';
  Orders: any;
  canComment: Boolean = false;
  userId: String = '';
  username: any;
  userRights: any;
  product: any;
  toBasket: any = [];

  ngOnInit() {
    this.list();
    this.getUser();
  }

  /**
   * Beolvassa a kiválasztott terméket
   */
  list() {
    this.http.getAll(`http://localhost:8080/products/${this.global.singleProductId}`)
      .then((data) => {
        this.product = data;
      });
  }

  /**
   * Megvizsgálja, hogy ki a bejelentkezett felhasználó.
   */
  getUser() {
    this.http.getSingle(`${this.baseUrl}user/profile`, this.options)
      .then(data => {
        this.userId = data['user']._id;
        this.username = data['user'].username;
        this.userRights = data['user'].rights;
        console.log(this.userRights);
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
      .filter(order => order.products.filter(product => product.product._id === this.product['_id']).length > 0)
      .length;
  }

  /**
   * Értékelés hozzáfűzése a termékhez.
   */
  addComment() {
    this.newComment.user = this.userId;
    this.http.post(`${this.baseUrl}comments/${this.product['_id']}`, this.newComment)
      .then(data => {
        console.log(data);
        this.newComment = { text: '', user: '' };
        this.list();
      });
  }

  /**
   * Értékelés módosítása.
   */
  updateComment() {
    const update = { text: this.commentToUpdate.text };
    this.http.put(`${this.baseUrl}comments/${this.commentToUpdate._id}`, update)
      .then(data => {
        console.log(data);
        this.clearCommentToUpdate();
        this.list();
      });
  }


  /**
   * Értékelés törlése, paraméter alapján.
   * @param comment - a törölni kívánt értékelés.
   */
  deleteComment(comment) {
    this.http.delete(`${this.baseUrl}comments/${this.product['_id']}/${comment._id}`)
      .then(data => {
        console.log(data);
        this.list();
      });
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

  addToBasket() {
    this.toBasket.push(this.product);
    const basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    basket.push(this.toBasket);
    const session = JSON.stringify(basket);
    sessionStorage.setItem('basket', session);
    this.toBasket = [];
    console.log(basket);
  }

  addToBasket2() {
    sessionStorage.clear();
  }

}
