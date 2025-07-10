import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCreate } from '../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  categories = ['Electronica', 'Ropa', 'Juguetes'];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = +idParam;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number) {
    this.loading = true;
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al cargar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const producto: ProductCreate = this.productForm.value;
    this.loading = true;

    const obs = this.isEditMode && this.productId !== null
      ? this.productService.update(this.productId, producto)
      : this.productService.create(producto);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open(
          this.isEditMode ? 'Producto actualizado' : 'Producto creado',
          'Cerrar',
          { duration: 3000 }
        );
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al guardar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
