import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountComponent } from './account/account.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'' ,redirectTo:"products" ,pathMatch:"full"},
  {path:'products' , component:ProductsComponent},
  {path:'login' , component:LoginComponent},
  {path:'signup' , component:SignUpComponent},
  {path:'cart/:id' , component:ShoppingCartComponent},
  {path:'products/:id' , component:ProductDetailsComponent},
  // {path:'cart/:id' , component:CartComponent},
  {path:'cart' , component:ShoppingCartComponent},
  {path:'check/:id' , component:CheckoutComponent},
  {path:'search' , component:SearchComponent},
  {path:'contact' , component:ContactUsComponent},
  {path:'account',component:AccountComponent,
  children:
  [
    {path:'dashboard',component:DashboardComponent},
    {path:'account-details',component:AccountDetailsComponent},
    {path:'orders',component:OrdersComponent},
    {path:'addresses',component:AddressesComponent},
  ]
  },
  {path:'**' , component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

