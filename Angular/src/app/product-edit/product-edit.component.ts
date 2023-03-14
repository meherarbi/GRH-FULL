import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product | undefined;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.productService.get(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = error.message
    );
  }
  
  onSubmit(): void {
    this.productService.update(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
