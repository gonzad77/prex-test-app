import { Injectable } from "@angular/core";
import { RestService } from "src/app/helpers/rest.helper";
import { Login } from "src/app/models/login.model";
import { Signup } from "src/app/models/signup.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private rest: RestService
  ) {}

  register = ({username, password}: Signup) => {
    return this.rest.post('/auth/register', {
      username,
      password
    }, [200])
  }

  login = ({username, password}: Login) => {
    return this.rest.post('/auth/login', {
      username,
      password
    }, [200])
  }
}