import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { MenuOption, SideMenuCategory } from './dynamic-navigator.models';

@Component({
  selector: 'app-dynamic-navigator',
  templateUrl: './dynamic-navigator.component.html',
  styleUrls: ['./dynamic-navigator.component.scss']
})
export class DynamicNavigatorComponent implements OnInit,AfterViewInit {

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

  @Output() public themeChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loginSelected : EventEmitter<any> = new EventEmitter<any>();
  @Output() public registerSelected : EventEmitter<any> = new EventEmitter<any>();
 
  constructor(private changeDetector : ChangeDetectorRef){

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

  ngAfterViewChanged(){
    this.changeDetector.detectChanges();
  }

}
