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
import {TestsService} from "../services/tests.service";
import {AdminTestThemeComponent} from "../components/admin-test-theme.component";
import {AdminTestComponent} from "../components/admin-test.component";
import {QuestionsService} from "../services/questions.service";
import {LoginComponent} from "../components/login.component";
import {RegisterComponent} from "../components/register.component";
import {UserWordThemesComponent} from "../components/user-word-themes.component";
import {WordsTrainComponent} from "../components/words-train.component";
import {ResultFunc} from "rxjs/observable/GenerateObservable";
import {ResultComponent} from "../components/result.component";
import {UserTestThemesComponent} from "../components/user-test-themes.component";
import {TestComponent} from "../components/test.component";
import {TestResultsService} from "../services/test-results.service";
import {AlertMessageComponent} from "../components/alert-message.component";
import {AlertService} from "../services/alert.service";
import {ProfileComponent} from "../components/profile.component";
import {ErrorMessageComponent} from "../components/error-message.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminPanelComponent,
    AdminWordThemesComponent,
    AdminWordThemeComponent,
    AdminTestThemesComponent,
    AdminTestThemeComponent,
    AdminTestComponent,
    LoginComponent,
    RegisterComponent,
    UserWordThemesComponent,
    UserTestThemesComponent,
    WordsTrainComponent,
    ResultComponent,
    TestComponent,
    AlertMessageComponent,
    ProfileComponent,
    ErrorMessageComponent,
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
    TestsService,
    QuestionsService,
    TestResultsService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
