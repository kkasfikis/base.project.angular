import { Component, Input, OnInit } from '@angular/core';
import { InfoField } from '../dynamic-info.models';

@Component({
  selector: 'app-dynamic-sub-form-info',
  templateUrl: './dynamic-sub-form-info.component.html',
  styleUrls: ['./dynamic-sub-form-info.component.scss']
})
export class DynamicSubFormInfoComponent implements OnInit {

  @Input() title : string = '';
  @Input() infoFields : InfoField[] = [];
  @Input() objArray : any[] = [];

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
