import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { HttpProductsService } from './http-products.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { InterceptorModule } from './interceptor/interceptor.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegistrationComponent,
    AllUserComponent,
    HomeComponent,
    OrdersComponent,
    ProductsComponent,
    TotalPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    OrderService,
    HttpProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
