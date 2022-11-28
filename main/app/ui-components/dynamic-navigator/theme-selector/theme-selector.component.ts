import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  constructor() { }

  toggleControl = new FormControl(true);
  @Output() public themeChanged : EventEmitter<any> = new EventEmitter<any>(); 

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode)=>{
      this.themeChanged.emit(darkMode!);
    })
  }

  get toggleValue(){ return this.toggleControl.value; }
}
