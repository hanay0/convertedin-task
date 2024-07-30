import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiResponse } from '../products/product'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cacheKey = 'productsCache';
  private cacheExpiration = 15 * 60 * 1000; // 15 minutes

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ApiResponse> {
    const cachedData = localStorage.getItem(this.cacheKey);
    const cacheTime = localStorage.getItem(`${this.cacheKey}-time`);

    if (cachedData && cacheTime && (Date.now() - +cacheTime < this.cacheExpiration)) {
      return of(JSON.parse(cachedData) as ApiResponse); // Ensure correct type
    } else {
      return this.http.get<ApiResponse>('https://dummyjson.com/products?limit=100').pipe(
        tap(response => {
          // Cache the entire ApiResponse object
          localStorage.setItem(this.cacheKey, JSON.stringify(response));
          localStorage.setItem(`${this.cacheKey}-time`, Date.now().toString());
        }),
        catchError(error => {
          console.error('Failed to fetch products', error);
          // Return an empty response object with an empty products array
          return of({ products: [], total: 0, skip: 0, limit: 100 });
        })
      );
    }
  }
}
