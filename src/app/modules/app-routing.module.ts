import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPanelComponent} from "../components/admin-panel.component";
import {AdminWordThemeComponent} from "../components/admin-word-theme.component";
import {AdminTestThemeComponent} from "../components/admin-test-theme.component";
import {AdminTestComponent} from "../components/admin-test.component";
import {LoginComponent} from "../components/login.component";
import {RegisterComponent} from "../components/register.component";
import {UserWordThemesComponent} from "../components/user-word-themes.component";
import {WordsTrainComponent} from "../components/words-train.component";
import {UserTestThemesComponent} from "../components/user-test-themes.component";
import {TestComponent} from "../components/test.component";
import {ProfileComponent} from "../components/profile.component";

const routes = [
  {path: '*', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'train/:themeId', component: WordsTrainComponent},
  {path: 'test/:testId', component: TestComponent},
  {path: 'word-themes', component: UserWordThemesComponent},
  {path: 'test-themes', component: UserTestThemesComponent},
  {path: 'admin/:page', component: AdminPanelComponent},
  {path: 'admin/word-theme/:themeId', component: AdminWordThemeComponent},
  {path: 'admin/test-theme/:themeId', component: AdminTestThemeComponent},
  {path: 'admin/test-questions/:testId', component: AdminTestComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
