import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../store/product.reducer';
import { updateSelectedBrands } from '../store/product.actions';
import { ProductService } from '../../products/product.service';
import { Category } from '../../products/categories';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<{ slug: string, name: string }>();
  @Output() brandSelected = new EventEmitter<string[]>();
  categories: Category[] = [];
  brandCounts: { brand_name: string, count: number }[] = [];
  noBrands: boolean = false;
  selectedBrands: string[] = [];

  constructor(private productService: ProductService, private store: Store<ProductState>) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        if (this.categories.length > 0) {
          this.selectCategory(this.categories[0]);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  private loadBrandCounts(category: string): void {
    this.productService.getBrandsByCategory(category).subscribe(
      (brandCounts) => {
        this.brandCounts = brandCounts;
        this.noBrands = this.brandCounts.length === 0;
      },
      (error) => {
        console.error('Error fetching brand counts:', error);
        this.noBrands = true;
      }
    );
  }

  selectCategory(category: Category): void {
    this.categorySelected.emit({ slug: category.slug, name: category.name });
    this.selectedBrands = [];
    this.loadBrandCounts(category.slug);
    this.store.dispatch(updateSelectedBrands({ selectedBrands: [] }));
  }

  onBrandChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedBrand = input.value;
    let updatedSelectedBrands;

    if (input.checked) {
      updatedSelectedBrands = [...this.selectedBrands, selectedBrand];
    } else {
      updatedSelectedBrands = this.selectedBrands.filter(brand => brand !== selectedBrand);
    }
  
    this.selectedBrands = updatedSelectedBrands;
    console.log('Selected Brands:', this.selectedBrands); // Debugging line
    this.brandSelected.emit(this.selectedBrands);
    this.store.dispatch(updateSelectedBrands({ selectedBrands: this.selectedBrands }));
  }
}
