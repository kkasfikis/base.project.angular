import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './breakdown.ui-config.json'
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormGroup } from '@angular/forms';

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
    forkJoin([
      this.crudService.read('admin/predefined'),
      this.crudService.getAttributeWithId('Port','name'),
      this.crudService.getAttributeWithId('Client','name'),
      this.crudService.getAttributeWithId('Vessel','vessel_name'),
      this.crudService.getAttributeWithId('Call','estimated_date,vessel,vessel_flag,client,client_alias,port'),
      this.crudService.getAttributeWithId('Proforma','proforma_no,client,client_alias')
    ]).subscribe(
    ([predefinedResp,portResp,clientResp,vesselResp,callResp,proformaResp] : any[]) => {
      if(predefinedResp.read){

        let ports = portResp.data;  
        JsonHelpers.setReferenceFieldDropdown(this.formFields,'call_port', 'name', ports)
        let clients = clientResp.data;
        JsonHelpers.setReferenceFieldDropdown(this.formFields,'call_client', 'name', clients)
        let vessels = vesselResp.data;
        JsonHelpers.setReferenceFieldDropdown(this.formFields,'call_vessel','vessel_name',vessels)
        let calls = callResp.data;
        JsonHelpers.setReferenceFieldDropdown(this.formFields,'call','estimated_date,vessel.vessel_name,vessel_flag,client.name,client_alias,port.name',calls)
        let proformas = proformaResp.data;
        JsonHelpers.setReferenceFieldDropdown(this.formFields,'proforma','proforma_no,client.name,client_alias',proformas)

        let serviceStatus = predefinedResp.data.find( ( x:any ) => x.key == 'serviceStatus' ).values;
        let serviceCategories = predefinedResp.data.find( ( x:any ) => x.key == 'serviceCategories' ).values;
        let serviceSubcategories = predefinedResp.data.find( ( x:any ) => x.key == 'serviceSubcategories' ).values;
        JsonHelpers.setFieldDropdown(this.formFields,'breakdown_status' , predefinedResp.data.find( ( x:any ) => x.key == 'breakdownStatus' ).values );
        JsonHelpers.setSubFieldDropdown(this.formFields, 'breakdown_items', ['item_category','item_subcategory','item_status'],[serviceCategories,serviceSubcategories,serviceStatus] )
      
      } 
    });


  }

  onFormChange(item : {mode : string, key : string, value : string, form : FormGroup}){
    if(item.key == 'proforma'){
      this.crudService.infoById('admin/proforma',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldValue(this.formFields,'proforma_no',resp.data.proforma_no)
        }
      })
    }

    if(item.key == 'call'){
      this.crudService.infoById('admin/call',item.value).subscribe({
        next : (resp:any) => {
          let call = resp.data
          JsonHelpers.setFieldValue(this.formFields,'call_estimated_date',call.estimated_date);
          JsonHelpers.setFieldValue(this.formFields,'call_vessel',call.vessel);
          JsonHelpers.setFieldValue(this.formFields,'call_client',call.client);
          JsonHelpers.setFieldValue(this.formFields,'call_client_alias',call.client_alias);
          JsonHelpers.setFieldValue(this.formFields,'call_vessel_flag',call.vessel_flag);
          JsonHelpers.setFieldValue(this.formFields,'call_port',call.port);
        }
      })
    }
  }

}
