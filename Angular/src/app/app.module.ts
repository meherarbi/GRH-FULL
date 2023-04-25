import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { UserComponent } from './components/user/user.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptor } from './TokenInterceptor';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadComponent } from './components/upload/upload.component';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveFormComponent } from './components/leave/leave-create/leave-form/leave-form.component';




export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    allowedDomains: [environment.Domain], 
    disallowedRoutes: [`${environment.apiURL}/login`], 
  };
}
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductCreateComponent,
    LoginComponent,
    UserComponent,
    ThemeSwitcherComponent,
    HomeComponent,
    RegisterComponent,
    UploadComponent,
    LeaveComponent,
    LeaveFormComponent
    
  ],
  imports: [BrowserModule, ReactiveFormsModule ,FileUploadModule, AppRoutingModule, HttpClientModule, 
FormsModule,JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),],
  exports: [HttpClientModule, JwtModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
