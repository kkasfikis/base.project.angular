import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeSelectorService {

  constructor() { }

  setTheme(isDark : boolean){
    localStorage.setItem('themeIsDark', isDark.toString());
  }

  getTheme(){
    return localStorage.getItem('themeIsDark') != null ? localStorage.getItem('themeIsDark') == "true" : false;
  }
}
