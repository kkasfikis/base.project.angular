import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './invoice.ui-config.json'
import { JsonHelpers } from 'main/app/ui-components/dynamic-crud/json-helpers';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnInit(): void {
    console.log('Converting Invoice fields from JSON ....')
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods();
  }

  initMods(){
    forkJoin([
      this.crudService.read('predefined'),
      this.crudService.getAttributeWithId('Call','estimated_date,client_name,client_alias,port_name,vessel_name,agent_name'),
      this.crudService.getAttributeWithId('Breakdown','breakdown_entry,breakdown_info,breakdown_status'),
      this.crudService.getAttributeWithId('Client','name'),
    ]).subscribe(
    ([predefinedResp,callResp,breakdownResp,clientResp] : any[]) => {
      JsonHelpers.setFieldDropdown(this.formFields, 'invoice_type', predefinedResp.data.find( ( x:any ) => x.key == 'documentTypes' ).values )
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'client','name',clientResp.data)
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'call','estimated_date,client_name,client_alias,port_name,vessel_name,agent_name',callResp.data)
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'breakdown','breakdown_entry,breakdown_info,breakdown_status',breakdownResp.data)
    });
  }

  onFormChange( item : {mode : string, key : string, value : string, form : FormGroup}){
    if(item.key == 'client'){
      this.crudService.infoById('client',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldDropdown(this.formFields,'client_alias',resp.data.client_aliases.map( (x:any) => x.alias))
        }
      });
    }
  }
}
