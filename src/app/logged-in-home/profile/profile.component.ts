import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  nickName: string;
  userSubscription: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.nickName= user.email.substr(0, user.email.indexOf('@'));
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
