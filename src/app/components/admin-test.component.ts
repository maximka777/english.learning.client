import {Component, OnInit} from '@angular/core';
import {TestsService} from "../services/tests.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {QuestionsService} from "../services/questions.service";
import {Question} from "../models/Question";
import {Answer} from "../models/Answer";
import {Location} from '@angular/common';
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'admin-test-questions',
  templateUrl: 'templates/admin-test.component.html',
  styleUrls: ['styles/admin-test.component.css']
})
export class AdminTestComponent implements OnInit {
  testId: Number;
  test: any;
  currentQuestion: Question;
  isAddQuestionFormActive = false;
  validationError = null;

  constructor(private testsService: TestsService,
              private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private location: Location,
              private alertService: AlertService) {
    activatedRoute.params.subscribe((params: Params) => {
      this.testId = params['testId'];
      this.loadTest();
    });
    this.resetValidationError();
  }

  ngOnInit() {
    if(!this.authService.isLogged()) {
      return this.authService.navigateToLogin();
    }
    if(!this.authService.isAdmin()) {
      return this.authService.navigateToUserRoot();
    }
  }

  loadTest() {
    this.testsService.getOne(this.testId)
      .then((test: any) => {
        this.test = test;
      });
  }

  removeTest() {
    this.testsService.remove(this.testId)
      .then(() => {
        this.alertService.showSuccessMessage('Тест удалён.');
        this.back();
      })
      .catch(() => {
        this.alertService.showErrorMessage('Ошибка при удлении теста.');
      });
  }

  back() {
    this.router.navigate([`/admin/test-theme/${this.test.topicId}`]);
  }

  submitAddQuestionForm() {
    this.validateQuestion();
    if(!this.isValidQuestion()) return;
    this.questionsService.addQuestion(this.currentQuestion)
      .then(question => {
        this.test.questions.push(question);
        this.alertService.showSuccessMessage('Вопрос добавлен.');
        this.toggleAddQuestionForm();
        this.resetValidationError();
      })
      .catch(() => {
        this.alertService.showErrorMessage('Ошибка при добавлении вопроса.');
      });
  }

  toggleAddQuestionForm() {
    if(this.isAddQuestionFormActive) {
      this.isAddQuestionFormActive = false;
    } else {
      this.isAddQuestionFormActive = true;
      this.resetValidationError();
      this.currentQuestion = new Question(this.testId);
    }
  }

  addAnswer() {
    this.currentQuestion.answers.push(new Answer());
    this.validationError.answers.push({
      status: false,
      message: 'Введите текст ответа'
    });
  }

  deleteAnswer(index) {
    this.currentQuestion.answers.splice(index, 1);
    this.validationError.answers.splice(index, 1);
  }

  removeQuestion(question) {
    this.questionsService.remove(question.id)
      .then(() => {
        this.alertService.showSuccessMessage('Вопрос удалён.');
        this.test.questions = this.test.questions.filter(q => q.id !== question.id);
      })
      .catch(() => {
        this.alertService.showErrorMessage('Ошибка при удалении вопроса.');
      });
  }

  hasOnlyOneCorrect(answers) {
    let has = false;
    let errorStatus = false;

    answers.forEach(answer => {
      if(answer.isCorrect && has) {
        errorStatus = true;
      } else if(answer.isCorrect) {
        has = true;
      }
    });
    return errorStatus || !has;
  }

  validateQuestion() {
    this.validationError.questionText.status = !this.currentQuestion.questionText.length;
    this.validationError.oneCorrect.status = this.hasOnlyOneCorrect(this.currentQuestion.answers);

    for(let i = 0; i < this.validationError.answers.length; i++) {
        this.validationError.answers[i].status = !this.currentQuestion.answers[i].answerText.length;
    }
  }

  isValidQuestion() {
    return !this.validationError.questionText.status
      && !this.validationError.oneCorrect.status
      && !this.validationError.answers.some(e => e.status);
  }

  resetValidationError() {
    this.validationError = {
      questionText: {
        status: false,
        message: 'Введите текст вопроса'
      },
      oneCorrect: {
        status: false,
        message: 'Должен быть один правильный ответ'
      },
      answers: [{
        status: false,
        message: 'Введите текст ответа'
      }],
    };
  }
}
