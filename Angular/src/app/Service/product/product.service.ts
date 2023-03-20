import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiURL + '/products';

  constructor(private http: HttpClient) {
    console.log(this.apiUrl);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getApiUrl(): string {
    return this.apiUrl;
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
