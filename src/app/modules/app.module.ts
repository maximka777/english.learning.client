import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../components/app.component';
import {APP_CONFIG, AppConfig} from "../configs/app.config";
import {UsersService} from "../services/users.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
