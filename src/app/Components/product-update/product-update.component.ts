import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../Services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../Models/product.model";
import {ProductService} from "../../Services/product.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  // @ts-ignore
  productUpdateForm: FormGroup ;
  // @ts-ignore
  image ;
  // @ts-ignore
  image2 ;
  product: Product = {
    name: '',
    price: 0,
    quantity: 0,
    image: ''
  } ;
  constructor(
    private productService: ProductService ,
    public dialogRef2: MatDialogRef<ProductUpdateComponent>,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.getOneProduct() ;
    this.productUpdateForm = new FormGroup(
      {
        name: new FormControl(null),
        price: new FormControl(null),
        quantity: new FormControl(null),
        image: new FormControl(null),
      }
    )
  }

  // @ts-ignore
  onAddImage(image) {
    this.image = image.target.files[0] ;

  }

  getOneProduct() {
    this.productService.getOneProduct(this.dialogRef2.id)
      .subscribe(
        result => {
          this.product = result ,
        //    console.log(result) ;
            this.image2 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${result.image}`)
        },
        error => {console.log(error) }
      )
  }

  get f() { return this.productUpdateForm.controls }

  onSubmit() {
    const formData = new FormData() ;
    if (this.f['name'].value) {
      formData.append('name', this.f['name'].value) ;
    }
    if (this.f['price'].value) {
      formData.append('price', this.f['price'].value) ;
    }
    if (this.f['quantity'].value) {
      formData.append('quantity', this.f['quantity'].value) ;
    }
    if (this.image) {
      formData.append('image', this.image) ;
    }
    console.log(formData.getAll('image')) ;
    this.productService.updateProduct(this.dialogRef2.id, formData)
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
