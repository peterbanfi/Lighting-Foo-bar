import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { Globals } from '../globalvars';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private global: Globals, private http: HttpRequestService) { }
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

  ngOnInit() {
    this.list();
  }

  list() {
    this.product = [];
    let body;

    this.http.getAll(`http://localhost:8080/products/${this.global.singleProductId}`)
      .then((res) => {

        console.log(res);
      });
  }

  // list() {
  //   let array = [{
  //     _id: "5af9917fbb6b544b14321638",
  //     updatedAt: "2018-05-16T14:58:20.600Z",
  //     createdAt: "2018-05-14T13:39:11.952Z",
  //     productName: "kalinka",
  //     productUrl: "kalinka-vodka",
  //     productPrice: 3599,
  //     productManufacturer: "zwack unicum",
  //     productImg: "http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg",
  //   }]
  //   this.product = array.map(doc => ({
  //     _id: doc['_id'],
  //     productName: doc['productName'],
  //     productPrice: doc['productPrice'],
  //     productManufacturer: doc['productManufacturer'],
  //     productUrl: doc['productUrl'],
  //     createdAt: doc['createdAt'],
  //     updatedAt: doc['updatedAt'],
  //     productImg: doc['productImg'],
  //   }));

  // console.log(this.product);
  // }

}
