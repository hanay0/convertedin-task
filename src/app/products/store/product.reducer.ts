import { createReducer, on, Action } from '@ngrx/store';
import { loadProductsSuccess, loadProductsFailure, updateSearchQuery } from './product.actions';
import { Product } from '../product';

export interface ProductState {
  products: Product[];
  error: string | null;
  searchQuery: string;
}

export const initialState: ProductState = {
  products: [],
  error: null,
  searchQuery: '',
};

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error })),
  on(updateSearchQuery, (state, { searchQuery }) => ({ ...state, searchQuery }))
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return _productReducer(state, action);
}
