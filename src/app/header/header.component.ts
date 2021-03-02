import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentTime: number = 0;
  name: string = '';
  isLoggedIn: boolean = false;
  userSubscription: Subscription;

  constructor(private authService: AuthenticationService, private router: Router) {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 1);
   }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user)=> {
      //if user is null, then false
      this.isLoggedIn = !user ? false : true;
      if (user) {
        this.name= user.email.substr(0, user.email.indexOf('@'));
      }
    });
  }

  onAuthentication(){
    if (!this.isLoggedIn) {
      this.router.navigate(['/SignIn']);
    } else {
      this.authService.logOut();
      this.name = '';
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
