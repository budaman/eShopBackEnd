import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'


@Injectable()

export class OrderService {

product: Object

constructor(private _http: Http) {}


createOrder(product, user, quantity) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let obj = {
    product: product,
    user: user,
    quantity: quantity,
    createdOn: today
  }
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return this._http.post('/orders/createOrder', obj, {headers: headers})
  .map(res => res.json())
}

}
