import { Component, OnInit } from '@angular/core';
import {Product} from "../../Models/product.model";
import {ProductService} from "../../Services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserUpdateComponent} from "../user-update/user-update.component";
import {ProductAddComponent} from "../product-add/product-add.component";
import {ProductUpdateComponent} from "../product-update/product-update.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // @ts-ignore
//  imageSource ;
  products : Product[] = [] ;
  spinner = true ;

  constructor(
    private productService : ProductService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog ,
    private dialog2: MatDialog ,
  ) { }

  ngOnInit(): void {
    this.getProducts() ;
  //  this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        result => {
          this.products = [] ;
          for (let res of result) {
           // res.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.image}`) ,
           //  console.log(res.id) ;
            this.products.push({
              _id: res._id,
              name: res.name,
              price: res.price,
              quantity: res.quantity,
              image: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.image}`) ,
            })
          }
          this.spinner = false ;
        //  this.products = result , console.log(result)
        } ,
        error => console.log(error) ,
      )
  }
  showUpdateForm(_id: string) {
    const dialogConfig2 = new MatDialogConfig() ;
    dialogConfig2.disableClose = false ;
    dialogConfig2.autoFocus = true ;
    dialogConfig2.width = '30%' ;
    dialogConfig2.data = _id ;
    dialogConfig2.id = _id ;
    this.dialog2.open(ProductUpdateComponent , dialogConfig2) ;
    this.dialog2.afterAllClosed
      .subscribe(() => {
        setTimeout(() => {
          this.getProducts() ;
        }, 1000);
      })
  }
  showForm() {
    const dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = false ;
    dialogConfig.autoFocus = true ;
    dialogConfig.width = '30%' ;
    this.dialog.open(ProductAddComponent, dialogConfig ) ;
    this.dialog.afterAllClosed
      .subscribe(() => {
        this.spinner = true ;
        setTimeout(() => {
          this.getProducts()  ;
        }, 1500);
      })
  }

  deleteProduct(_id : string) {
    this.spinner = true;
    this.productService.deleteProduct(_id).
    subscribe(
      use => {
          this.getProducts()  ;
      }
    )
  }

}
