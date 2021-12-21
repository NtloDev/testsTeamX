import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./Components/products/products.component";
import {UsersComponent} from "./Components/users/users.component";

const routes: Routes = [

  { path: '', component: ProductsComponent },
  { path: 'app-users', component: UsersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
