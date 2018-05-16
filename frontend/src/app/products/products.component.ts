import { Component, OnInit } from '@angular/core';
import { HttpProductsService } from '../http-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  domain: String = 'http://localhost:8080/products';
  products: any;
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
  productPost: object = {
    productName: '',
    productPrice: '',
    productManufacturer: '',
    productUrl: '',
  };
  selectedFile: File = null;
  deleted: Boolean = false;
  error: String = '';

  constructor(private http: HttpProductsService) {

  }


  ngOnInit() {
    this.list();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  list() {
    this.http.getAll(this.domain)
      .then((res) => {
        this.products = res;
      });
  }


  post() {
    const body = new FormData();
    body.append('productName', this.productPost['productName']);
    body.append('productPrice', this.productPost['productPrice']);
    body.append('productManufacturer', this.productPost['productManufacturer']);
    body.append('productUrl', this.productPost['productUrl']);
    if (this.selectedFile) {
      body.append('productImg', this.selectedFile, this.selectedFile.name);
    }
    this.http.post(`${this.domain}`, body)
      .then(() => location.reload())
      .catch((err) => {
        alert(err.error.error);
      });
  }

  single(product) {
    // this.deleted = false;
    const domain = `${this.domain}/${product._id}`;
    const array = [];
    this.http.getSingle(domain)
      .then((res) => {
        array.push(res);
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
      });

  }

  put() {
    const domain = `${this.domain}/${this.product[0]['_id']}`;
    const body = new FormData();
    body.append('productName', this.product[0]['productName']);
    body.append('productPrice', this.product[0]['productPrice']);
    body.append('productManufacturer', this.product[0]['productManufacturer']);
    body.append('productUrl', this.product[0]['productUrl']);
    if (this.selectedFile) {
      body.append('productImg', this.selectedFile, this.selectedFile.name);
    }
    console.log(body);
    this.http.put(`${domain}`, body)
      .then(() => location.reload())
      .catch((err) => {
        alert(err.error.error);
      });
  }


  delete() {
    const domain = `${this.domain}/${this.product[0]['_id']}`;

    this.http.delete(domain)
      .then(() => location.reload())
      .catch((err) => {
        alert(err.error.error);
      });

  }

}

// interface Products {
//   _id: String;
//   updatedAt: Date;
//   createdAt: Date;
//   productName: String;
//   productUrl: String;
//   productPrice: Number;
//   productManufacturer: String;
//   productImg?: String;
// }
