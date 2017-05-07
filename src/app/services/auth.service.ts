import {Injectable, Inject} from '@angular/core';
import {APP_CONFIG} from "../configs/app.config";
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";

@Injectable()
export class AuthService {
  constructor(@Inject(APP_CONFIG) private config: any, private http: Http) { }

}
