import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: Http, private router: Router) { }

  saveUserInfo(value) {
    localStorage.setItem('eng-learn-user-info', JSON.stringify(value));
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('eng-learn-user-info'));
  }

  get token() {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.token : '';
  }

  get user() {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.user : null;
  }

  isLogged() {
    const userInfo = this.getUserInfo();
    return !!userInfo;
  }

  isAdmin() {
    return !!this.user.isAdmin;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToUserRoot() {
    this.router.navigate(['/']);
  }

  navigateToAdminRoot() {
    this.router.navigate(['/admin/word-themes']);
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.config.API}/auth/login`, { username, password })
        .map(res => res.json().data)
        .subscribe((data) => {
          this.saveUserInfo(data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Authorization', this.token);
      this.http.post(`${this.config.API}/auth/logout`, {}, {
        headers: headers,
      })
        .map(res => res.json().data)
        .subscribe(() => {
          this.saveUserInfo(null);
          resolve(null);
        }, (err) => {
          reject(err);
        });
    });
  }
}
