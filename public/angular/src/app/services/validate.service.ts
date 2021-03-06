import { Injectable } from '@angular/core';


@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.name == undefined || user.lastname == undefined
      || user.username == undefined || user.password == undefined
      || user. money == undefined || user.email == undefined
    ) {
      return false
    } else {
      return true
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateProduct(product){
    if(product.title == undefined || product.type == undefined
      || product.description == undefined || product.quantity == undefined
      || product.price == undefined
    ) {
      return false
    } else {
      return true
    }
  }

  validateUpload(picUrl){
    if(picUrl=='') {
      return false
    } else {
      return true
    }
  }

  validateUser(user) {
    if(user.name == undefined || user.lastname == undefined || user.email == undefined ) {
      return false
    } else {
      return true
    }
  }

  validateQuantity(quantity, product) {
    if(quantity <= 0 || quantity>product.quantity) {
      return false
    } else {
      return true
    }
  }


}
