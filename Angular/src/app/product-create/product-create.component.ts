import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product = {
    name: '',
    description: '',
    price: 0
  };

  constructor(
    private router: Router,
    private productService: ProductService
    
) {
    console.log(this.productService.getApiUrl());
}

  ngOnInit() {
  }

  onSubmit() {
    this.productService.create(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
