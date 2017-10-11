import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { GetService } from '../services/get.services'

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private getService : GetService
   ) { }
    products: any[]
    loading = true


    ngOnInit() {
      var temp: any[]
      this.getService.getProducts()
      .subscribe(
        data => temp = data,
        error => alert(error),
        () => {
          this.products = temp
          this.loading = false
          console.log(this.products)
        }
      )
      }

      deleteProduct(id) {
        this.authService.deleteProduct(id)
      }



    }
