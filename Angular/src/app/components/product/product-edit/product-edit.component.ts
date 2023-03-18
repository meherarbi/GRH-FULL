import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/Service/product/product.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
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
      (product) => (this.product = product),
      (error) => (this.errorMessage = error.message)
    );
  }

  onSubmit(): void {
    this.productService.update(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
