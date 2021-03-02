import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoggedInHomeComponent } from './logged-in-home/logged-in-home.component';
import { ProfileComponent } from './logged-in-home/profile/profile.component';
import { ChangePasswordComponent } from './logged-in-home/change-password/change-password.component';
import { ProductComponent } from './logged-in-home/product/product.component';
import { ProductDetailComponent } from './logged-in-home/product/product-detail/product-detail.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { LoggedInChildGuard } from './authentication/logged-in-child.guard';

//if login, http://localhost:4200/ become loggedinHome Page
//if not yet login when first reload,  http://localhost:4200/ go to goggle dashboard,
//if navigate to other children without logging in, show unauthorized

const routes: Routes = [
  // { path: '', redirectTo: '/Dashboard', pathMatch: 'full' },
    // { path: '', component: LoggedInHomeComponent, canActivate:[AuthGuard], children: [
  //   { path: 'MyProfile', component: ProfileComponent},
  //   { path: 'ChangePassword', component: ChangePasswordComponent},
  //   { path: 'Product', component: ProductComponent},
  //   {
  //     path: 'Product/:id',
  //     component: ProductDetailComponent,
  //   },
  // ]},

  { path: '', component: LoggedInHomeComponent, canActivate: [AuthGuard] },
  {
    path: 'MyProfile',
    component: ProfileComponent,
    canActivate: [LoggedInChildGuard],
  },
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent,
    canActivate: [LoggedInChildGuard],
  },
  {
    path: 'Product',
    component: ProductComponent,
    canActivate: [LoggedInChildGuard],
  },
  {
    path: 'Product/:id',
    component: ProductDetailComponent,
    canActivate: [LoggedInChildGuard]
  },

  { path: 'Dashboard', component: DashboardComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'ForgetPassword', component: ForgetPasswordComponent },
  { path: 'Unauthorized', component: UnauthorizedPageComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
