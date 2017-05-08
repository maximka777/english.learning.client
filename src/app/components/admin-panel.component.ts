import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-panel',
  templateUrl: 'templates/admin-panel.component.html',
  styleUrls: ['styles/admin-panel.component.css']
})
export class AdminPanelComponent {
  WORD_THEMES_PAGE = 'word-themes';
  TEST_THEMES_PAGE = 'test-themes';

  activePage = this.WORD_THEMES_PAGE;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.activePage = params['page'] === this.TEST_THEMES_PAGE ? this.TEST_THEMES_PAGE : this.WORD_THEMES_PAGE;
    });
  }

  changeActivePage(url) {
    this.activePage = url;
  }
}
