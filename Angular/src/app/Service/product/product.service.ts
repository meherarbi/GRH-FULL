import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:8000/api/products';

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://localhost:8000/api/products';
    console.log(this.apiUrl);
  }
  getApiUrl(): string {
    return this.apiUrl;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(product: any): Observable<any> {
    console.log('Creating product:', product);
    return this.http.post<any>(this.apiUrl + '/create', product);
  }
  update(product: any): Observable<any> {
    console.log('Updating product:', product);
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
