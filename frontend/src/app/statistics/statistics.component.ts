import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pieChartData: any = {
    chartType: 'LineChart',
    dataTable: [
      ['Orders', 'Total amount of orders per day'],
    ],
    options: {
      'title': 'All Orders This Month',
      is3D: true,
      curveType: 'function',
      legend: { position: 'bottom' },
      'width': 1000,
      'height': 800
    },
  };
  datas: any;
  datas2: any;
  datas3: any;
  baseUrl = 'http://localhost:8080/orders/';
  allIncome = 0;
  numberOfUsers = 0;
  numberOfProducts = 0;
  datas4: any = [];
  datas5: any = [];
  datas6: any = [];

  constructor(public http: HttpClient) {

    this.getAll();
    this.listAllUser();
    this.listAllProduct();
  }

  ngOnInit() {

  }

  refresh() {
    location.reload();
  }
  /**
   * A rendelések lekérése.
   */
  getAll() {
    this.http.get(this.baseUrl).subscribe(
      (data) => {
        console.log(data);
        this.datas = data;
        this.setDate(this.datas);
        this.countOrders(this.datas5);
      }
    );
  }
  /**
   * Hány regisztrált fehasználója van az oldalnak?
   */
  listAllUser() {
    this.http.get(`http://localhost:8080/user/listAll`)
      .subscribe(data => {
        this.datas2 = data;
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
        this.datas3 = data;
        this.numberOfProducts = this.datas3.length;
      }
      );
  }
  /**
   * Az egyes rendelések értékét számolja össze.
   * @param data A leadott rendelések.
   */
  countOrders(data) {
    for (let i = 0; i < data.length; i++) {
      let allPrice = 0;
      for (let j = 0; j < data[i].products.length; j++) {
        const quantity = data[i].products[j].quantity;
        const price = data[i].products[j].product.productPrice;
        const multiply = quantity * price;
        allPrice = allPrice + multiply;
      }
      this.datas4[i][1] = allPrice;
      this.allIncome = this.allIncome + allPrice;
      this.datas6.push(data[i].user.username);
    }
    this.checkSameCustomers(this.datas6);
    this.checkSameDays(this.datas4);
    this.populateChart(this.datas4);

  }

  checkSameCustomers(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (i !== j) {
          const name1 = data[i];
          const name2 = data[j];
          if (name1 === name2) {
            this.datas6.splice(j, 1);
          }
        }
      }
    }
  }

  populateChart(data) {
    for (let i = 0; i < data.length; i++) {
      this.pieChartData.dataTable.push(data[i]);
    }
  }
  /**
   * checkSameDays -> Azonos napon leadott rendelések vizsgálása, és összeadása.
   * @param data A leadott rendelések.
   */
  checkSameDays(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[i] !== data[j]) {
          const num1 = data[i][0];
          const num2 = data[j][0];
          if (num1 === num2) {
            this.datas4[i][1] = this.datas4[i][1] + this.datas4[j][1];
            this.datas4.splice(j, 1);
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
      this.convertDate(data[i].createdAt, data[i]);
    }
  }
  /**
   * convertDate -> Kiveszi a rendelés időpontját, + megvizsgálja, hogy az aktuális hónapban lett-e leadva
   *                Ha nem, akkor nem kerül be a chartba.
   * @param date A Rendelések dátuma.
   */
  convertDate(date, data) {
    const originalDate = new Date(date);
    const month = originalDate.getMonth();
    const dateCheck = new Date();
    const dateNow = dateCheck.getMonth();
    if (month === dateNow) {
      this.getDays(date);
      this.datas5.push(data);

    } else { }
  }
  /**
   * getDays -> A rendelések dátumából, kiveszi a napot, és azt állítja be a grafikonba.
   * @param date A Rendelések dátuma.
   */
  getDays(date) {
    const originalDate = new Date(date);
    const day = originalDate.getDate();
    this.datas4.push([day, '']);
  }
}
