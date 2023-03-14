import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
=======
>>>>>>> 27e8e5edcef4143a3949e6cf63b999527986ada4

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
<<<<<<< HEAD
    ProductDeleteComponent,
    LoginComponent
=======
    ProductDeleteComponent
>>>>>>> 27e8e5edcef4143a3949e6cf63b999527986ada4
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
