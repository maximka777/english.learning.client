import {Component} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {WordsService} from "../services/words.service";

@Component({
  selector: 'user-word-themes',
  templateUrl: 'templates/user-word-themes.component.html',
  styleUrls: ['styles/user-word-themes.component.css']
})
export class UserWordThemesComponent {
  themes = [];
  words = null;
  selectedThemeId: number;

  constructor(private wordThemesService: WordThemesService,
              private wordsService: WordsService) {
    wordThemesService.getAll()
      .then((themes: [any]) => {
        this.themes = themes;
      });
  }

  selectWordTheme(themeId) {
    this.selectedThemeId = themeId;
    this.wordsService.getAll(themeId)
      .then(words => {
        this.words = words;
      });
  }
}
