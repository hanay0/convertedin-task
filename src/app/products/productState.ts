import { Product } from '../products/product';

export interface ProductState {
  products: Product[];
  error: any;
}
