import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LeaveFormComponent } from './components/leave/leave-create/leave-form/leave-form.component';
import { LeaveComponent } from './components/leave/leave.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { TimeSheetListComponent } from './components/time-sheet-list/time-sheet-list.component';
import { TimesheetFormComponent } from './components/timesheet-form/timesheet-form.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/:id/edit', component: ProductEditComponent },
  { path: 'users', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'upload', component:UploadComponent},
  { path: 'leave', component:LeaveComponent},
  { path: 'leave-form', component:LeaveFormComponent},
  { path: 'timesheet', component:TimeSheetListComponent},
  { path: 'timesheet-form', component:TimesheetFormComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule],
})
export class AppRoutingModule {}
