import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { tokenNotExpired } from 'angular2-jwt'
import 'rxjs/add/operator/map'

@Injectable()
export class CreateProductService {

  authToken: any
  user: any

  constructor(private http:Http) { }

  createProduct(product) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/products/add', product, {headers: headers})
    .map(res => res.json())
  }

  }
