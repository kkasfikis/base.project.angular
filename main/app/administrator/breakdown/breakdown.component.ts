import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject } from 'rxjs';
import * as data from './breakdown.ui-config.json'
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit {

  constructor(private crudService : DynamicCrudService) { }


  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnInit(): void {
    console.log('Converting CSOA fields from JSON ....')
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods();
  }


  
  initMods(){

    this.crudService.read('admin/predefined').subscribe({
      next : (resp : any) => {
        let serviceStatus = resp.data.find( ( x:any ) => x.key == 'serviceStatus' ).values;
        let serviceCategories = resp.data.find( ( x:any ) => x.key == 'serviceCategories' ).values;
        let serviceSubcategories = resp.data.find( ( x:any ) => x.key == 'serviceSubcategories' ).values;
        JsonHelpers.setFieldDropdown(this.formFields,'breakdown_status' , resp.data.find( ( x:any ) => x.key == 'breakdownStatus' ).values );
        JsonHelpers.setSubFieldDropdown(this.formFields, 'breakdown_items', ['item_category','item_subcategory','item_status'],[serviceCategories,serviceSubcategories,serviceStatus] )
      }
    })
    
    this.crudService.read('admin/predefined').subscribe({
      next : (resp : any) => {
       
      }
    })
  }


}
