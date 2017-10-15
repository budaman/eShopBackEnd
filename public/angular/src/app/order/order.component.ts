import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service'
import { AuthService } from '../services/auth.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ProductService } from '../services/product.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidateService } from '../services/validate.service'

import 'rxjs/add/operator/switchMap'



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
user: Object
product: Object
loading: Boolean = true
productId: Object
quantity: number = 1

  constructor(
    private productService : ProductService,
    private router : Router,
    private route : ActivatedRoute,
    private orderService : OrderService,
    private authService : AuthService,
    private flashMessage : FlashMessagesService,
    private validateService : ValidateService
  ) { }

  ngOnInit() {
    this.product = this.orderService.product
    if(!this.authService.loggedIn())
    {
      this.router.navigate(['/login']);
      return false
    }

    this.route.params.subscribe((params: Params) => {
      this.productId = {
        _id: params['id']
      }
    })
    var temp: any[]
    this.productService.getProduct(this.productId).subscribe(data => {
     this.product = data
    })
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user
    },
    err=> {
      console.log(err)
      return false
    },
    ()=> {
      this.loading = false
    }
  )
  }

  createOrder() {
    if(!this.validateService.validateQuantity(this.quantity, this.product)) {
      this.flashMessage.show('Quantity is not correct', {cssClass:'alert-danger', timeout: 3000})
      return false
    }
    this.orderService.createOrder(this.product, this.user, this.quantity)
    .subscribe(data => {
      if(data.moneyProblem) {
        this.flashMessage.show('You do not have enough money', {cssClass:'alert-danger', timeout: 3000})
        return false
      }
      if(data.quantityProblem) {
        this.flashMessage.show('Not enough items in the shop for your order', {cssClass:'alert-danger', timeout: 3000})
        return false
      } else {
        this.router.navigate(['/all-products']);
      }
    })



  }

}
