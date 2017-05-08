import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'menu-component',
  templateUrl: './templates/menu.component.html',
  styleUrls: ['./styles/menu.component.css']
})
export class MenuComponent {
  isCollapsed: Boolean = true;

  constructor(private router: Router,
              private authService: AuthService) { }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
