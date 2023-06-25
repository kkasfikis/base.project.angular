import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableAction, TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './breakdown.ui-config.json'
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent implements OnInit,AfterViewInit {

  beforeCreateUpdateActions = this.initMods.bind(this);
 
  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []
  tableColumns : TableColumn[] = []
  infoFields : (InfoField|SubFormInfo)[] = []
  filterFields : FilterField[] = []
  tableActions = [
    {
      icon : 'file_copy',
      text : '',
      tooltip : '',
      color : 'blue',
      callbackFunc : this.generateReport.bind(this),
      params : {}
    } as TableAction
  ]
  
  generateReport(payload : any){
    console.log('PAYLOAD',payload)
    this.crudService.generateReport('Breakdown',payload._id).subscribe({
      next : (resp : any) => {
        console.log('response',resp)
        const fileURL = URL.createObjectURL(resp);
        window.open(fileURL, '_blank');
      }
    });
    //window.open('report/generate/Proforma/' + payload._id, '_blank');
  }
  
  ngOnInit(): void {
    let subform : any = data.fields.find((x:any) => x.id == 'breakdown_items')
    subform.beforeUpdateActions = this.subformBeforeUpdate.bind(this);
    console.log('DATAAAA',data); 
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    console.log('FORM FIELDS AFTER INITIALIZATION 111111',this.formFields)
    this.initMods(this.formFields);
    console.log('FORM FIELDS AFTER INITIALIZATION',this.formFields)
  }

  ngAfterViewInit(): void {
    //let subformSubject = this.formFields.find( (x:any) => x.getValue().key == 'breakdown_items')! as BehaviorSubject<SubForm>;
    //let subform  : SubForm = this.formFields.find( (x:any) => x.getValue().key == 'breakdown_items')!.getValue() as SubForm;
    //subform = JSON.parse(JSON.stringify(subform));
    //subform.beforeUpdateActions = this.subformBeforeUpdate.bind(this);
    //console.log('SUBFORM BEFORE PROPAGATE',subform)
    //subformSubject.next(JSON.parse(JSON.stringify(subform))) 
    //console.log('AFTER SUBFORM INITIALIZATION', subform,new BehaviorSubject<SubForm>(subform),subformSubject.getValue())
  }

  async subformBeforeUpdate(payload : any){
    console.log('PAYLOAD',payload)
    return true;
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
        
        console.log('AAAAAAAAAAAA',portResp,clientResp,vesselResp,callResp,proformaResp)
        JsonHelpers.setSubFieldDropdown(
          formFields,
          'breakdown_items',
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
      } 
    });


  }

  onFormChange(item : {mode : string, key : string, value : any, form : FormGroup}){
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
          JsonHelpers.setFieldValue(this.formFields,'call_vessel',call.vessel._id);
          JsonHelpers.setFieldValue(this.formFields,'call_client',call.client._id);
          JsonHelpers.setFieldValue(this.formFields,'call_client_alias',call.client_alias);
          JsonHelpers.setFieldValue(this.formFields,'call_vessel_flag',call.vessel_flag);
          JsonHelpers.setFieldValue(this.formFields,'call_port',call.port._id);
        }
      })
    }
  }

  onSubFormChange(item : {subform : string, key : string, value: any, form : FormGroup} ){
    if(item.subform == "breakdown_items" && item.key == "item_category1"){
      JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_category1',item.value);
      if(!!item.value && item.value.length > 0){
        this.crudService.qyeryByValue('Charge',{ "category1" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              const data = [...new Set(resp.data.map( (item:any) => item.category2))] as string[]; 
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_category2','');  
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_description',''); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'breakdown_items','item_category2',true); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'breakdown_items','item_description',false);             
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'breakdown_items',
                ['item_category2'],
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
    if(item.subform == "breakdown_items" && item.key == "item_category2"){
      JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_category2',item.value);
      let category = item.form.get('item_category1')?.value;
      if(category != undefined && !!item.value  && item.value.length > 0){
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
      let category1 = item.form.get('item_category1')?.value;
      let category2 = item.form.get('item_category2')?.value;
      if(category1 != undefined && category2 != undefined && !!item.value && item.value.length > 0){
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "description" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'breakdown_items',
                'item_price',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 0
              )
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_debit', (resp.data[0].price).toFixed(2));
              JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_qty', 1);
            }
          }
        })
      }
    }
    if(item.subform == "breakdown_items" && (item.key == "item_price" || item.key == "item_qty") ){
      if(item.key == "item_price"){
        let quantity = item.form.get('item_qty')?.value;
        JsonHelpers.setSubFieldValue(
          this.formFields,
          'breakdown_items',
          'item_debit',
          quantity * item.value
        )
        JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_price',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_debit', (quantity * item.value).toFixed(2));
      }
      else{
        let price = item.form.get('item_price')?.value;
        JsonHelpers.setSubFieldValue(
          this.formFields,
          'breakdown_items',
          'item_debit',
          price * item.value
        )
        JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_qty',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'breakdown_items','item_debit', (price * item.value).toFixed(2));
      }
    }
  }
}
