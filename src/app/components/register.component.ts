import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {RegisterData} from "../models/RegisterData";
import {UsersService} from "../services/users.service";

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: './templates/register.component.html',
  styleUrls: ['./styles/register.component.css']
})
export class RegisterComponent {

  currentRegisterData = new RegisterData();

  constructor(private router: Router,
              private usersService: UsersService) { }

  register() {
    this.usersService.register(this.currentRegisterData)
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
