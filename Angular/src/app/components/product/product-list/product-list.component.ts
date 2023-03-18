import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/Service/product/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  confirmDelete(product: Product): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (confirmed) {
      this.deleteProduct(product);
    }
  }

  deleteProduct(product: Product): void {
    this.productService.delete(product.id).subscribe(
      () => {
        this.products = this.products?.filter((p) => p !== product) ?? [];
        console.log(`Deleted product with ID ${product.id}`);
      },
      (error) => console.error(error)
    );
  }
}
