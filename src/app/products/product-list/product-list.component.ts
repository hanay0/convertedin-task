import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject  } from 'rxjs';
import { map, debounceTime  } from 'rxjs/operators';
import { loadProductsByCategory } from '../store/product.actions';
import { Product } from '../product';
import { selectAllProducts } from '../store/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() selectedCategory: string = '';
  @Input() selectedCategoryName: string = '';
  @Input() selectedBrands: string[] = []; // Ensure this matches the event emitter
  @Input() searchQuery: string = '';  // New input property
  products$: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;
  productCount: number = 0;

  constructor(private store: Store) {
    this.products$ = this.store.pipe(select(selectAllProducts));
  }

  ngOnInit(): void {
    this.updateProductList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory'] && !changes['selectedCategory'].isFirstChange()) {
      this.store.dispatch(loadProductsByCategory({ category: this.selectedCategory }));
    }
    if (changes['selectedBrands']  || changes['searchQuery']) {
      this.updateProductList();
    }
  }

  private updateProductList(): void {
    this.filteredProducts$ = this.products$.pipe(
      map((products: Product[]) => {
        let filtered = products;

        if (this.selectedBrands.length > 0) {
          filtered = filtered.filter(product => this.selectedBrands.includes(product.brand));
        }

        if (this.searchQuery) {
          filtered = filtered.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }

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
