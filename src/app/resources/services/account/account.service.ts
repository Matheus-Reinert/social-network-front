import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}/login`, user).toPromise();
    if(result){
      window.localStorage.setItem('token', result.token);
      window.localStorage.setItem('userId', result.user.id)
      window.localStorage.setItem('username', result.user.username)
      return true;
    }

    return false;
  }

  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.api}/users`, account).toPromise();
    return result;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): any {
    const decoded: any = jwt_decode(token);

    if(decoded.exp === undefined){
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if(date == undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
