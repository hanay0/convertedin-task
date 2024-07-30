import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    // ProductListComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    // AppRoutingModule,// this was causing the error in the console about the route
    RouterModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
