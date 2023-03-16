import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './soa.ui-config.json'

@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss']
})
export class SOAComponent implements OnInit {

  constructor(private crudService : DynamicCrudService) { }

  
  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnInit(): void {
    console.log('Converting Proforma fields from JSON ....')
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods();
  }

  initMods(){
    forkJoin([
      this.crudService.getAttributeWithId('Call','estimated_date,client_name,client_alias,port_name,vessel_name,agent_name'),
      this.crudService.getAttributeWithId('Breakdown','breakdown_entry,breakdown_info,breakdown_status'),
      this.crudService.getAttributeWithId('Client','name'),
    ]).subscribe(
    ([callResp,breakdownResp,clientResp] : any[]) => {
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'client','name',clientResp.data)
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'call','estimated_date,client_name,client_alias,port_name,vessel_name,agent_name',callResp.data)
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'breakdown','breakdown_entry,breakdown_info,breakdown_status',breakdownResp.data)
    });
  }

  onFormChange( item : {mode : string, key : string, value : string, form : FormGroup}){
    if(item.key == 'client'){
      this.crudService.infoById('admin/client',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldDropdown(this.formFields,'client_alias',resp.data.client_aliases.map( (x:any) =>  {return { key : x.alias, value: x.alias}}))
        }
      });
    }
  }
}
