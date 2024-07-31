import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() searchQueryChanged = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)  // Adjust the debounce time as needed
    ).subscribe((searchText: string) => {
      this.searchQueryChanged.emit(searchText);
    });
  }

  onSearchInputChange(event: any): void {
    const searchText = event.target.value;
    this.searchSubject.next(searchText);
  }
}
