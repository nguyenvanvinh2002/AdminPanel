import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './data/home/home.component';
import { HttpClientModule, provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './data/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './data/products/products.component';
import { AddProductsComponent } from './data/add-products/add-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesComponent } from './data/categories/categories.component';
import { OdersComponent } from './data/oders/oders.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './data/chart/chart.component';
import { jwtInterceptor  } from './servive/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    ProductsComponent,
    AddProductsComponent,
    CategoriesComponent,
    OdersComponent,
    LoginComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,



  ],
  providers: [
    provideClientHydration(),
    // {  provide:HTTP_INTERCEPTORS,
    //   useClass:jwtInterceptor,
    //   multi:true
    // }


  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
