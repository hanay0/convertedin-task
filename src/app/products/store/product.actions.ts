import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const loadProducts = createAction('[Product List] Load Products');
export const loadProductsByCategory = createAction('[Product List] Load Products By Category', props<{ category: string }>());
export const loadProductsSuccess = createAction(
  '[Product List] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product List] Load Products Failure',
  props<{ error: string }>()
);
