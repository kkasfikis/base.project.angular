import { OverlayContainer } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { MenuOption, SideMenuCategory } from './ui-components/dynamic-navigator/dynamic-navigator.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'base.project.angular';
  userName = 'testUser'
  loggedIn = false;
  image = './assets/images/user.jpg';
  drawerOptions : SideMenuCategory[] | MenuOption[] = [];
  navbarOptions : MenuOption[] = [];
  @HostBinding('class') className='darkMode'

  testFunc = this.testFunction.bind(this)

  constructor(private overlay: OverlayContainer,private changeDetector : ChangeDetectorRef){
    
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
            label:'Option 1',
            icon:'menu',
            isFunction:false,
            subMenus : [
              {
                key:'Option1_Sub1',
                label:'Option1_Sub1',
                icon:'Menu',
                isFunction:false,
                subMenus : [
                  {
                    key:'Option1_Sub1_Sub1',
                    label:'Option1_Sub1_Sub1',
                    icon:'Menu',
                    isFunction:false,
                    link:'/',
                    func : {},
                    subMenus : [] as MenuOption[]
                  },
                  {
                    key:'Option1_Sub1_Sub2',
                    label:'Option1_Sub1_Sub2(FUNC)',
                    icon:'Menu',
                    isFunction:true,
                    link:'/',
                    func : this.testFunc,
                    funcParams : {test:'aaaaaa'},
                    subMenus : [] as MenuOption[]
                  }
                ] as MenuOption[]
              },
              {
                key:'Option1_Sub2',
                label:'Option1_Sub2',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              }
            ] as MenuOption[]
          } as MenuOption,
          {
            key:'Cat1_Option2',
            label:'Option 2',
            icon:'menu',
            isFunction:false,
            subMenus : [
              {
                key:'Option2_Sub1',
                label:'Option2_Sub1',
                icon:'Menu',
                isFunction:false,
                subMenus : [
                  {
                    key:'Option2_Sub1_Sub1',
                    label:'Option2_Sub1_Sub1',
                    icon:'Menu',
                    isFunction:false,
                    subMenus : [] as MenuOption[]
                  },
                  {
                    key:'Option2_Sub1_Sub2',
                    label:'Option2_Sub1_Sub2',
                    icon:'Menu',
                    isFunction:false,
                    subMenus : [] as MenuOption[]
                  }
                ] as MenuOption[]
              },
              {
                key:'Option2_Sub2',
                label:'Option2_Sub2',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              }
            ] as MenuOption[]
          } as MenuOption
        ] as MenuOption[]
      },
      {
        icon:'home',
        label:'Category 2',
        options:[
          {
            key:'Cat2_Option1',
            label:'Option 1',
            icon:'menu',
            isFunction:false,
            subMenus : [
              {
                key:'Option1_Sub1',
                label:'Option1_Sub1',
                icon:'Menu',
                isFunction:false,
                subMenus : [
                  {
                    key:'Option1_Sub1_Sub1',
                    label:'Option1_Sub1_Sub1',
                    icon:'Menu',
                    isFunction:false,
                    subMenus : [] as MenuOption[]
                  },
                  {
                    key:'Option1_Sub1_Sub2',
                    label:'Option1_Sub1_Sub2',
                    icon:'Menu',
                    isFunction:false,
                    subMenus : [] as MenuOption[]
                  }
                ] as MenuOption[]
              },
              {
                key:'Option1_Sub2',
                label:'Option1_Sub2',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              }
            ] as MenuOption[]
          },
          {
            key:'Cat2_Option2',
            label:'Option 2',
            icon:'menu',
            isFunction:false,
            subMenus : [
              {
                key:'Option2_Sub1',
                label:'Option2_Sub1',
                icon:'Menu',
                isFunction:false,
                subMenus : [
                  {
                    key:'Option2_Sub1_Sub1',
                    label:'Option2_Sub1_Sub1',
                    icon:'Menu',
                    isFunction:false,
                    subMenus : [] as MenuOption[]
                  },
                  {
                    key:'Option2_Sub1_Sub2',
                    label:'Option2_Sub1_Sub2',
                    icon:'Menu',
                    isFunction:false,
                    subMenus : [] as MenuOption[]
                  }
                ] as MenuOption[]
              },
              {
                key:'Option2_Sub2',
                label:'Option2_Sub2',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              }
            ] as MenuOption[]
          }
        ] as MenuOption[]
      }
    ] as SideMenuCategory[]

    this.navbarOptions = [
      {
        key:'Cat2_Option1',
        label:'Option 1',
        icon:'menu',
        isFunction:false,
        subMenus : [
          {
            key:'Option1_Sub1',
            label:'Option1_Sub1',
            icon:'Menu',
            isFunction:false,
            subMenus : [
              {
                key:'Option1_Sub1_Sub1',
                label:'Option1_Sub1_Sub1',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              } as MenuOption,
              {
                key:'Option1_Sub1_Sub2',
                label:'Option1_Sub1_Sub2(FUNC)',
                icon:'Menu',
                isFunction:true,
                func : this.testFunc,
                funcParams : {test:'bbbbbb'},
                subMenus : [] as MenuOption[]
              } as unknown as MenuOption
            ] as MenuOption[]
          },
          {
            key:'Option1_Sub2',
            label:'Option1_Sub2',
            icon:'Menu',
            isFunction:false,
            subMenus : [] as MenuOption[]
          }
        ] as MenuOption[]
      },
      {
        key:'Cat2_Option2',
        label:'Option 2',
        icon:'menu',
        isFunction:false,
        subMenus : [
          {
            key:'Option2_Sub1',
            label:'Option2_Sub1',
            icon:'Menu',
            isFunction:false,
            subMenus : [
              {
                key:'Option2_Sub1_Sub1',
                label:'Option2_Sub1_Sub1',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              },
              {
                key:'Option2_Sub1_Sub2',
                label:'Option2_Sub1_Sub2',
                icon:'Menu',
                isFunction:false,
                subMenus : [] as MenuOption[]
              }
            ] as MenuOption[]
          },
          {
            key:'Option2_Sub2',
            label:'Option2_Sub2',
            icon:'Menu',
            isFunction:false,
            subMenus : [] as MenuOption[]
          }
        ]
      }
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
    this.loggedIn = true;
  }

  logout(){
    this.image = './assets/images/user.jpg';
  }
}
