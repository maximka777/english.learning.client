import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPanelComponent} from "../components/admin-panel.component";
import {AdminWordThemeComponent} from "../components/admin-word-theme.component";

const routes: Routes = [
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/word-theme/:themeId', component: AdminWordThemeComponent },
  { path: '*', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
