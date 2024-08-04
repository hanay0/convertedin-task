import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure, loadProductsByCategory } from './product.actions';
import { ApiResponse, Product } from '../product'; // Import the necessary types

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() => {
        // console.log('loadProducts action received');
        return this.productService.getProducts().pipe(
          map((response: ApiResponse) => response.products),
          map(products => {
            // console.log('Dispatching loadProductsSuccess action');
            return loadProductsSuccess({ products });
          }),
          catchError(error => {
            console.error('Error fetching products:', error);
            return of(loadProductsFailure({ error: error.message }));
          })
        );
      })
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategory),
      mergeMap(({ category }) => {
        // console.log(`loadProductsByCategory action received for category: ${category}`);
        return this.productService.getProductsByCategory(category).pipe(
          map((response: ApiResponse) => response.products),
          map(products => {
            // console.log('Dispatching loadProductsSuccess action');
            return loadProductsSuccess({ products });
          }),
          catchError(error => {
            console.error('Error fetching products by category:', error);
            return of(loadProductsFailure({ error: error.message }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}

