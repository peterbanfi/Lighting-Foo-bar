import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpProductsService {
  options = new RequestOptions({ withCredentials: true });

  constructor(public http: HttpClient) { }

  getAll(domain) {
    return this.http.get(domain).toPromise();

  }

  getSingle(domain) {
    return this.http.get(domain).toPromise();
  }

  post(domain, data) {
    return this.http.post(domain, data).toPromise();
  }

  put(domain, data) {
    return this.http.put(domain, data).toPromise();
  }

  delete(domain) {
    return this.http.delete(domain).toPromise();
  }

}
