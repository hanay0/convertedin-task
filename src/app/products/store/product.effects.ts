import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';
import { ApiResponse, Product } from '../product'; // Import the necessary types

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          // Expecting ApiResponse type from the API
          map((response: ApiResponse) => response.products), // Extracting products array
          map(products => loadProductsSuccess({ products })), // Dispatching with extracted products
          catchError(error => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
