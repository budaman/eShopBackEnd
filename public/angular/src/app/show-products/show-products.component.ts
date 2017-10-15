import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service'
import { ValidateService } from '../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  constructor(
    private productService : ProductService,
    private router: Router,
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService,
    private authService: AuthService
   ) { }
    products: any[]
    loading = true
    updateForm = false
    productTypes = ['Guitar', 'Bass Guitar', 'Drums']
    title: string
    type: string
    quantity: number
    price: number
    description: string
    _id: string



    ngOnInit() {
      var temp: any[]
      this.productService.getProducts()
      .subscribe(
        data => temp = data,
        error => alert(error),
        () => {
          this.products = temp
          this.loading = false
        }
      )
      }

      deleteProduct(id) {
        this.productService.deleteProduct(id).then((result) => {
           this.router.navigate(['/']);
        }, (err) => {
      console.log(err);
  });
      }

      updateProduct(product) {
          this.updateForm = !this.updateForm
          if(this.updateForm) {
            this.type = product.type
            this.title = product.title
            this.quantity = product.quantity
            this.price = product.price
            this.description = product.description
            this._id = product._id
          } else {
            this.type = null
            this.title = null
            this.quantity = null
            this.price = null
            this.description = null
            this._id = null
          }
      }

      submitUpdate() {
       let obj = {
          _id: this._id,
          type: this.type,
          title: this.title,
          quantity: this.quantity,
          price: this.price,
          description: this.description
        }

        if(!this.validateService.validateProduct(obj)) {
          this.flashMessage.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 3000})
          return false
        }

        this.productService.updateProduct(obj._id, obj).then((result) => {
          let id = result['_id'];
          }, (err) => {
            console.log(err);
          });

        this.updateForm = !this.updateForm
        this.router.navigate(['/']);

      }
    }
