import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { MenuOption } from '../dynamic-navigator.models';

@Component({
  selector: 'app-nav-menu-option-tree',
  templateUrl: './nav-menu-option-tree.component.html',
  styleUrls: ['./nav-menu-option-tree.component.scss']
})
export class NavMenuOptionTreeComponent implements OnInit{

  @Input() items! : MenuOption[];
  @ViewChild('menu') public menu! : MatMenuPanel<any>;
  @ViewChild('childMenu') public childMenu! : MatMenuPanel<any>;

  constructor(private changeDetector : ChangeDetectorRef){}

  ngOnInit(): void {
  }


}
