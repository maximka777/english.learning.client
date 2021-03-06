import {Component, OnInit} from '@angular/core';
import {WordsService} from "../services/words.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WordThemesService} from "../services/word-themes.service";

import * as _ from 'lodash';
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'words-train',
  templateUrl: './templates/words-train.component.html',
  styleUrls: ['./styles/words-train.component.css']
})
export class WordsTrainComponent implements OnInit {
  words = [];
  wordsForTrain = [];
  currentWords = [];
  currentRussianWords = [];
  currentEnglishWords = [];
  theme = null;
  result = {
    isActive: false,
    rightCount: 0,
    totalCount: 0
  };

  onOKCallback = this.back.bind(this);

  message: string = '';
  isRight: boolean = false;

  selectedRussianWord = null;
  selectedEnglishWord = null;

  constructor(private wordsService: WordsService,
              private activatedRoute: ActivatedRoute,
              private wordThemesService: WordThemesService,
              private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
    activatedRoute.params.subscribe((params) => {
      wordThemesService.getOne(params['themeId'])
        .then((theme: any) => {
          this.theme = theme;
          if(theme) {
            wordsService.getAll(theme.id)
              .then((words: any) => {
                this.words = _.shuffle(words);
                // this.result.totalCount = this.words.length;
                this.currentWords = words.slice(0, 5);
                this.words.splice(0, 5);
                this.currentEnglishWords = _.shuffle(this.currentWords.map(word => word.english));
                this.currentRussianWords = _.shuffle(this.currentWords.map(word => word.russian));
              });
          }
        });
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

  selectRussianWord(word) {
    this.selectedRussianWord = word;
    this.checkSelectedWords();
  }

  selectEnglishWord(word) {
    this.selectedEnglishWord = word;
    this.checkSelectedWords();
  }

  getTranslation(russianWord) {
    return this.currentWords.find(word => word.russian === russianWord).english;
  }

  checkSelectedWords() {
    if(this.selectedEnglishWord && this.selectedRussianWord) {
      this.result.totalCount++;
      if(this.getTranslation(this.selectedRussianWord) === this.selectedEnglishWord) {
        this.setMessage(true);
        this.result.rightCount++;
        this.currentEnglishWords.splice(this.currentEnglishWords.indexOf(this.selectedEnglishWord), 1);
        this.currentRussianWords.splice(this.currentRussianWords.indexOf(this.selectedRussianWord), 1);
        if(!this.words.length && !this.currentRussianWords.length) {
          // setTimeout(() => this.back(), 2000);
          this.result.isActive = true;
        }
      } else {
        this.setMessage(false);
      }
      this.selectedEnglishWord = null;
      this.selectedRussianWord = null;
    }
  }

  back() {
    this.router.navigate(['/word-themes']);
  }

  setMessage(isRight) {
    this.isRight = isRight;
    this.message = isRight ? 'Правильно' : 'Неправильно';
    // const data = {
    //   success: this.isRight ? this.message : null,
    //   error: !this.isRight ? this.message : null
    // }
    // isRight ? this.alertService.showSuccessMessage('Правильно') : this.alertService.showErrorMessage('Неправильно');
    setTimeout(() => {
      this.message = '';
    }, 1000);
  }
}
