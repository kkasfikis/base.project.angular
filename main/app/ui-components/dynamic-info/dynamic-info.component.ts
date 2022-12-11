import { Component, Input, OnInit } from '@angular/core';
import { InfoClassName, InfoField, SubFormInfo } from './dynamic-info.models';

@Component({
  selector: 'app-dynamic-info',
  templateUrl: './dynamic-info.component.html',
  styleUrls: ['./dynamic-info.component.scss']
})
export class DynamicInfoComponent implements OnInit {

  @Input() infoGap : string = '';
  @Input() infoAlign : string = '';
  @Input() infoFields : (InfoField|SubFormInfo)[] = [];
  @Input() obj : any;

  localInfoClassName : typeof InfoClassName = InfoClassName;

  constructor() { }

  ngOnInit(): void {
  }

  
  sortByOrder(array:any)
  {
    return array.sort(function(a : any, b : any)
    {
      var x = a['order']; 
      var y = b['order'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
