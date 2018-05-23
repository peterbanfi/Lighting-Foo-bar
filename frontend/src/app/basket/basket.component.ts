import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: any;
  basketAll: any = [];
  price: Number = 0;
  product: any = {};
  constructor() {
    this.getBasket();
  }

  ngOnInit() {
  }


  getBasket() {
    this.basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    console.log(this.basket);
    this.sortBasket(this.basket);
    return this.basket;
  }

  sortBasket(data) {
    let i = 0;
    /*     if (this.product !== {}) {
          this.basketAll.push(this.product);
        } */
    // for (let j = 0; j < data.length; j++) {
    //   if (i !== j) {
    //     if (data[i][0]['_id'] === data[j][0]['_id']) {
    //       console.log(data[j][0]['productName']);
    //       this.price = this.price + data[j][0]['productPrice'];
    //       this.basket.splice(j, 1);
    //       console.log(this.price);
    //       /*           this.product = {
    //                   productName: data[j][0]['productName'],
    //                   productPrice: this.price,
    //                   _id: data[j][0]['_id'] */
    //     };
    //     if ((j === data.length - 1)) {
    //       this.price = this.price + data[j][0]['productPrice'];
    //       console.log(this.price);
    //     }
    //     //console.log(this.basketAll);
    //     i++;
    //   }
    // }
    for (let k = 0; k < data.length; k++) {
      if (i !== k) {
        if (data[i][0]['_id'] === data[k][0]['_id']) {
          //console.log(data[j][0]['productName']);
          //this.price = this.price + data[j][0]['productPrice'];
          this.basket.splice(k, 1);
          console.log(this.basket);
          /*           this.product = {
            productName: data[j][0]['productName'],
            productPrice: this.price,
            _id: data[j][0]['_id'] */
        };
        /*         if ((j === data.length - 1)) {
          this.price = this.price + data[j][0]['productPrice'];
          console.log(this.price);
        } */
        //console.log(this.basketAll);
        k = 0;
        i++;
      } else {
        this.basketAll.push(data[i][0]);
        console.log(this.basketAll);
      }
    }

    /*     this.basket.forEach(el => {
          console.log(el[0]['_id']);
          this.basket.forEach( secondEl =>{
            if(secondEl[0]['_id'])
          })
        }); */

    console.log(this.basket);
  }

}
