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

  beforeCreateUpdateActions = this.initMods.bind(this);

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
    this.initMods(this.formFields);
  }


  
  initMods(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[]){
    forkJoin([
      this.crudService.read('admin/predefined'),
      this.crudService.read('admin/charge'),
      this.crudService.getAttributeWithId('Port','name'),
      this.crudService.getAttributeWithId('Client','name'),
      this.crudService.getAttributeWithId('Vessel','vessel_name'),
      this.crudService.getAttributeWithId('Call','estimated_date,vessel,vessel_flag,client,client_alias,port'),
      this.crudService.getAttributeWithId('Proforma','proforma_no,client,client_alias')
    ]).subscribe(
    ([predefinedResp,chargeResp,portResp,clientResp,vesselResp,callResp,proformaResp] : any[]) => {
      if(predefinedResp.read){

        JsonHelpers.setSubFieldDropdown(
          formFields,
          'breakdown_items',
          ['item_category'],
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

        let ports = portResp.data;  
        JsonHelpers.setReferenceFieldDropdown(formFields,'call_port', 'name', ports)
        let clients = clientResp.data;
        JsonHelpers.setReferenceFieldDropdown(formFields,'call_client', 'name', clients)
        let vessels = vesselResp.data;
        JsonHelpers.setReferenceFieldDropdown(formFields,'call_vessel','vessel_name',vessels)
        let calls = callResp.data;
        JsonHelpers.setReferenceFieldDropdown(formFields,'call','estimated_date,vessel.vessel_name,vessel_flag,client.name,client_alias,port.name',calls)
        let proformas = proformaResp.data;
        JsonHelpers.setReferenceFieldDropdown(formFields,'proforma','proforma_no,client.name,client_alias',proformas)

        let serviceStatus = predefinedResp.data.find( ( x:any ) => x.key == 'serviceStatus' ).values;
        JsonHelpers.setFieldDropdown(formFields,'breakdown_status' , predefinedResp.data.find( ( x:any ) => x.key == 'breakdownStatus' ).values );
        JsonHelpers.setSubFieldDropdown(formFields, 'breakdown_items', ['item_status'],[serviceStatus] )
      
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
          console.log(resp.data)
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

  onSubFormChange(item : {subform : string, key : string, value: string, form : FormGroup} ){
    if(item.subform == "breakdown_items" && item.key == "item_category"){
      JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_category',item.value);
      if(!!item.value && item.value.length > 0){
        this.crudService.qyeryByValue('Charge',{ "category1" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              const data = [...new Set(resp.data.map( (item:any) => item.category2))] as string[]; 
              console.log(this.formFields)
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_subcategory','');  
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_description',''); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'breakdown_items','item_subcategory',true); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'breakdown_items','item_description',false);             
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'breakdown_items',
                ['item_subcategory'],
                [ data.map( (x:any) => 
                  {
                    return {
                      key : x,
                      value : x
                    }
                  }
                )],
              )
            }
          }
        })
      }
      
    }
    if(item.subform == "breakdown_items" && item.key == "item_subcategory"){
      JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_subcategory',item.value);
      let category = item.form.get('item_category')?.value;
      if(category != undefined && !!item.value  && item.value.length > 0){
        console.log('categorry1 changed')
        this.crudService.qyeryByValue('Charge',{ "category1" : category, "category2" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_description','');
              JsonHelpers.setSubFieldEnabled(this.formFields,'breakdown_items','item_description',true); 

              const data = [...new Set(resp.data.map( (item:any) => item.description))] as string[];
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'breakdown_items',
                ['item_description'],
                [ data.map( (x:any) => 
                  {
                    return {
                      key : x,
                      value : x
                    }
                  }
                )],
              )
            }
          }
        })
      }
    }
    if(item.subform == "breakdown_items" && item.key == "item_description"){
      JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_description',item.value);
      let category1 = item.form.get('item_category')?.value;
      let category2 = item.form.get('item_subcategory')?.value;
      if(category1 != undefined && category2 != undefined && !!item.value && item.value.length > 0){
        console.log('description changed')
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "description" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'breakdown_items',
                'item_price',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 0
              )
            }
          }
        })
      }
    }
  }
}
