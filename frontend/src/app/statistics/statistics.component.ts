import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pieChartData = {
    chartType: 'LineChart',
    dataTable: [
      ['Orders', 'Orders Per Day'],
    ],
    options: {
      'title': 'Orders',
      is3D: true,
      'width': 600,
      'height': 600
    },
  };
  datas: any;
  datas2: any;
  datas3: any;
  baseUrl = 'http://localhost:8080/orders/';
  allIncome = 0;
  numberOfUsers = 0;
  numberOfProducts = 0;

  constructor(public http: Http) {

    this.getAll();
    this.listAllUser();
    this.listAllProduct();
  }

  ngOnInit() {

  }
  /**
   * A rendelések lekérése.
   */
  getAll() {
    this.http.get(this.baseUrl).subscribe(
      (data) => {
        data = JSON.parse(data['_body']);
        this.datas = data;
        this.setDate(data);
        this.countOrders(data);
      }
    );
  }
  /**
   * Hány regisztrált fehasználója van az oldalnak?
   */
  listAllUser() {
    this.http.get(`http://localhost:8080/user/listAll`)
      .subscribe(data => {
        this.datas2 = JSON.parse(data['_body']);
        this.numberOfUsers = this.datas2.length;
      }
      );
  }
  /**
   * Hány termékünk van?
   */
  listAllProduct() {
    this.http.get(`http://localhost:8080/products/`)
      .subscribe(data => {
        this.datas3 = JSON.parse(data['_body']);
        this.numberOfProducts = this.datas3.length;
      }
      );
  }
  /**
   * Az egyes rendelések értékét számolja össze.
   * @param data A leadott rendelések.
   */
  countOrders(data) {
    for (let i = 0; i < data.length - 1; i++) {
      let allPrice = 0;
      for (let j = 0; j < data[i].products.length; j++) {
        const quantity = data[i].products[j].quantity;
        const price = data[i].products[j].product.productPrice;
        const multiply = quantity * price;
        allPrice = allPrice + multiply;
      }
      if (i !== 0) {
        this.pieChartData.dataTable[i][1] = allPrice;
        this.allIncome = this.allIncome + allPrice;
      }
    }
    this.checkSameDays(this.pieChartData);
  }
  /**
   * checkSameDays -> Azonos napon leadott rendelések vizsgálása, és összeadása.
   * @param data A leadott rendelések.
   */
  checkSameDays(data) {
    for (let i = 1; i < data.dataTable.length; i++) {
      for (let j = 1; j < data.dataTable.length; j++) {
        if (data.dataTable[i] !== data.dataTable[j]) {
          const num1 = parseInt(data.dataTable[i][0], 2);
          const num2 = parseInt(data.dataTable[j][0], 2);
          if (num1 === num2) {
            this.pieChartData.dataTable[i][1] = this.pieChartData.dataTable[i][1] + this.pieChartData.dataTable[j][1];
            this.pieChartData.dataTable.splice(j, 1);
          }
        } else { }
      }
    }
  }
  /**
  * setDate -> Átalakítja a dátumot, és beállítja a grafikonnak tetsző formátumba.
  * @param date A Rendelések dátuma.
  */
  setDate(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].createdAt = this.convertDate(data[i].createdAt);
    }
  }
  /**
   * convertDate -> Kiveszi a rendelés időpontját, + megvizsgálja, hogy az aktuális hónapban lett-e leadva
   *                Ha nem, akkor nem kerül be a chartba.
   * @param date A Rendelések dátuma.
   */
  convertDate(date) {
    const originalDate = new Date(date);
    const month = originalDate.getMonth();
    const dateCheck = new Date();
    const dateNow = dateCheck.getMonth();
    if (month === dateNow) {
      this.getDays(date);
      return true;
    } else {
      return false;
    }
  }
  /**
   * getDays -> A rendelések dátumából, kiveszi a napot, és azt állítja be a grafikonba.
   * @param date A Rendelések dátuma.
   */
  getDays(date) {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString();
    this.pieChartData['dataTable'].push([`${day}`, 10]);
  }
}
