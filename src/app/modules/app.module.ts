import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../components/app.component';
import {APP_CONFIG, AppConfig} from "../configs/app.config";
import {UsersService} from "../services/users.service";
import {AppRoutingModule} from "./app-routing.module";
import {MenuComponent} from "../components/menu.component";
import {CollapseModule} from "ng2-bootstrap";
import {AdminPanelComponent} from "../components/admin-panel.component";
import {AdminWordThemesComponent} from "../components/admin-word-themes.component";
import {WordThemesService} from "../services/word-themes.service";
import {HttpClient} from "../utils/HttpClient";
import {AuthService} from "../services/auth.service";
import {AdminWordThemeComponent} from "../components/admin-word-theme.component";
import {WordsService} from "../services/words.service";
import {AdminTestThemesComponent} from "../components/admin-test-themes.component";
import {TestThemesService} from "../services/test-themes.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminPanelComponent,
    AdminWordThemesComponent,
    AdminWordThemeComponent,
    AdminTestThemesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CollapseModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    UsersService,
    WordThemesService,
    HttpClient,
    AuthService,
    WordsService,
    TestThemesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
