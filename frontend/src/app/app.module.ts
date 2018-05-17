import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { AllUserComponent } from './all-user/all-user.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent, TotalPipe } from './orders/orders.component';
import { OrderService } from './order.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        RegistrationComponent,
        AllUserComponent,
        HomeComponent,
        OrdersComponent,
        ProductsComponent,
        TotalPipe,
        StatisticsComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        Ng2GoogleChartsModule,
        HttpClientModule
    ],
    providers: [OrderService],
    bootstrap: [AppComponent]
})
export class AppModule { }
