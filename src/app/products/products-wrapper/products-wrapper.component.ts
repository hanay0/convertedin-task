import { Component } from '@angular/core';

@Component({
  selector: 'app-products-wrapper',
  templateUrl: './products-wrapper.component.html',
  styleUrl: './products-wrapper.component.scss'
})
export class ProductsWrapperComponent {
  selectedCategory: string;
  selectedCategoryName: string;
  searchQuery: string;

  constructor() {
    this.selectedCategory = '';
    this.selectedCategoryName = '';
    this.searchQuery = '';
  }

  onCategorySelected(event: { slug: string, name: string }): void {
    this.selectedCategory = event.slug;
    this.selectedCategoryName = event.name;
  }
}
