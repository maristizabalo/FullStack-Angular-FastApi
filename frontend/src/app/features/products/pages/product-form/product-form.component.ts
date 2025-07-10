import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCreate } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  categories = ['Electronica', 'Ropa', 'Juguetes'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
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
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: (err) => {
        console.error('Error al cargar producto', err);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const producto: ProductCreate = this.productForm.value;

    if (this.isEditMode && this.productId !== null) {
      this.productService.update(this.productId, producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.productService.create(producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }
}
