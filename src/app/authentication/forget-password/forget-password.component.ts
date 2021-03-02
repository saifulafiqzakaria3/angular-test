import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  isResetEmailSent = false;
  isLoading = false;
  errorMessage: string = null;
  email: string = ''

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onResetPassword(form: NgForm) {
    //take last 8 character from the generated random number in base -36
    // var randomstring = Math.random().toString(36).slice(-8);

    this.isLoading = true;
    this.email = form.value.userEmail;
    let authObservable: Observable<AuthResponseData>;

    authObservable = this.authService.resetPassword(this.email);

    authObservable.subscribe(
      (responseData) => {
        this.isLoading = false;
        this.errorMessage = null
        console.log("Reset Successful");
        this.isResetEmailSent = true
      },
      (errorMes) => {
        this.errorMessage = errorMes;
        this.isLoading = false;
        console.log("Reset Failed");
        this.isResetEmailSent = false;
      }
    );
  }

}
