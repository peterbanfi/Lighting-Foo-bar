import { Component, OnInit } from '@angular/core';
import { HttpProductsService } from '../http-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseUrl = 'http://localhost:8080/products';
  products: any;
  lastTenProducts: any = [];
  constructor(private http: HttpProductsService) {
    this.list();

  }

  ngOnInit() { }

  list() {
    this.http.getAll(this.baseUrl)
      .then((res) => {
        this.products = res;
        console.log(this.products);
      })
      .then(() => {
        this.lastTen(this.products);
      });

  }

  lastTen(data) {
    console.log(data);
    for (let i = data.length; i > 0; i--) {
      this.lastTenProducts.push(data[i]);
    }
    console.log(this.lastTenProducts);
    /*   for (let i = 0; i < 11; i++) {
        const element = array[i];
      } */
  }
}
