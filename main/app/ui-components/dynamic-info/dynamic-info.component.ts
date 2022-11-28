import { Component, Input, OnInit } from '@angular/core';
import { InfoField } from './dynamic-info.models';

@Component({
  selector: 'app-dynamic-info',
  templateUrl: './dynamic-info.component.html',
  styleUrls: ['./dynamic-info.component.scss']
})
export class DynamicInfoComponent implements OnInit {

  @Input() infoGap : string = '';
  @Input() infoAlign : string = '';
  @Input() infoFields : InfoField[] = [];
  @Input() obj : any;

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
