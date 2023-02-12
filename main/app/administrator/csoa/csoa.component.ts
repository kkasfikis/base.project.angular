import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { JsonHelpers } from 'main/app/ui-components/dynamic-crud/json-helpers';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './csoa.ui-config.json'

@Component({
  selector: 'app-csoa',
  templateUrl: './csoa.component.html',
  styleUrls: ['./csoa.component.scss']
})
export class CSOAComponent implements OnInit {

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
    this.crudService.getAttributeWithId('Client','name').subscribe(
      (clientResp : any) => {
        JsonHelpers.setReferenceFieldDropdown(this.formFields,'client','name',clientResp.data)
      }
    );
  }
 
}
