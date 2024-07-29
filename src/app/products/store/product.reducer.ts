import { createReducer, on, Action } from '@ngrx/store';
import { loadProductsSuccess, loadProductsFailure } from './product.actions';
import { Product } from '../product';

export interface ProductState {
  products: Product[];
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  error: null
};

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error }))
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return _productReducer(state, action);
}
