import {Component} from '@angular/core';
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'alert-message',
  templateUrl: 'templates/alert-message.component.html',
  styleUrls: ['styles/alert-message.component.css']
})
export class AlertMessageComponent {
  constructor(private alertService: AlertService) {}
}
