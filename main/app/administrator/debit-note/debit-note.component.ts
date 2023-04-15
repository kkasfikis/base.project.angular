import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './debit-note.ui-config.json'
@Component({
  selector: 'app-debit-note',
  templateUrl: './debit-note.component.html',
  styleUrls: ['./debit-note.component.scss']
})
export class DebitNoteComponent implements OnInit {
  beforeCreateUpdateActions = this.initMods.bind(this); 

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
        'debit_items',
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
    if(item.subform == "debit_items" && item.key == "item_category1"){
      JsonHelpers.setSubFieldValue(this.formFields,'debit_items','item_category1',item.value);
      if(!!item.value && item.value.length > 0){
        console.log('categorry changed')
        this.crudService.qyeryByValue('Charge',{ "category1" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              const data = [...new Set(resp.data.map( (item:any) => item.category2))] as string[]; 
              console.log(this.formFields)
              JsonHelpers.setSubFieldValue(this.formFields,'debit_items','item_category2','');  
              JsonHelpers.setSubFieldValue(this.formFields,'debit_items','item_description',''); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'debit_items','item_category2',true); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'debit_items','item_description',false);             
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'debit_items',
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
    if(item.subform == "debit_items" && item.key == "item_category2"){
      JsonHelpers.setSubFieldValue(this.formFields,'debit_items','item_category2',item.value);
      let category = item.form.get('item_category1')?.value;
      if(category != undefined && !!item.value  && item.value.length > 0){
        console.log('categorry1 changed')
        this.crudService.qyeryByValue('Charge',{ "category1" : category, "category2" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              
              JsonHelpers.setSubFieldValue(this.formFields,'debit_items','item_description','');
              JsonHelpers.setSubFieldEnabled(this.formFields,'debit_items','item_description',true); 

              const data = [...new Set(resp.data.map( (item:any) => item.description))] as string[];
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'debit_items',
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
    if(item.subform == "debit_items" && item.key == "item_description"){
      JsonHelpers.setSubFieldValue(this.formFields,'debit_items','item_description',item.value);
      let category1 = item.form.get('item_category1')?.value;
      let category2 = item.form.get('item_category2')?.value;
      if(category1 != undefined && category2 != undefined && !!item.value && item.value.length > 0){
        console.log('description changed')
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "description" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'debit_items',
                'item_price',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 0
              );
              console.log('RESP DATA',resp.data)
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'debit_items',
                'item_order',
                resp.data && resp.data.length > 0 ? resp.data[0].category_order : 0
              )
            }
          }
        })
      }
    }
  }
}