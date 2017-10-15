import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'
import { ValidateService } from '../services/validate.service'
import { CreateProductService } from '../services/create-product.service'



const URL = '/products/upload';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productTypes = ["Guitars","Bass Guitars","Drums"];

  picUrl: string = ''
  title: string =''
  type: string = ''
  quantity: number
  price: number
  description: string = ''

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private createProductService: CreateProductService,
    private router: Router
  ) {}

  ngOnInit() {
     //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
     this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
     //overide the onCompleteItem property of the uploader so we are
     //able to deal with the server response.
     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          this.picUrl = response
      };
  }
  onProductSubmit() {
    const product = {
      title: this.title,
      type: this.type,
      picUrl: this.picUrl,
      price: this.price,
      quantity: this.quantity,
      description: this.description
    }
    if(!this.validateService.validateProduct(product)) {
      this.flashMessage.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 3000})
      return false
    }

    if(!this.validateService.validateUpload(product.picUrl)) {
      this.flashMessage.show('Please upload picture', {cssClass:'alert-danger', timeout: 3000})
      return false
    }

    // Register user
    this.createProductService.createProduct(product).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You added a product', {cssClass:'alert-success', timeout: 3000})
        this.router.navigate(['/'])
      } else {
        this.flashMessage.show('Something went wrong', {cssClass:'alert-danger', timeout: 3000})
      }
    })

  }

}
