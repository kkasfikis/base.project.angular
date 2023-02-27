import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, NgZone , ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MenuOption, SideMenuCategory } from './ui-components/dynamic-navigator/dynamic-navigator.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'base.project.angular';
  userName = 'not logged in'
  loggedIn = false;
  image = './assets/images/user.jpg';
  drawerOptions : SideMenuCategory[] | MenuOption[] = [];
  navbarOptions : MenuOption[] = [];
  @HostBinding('class') className= ''


  constructor(private overlay: OverlayContainer,private authService : AuthService, private router : Router, private _zone: NgZone){
    
    this.authService.isLoggedIn.subscribe({
      next : (val : boolean) =>{
        this.loggedIn = val;
        if(val){
          let user : any = authService.getUser();
          this.userName = user.username;
        }
        else{
          this.userName = 'Not Logged In';
        }
      }
    })
    this._zone.runOutsideAngular(() => {
      setInterval( () => {
        if(this.loggedIn){
          this.authService.isTokenExpired();
        }
      }, 10000)
    })
  }
  
  ngAfterViewInit(): void {
    
  }
  
  ngOnInit(){
    //this.overlay.getContainerElement().classList.add('darkMode')
    this.drawerOptions = [
      {
        icon : 'home',
        title : 'Account',
        options : [
          {
            key:'userManagement',
            label:'User Management',
            icon:'person',
            link:'/userManagement',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
          {
            key:'changePassword',
            label:'Change Password',
            icon:'person',
            link:'/changePassword',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
        ] as MenuOption[]
      } as SideMenuCategory,
      {
        icon : 'home',
        title : 'File',
        options : [
          {
            key:'clients',
            label:'Clients',
            icon:'person',
            link:'/client',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
          {
            key:'agent',
            label:'Agents',
            icon:'person',
            isFunction:false,
            link:'/agent',
            subMenus : [
            ] as MenuOption[]
          },

          {
            key:'supplier',
            label:'Suppliers',
            icon:'person',
            isFunction:false,
            link:'/supplier',
            subMenus : [                
            ] as MenuOption[]
          },

          {
            key:'port',
            label:'Ports',
            icon:'anchor',
            link:'/port',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },

          {
            key:'vessel',
            label:'Vessels',
            icon:'sailing',
            link:'/vessel',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },

          {
            key:'charges',
            label:'Charges',
            icon:'settings',
            link:'/charge',
            isFunction:false,
            subMenus : [
            ] as MenuOption[]
          },
          {
            key:'expenses',
            label:'Expenses',
            icon:'payments',
            link:'/expense',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
          {
            key:'staff',
            label:'Staff',
            icon:'boy',
            link:'/staff',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },

          {
            key:'bankAccount',
            label:'Bank Accounts',
            icon:'paid',
            link:'/bankAccount',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
        ] as MenuOption[]
      } as SideMenuCategory,
      {
        icon : 'home',
        title : 'Invoicing',
        options : [
          {
            key:'invoice',
            label:'Invoices',
            icon:'menu',
            link:'/invoice',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
          {
            key:'soa',
            label:'Statements',
            icon:'menu',
            link:'/soa',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
          {
            key:'csoa',
            label:'Consolidated SOA',
            icon:'menu',
            link:'/csoa',
            isFunction:false,
            subMenus : [] as MenuOption[]
          },
          {
            key:'userManagement',
            label:'User Management',
            icon:'user',
            link:'/userManagement',
            isFunction:false,
            subMenus : [] as MenuOption[]
          }
        ] as MenuOption[]
      } as SideMenuCategory,
      {
        icon : "home",
        title : "Agency",
        options : [
          {
            key:'call',
            label:'Calls',
            icon:'menu',
            link : '/call', 
            isFunction:false,
            subMenus : [
            ] as MenuOption[]
          },
          {
            key:'breakdown',
            label:'Breakdown Lists',
            icon:'menu',
            link : '/breakdown',
            isFunction:false,
            subMenus : [
            ] as MenuOption[]
          },
          {
            key:'reports',
            label:'Reports',
            icon:'menu',
            isFunction:false,
            subMenus : [
            ] as MenuOption[]
          },
          {
            key:'predefined',
            label:'List Values',
            icon:'menu',
            link : '/predefined',
            isFunction:false,
            subMenus : [
            ] as MenuOption[]
          }
        ] as MenuOption[]
      } as SideMenuCategory

    ]
  }


  toggleTheme(darkMode : boolean){
    const darkClassName = 'darkMode';
    this.className = darkMode ? darkClassName : '';
    if(darkMode){
      this.overlay.getContainerElement().classList.add(darkClassName);
    }
    else{
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }


  login(){
    this.router.navigate(['/login']);
  }

  register(){
    console.log('register')
    this.router.navigate(['/register']);
  }

  logout(){
    this.image = './assets/images/user.jpg';
  }
}
