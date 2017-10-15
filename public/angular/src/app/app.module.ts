import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { FileSelectDirective } from 'ng2-file-upload'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { ValidateService } from './services/validate.service'
import { FlashMessagesModule } from 'angular2-flash-messages'
import { AuthService } from './services/auth.service'
import { ProductService } from './services/product.service'
import { UserService } from './services/user.service'
import { CreateProductService } from './services/create-product.service'
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { OrderComponent } from './order/order.component'
import { OrderService } from './services/order.service'

const appRoutes: Routes = [
  {path:'',component: HomeComponent},
  {path:'register',component: RegisterComponent},
  {path:'login',component: LoginComponent},
  {path:'show-orders',component: ShowOrdersComponent, canActivate:[AuthGuard]},
  {path:'profile',component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'add-product', component: ProductComponent},
  {path:'all-products', component: ShowProductsComponent},
  {path:'show-users', component: ShowUsersComponent},
  {path: 'order/:id', component: OrderComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShowOrdersComponent,
    ProfileComponent,
    ProductComponent,
    FileSelectDirective,
    ShowProductsComponent,
    ShowUsersComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, CreateProductService, ProductService, UserService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
