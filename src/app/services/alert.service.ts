import {Injectable, Inject} from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class AlertService {
  broadcasted = null;
  constructor() {
    this.broadcasted = new Rx.Subject();
  }

  showMessage(data) {
    this.broadcasted.next(data);
  }
}

