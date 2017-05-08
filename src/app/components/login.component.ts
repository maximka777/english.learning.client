import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginData} from "../models/LoginData";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: 'templates/login.component.html',
  styleUrls: ['styles/login.component.css']
})
export class LoginComponent {
  currentLoginData = new LoginData();

  constructor(private authService: AuthService,
              private router: Router) {}

  login() {
    this.authService.login(this.currentLoginData.username, this.currentLoginData.password)
      .then(data => {
        this.router.navigate(['/']);
      });
  }
}
