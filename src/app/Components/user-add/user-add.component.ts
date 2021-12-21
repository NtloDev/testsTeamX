import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user.model";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  // @ts-ignore
  userAddForm: FormGroup ;
  user: User = {
    firstname: '',
    lastname: '',
    address: ''
  } ;

  constructor(
    private userService: UserService ,
    public dialogRef: MatDialogRef<UserAddComponent>
  ) { }

  ngOnInit(): void {

    this.userAddForm = new FormGroup(
      {
                firstname: new FormControl(null, Validators.required),
                lastname: new FormControl(null, Validators.required),
                address: new FormControl(null, Validators.required),
      }
    )

  }

  onSubmit() {
    console.log(this.userAddForm.value) ;
    this.userService.createUser(this.userAddForm.value)
      .subscribe(
        result => console.log(result),
        error => console.log(error),
      ),
      this.onClose() ;
  }

  onClose() {
    this.dialogRef.close() ;
  }
}
