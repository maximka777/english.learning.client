import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './templates/profile.component.html',
  styleUrls: ['./styles/profile.component.css']
})
export class ProfileComponent {

  constructor(private authService: AuthService) { }

}
