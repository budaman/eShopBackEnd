import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service'
import { AuthService } from '../services/auth.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ProductService } from '../services/product.service'
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
  constructor(
    private productService : ProductService,
    private router : Router,
    private route : ActivatedRoute,
    private orderService : OrderService,
    private authService : AuthService
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
     console.log(this.product)
    })
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user
      console.log(this.user)
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

  buyProduct() {
    console.log('labas')
  }

}
