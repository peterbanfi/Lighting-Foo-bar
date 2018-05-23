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

    this.http.getAll(`http://localhost:8080/products/${this.global.singleProductId}`)
      .then((res) => {
        console.log(res);
      });
  }

}
