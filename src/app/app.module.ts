import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { UsersComponent } from './Components/users/users.component';
import { ProductsComponent } from './Components/products/products.component';
import { HttpClientModule } from "@angular/common/http";
import {MatDialogModule} from '@angular/material/dialog';
import { UserAddComponent } from './Components/user-add/user-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UserUpdateComponent } from './Components/user-update/user-update.component';
import {MatCardModule} from '@angular/material/card';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductUpdateComponent } from './Components/product-update/product-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    ProductsComponent,
    UserAddComponent,
    UserUpdateComponent,
    ProductAddComponent,
    ProductUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
