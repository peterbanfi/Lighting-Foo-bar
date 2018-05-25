import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AllUserComponent } from './all-user/all-user.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { PublicProductsComponent } from './public-products/public-products.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'public-products/product', component: ProductComponent },
  { path: 'public-products', component: PublicProductsComponent },
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent},
  { path: 'users', component: AllUserComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'basket', component: BasketComponent, canActivate: [UserAuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
