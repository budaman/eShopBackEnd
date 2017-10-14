import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service'
import { ValidateService } from '../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  constructor(
    private userService : UserService,
    private router: Router,
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService
  ) { }

  users: any[]
  loading = true
  updateForm = false
  name: string
  lastname: string
  email: string
  _id: string

  ngOnInit() {
    var temp: any[]
    this.userService.getUsers()
    .subscribe(
      data => temp = data,
      error => alert(error),
      () => {
        this.users = temp
        this.loading = false
        console.log(this.users)
      }
    )
  }

  deleteUser(id) {
    this.userService.deleteUser(id).then((result) => {
       this.router.navigate(['/']);
    }, (err) => {
  console.log(err);
});
  }

  updateUser(user) {
      this.updateForm = !this.updateForm
      if(this.updateForm) {
        this.name = user.name
        this.lastname = user.lastname
        this.email = user.email
        this._id = user._id
      } else {
        this.name = null
        this.lastname = null
        this.email = null
        this._id = null
      }
  }

  submitUpdate() {
   let obj = {
      _id: this._id,
      name: this.name,
      lastname: this.lastname,
      email: this.email
    }

    console.log(obj)

    if(!this.validateService.validateUser(obj)) {
      this.flashMessage.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 3000})
      return false
    }

    if(!this.validateService.validateEmail(obj.email)) {
      this.flashMessage.show('Please provide valid email', {cssClass:'alert-danger', timeout: 3000})
      return false
    }

    this.userService.updateUser(obj._id, obj).then((result) => {
      let id = result['_id'];
      }, (err) => {
        console.log(err);
      });

    this.updateForm = !this.updateForm
    this.router.navigate(['/']);

    console.log(obj)
  }

}
