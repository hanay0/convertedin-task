import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductById = (productId: number) => createSelector(
  selectProductState,
  (state: ProductState) => state.products.find(product => product.id === productId)
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectSelectedBrands = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedBrands
);
