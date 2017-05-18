import {Component, OnInit} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {WordsService} from "../services/words.service";
import {TestThemesService} from "../services/test-themes.service";
import {TestsService} from "../services/tests.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'user-test-themes',
  templateUrl: 'templates/user-test-themes.component.html',
  styleUrls: ['styles/user-test-themes.component.css']
})
export class UserTestThemesComponent implements OnInit {
  themes = [];
  tests = null;
  selectedThemeId: number;
  selectedTestId: number;

  constructor(private testThemesService: TestThemesService,
              private authService: AuthService,
              private testsService: TestsService) {
    testThemesService.getAll()
      .then((themes: [any]) => {
        this.themes = themes;
      });
  }

  ngOnInit() {
    if(!this.authService.isLogged()) {
      return this.authService.navigateToLogin();
    }
    if(this.authService.isAdmin()) {
      return this.authService.navigateToAdminRoot();
    }
  }

  selectTestTheme(themeId) {
    this.selectedThemeId = themeId;
    this.testsService.getAll(themeId)
      .then(tests => {
        this.tests = tests;
      });
  }

  selectTest(testId) {
    this.selectedTestId = testId;
  }
}
