import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'convertedin-task';
  selectedCategory: string = '';
  selectedCategoryName: string = '';
  searchQuery: string = '';  // Add this property
}
