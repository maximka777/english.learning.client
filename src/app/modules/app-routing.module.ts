import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPanelComponent} from "../components/admin-panel.component";
import {AdminWordThemeComponent} from "../components/admin-word-theme.component";
import {AdminTestThemeComponent} from "../components/admin-test-theme.component";
import {AdminTestComponent} from "../components/admin-test.component";
import {LoginComponent} from "../components/login.component";
import {RegisterComponent} from "../components/register.component";
import {UserWordThemesComponent} from "../components/user-word-themes.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'word-themes', component: UserWordThemesComponent },
  { path: 'admin/:page', component: AdminPanelComponent },
  { path: 'admin/word-theme/:themeId', component: AdminWordThemeComponent },
  { path: 'admin/test-theme/:themeId', component: AdminTestThemeComponent },
  { path: 'admin/test-questions/:testId', component: AdminTestComponent },
  { path: '*', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
