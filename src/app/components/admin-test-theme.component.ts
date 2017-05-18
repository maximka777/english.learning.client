import {Component, OnInit} from '@angular/core';
import {TestThemesService} from "../services/test-themes.service";
import {TestsService} from "../services/tests.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TestTheme} from "../models/TestTheme";
import {Test} from "../models/Test";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'admin-test-theme',
  templateUrl: 'templates/admin-test-theme.component.html',
  styleUrls: ['styles/admin-test-theme.component.css']
})
export class AdminTestThemeComponent implements OnInit {
  themeId: Number;
  theme: TestTheme;
  currentTest: Test;
  tests = [];

  constructor(private testsService: TestsService,
              private testThemesService: TestThemesService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    activatedRoute.params.subscribe((params: Params) => {
      this.themeId = params['themeId'];
      this.loadTheme();

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

  loadTheme() {
    this.testThemesService.getOne(this.themeId)
      .then((theme: any) => {
        this.theme = theme;
        this.currentTest = new Test(this.themeId);
        this.loadTests();
      });
  }

  loadTests() {
    this.testsService.getAll(this.themeId)
      .then((tests: [any]) => {
        this.tests = tests;
      });
  }

  submitAddTestForm() {
    this.validateTest();
    if(!this.isValidTest()) return;
    this.testsService.createOne(this.currentTest)
      .then(data => {
        this.tests.push(Object.assign({}, data));
        this.currentTest = new Test(this.themeId);
      });
  }

  back() {
    this.router.navigate(['/admin/test-themes']);
  }

  removeTest(testId) {
    this.testsService.remove(testId)
      .then(data => {
        this.tests = this.tests.filter(test => test.id !== testId);
      });
  }

  removeTestTheme() {
    this.testThemesService.remove(this.themeId)
      .then(data => {
        this.router.navigate(['/admin/test-themes']);
      });
  }

  validationError = {
    name: {
      status: false,
      message: 'Введите название теста'
    }
  };

  validateTest() {
    this.validationError.name.status = !this.currentTest.name.length;
  }

  isValidTest() {
    return !this.validationError.name.status;
  }
}
