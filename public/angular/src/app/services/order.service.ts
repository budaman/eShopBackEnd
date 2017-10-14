import { Injectable } from '@angular/core';
import { Http } from '@angular/http'


@Injectable()

export class OrderService {

product: Object


orderProduct(product) {
  this.product = product
}

}
