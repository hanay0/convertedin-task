import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadProductsByCategory, loadProducts } from '../store/product.actions';
import { Product } from '../product';
import { selectAllProducts, selectProductState } from '../store/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() selectedCategory: string = '';
  @Input() selectedCategoryName: string = '';
  @Input() selectedBrands: string[] = [];
  @Input() searchQuery: string = '';
  products$: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;
  productCount: number = 0;

  constructor(private store: Store) {
    this.products$ = this.store.pipe(select(selectAllProducts));
  }

  ngOnInit(): void {
    this.updateProductList();
    this.store.dispatch(loadProducts());
    this.store.select(selectProductState).subscribe(state => {
      this.searchQuery = state.searchQuery;
      this.updateProductList();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory'] && !changes['selectedCategory'].isFirstChange()) {
      this.store.dispatch(loadProductsByCategory({ category: this.selectedCategory }));
    }
    if (changes['selectedBrands'] || changes['searchQuery']) {
      this.updateProductList();
    }
  }

  private updateProductList(): void {
    this.filteredProducts$ = this.products$.pipe(
      map((products: Product[]) => {
        let filtered = products;
  
        console.log('Selected Brands:', this.selectedBrands); // Debugging line
  
        if (this.selectedBrands.length > 0) {
          filtered = filtered.filter(product => this.selectedBrands.includes(product.brand));
        }
  
        if (this.searchQuery) {
          filtered = filtered.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
  
        console.log('Filtered Products:', filtered); // Debugging line
        return filtered;
      })
    );
  
    this.filteredProducts$.pipe(
      map((products: Product[]) => products.length)
    ).subscribe((count: number) => {
      this.productCount = count;
    });
  }
}
