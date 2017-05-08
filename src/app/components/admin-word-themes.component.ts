import {Component} from '@angular/core';
import {WordThemesService} from "../services/word-themes.service";
import {WordTheme} from "../models/WordTheme";

@Component({
  selector: 'admin-word-themes',
  templateUrl: 'templates/admin-word-themes.component.html',
  styleUrls: ['styles/admin-word-themes.component.css']
})
export class AdminWordThemesComponent {
  themes = [];
  currentTheme = new WordTheme();

  constructor(private wordThemesService: WordThemesService) {
    wordThemesService.getAll()
      .then((themes: [any]) => {
        this.themes = themes;
      });
  }

  submitAddThemeForm() {
    this.wordThemesService.createOne(this.currentTheme)
      .then(data => {
        this.themes.push(Object.assign({}, data));
        this.currentTheme = new WordTheme();
      });
  }
}
