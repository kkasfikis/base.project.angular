import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { InfoField } from '../dynamic-info.models';

@Component({
  selector: 'app-dynamic-info-field',
  templateUrl: './dynamic-info-field.component.html',
  styleUrls: ['./dynamic-info-field.component.scss']
})
export class DynamicInfoFieldComponent implements OnInit, AfterViewInit {

  @Input() infoField! : InfoField;
  @Input() value : any | any[];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void{
  }


}
