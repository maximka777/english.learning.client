import {Component} from '@angular/core';
import {TestThemesService} from "../services/test-themes.service";
import {TestTheme} from "../models/TestTheme";

@Component({
  selector: 'admin-test-themes',
  templateUrl: 'templates/admin-test-themes.component.html',
  styleUrls: ['styles/admin-test-themes.component.css']
})
export class AdminTestThemesComponent {
  themes = [];
  currentTheme = new TestTheme();

  constructor(private testThemesService: TestThemesService) {
    testThemesService.getAll()
      .then((themes: [any]) => {
        this.themes = themes;
      });
  }

  submitAddThemeForm() {
    this.testThemesService.createOne(this.currentTheme)
      .then(data => {
        this.themes.push(Object.assign({}, this.currentTheme));
        this.currentTheme = new TestTheme();
      });
  }

  removeTheme(themeId) {
    this.testThemesService.remove(themeId)
      .then(data => {
        this.themes = this.themes.filter(t => t.id !== themeId);
      });
  }
}
