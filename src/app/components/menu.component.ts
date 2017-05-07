import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'menu-component',
  templateUrl: './templates/menu.component.html',
  styleUrls: ['./styles/menu.component.css']
})
export class MenuComponent {
  isCollapsed: Boolean = true;

  constructor(private router: Router) { }
}
