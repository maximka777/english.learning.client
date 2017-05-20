import {Component, OnInit, ViewChild} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {TestTheme} from "../models/TestTheme";
import {WordsService} from "../services/words.service";
import {TestThemesService} from "../services/test-themes.service";
import {TestsService} from "../services/tests.service";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";
import {ModalDirective} from "ng2-bootstrap";

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
  currentTheory: String;
  theme: TestTheme;

  @ViewChild('theoryModal') public theoryModal: ModalDirective;

  constructor(private testThemesService: TestThemesService,
              private authService: AuthService,
              private testsService: TestsService,
              private alertService: AlertService
  ) {
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

  openTheoryModalForView() {
    if(!this.selectedThemeId) {
      return this.alertService.showErrorMessage('Не одна тема не выбрана') ;
    }
    if(!this.currentTheory || !this.currentTheory.length) {
      return this.alertService.showErrorMessage('Отсутствует теория по данной теме') ;
    }
    this.openTheoryModal();
  }

  openTheoryModal() {
    this.theoryModal.show();
  }

  closeTheoryModal() {
    this.theoryModal.hide();
  }

  onTheoryFormClose() {
    this.closeTheoryModal();
  }

  selectTestTheme(themeId) {
    this.selectedThemeId = themeId;
    this.testsService.getAll(themeId)
      .then(tests => {
        this.tests = tests;
        this.theme = this.themes.filter(t => t.id === themeId)[0];
        this.currentTheory = this.theme.theory;
      });
  }

  selectTest(testId) {
    this.selectedTestId = testId;
  }
}
