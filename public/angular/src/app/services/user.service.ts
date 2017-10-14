import { Injectable } from '@angular/core';
import { Http } from '@angular/http'


@Injectable()

export class UserService {

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get('users/show')
    .map(res => res.json())
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
        this._http.delete('/users/delete'+ id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateUser(id, data) {
    return new Promise((resolve, reject) => {
       this._http.put('/users/update'+id, data)
         .map(res => res.json())
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });
   });
  }

}
