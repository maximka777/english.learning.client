import {Component} from '@angular/core';
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'alert-message',
  templateUrl: 'templates/alert-message.component.html',
  styleUrls: ['styles/alert-message.component.css']
})
export class AlertMessageComponent {
  messages = [];

  constructor(private alertService: AlertService) {
    setTimeout(() => {
      this.messages.shift();
    }, 500);
    this.alertService.broadcasted.subscribe( (data) =>  {
      if(this.messages.length === 3) {
        this.messages[0].removed = true;
      }
      this.messages.push(data);
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    });
  }
}
