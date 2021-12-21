import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../Models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product` , product) ;

  }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.apiUrl}/products`) ;
  }

  getOneProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`) ;
  }

  updateProduct(id: string , product: FormData): Observable<Product>{
    return this.http.patch<Product>(`${this.apiUrl}/product/${id}` , product) ;

  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/product/${id}`) ;
  }
}
