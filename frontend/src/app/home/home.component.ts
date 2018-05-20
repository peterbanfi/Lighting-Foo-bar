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
      })
      .then(() => {
        this.lastTen(this.products);
      });

  }

  lastTen(data) {
    data.reverse();
    for (let i = 0; i < 10; i++) {
      this.lastTenProducts.push(data[i]);
    }
  }
}
