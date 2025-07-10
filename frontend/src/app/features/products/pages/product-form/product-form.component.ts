import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  categories = ['Electrónica', 'Ropa', 'Juguetes'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      category: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    if (this.isEditMode) {
      // cargar datos desde el servicio
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const producto = this.productForm.value;
      // usar servicio para crear o editar
      console.log(producto);
    }
  }
}
