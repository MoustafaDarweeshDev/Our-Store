import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'' ,redirectTo:"products" ,pathMatch:"full"},
  {path:'products' , component:ProductsComponent},
  {path:'login' , component:LoginComponent},
  {path:'signup' , component:SignUpComponent},
  {path:'cart/:id' , component:ShoppingCartComponent},
  {path:'products/:id' , component:ProductDetailsComponent},
  {path:'**' , component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
