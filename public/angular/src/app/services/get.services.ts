import { Injectable } from '@angular/core';
import { Http } from '@angular/http'


@Injectable()
export class GetService {

  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get('products/show')
    .map(res => res.json())
  }

}
