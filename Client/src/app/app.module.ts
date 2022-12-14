import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ErrorComponent } from './error/error.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { OurnavBarComponent } from './ournav-bar/ournav-bar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SearchComponent } from './search/search.component';
import { ItemComponent } from './item/item.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AddressesComponent } from './addresses/addresses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DOrdersComponent } from './d-orders/d-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    ProductDetailsComponent,
    LoginComponent,
    SignUpComponent,
    ShoppingCartComponent,
    ErrorComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    OurnavBarComponent,
    ContactUsComponent,
    SearchComponent,
    ItemComponent,
    HeaderComponent,
    AccountComponent,
    AccountDetailsComponent,
    AddressesComponent,
    DashboardComponent,
    DOrdersComponent,
    OrdersComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
