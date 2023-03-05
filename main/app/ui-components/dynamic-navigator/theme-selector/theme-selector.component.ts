import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeSelectorService } from '../../services/theme-selector.service';
@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  constructor(private themeService : ThemeSelectorService) { }

  toggleControl = new FormControl(false);
  @Output() public themeChanged : EventEmitter<any> = new EventEmitter<any>(); 

  ngOnInit(): void {
   
    this.toggleControl = new FormControl(this.themeService.getTheme());
    this.toggleControl.valueChanges.subscribe((darkMode)=>{
      this.themeChanged.emit(darkMode!);
    })
  }

  get toggleValue(){ return this.toggleControl.value; }
}
