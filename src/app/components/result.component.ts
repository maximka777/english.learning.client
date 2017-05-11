import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'result',
  templateUrl: './templates/result.component.html',
  styleUrls: ['./styles/result.component.css']
})
export class ResultComponent {
  @Input() rightCount: number;
  @Input() totalCount: number;
  @Input() onOKCallback;

  isGoodResult() {
    const result = this.rightCount / this.totalCount;
    if(result > 0.5) {
      return true;
    } else {
      return false;
    }
  }

  getMessage() {
    if(this.isGoodResult()) {
      return 'Молодец!'
    } else {
      return 'Плохо';
    }
  }
}
