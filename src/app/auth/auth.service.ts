import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {User} from "./user.model";
import {tap} from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

export interface UserData {
  email: string;
  password: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false;
  private user: User;

  constructor(private http: HttpClient) { }

  get isUserAuthenticated(){
    if(this.user){
      return !!this.user.token
    }
    return false;
  }

  getUserId(){
    if(this.user){
  return this.user.id;}
    return null;
  }
  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey
        }`,
        {email: user.email, password: user.password, returnSecureToken: true}
    );

  }
  login(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey
        }`,
        {email: user.email, password: user.password, returnSecureToken: true}
    ).pipe(
        tap(
            (userData) => {
              const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
              this.user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
            }
        )
    );
    /*
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
      {email: user.email, password: user.password, returnSecureToken: true})
      .pipe(
        tap(
          (userData) => {
            const expirationTime = new Date(new Date().getTime() + +userData.expires * 1000);
            this.user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          }
        )
      );*/
  }

  logout(){
    this._isUserAuthenticated = false;
    this.user = null;
  }
  getToken(){
    return this.user.token;
  }
}
