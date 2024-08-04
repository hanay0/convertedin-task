import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../products/product'; // Adjust path as needed
import { Category } from './categories';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'https://dummyjson.com/products';
  private cacheKey = 'productsCache';
  private cacheExpiration = 15 * 60 * 1000; // 15 minutes

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCategories();
  }

  getProducts(): Observable<ApiResponse> {
    console.log('getProducts method called');

    const cachedData = localStorage.getItem(this.cacheKey);
    const cacheTime = localStorage.getItem(`${this.cacheKey}-time`);

    if (cachedData && cacheTime && (Date.now() - +cacheTime < this.cacheExpiration)) {
      console.log('Using cached data');
      return of(JSON.parse(cachedData) as ApiResponse); // Ensure correct type
    } else {
      return this.http.get<ApiResponse>(`${this.baseURL}?limit=100`).pipe(
        tap(response => {
          console.log('Fetched data from API:', response);
          // Cache the entire ApiResponse object
          localStorage.setItem(this.cacheKey, JSON.stringify(response));
          localStorage.setItem(`${this.cacheKey}-time`, Date.now().toString());
          console.log('Data stored in localStorage');
        }),
        catchError(error => {
          console.error('Failed to fetch products', error);
          // Return an empty response object with an empty products array
          return of({ products: [], total: 0, skip: 0, limit: 100 });
        })
      );
    }
  }

  getProductsByCategory(category: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseURL}/category/${category}`);
  }

  // get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseURL}/categories`).pipe(
      catchError(error => {
        console.error('Failed to fetch categories', error);
        return of([]);
      })
    );
  }

  // Create an array of objects with brand names and their counts
  getBrandCounts(): { brand_name: string, count: number }[] {
    const cachedData = localStorage.getItem(this.cacheKey);
    if (!cachedData) {
      console.warn('No product data found in cache');
      return [];
    }

    const response = JSON.parse(cachedData) as ApiResponse;
    const brandCountMap: { [brandName: string]: number } = {};

    response.products.forEach((product: Product) => {
      if (product.brand) {
        if (!brandCountMap[product.brand]) {
          brandCountMap[product.brand] = 0;
        }
        brandCountMap[product.brand] += 1; // Increment count for the brand
      }
    });

    // Convert the map to an array of objects
    return Object.keys(brandCountMap).map(brandName => ({
      brand_name: brandName,
      count: brandCountMap[brandName]
    }));
  }


  getBrandsByCategory(category: string): Observable<{ brand_name: string, count: number }[]> {
    return this.getProductsByCategory(category).pipe(
      map(response => {
        const brandCountMap: { [brandName: string]: number } = {};

        response.products.forEach((product: Product) => {
          if (product.brand) {
            if (!brandCountMap[product.brand]) {
              brandCountMap[product.brand] = 0;
            }
            brandCountMap[product.brand] += 1;
          }
        });

        return Object.keys(brandCountMap).map(brandName => ({
          brand_name: brandName,
          count: brandCountMap[brandName]
        }));
      }),
      catchError(error => {
        console.error('Failed to fetch brands by category', error);
        return of([]);
      })
    );
  }
  /**
   * method to log array of objects , which contains brand names and it's count
   * data source : cachedData in LocalStorage
   */
  logBrandCounts(): void {
    const brandCounts = this.getBrandCounts();
    console.log('Brand Counts:', brandCounts);
  }
}
