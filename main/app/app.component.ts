import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
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

  constructor(private overlay: OverlayContainer,private authService : AuthService, private router : Router){
    
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

    setInterval( () => {
      if(this.loggedIn){
        this.authService.isTokenExpired();
      }
    }, 10000)
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
