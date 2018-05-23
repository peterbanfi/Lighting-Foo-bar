import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  domain: String = 'http://localhost:8080/categories';
  categories: any;
  category: Array<object> = [{
    _id: '',
    categoryName: '',
    categoryPlace: '',
    createdAt: '',
    updatedAt: '',
  }];
  categoryPost: object = {
    categoryName: '',
    categoryPlace: '',
  };

  constructor(private http: HttpRequestService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.http.getAll(this.domain)
      .then((res) => {
        this.categories = res;
      });
  }

  post() {
    const body = {
      categoryName: '',
      categoryPlace: '',
    };
    body.categoryName = this.categoryPost['categoryName'];
    body.categoryPlace = this.categoryPost['categoryPlace'];

    this.http.post(`${this.domain}`, body)
      .then(() => {
        this.categoryPost['categoryName'] = '';
        this.categoryPost['categoryPlace'] = '';
      })
      .then(() => {
        this.list();
      })
      .then(() => {
        console.log('object');
      })
      .catch((err) => {
        alert(err.error.error);
      });
  }

  single(category) {
    // this.deleted = false;
    const domain = `${this.domain}/${category._id}`;
    const array = [];
    this.http.getSingle(domain)
      .then((res) => {
        array.push(res);
        this.category = array.map(doc => ({
          _id: doc['_id'],
          categoryName: doc['categoryName'],
          categoryPlace: doc['categoryPlace'],
          createdAt: doc['createdAt'],
          updatedAt: doc['updatedAt'],
        }));
      });
  }

  put() {
    const domain = `${this.domain}/${this.category[0]['_id']}`;
    const body = {
      categoryName: '',
      categoryPlace: '',
    };

    body.categoryName = this.category[0]['categoryName'];
    body.categoryPlace = this.category[0]['categoryPlace'];
    this.http.put(domain, body)
      .then(() => this.list())
      .catch((err) => {
        alert(err.error.error);
      });
  }

  delete() {
    const domain = `${this.domain}/${this.category[0]['_id']}`;

    this.http.delete(domain)
      .then(() => this.list())
      .catch((err) => {
        alert(err.error.error);
      });
  }

}
