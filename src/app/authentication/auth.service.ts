import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../model/user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

  //for changing password purpose
  passwordHash: string;
  providerUserInfo: JSON[];
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //variable
  webApiKey: string = 'AIzaSyA8twCjpBbAQ56Kyy17LZwTJRuvC0QYs3E';
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.webApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+
        this.webApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        //need to calculate for expiration date and set up timer
        const expiredTimeInMillis =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogOut(expiredTimeInMillis);
      }
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/Dashboard']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expiredTimeInMillis: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expiredTimeInMillis);
  }

  changePassword(idToken: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key='+
        this.webApiKey,
        {
          idToken: idToken,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  resetPassword(userEmail: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+
        this.webApiKey,
        {
          requestType: "PASSWORD_RESET",
          email: userEmail,
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    //convert given millis to date
    const convertedExpirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    let newUser = new User(email, userId, token, convertedExpirationDate);
    this.user.next(newUser);

    //save to user default (application memory)
    localStorage.setItem('userData', JSON.stringify(newUser));
    this.autoLogOut(expiresIn * 1000);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
          break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
          break;
    }

    return throwError(errorMessage);
  }
}
