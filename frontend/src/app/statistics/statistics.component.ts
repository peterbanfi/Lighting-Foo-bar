import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ],
    options: {
      'title': 'Tasks',
      is3D: true,
      'width': 600,
      'height': 600
    },

  };
  constructor() { }

  ngOnInit() {
  }

}
