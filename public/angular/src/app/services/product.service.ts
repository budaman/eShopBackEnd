import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'


@Injectable()

export class ProductService {

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get('products/show')
    .map(res => res.json())
  }

   deleteProduct(id) {
     return new Promise((resolve, reject) => {
         this._http.delete('/products/delete'+ id)
           .subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
     });
   }

   updateProduct(id, data) {
     return new Promise((resolve, reject) => {
        this._http.put('/products/update'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
   }

   getProduct(id) {
     let headers = new Headers()
     headers.append('Content-Type', 'application/json')
     return this._http.post('/products/getproduct', id, {headers: headers})
     .map(res => res.json())
   }





}
