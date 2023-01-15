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
  userName = 'Not Logged In'
  loggedIn = false;
  image = './assets/images/user.jpg';
  drawerOptions : SideMenuCategory[] | MenuOption[] = [];
  navbarOptions : MenuOption[] = [];
  @HostBinding('class') className='darkMode'

  testFunc = this.testFunction.bind(this)

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
    this.overlay.getContainerElement().classList.add('darkMode')
 
    this.drawerOptions = [
      {
        key:'Ports',
        label:'Ports',
        icon:'port',
        isFunction:false,
        link:'/port',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Clients',
        label:'Clients',
        icon:'user',
        isFunction:false,
        link:'/client',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Agents',
        label:'Agents',
        icon:'user',
        isFunction:false,
        link:'/agent',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Vessels',
        label:'Vessels',
        icon:'user',
        isFunction:false,
        link:'/vessel',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Calls',
        label:'Calls',
        icon:'user',
        isFunction:false,
        link:'/call',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Suppliers',
        label:'Suppliers',
        icon:'user',
        isFunction:false,
        link:'/supplier',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Expenses',
        label:'Expenses',
        icon:'user',
        isFunction:false,
        link:'/expense',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Predefined',
        label:'Predefined',
        icon:'user',
        isFunction:false,
        link:'/predefined',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Charges',
        label:'Charges',
        icon:'user',
        isFunction:false,
        link:'/charge',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'BankAccount',
        label:'Bank Accounts',
        icon:'user',
        isFunction:false,
        link:'/bankAccount',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Staff',
        label:'Staff',
        icon:'user',
        isFunction:false,
        link:'/staff',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'SOA',
        label:'Statements Of Account',
        icon:'user',
        isFunction:false,
        link:'/soa',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'CSOA',
        label:'Consolidated Statements Of Account',
        icon:'user',
        isFunction:false,
        link:'/csoa',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Breakdown',
        label:'Breakdown Lists',
        icon:'user',
        isFunction:false,
        link:'/breakdown',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption,
      {
        key:'Invoice',
        label:'Invoice',
        icon:'user',
        isFunction:false,
        link:'/invoice',
        func : {},
        subMenus : [] as MenuOption[]
      } as MenuOption
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

  testFunction(x:any){
    alert('TEST FUNCTION WORKS : ' + x.test);
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.image = './assets/images/user.jpg';
  }
}
