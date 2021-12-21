import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../Services/user.service";
import {User} from "../../Models/user.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserAddComponent} from "../user-add/user-add.component";
import {UserUpdateComponent} from "../user-update/user-update.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

   users : User[] = [] ;
  displayedColumns: string[] = ['firstname', 'lastname', 'address', 'actions'];
  dataSource = this.users;

  constructor(
    private userService: UserService ,
    private dialog: MatDialog ,
    private dialog2: MatDialog ,
  ) { }

  ngOnInit(): void {
    this.getUsers()
     // console.log(this.users)
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        result => { this.users = result  } ,
        error => console.log(error) ,
        )
  }

  showUpdateForm(id: string) {
    const dialogConfig2 = new MatDialogConfig() ;
    dialogConfig2.disableClose = false ;
    dialogConfig2.autoFocus = true ;
    dialogConfig2.width = '30%' ;
    dialogConfig2.data = id ;
    dialogConfig2.id = id ;
    this.dialog2.open(UserUpdateComponent , dialogConfig2) ;
    this.dialog2.afterAllClosed
      .subscribe(() => {
        setTimeout(() => {
          this.getUsers() ;
        }, 1000);
      })
  }
  showForm() {
    const dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;
    dialogConfig.width = '30%' ;
    this.dialog.open(UserAddComponent, dialogConfig ) ;
    this.dialog.afterAllClosed
      .subscribe(() => {
        this.getUsers() , console.log('add')
      })
  }

  deleteUser(id : string) {
    this.userService.deleteUser(id).
    subscribe(
      use => { this.getUsers() }
    )
  }
}
