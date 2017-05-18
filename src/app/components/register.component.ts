import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {RegisterData} from "../models/RegisterData";
import {UsersService} from "../services/users.service";
import {AlertService} from "../services/alert.service";

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: './templates/register.component.html',
  styleUrls: ['./styles/register.component.css']
})
export class RegisterComponent implements OnInit {

  currentRegisterData = new RegisterData();

  constructor(private router: Router,
              private usersService: UsersService,
              private authService: AuthService,
              private alertService: AlertService) { }

  register() {
    this.validateData();
    if(!this.isValidData()) return;
    this.usersService.register(this.currentRegisterData)
      .then(() => {
        this.alertService.showSuccessMessage('Регистрация прошла успешно. Авторизуйтесь.');
        this.router.navigate(['/login']);
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
    confirmPassword: {
      status: false,
      message: 'Пароли не совпадают'
    },
  };

  validateData() {
    this.validationError.username.status = !this.currentRegisterData.username.length;
    this.validationError.password.status = !this.currentRegisterData.password.length;
    this.validationError.confirmPassword.status = this.currentRegisterData.password
      !== this.currentRegisterData.confirmPassword;
  }

  isValidData() {
    return !this.validationError.username.status
      && !this.validationError.password.status
      && !this.validationError.confirmPassword.status;
  }
}
