import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../Services/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Models/user.model";
import {Product} from "../../Models/product.model";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  // @ts-ignore
  productAddForm: FormGroup ;
  // @ts-ignore
  image ;
  product: Product = {
    name: '',
    price: 0,
    quantity: 0,
    image: ''
  } ;

  constructor(
    private productService: ProductService ,
    public dialogRef: MatDialogRef<ProductAddComponent>
  ) { }

  ngOnInit(): void {
    this.productAddForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
        image: new FormControl(null, Validators.required),
      }
    )
  }

  // @ts-ignore
  onAddImage(image) {
    this.image = image.target.files[0] ;

  }

  get f() { return this.productAddForm.controls }
  onSubmit() {
    const formData = new FormData() ;
    formData.append('name', this.f['name'].value) ;
    formData.append('price', this.f['price'].value) ;
    formData.append('quantity', this.f['quantity'].value) ;
    formData.append('image', this.image) ;
    this.productService.createProduct(formData)
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
