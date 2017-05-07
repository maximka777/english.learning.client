import {Component} from '@angular/core';

@Component({
  selector: 'admin-panel',
  templateUrl: 'templates/admin-panel.component.html',
  styleUrls: ['styles/admin-panel.component.css']
})
export class AdminPanelComponent {
  WORD_THEMES_PAGE = 'word-themes';
  TEST_THEMES_PAGE = 'test-themes';

  activePage = this.WORD_THEMES_PAGE;

  constructor() {}

  changeActivePage(url) {
    this.activePage = url;
  }
}
