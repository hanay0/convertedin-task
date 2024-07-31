import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    if (changes['selectedBrands']) {
      this.updateProductList();
    }
  }

  private updateProductList(): void {
    this.filteredProducts$ = this.products$.pipe(
      map((products: Product[]) => {
        if (this.selectedBrands.length === 0) {
          return products;
        }
        return products.filter(product => this.selectedBrands.includes(product.brand));
      })
    );

    this.filteredProducts$.pipe(
      map((products: Product[]) => products.length)
    ).subscribe((count: number) => {
      this.productCount = count;
    });
  }
}
