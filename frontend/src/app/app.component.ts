import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { CookieService } from 'angular2-cookie/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    constructor(private cookieService: CookieService) {

    }
    ngOnInit() {
        this.cookieService.remove('xyz');
    }
}
