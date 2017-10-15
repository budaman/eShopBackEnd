import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'


@Injectable()

export class OrderService {

product: Object

constructor(private _http: Http) {}


createOrder(product, user, quantity) {

  let obj = {
    product: product,
    user: user,
    quantity: quantity
  }
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return this._http.post('/orders/createOrder', obj, {headers: headers})
  .map(res => res.json())
}

showOrders(){
  return this._http.get('orders/getOrders')
  .map(res => res.json())
}

}
