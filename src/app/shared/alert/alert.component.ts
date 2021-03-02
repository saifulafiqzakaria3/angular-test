import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']

})

export class AlertComponent {
  message: string = "Warning!"
  @Output() alertIsClosed = new EventEmitter<boolean>();


  onCloseButtonTapped(){
    this.alertIsClosed.emit(true);
  }
}
