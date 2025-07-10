import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string = '';
  currentSearch: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll(this.currentCategory).subscribe({
      next: (data) => {
        this.allProducts = data;
        this.applySearchFilter();
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  handleCategoryFilter(category: string) {
    this.currentCategory = category;
    this.loadProducts();
  }

  handleSearch(term: string) {
    this.currentSearch = term.toLowerCase();
    this.applySearchFilter();
  }

  private applySearchFilter() {
    if (this.currentSearch) {
      this.filteredProducts = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(this.currentSearch)
      );
    } else {
      this.filteredProducts = [...this.allProducts];
    }
  }
}
