import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'admin-panel',
  templateUrl: 'templates/admin-panel.component.html',
  styleUrls: ['styles/admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  WORD_THEMES_PAGE = 'word-themes';
  TEST_THEMES_PAGE = 'test-themes';

  activePage = this.WORD_THEMES_PAGE;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.activePage = params['page'] === this.TEST_THEMES_PAGE ? this.TEST_THEMES_PAGE : this.WORD_THEMES_PAGE;
    });
  }

  ngOnInit() {
    if(!this.authService.isLogged()) {
      return this.authService.navigateToLogin();
    }
    if(!this.authService.isAdmin()) {
      return this.authService.navigateToUserRoot();
    }
  }

  changeActivePage(url) {
    this.activePage = url;
  }
}
