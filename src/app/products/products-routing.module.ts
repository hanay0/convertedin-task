// products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsWrapperComponent } from './products-wrapper/products-wrapper.component';

const routes: Routes = [
  // Fix: this was causing product list component to appear multiple times
  {
    path: '',
    component: ProductsWrapperComponent,
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild() is used here
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
