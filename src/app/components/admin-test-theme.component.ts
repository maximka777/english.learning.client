import {Component} from '@angular/core';
import {TestThemesService} from "../services/test-themes.service";
import {TestsService} from "../services/tests.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TestTheme} from "../models/TestTheme";
import {Test} from "../models/Test";

@Component({
  selector: 'admin-test-theme',
  templateUrl: 'templates/admin-test-theme.component.html',
  styleUrls: ['styles/admin-test-theme.component.css']
})
export class AdminTestThemeComponent {
  themeId: Number;
  theme: TestTheme;
  currentTest: Test;
  tests = [];

  constructor(private testsService: TestsService,
              private testThemesService: TestThemesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    activatedRoute.params.subscribe((params: Params) => {
      this.themeId = params['themeId'];
      this.loadTheme();

    });
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


}
