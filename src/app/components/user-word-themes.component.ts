import {Component, OnInit} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";
import {WordsService} from "../services/words.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'user-word-themes',
  templateUrl: 'templates/user-word-themes.component.html',
  styleUrls: ['styles/user-word-themes.component.css']
})
export class UserWordThemesComponent implements OnInit {
  themes = [];
  words = null;
  selectedThemeId: number;

  constructor(private wordThemesService: WordThemesService,
              private authService: AuthService,
              private wordsService: WordsService) {
    wordThemesService.getAll()
      .then((themes: [any]) => {
        this.themes = themes;
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

  selectWordTheme(themeId) {
    this.selectedThemeId = themeId;
    this.wordsService.getAll(themeId)
      .then(words => {
        this.words = words;
      });
  }
}
