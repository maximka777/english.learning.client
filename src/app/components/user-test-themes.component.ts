import {Component} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {WordsService} from "../services/words.service";
import {TestThemesService} from "../services/test-themes.service";
import {TestsService} from "../services/tests.service";

@Component({
  selector: 'user-test-themes',
  templateUrl: 'templates/user-test-themes.component.html',
  styleUrls: ['styles/user-test-themes.component.css']
})
export class UserTestThemesComponent {
  themes = [];
  tests = null;
  selectedThemeId: number;
  selectedTestId: number;

  constructor(private testThemesService: TestThemesService,
              private testsService: TestsService) {
    testThemesService.getAll()
      .then((themes: [any]) => {
        this.themes = themes;
      });
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
