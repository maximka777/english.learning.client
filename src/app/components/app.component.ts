import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  styleUrls: ['styles/app.component.css']
})
export class AppComponent implements OnInit{
  private users = [];
  private errorMessage: string;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAll()
      .then((users: [any]) => {
        this.users = users;
      })
      .catch((err) => {
        this.errorMessage = JSON.stringify(err);
        console.error(err);
      });
  }
}
