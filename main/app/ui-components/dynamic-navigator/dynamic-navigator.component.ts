import { OnDestroy } from '@angular/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { MenuOption, SideMenuCategory } from './dynamic-navigator.models';

@Component({
  selector: 'app-dynamic-navigator',
  templateUrl: './dynamic-navigator.component.html',
  styleUrls: ['./dynamic-navigator.component.scss']
})
export class DynamicNavigatorComponent implements OnInit,AfterViewInit,OnDestroy {

  @Input() public title : string = "";
  @Input() public subTitle : string = "";
  
  @Input() public isLoggedIn : boolean = false;
  @Input() public userName : string = "";
  @Input() public photo : string = "";

  @Input() public navbarOptions : MenuOption[] = [];
  @Input() public drawerOptions : MenuOption[] | SideMenuCategory[] = [];
  @Input() public isDrawerEnabled : boolean = false;
  @Input() public isDrawerCategorized : boolean = true;
  @Input() public isDrawerFixed : boolean = false;

  @Input() public isThemeSelectEnabled = true;
  @Input() public hasRegister = true;
  @Input() public hasLogout = true;

  isLoading : boolean = false;
  _unsubscribeSignal$ : Subject<void> = new Subject<void>();

  @Output() public themeChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loginSelected : EventEmitter<any> = new EventEmitter<any>();
  @Output() public registerSelected : EventEmitter<any> = new EventEmitter<any>();
  @Output() public logoutSelected : EventEmitter<any> = new EventEmitter<any>();
 
  constructor(private changeDetector : ChangeDetectorRef, private loadingService : LoadingService){
    this.loadingService.loading.pipe(takeUntil(this._unsubscribeSignal$)).subscribe( (isLoading:boolean) => {
      if(!isLoading){
        setTimeout( () => {
          this.isLoading = false;
        }, 1000);
      }
      else{
        this.isLoading = true;
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  emitThemeChanged(event : Event){
    this.themeChanged.emit(event);
  }

  emitLoginSelected(event : Event){
    this.loginSelected.emit(event);
  } 
  
  emitRegisterSelected(event : Event){
    this.registerSelected.emit(event);
  }

  emitLogoutSelected(event : Event){
    this.logoutSelected.emit(event);
  }
  ngAfterViewChanged(){
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this._unsubscribeSignal$.next();
    this._unsubscribeSignal$.complete();
  }

}
