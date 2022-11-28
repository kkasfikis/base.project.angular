import { Component, Input, OnInit } from '@angular/core';
import { MenuOption } from '../dynamic-navigator.models';

@Component({
  selector: 'app-side-menu-option-tree',
  templateUrl: './side-menu-option-tree.component.html',
  styleUrls: ['./side-menu-option-tree.component.scss']
})
export class SideMenuOptionTreeComponent implements OnInit {

  constructor() { }

  public showSubMenu : boolean = false;
  @Input() item! : MenuOption;

  ngOnInit(): void {
  }

  toggleSubMenu(){
    this.showSubMenu = !this.showSubMenu;
  }
}
