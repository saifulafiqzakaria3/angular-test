import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    const email = form.value.userEmail;
    const password = form.value.userPassword;
    let authObservable: Observable<AuthResponseData>;

    if (!this.isLoginMode) {
      //Sign Up Mode
      authObservable = this.authService.signUp(email, password);

    } else {
      //Login Mode
      authObservable = this.authService.signIn(email, password);
    }

    authObservable.subscribe(
      (responseData) => {
        this.isLoading = false;
        this.errorMessage = null
        this.router.navigate(['/'])
      },
      (errorMes) => {
        this.errorMessage = errorMes;
        this.isLoading = false;
      }
    );

    //form.reset();
    //console.log(form);
  }

}
