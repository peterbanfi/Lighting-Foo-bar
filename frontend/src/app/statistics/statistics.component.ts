import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Orders', 'Orders Per Month'],
    ],
    options: {
      'title': 'Tasks',
      is3D: true,
      'width': 600,
      'height': 600
    },
  };
  datas: any;
  baseUrl = 'http://localhost:8080/orders/';
  constructor(public http: Http) {
    this.getAll();
  }

  ngOnInit() {
  }

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

  countOrders(data) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let num = 0;
    let desk = [];
    let counter = [];
    console.log(data);
    for (let j = 0; j < data.length; j++) {
      for (let month = 0; month < months.length; month++) {
        if (month !== data[j].createdAt) {

        }
        if (month === data[j].createdAt) {
          num++;
        }
        counter = [months[month], num];
        desk.push(counter);
        num = 0;
      }
    }
    for (let k = 0; k < desk.length; k++) {
      this.pieChartData['dataTable'].push(desk[k]);
    }
    console.log(this.pieChartData);
  }

  setDate(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].createdAt = this.convertDate(data[i].createdAt);
    }
  }

  convertDate(date) {
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = originalDate.getMonth();
    const day = originalDate.getDate();
    const hour = originalDate.getHours();
    const minutes = originalDate.getMinutes();
    const seconds = originalDate.getSeconds();
    //date = `${year}. ${month}. ${day}. ${hour}:${minutes}:${seconds}`;
    date = month;
    return date;
  }


}
