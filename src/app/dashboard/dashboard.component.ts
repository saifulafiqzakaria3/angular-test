import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public innerHeight: number;
  isFirstTimeDashboardLoading: boolean;

  constructor() {}

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.isFirstTimeDashboardLoading = JSON.parse(
      localStorage.getItem('isFirstTimeDashboardLoading')
    );

    if (this.isFirstTimeDashboardLoading === null) {
      this.isFirstTimeDashboardLoading = true;
      localStorage.setItem(
        'isFirstTimeDashboardLoading',
        JSON.stringify(this.isFirstTimeDashboardLoading)
      );
    }

    // this.isFirstTimeDashboardLoading = true;
    //   localStorage.setItem(
    //     'isFirstTimeDashboardLoading',
    //     JSON.stringify(this.isFirstTimeDashboardLoading)
    //   );

    console.log(this.isFirstTimeDashboardLoading);
  }

  ngAfterViewInit() {}

  onCloseAlert() {
    this.isFirstTimeDashboardLoading = false;

    //save to user default (application memory)
    localStorage.setItem(
      'isFirstTimeDashboardLoading',
      JSON.stringify(this.isFirstTimeDashboardLoading)
    );
  }
}
