import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        // console.log('Product Categories:', this.categories);
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
        // console.log('Brand Counts:', this.brandCounts);
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
  }

  onBrandChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedBrand = input.value;

    if (input.checked) {
      this.selectedBrands.push(selectedBrand);
    } else {
      const index = this.selectedBrands.indexOf(selectedBrand);
      if (index > -1) {
        this.selectedBrands.splice(index, 1);
      }
    }

    this.brandSelected.emit(this.selectedBrands);
  }
}
