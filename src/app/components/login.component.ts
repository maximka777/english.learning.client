import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginData} from "../models/LoginData";
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'login',
  templateUrl: 'templates/login.component.html',
  styleUrls: ['styles/login.component.css']
})
export class LoginComponent {
  currentLoginData = new LoginData();

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {}

  login() {
    this.authService.login(this.currentLoginData.username, this.currentLoginData.password)
      .then(data => {
        this.alertService.showSuccessMessage('Авторизация прошла успешно.');
        //  todo -> redirect to profile
        this.router.navigate(['/word-themes']);
      });
  }
}
