import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './templates/profile.component.html',
  styleUrls: ['./styles/profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(!this.authService.isLogged()) {
      return this.authService.navigateToLogin();
    }
  }

}
