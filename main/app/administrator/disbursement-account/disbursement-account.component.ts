import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './disbursement-account.ui-config.json'
@Component({
  selector: 'app-disbursement-account',
  templateUrl: './disbursement-account.component.html',
  styleUrls: ['./disbursement-account.component.scss']
})
export class DisbursementAccountComponent implements OnInit {
  beforeCreateUpdateActions = this.initMods.bind(this); 

  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnInit(): void {
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods(this.formFields);
  }

  initMods(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[]){
    forkJoin([
      this.crudService.read('admin/predefined'),
      this.crudService.getAttributeWithId('Client','name'),
      this.crudService.read('admin/charge'),
      this.crudService.getAttributeWithId('Call','estimated_date,vessel,vessel_flag,client,client_alias,port'),
    ]).subscribe(
    ([predefinedResp, clientResp, chargeResp, callResp] : any[]) => {
      JsonHelpers.setReferenceFieldDropdown(formFields,'client','name',clientResp.data)
      JsonHelpers.setReferenceFieldDropdown(formFields,'call','estimated_date,vessel.vessel_name,vessel_flag,client.name,client_alias,port.name',callResp.data)
      JsonHelpers.setSubFieldDropdown(
        formFields,
        'disbursement_items',
        ['item_category1'],
        [ ([...new Set(chargeResp.data.map( (item:any) => item.category1))] as string[])
          .map( (x: string) => 
          {
            return {
              key : x,
              value : x
            }
          }
        )],
      )
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

  onSubFormChange(item : {subform : string, key : string, value: string, form : FormGroup} ){
    
  }
}
