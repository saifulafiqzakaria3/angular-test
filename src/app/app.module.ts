import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInHomeComponent } from './logged-in-home/logged-in-home.component';
import { ProfileComponent } from './logged-in-home/profile/profile.component';
import { ChangePasswordComponent } from './logged-in-home/change-password/change-password.component';
import { ProductComponent } from './logged-in-home/product/product.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ProductDetailComponent } from './logged-in-home/product/product-detail/product-detail.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SignInComponent,
    ForgetPasswordComponent,
    LoggedInHomeComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ProductComponent,
    AlertComponent,
    ProductDetailComponent,
    UnauthorizedPageComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
