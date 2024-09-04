import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './data/home/home.component';
import { UserComponent } from './data/user/user.component';
import { ProductsComponent } from './data/products/products.component';
import { AddProductsComponent } from './data/add-products/add-products.component';
import { CategoriesComponent } from './data/categories/categories.component';
import { OdersComponent } from './data/oders/oders.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './data/chart/chart.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'products',component:ProductsComponent},
  {path:'add-products',component:AddProductsComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'oders',component:OdersComponent},
  {path:'',component:LoginComponent},
  {path:'chart',component:ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
