import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Globals } from '../globalvars';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-public-products',
  templateUrl: './public-products.component.html',
  styleUrls: ['./public-products.component.css']
})
export class PublicProductsComponent implements OnInit {
  products: any = [];
  domain: String = 'http://localhost:8080/products';
  constructor(private global: Globals, private http: HttpRequestService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.products = [];
    let body;

    this.http.getAll(this.domain)
      .then((res) => {
        body = JSON.stringify(res);

      })
      .then(() => {
        body = JSON.parse(body);

        body.map((x) => {
          if (x.productCategory._id === this.global.categoryId) {
            this.products.push(x);
          }
        });
      });
  }

  clickProduct(product) {
    const promise = new Promise((resolve, reject) => {
      resolve(product);
    });

    promise.then((res) => {
      this.global.singleProductId = res._id;
    });

  }

}
