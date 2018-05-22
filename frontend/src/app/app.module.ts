import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

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
import { LoginService } from './login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HttpProductsService } from './http-products.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { InterceptorModule } from './interceptor/interceptor.module';
import { ContactComponent } from './contact/contact.component';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthGuard } from './auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { ProfileComponent } from './profile/profile.component';

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
    ContactComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    Ng2GoogleChartsModule,
    HttpClientModule,
    InterceptorModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5G21AVMuyuovz3i0gIuoBgm7vZqUe6WM'
    }),
    FlashMessagesModule.forRoot()
  ],
  providers: [OrderService,
    OrderService,
    HttpProductsService,
    FlashMessagesService
    LoginService,
    CookieService,
    AuthGuard,
    UserAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

