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
        //console.log(this.products);
      })
      .then(() => {
        console.log(this.products);
        this.lastTen(this.products);
        console.log(this.products);
      });

  }

  lastTen(data) {
    data.reverse();
    //ha lesz 10 termék akkor tízre állítani!
    for (let i = 0; i < 10; i++) {
      this.lastTenProducts.push(data[i]);
      console.log(this.lastTenProducts);
      /*   for (let i = 0; i < 11; i++) {
         const element = array[i];
       } */
    }
  }
}
