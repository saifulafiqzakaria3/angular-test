import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  AuthenticationService,
  AuthResponseData,
} from 'src/app/authentication/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  currentUser: User;
  userSubscription: Subscription;

  isLoading = false;
  passwordChangeSuccess = false;
  errorMessage: string = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  onSubmitPasswordChange(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    const newPassword = form.value.newPwd;
    let authObservable: Observable<AuthResponseData>;

    //Login Mode
    authObservable = this.authService.changePassword(this.currentUser.token, newPassword);

    authObservable.subscribe(
      (responseData) => {
        this.isLoading = false;
        this.errorMessage = null;
        this.passwordChangeSuccess = true;
      },
      (errorMes) => {
        this.errorMessage = errorMes;
        this.isLoading = false;
        this.passwordChangeSuccess = false;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
