import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure, loadProductsByCategory, updateSelectedBrands, resetProductList } from './product.actions';
import { ApiResponse, Product } from '../product';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((response: ApiResponse) => response.products),
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategory),
      mergeMap(({ category }) =>
        this.productService.getProductsByCategory(category).pipe(
          map((response: ApiResponse) => response.products),
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  updateSelectedBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSelectedBrands),
      map(({ selectedBrands }) => {
        // Filter products by selected brands logic goes here
        // Assuming you have access to the current product list in the state
        return resetProductList();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
