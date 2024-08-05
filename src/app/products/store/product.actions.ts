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

export const updateSearchQuery = createAction('[Product List] Update Search Query', props<{ searchQuery: string }>());

export const updateSelectedBrands = createAction('[Product List] Update Selected Brands', props<{ selectedBrands: string[] }>());
export const resetProductList = createAction('[Product List] Reset Product List');
