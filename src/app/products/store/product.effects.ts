import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';
import { Product } from '../product';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.http.get<Product[]>('https://dummyjson.com/products?limit=100')
      .pipe(
        map(products => loadProductsSuccess({ products })),
        catchError(error => of(loadProductsFailure({ error: error.message })))
      )
    )
  ));
}
