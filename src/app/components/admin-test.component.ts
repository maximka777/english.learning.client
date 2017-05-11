import {Component} from '@angular/core';
import {TestsService} from "../services/tests.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {QuestionsService} from "../services/questions.service";
import {Question} from "../models/Question";
import {Answer} from "../models/Answer";
import {Location} from '@angular/common';

@Component({
  selector: 'admin-test-questions',
  templateUrl: 'templates/admin-test.component.html',
  styleUrls: ['styles/admin-test.component.css']
})
export class AdminTestComponent {
  testId: Number;
  test: any;
  currentQuestion: Question;
  isAddQuestionFormActive = false;

  constructor(private testsService: TestsService,
              private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location) {
    activatedRoute.params.subscribe((params: Params) => {
      this.testId = params['testId'];
      this.loadTest();
    });
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
        this.back();
      });
  }

  back() {
    this.router.navigate([`/admin/test-theme/${this.test.topicId}`]);
  }

  submitAddQuestionForm() {
    this.questionsService.addQuestion(this.currentQuestion)
      .then(question => {
        this.test.questions.push(question);
        this.toggleAddQuestionForm();
      });
  }

  toggleAddQuestionForm() {
    if(this.isAddQuestionFormActive) {
      this.isAddQuestionFormActive = false;
    } else {
      this.isAddQuestionFormActive = true;
      this.currentQuestion = new Question(this.testId);
    }
  }

  addAnswer() {
    this.currentQuestion.answers.push(new Answer());
  }

  deleteAnswer(index) {
    this.currentQuestion.answers.splice(index, 1);
  }

  removeQuestion(question) {
    this.questionsService.remove(question.id)
      .then(() => {
        this.test.questions = this.test.questions.filter(q => q.id !== question.id);
      });
  }
}
