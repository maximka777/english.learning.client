import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'error-message',
  templateUrl: './templates/error-message.component.html',
  styleUrls: ['./styles/error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() status: boolean;
  @Input() message: string;

  constructor() { }

}
