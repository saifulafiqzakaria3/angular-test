import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication/auth.service';
import { ProductService } from './logged-in-home/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-test';
  navigationPath: string;
  isLoggedIn = false;

  routeSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();

    this.userSubscription = this.authService.user.subscribe((user)=> {
      //if user is null, then false
      this.isLoggedIn = !user ? false : true;
    });

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.navigationPath = event.url.substring(1);

        if (this.navigationPath.toLowerCase().includes('product')) {
          //get the last part of url
          const productID = event.url.substring(event.url.lastIndexOf('/') + 1);
          const currentProductListLength = this.productService.getProductList().length;

          //check if it is id number
          if (Number(productID) >= 0 && Number(productID) < currentProductListLength ) {
            //get product object if it is a id number
            const product = this.productService.getProduct(+productID);
            this.navigationPath = this.navigationPath.replace(
              productID,
              product.name
            );
          }
        }
      }
    });

    //get the id
    // console.log(this.route.snapshot.url[this.route.snapshot.url.length - 1].path);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
