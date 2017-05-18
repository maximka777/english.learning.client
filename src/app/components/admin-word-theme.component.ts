import {Component, OnInit} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {Word} from "../models/Word";
import {WordsService} from "../services/words.service";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'admin-word-theme',
  templateUrl: 'templates/admin-word-theme.component.html',
  styleUrls: ['styles/admin-word-theme.component.css']
})
export class AdminWordThemeComponent implements OnInit {
  themeId: Number;
  theme: any;
  currentWord: Word;
  words = [];
  validationError = null;

  constructor(private alertService: AlertService,
              private wordsService: WordsService,
              private authService: AuthService,
              private wordThemesService: WordThemesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    activatedRoute.params.subscribe((params: Params) => {
      this.themeId = params['themeId'];
      this.loadTheme();
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

  loadTheme() {
    this.wordThemesService.getOne(this.themeId)
      .then((theme: any) => {
        this.theme = theme;
        this.currentWord = new Word(this.themeId);
        this.loadWords();
      });
  }

  loadWords() {
    this.wordsService.getAll(this.themeId)
      .then((words: [any]) => {
        this.words = words;
      });
  }

  submitAddWordForm() {
    this.validateWord();
    if(!this.isValidWord()) return;
    this.wordsService.createOne(this.currentWord)
      .then(data => {
        this.alertService.showSuccessMessage('Слово добавлено.');
        this.words.push(Object.assign({}, data));
        this.currentWord = new Word(this.themeId);
      });
  }

  back() {
    this.router.navigate(['/admin/word-themes']);
  }

  removeWord(wordId) {
    this.wordsService.remove(wordId)
      .then(data => {
        this.words = this.words.filter(word => word.id !== wordId);
        this.alertService.showSuccessMessage('Слово удалено.');
      });
  }

  removeWordTheme() {
    this.wordThemesService.remove(this.themeId)
      .then(data => {
        this.router.navigate(['/admin/word-themes']);
        this.alertService.showSuccessMessage('Тема удалена.');
      });
  }

  validateWord() {
    this.validationError.english.status = !this.currentWord.english.length;
    this.validationError.russian.status = !this.currentWord.russian.length;
  }

  isValidWord() {
    return !this.validationError.russian.status
      && !this.validationError.english.status;
  }

  resetValidationError() {
    this.validationError = {
      russian: {
        status: false,
        message: 'Введите перевод'
      },
      english: {
        status: false,
        message: 'Введите слово'
      },
    };
  }
}
