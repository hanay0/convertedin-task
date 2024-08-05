import { createReducer, on, Action } from '@ngrx/store';
import { loadProductsSuccess, loadProductsFailure, updateSearchQuery, updateSelectedBrands, resetProductList } from './product.actions';
import { Product } from '../product';

export interface ProductState {
  products: Product[];
  error: string | null;
  searchQuery: string;
  selectedBrands: string[];
  originalProducts: Product[];
}

export const initialState: ProductState = {
  products: [],
  error: null,
  searchQuery: '',
  selectedBrands: [],
  originalProducts: []
};

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: [...products],
    originalProducts: [...products]
  })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error })),
  on(updateSearchQuery, (state, { searchQuery }) => ({ ...state, searchQuery })),
  on(updateSelectedBrands, (state, { selectedBrands }) => ({
    ...state,
    selectedBrands: [...selectedBrands],
    products: selectedBrands.length === 0 
      ? [...state.originalProducts] 
      : state.originalProducts.filter(product => selectedBrands.includes(product.brand))
  })),
  on(resetProductList, (state) => ({
    ...state,
    products: [...state.originalProducts]
  }))
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return _productReducer(state, action);
}
