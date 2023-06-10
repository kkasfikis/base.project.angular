import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableAction, TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './proforma.ui-config.json'
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {

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
    this.crudService.generateReport('Proforma',payload._id).subscribe({
      next : (resp : any) => {
        console.log('response',resp)
        const fileURL = URL.createObjectURL(resp);
        window.open(fileURL, '_blank');
      }
    });
    //window.open('report/generate/Proforma/' + payload._id, '_blank');
  }

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
      this.crudService.getAttributeWithId('ProformaTemplate','template_name'),
      this.crudService.read('admin/charge')
    ]).subscribe(
    ([predefinedResp,clientResp,templateResp,chargeResp] : any[]) => {
      JsonHelpers.setFieldDropdown(formFields, 'proforma_type', predefinedResp.data.find( ( x:any ) => x.key == 'documentTypes' ).values )
      JsonHelpers.setReferenceFieldDropdown(formFields,'client','name',clientResp.data)
      JsonHelpers.setReferenceFieldDropdown(formFields,'proforma_template','template_name',templateResp.data)
      JsonHelpers.setSubFieldDropdown(
        formFields,
        'proforma_items',
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

  onFormChange( item : {mode : string, key : string, value : any, form : FormGroup}){
    if(item.key == 'client'){
      this.crudService.infoById('admin/client',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldDropdown(this.formFields,'client_alias',resp.data.client_aliases.map( (x:any) =>  {return { key : x.alias, value: x.alias}}))
        }
      });
    }

    if(item.key == 'proforma_template'){
      this.crudService.infoById('admin/proformaTemplate',item.value).subscribe({
        next : (resp:any) => {
          JsonHelpers.setSubformItems(this.formFields,'proforma_items',resp.data.template_items);
        }
      })
    }
  }

  onSubFormChange(item : {subform : string, key : string, value: any, form : FormGroup} ){
    if(item.subform == "proforma_items" && item.key == "item_category1"){
      JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_category1',item.value);
      if(!!item.value && item.value.length > 0){
        this.crudService.qyeryByValue('Charge',{ "category1" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              const data = [...new Set(resp.data.map( (item:any) => item.category2))] as string[]; 
              JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_category2','');  
              JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_description',''); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'proforma_items','item_category2',true); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'proforma_items','item_description',false);             
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'proforma_items',
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
    if(item.subform == "proforma_items" && item.key == "item_category2"){
      JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_category2',item.value);
      let category = item.form.get('item_category1')?.value;
      if(category != undefined && !!item.value  && item.value.length > 0){
        this.crudService.qyeryByValue('Charge',{ "category1" : category, "category2" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              
              JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_description','');
              JsonHelpers.setSubFieldEnabled(this.formFields,'proforma_items','item_description',true); 

              const data = [...new Set(resp.data.map( (item:any) => item.description))] as string[];
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'proforma_items',
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
    if(item.subform == "proforma_items" && item.key == "item_description"){
      JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_description',item.value);
      let category1 = item.form.get('item_category1')?.value;
      let category2 = item.form.get('item_category2')?.value;
      if(category1 != undefined && category2 != undefined && !!item.value && item.value.length > 0){
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "description" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'proforma_items',
                'item_price',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 0
              )
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'proforma_items',
                'item_amount',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 'aaaaaaaaaaa'
              )
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'proforma_items',
                'item_order',
                resp.data && resp.data.length > 0 ? resp.data[0].category_order : 0
              )
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'proforma_items',
                'item_remarks',
                resp.data && resp.data.length > 0 ? resp.data[0].remarks : 0
              )
              
              JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_percent',0);
              JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_value',0);
              JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_total',resp.data[0].price);
            }
          }
        })
      }
    }
    if(item.subform == "proforma_items" && (item.key == "item_price" || item.key == "item_qty") ){
      if(item.key == "item_price"){
        let quantity = item.form.get('item_qty')?.value;
        JsonHelpers.setSubFieldValue(
          this.formFields,
          'proforma_items',
          'item_amount',
          quantity * item.value
        )
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_price',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_total', (quantity * item.value).toFixed(2));
      }
      else{
        let price = item.form.get('item_price')?.value;
        JsonHelpers.setSubFieldValue(
          this.formFields,
          'proforma_items',
          'item_amount',
          price * item.value
        )
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_qty',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_total', (price * item.value).toFixed(2));
      }
      JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_percent',0);
      JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_value', 0);
    }

    if(item.subform == "proforma_items" && item.key == "item_discount_value"){
      let amount : number = item.form.get('item_amount')?.value;
      if(item.value <= amount){
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_value',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_percent', ((item.value * 100)/amount).toFixed(2));
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_total', (amount - item.value).toFixed(2));
      }
    }

    if(item.subform == "proforma_items" && item.key == "item_discount_percent"){
      let amount : number = item.form.get('item_amount')?.value;
      if(item.value <= 100){
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_percent',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_discount_value', ((amount * item.value)/100).toFixed(2));
        JsonHelpers.setSubFieldValue(this.formFields,'proforma_items','item_total', (amount - ((amount * item.value)/100)).toFixed(2));
      }
    }
  }
}
