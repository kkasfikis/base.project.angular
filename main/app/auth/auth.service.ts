import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable(); 

  constructor(private http: HttpClient) {
    let user : any | undefined = this.getUser();
    this.loggedIn.next(user != undefined && user.token && this.parseJwt(user.token) != undefined);
  }

  setUser(token : string){
    let user : any = this.parseJwt(token);
    if(user != undefined){
      user['token'] = token;
      localStorage.setItem('user',JSON.stringify(user));
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  getUser(){
    let storagedUser : string | null = localStorage.getItem('user');
    if(storagedUser == null){
      return undefined
    }
    return JSON.parse(localStorage.getItem('user')!);
  }

  isTokenExpired(){
    let user : any = this.getUser();
    if(user == undefined || !user.exp || user.exp * 1000 < Date.now()){
      this.logout();
      return true;
    }
    return false;
  }

  parseJwt(token : string) {
    try{
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload : string = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      let user : any = JSON.parse(jsonPayload)?.sub;
      user.exp = JSON.parse(jsonPayload)?.exp;
      return user;
    }
    catch(e:any){
      return undefined
    }
  }

  login(username : string, password : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    let data = {
      username : username,
      password : password
    }
    return this.http.post('/login', data, {...options});
  }

  register(username : string, password : string, email : string, fullName : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    let data = {
      username : username,
      password : password,
      email : email,
      full_name : fullName,
      role : ''
    }
    return this.http.post('/register', data, {...options});
  }

  changePassword(oldPassword : string, newPassword : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    let data = {
      old_password : oldPassword,
      new_password : newPassword
    }
    return this.http.post('/changePassword', data, {...options});
  }

  logout(){
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

}
