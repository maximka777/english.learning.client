import {Injectable, Inject} from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class AlertService {
  messages = [];

  showSuccessMessage(message) {
    while(this.messages.length > 2) {
      this.messages.shift();
    }
    this.messages.push({
      message,
      isSuccess: true,
    });
    this.setTimeout();
  }

  showErrorMessage(message) {
    while(this.messages.length > 2) {
      this.messages.shift();
    }
    this.messages.push({
      message,
      isSuccess: false,
    });
    this.setTimeout();
  }

  setTimeout() {
    setTimeout(() => {
      this.messages.shift();
    }, 9000);
  }
}

