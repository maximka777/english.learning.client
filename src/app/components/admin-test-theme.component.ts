import {Component, OnInit, ViewChild} from '@angular/core';
import {TestThemesService} from "../services/test-themes.service";
import {TestsService} from "../services/tests.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TestTheme} from "../models/TestTheme";
import {Test} from "../models/Test";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";
import {ModalDirective} from "ng2-bootstrap";

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
  currentTheory: String;

  @ViewChild('theoryModal') public theoryModal: ModalDirective;

  constructor(private testsService: TestsService,
              private testThemesService: TestThemesService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService
  ) {
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
        this.currentTheory = this.theme.theory;
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

  openTheoryModalForAdd() {
    this.currentTheory = this.theme.theory || '';
    this.openTheoryModal();
  }

  openTheoryModal() {
    this.theoryModal.show();
  }

  closeTheoryModal() {
    this.theoryModal.hide();
  }

  onTheoryFormSubmit() {
    this.testThemesService.updateTheory(this.themeId, this.currentTheory)
      .then(theme => {
        this.alertService.showSuccessMessage('теория сохранена успешно');
        this.restoreState(theme);
      })
      .catch((err) => {
        this.closeTheoryModal();
        const error_message = JSON.parse(err._body).data;
        this.alertService.showErrorMessage(error_message);
      });
  }

  onTheoryFormClose() {
    this.closeTheoryModal();
  }

  restoreState(theme) {
    this.closeTheoryModal();
    this.theme = theme;
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
