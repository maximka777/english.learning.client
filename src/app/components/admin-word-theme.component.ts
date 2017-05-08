import {Component} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {Word} from "../models/Word";
import {WordsService} from "../services/words.service";
import {Params, ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'admin-word-theme',
  templateUrl: 'templates/admin-word-theme.component.html',
  styleUrls: ['styles/admin-word-theme.component.css']
})
export class AdminWordThemeComponent {
  themeId: Number;
  theme: any;
  currentWord: Word;
  words = [];

  constructor(private wordsService: WordsService,
              private wordThemesService: WordThemesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    activatedRoute.params.subscribe((params: Params) => {
      this.themeId = params['themeId'];
      this.loadTheme();

    });
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
    this.wordsService.createOne(this.currentWord)
      .then(data => {
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
      });
  }

  removeWordTheme() {
    this.wordThemesService.remove(this.themeId)
      .then(data => {
        this.router.navigate(['/admin/word-themes']);
      });
  }
}
