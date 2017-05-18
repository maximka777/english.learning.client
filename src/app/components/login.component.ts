import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginData} from "../models/LoginData";
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'login',
  templateUrl: 'templates/login.component.html',
  styleUrls: ['styles/login.component.css']
})
export class LoginComponent implements OnInit {
  currentLoginData = new LoginData();

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {}

  login() {
    this.validateData();
    if(!this.isValidData()) return;
    this.authService.login(this.currentLoginData.username, this.currentLoginData.password)
      .then(data => {
        this.alertService.showSuccessMessage('Авторизация прошла успешно.');
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    if(this.authService.isLogged()) {
      return this.authService.navigateToUserRoot();
    }
  }

  validationError = {
    username: {
      status: false,
      message: 'Введите имя пользователя'
    },
    password: {
      status: false,
      message: 'Введите пароль'
    },
  };

  validateData() {
    this.validationError.username.status = !this.currentLoginData.username.length;
    this.validationError.password.status = !this.currentLoginData.password.length;
  }

  isValidData() {
    return !this.validationError.username.status
      && !this.validationError.password.status;
  }
}
