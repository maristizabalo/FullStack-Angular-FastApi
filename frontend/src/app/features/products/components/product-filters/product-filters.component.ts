import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
})
export class ProductFiltersComponent {
  selectedCategory: string = '';
  @Output() categoryChange = new EventEmitter<string>();

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory = value;
    this.categoryChange.emit(value);
  }
}
