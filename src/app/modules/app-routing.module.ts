import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPanelComponent} from "../components/admin-panel.component";
import {AdminWordThemeComponent} from "../components/admin-word-theme.component";
import {AdminTestThemeComponent} from "../components/admin-test-theme.component";
import {AdminTestComponent} from "../components/admin-test.component";
import {LoginComponent} from "../components/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
