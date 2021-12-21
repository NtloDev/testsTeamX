import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Models/user.model";
import {UserService} from "../../Services/user.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  // @ts-ignore
  userUpdateForm: FormGroup ;
  user: User = {
    firstname: '',
    lastname: '',
    address: ''
  } ;

  constructor(
    private userService: UserService ,
    public dialogRef2: MatDialogRef<UserUpdateComponent>
  ) { }

  ngOnInit(): void {
    this.getOneUser() ;
    this.userUpdateForm = new FormGroup(
      {
        firstname: new FormControl('',),
        lastname: new FormControl('',),
        address: new FormControl('',),
      }
    )

  }


  getOneUser() {
    this.userService.getOneUser(this.dialogRef2.id)
      .subscribe(
        result => {this.user = result},
        error => {console.log(error) }
      )
  }

  onSubmit() {
    console.log(this.userUpdateForm.value) ;
    this.userService.updateUser(this.dialogRef2.id, this.userUpdateForm.value)
      .subscribe(
        result => console.log(result),
        error => console.log(error),
      ),
      this.onClose() ;
  }

  onClose() {
    this.dialogRef2.close() ;
  }

}
