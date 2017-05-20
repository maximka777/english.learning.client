import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WordThemesService} from "../services/word-themes.service";

import * as _ from 'lodash';
import {TestsService} from "../services/tests.service";
import {TestResultsService} from "../services/test-results.service";
import {TestResult} from "../models/TestResult";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";

@Component({
  moduleId: module.id,
  selector: 'test',
  templateUrl: './templates/test.component.html',
  styleUrls: ['./styles/test.component.css']
})
export class TestComponent implements OnInit {
  test = null;
  currentQuestion = null;
  currentQuestionIndex: number;
  totalQuestionCount: number;

  result = {
    isActive: false,
    rightCount: 0,
    totalCount: 0
  };

  onOKCallback = this.back.bind(this);

  message: string = '';
  isRight: boolean = false;

  constructor(private testsService: TestsService,
              private testResultsService: TestResultsService,
              private authService: AuthService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    activatedRoute.params.subscribe((params) => {
      testsService.getOne(params['testId'])
        .then((test: any) => {
          this.currentQuestionIndex = 0;
          this.test = test;
          this.test.questions = _.shuffle(this.test.questions.filter(question => !!question.answers.length));
          this.totalQuestionCount = this.test.questions.length;
          this.result.totalCount = this.test.questions.length;
          this.currentQuestion = test ? this.test.questions.pop() : null;
        });
    });
  }

  ngOnInit() {
    if(!this.authService.isLogged()) {
      return this.authService.navigateToLogin();
    }
  }

  back() {
    this.router.navigate(['/test-themes']);
  }

  setMessage(isRight) {
    this.isRight = isRight;
    this.message = isRight ? 'Правильно' : 'Неправильно';
    setTimeout(() => {
      this.message = '';
    }, 500);
  }

  selectAnswer(answer) {
    if(answer.isCorrect) {
      this.result.rightCount++;
      this.setMessage(true);
    } else {
      this.setMessage(false);
    }
    this.currentQuestionIndex++;
    setTimeout(() => {
      this.currentQuestion = this.test.questions.length ? this.test.questions.pop() : null;
      if(!this.currentQuestion) {
        this.handleEndOfTest();
      }
    }, 500);
  }

  handleEndOfTest() {
    this.testResultsService.createOne(new TestResult(this.test.id, this.authService.user.id, this.result.rightCount, this.totalQuestionCount))
      .then(() => {
        console.log('test result is saved');
      })
      .catch(() => {
        this.alertService.showErrorMessage('Ошибка при сохранении результата. Результат не будет сохранён.');
      });
    this.result.isActive = true;
  }
}
