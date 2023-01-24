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
        icon:'home',
        label:'Category 1',
        options:[
          {
            key:'Cat1_Option1',
            label:'File',
            icon:'folder',
            isFunction:false,
            subMenus : [
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
                key:'pot',
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
          } as MenuOption,
          {
            key:'Invoicing',
            label:'Invoicing',
            icon:'menu',
            isFunction:false,
            subMenus : [
              {
                key:'debit',
                label:'Debit Notes',
                icon:'menu',
                link:'/invoice',
                isFunction:false,
                subMenus : [] as MenuOption[]
              },
              {
                key:'credit',
                label:'Credit Notes',
                icon:'menu',
                isFunction:false,
                link:'/invoice',
                subMenus : [] as MenuOption[]
              },
              {
                key:'da',
                label:'Disbursement Accounts',
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
              }
            ] as MenuOption[]
          } as MenuOption,



          {
            key:'expenses',
            label:'Expenses',
            icon:'payments',
            link:'/expense',
            isFunction:false,
            subMenus : [] as MenuOption[]
          }


        ] as MenuOption[]
      },
      {
        icon:'home',
        label:'Category 2',
        options:[
          {
            key:'proforma',
            label:'Proformas',
            icon:'menu',
            link : '/invoice',
            isFunction:false,
            subMenus : [
            ] as MenuOption[]
          },
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
            key:'archive',
            label:'Archive',
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
          },
        ] as MenuOption[]
      }
      
    ] as SideMenuCategory[]

    this.navbarOptions = [
      {
        key:'myfm',
        label:'    myForceMarine    ',
        icon:'menu',
        isFunction:false,
        subMenus : [] 
      },
      {
        key:'qa',
        label:'    Q & A    ',
        icon:'menu',
        isFunction:false,
        subMenus : [
       {
            key:'question',
            label:'Questions',
            icon:'menu',
            isFunction:false,
            subMenus : [] as MenuOption[]
          }
        ] 
      },
      {
        key:'chat',
        label:'  Live Chat  ',
        icon:'menu',
        isFunction:false,
        subMenus : [] 
      },


    ] as MenuOption[]
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
