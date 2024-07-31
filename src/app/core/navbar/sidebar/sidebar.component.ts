import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../products/product.service'; // Adjust the path as needed
import { Category } from '../../../products/categories'; // Adjust the path as needed

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<{ slug: string, name: string }>();
  categories: Category[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        console.log('Product Categories:', this.categories);
        // Emit the first category by default
        if (this.categories.length > 0) {
          this.selectCategory(this.categories[0]);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  selectCategory(category: Category): void {
    this.categorySelected.emit({ slug: category.slug, name: category.name });
  }
}
