import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, NgZone, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MenuOption, SideMenuCategory } from './ui-components/dynamic-navigator/dynamic-navigator.models';
import { SideMenuOptionTreeComponent } from './ui-components/dynamic-navigator/side-menu-option-tree/side-menu-option-tree.component';
import { JsonHelpers } from './ui-components/scripts/json-helpers';
import { ThemeSelectorService } from './ui-components/services/theme-selector.service';

import * as data from './app.ui-config.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'base.project.angular';
  userName = 'not logged in'
  loggedIn = false;
  image = './assets/images/user.jpg';
  drawerOptions: SideMenuCategory[] | MenuOption[] = [];
  navbarOptions: MenuOption[] = [];
  @HostBinding('class') className = this.themeService.getTheme() ? 'darkMode' : ''


  constructor(private overlay: OverlayContainer, private authService: AuthService, private router: Router, private _zone: NgZone, private themeService : ThemeSelectorService) {

    this.authService.isLoggedIn.subscribe({
      next: (val: boolean) => {
        this.loggedIn = val;
        if (val) {
          let user: any = authService.getUser();
          this.userName = user.username;
        }
        else {
          this.userName = 'Not Logged In';
        }
        this.setMenuOptions();
      }
    })
    this._zone.runOutsideAngular(() => {
      setInterval(() => {
        if (this.loggedIn) {
          this.authService.isTokenExpired();
        }
      }, 10000)
    })
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    if(this.themeService.getTheme()){ this.overlay.getContainerElement().classList.add('darkMode') }
    this.setMenuOptions();
  }

  setMenuOptions(){
    if(this.loggedIn){
      let role = this.authService.getUser()?.role;
      if(!!role && role.length > 0){
        let result = JsonHelpers.initNavigatorFromJson(data,role)
        this.navbarOptions = result.navbar;
        this.drawerOptions = result.drawer;
      }
    }
    else{
      let result = JsonHelpers.initNavigatorFromJson(data,'anon');
      this.navbarOptions = result.navbar;
      this.drawerOptions = result.drawer;
    }
  }

  toggleTheme(darkMode: boolean): void {
    const darkClassName = 'darkMode';
    this.className = darkMode ? darkClassName : '';
    if (darkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    }
    else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
    this.themeService.setTheme(darkMode);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.image = './assets/images/user.jpg';
  }

}