import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableAction, TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { BehaviorSubject, forkJoin } from 'rxjs';
import  * as data from './proforma-template.ui-config.json'

@Component({
  selector: 'app-proforma-template',
  templateUrl: './proforma-template.component.html',
  styleUrls: ['./proforma-template.component.scss']
})
export class ProformaTemplateComponent implements OnInit {

  beforeCreateUpdateActions = this.initMods.bind(this)
  

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
    this.crudService.read('admin/charge').subscribe({
      next : (chargeResp : any) => {
        JsonHelpers.setSubFieldDropdown(
          formFields,
          'template_items',
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
      }
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

  onSubFormChange(item : {subform : string, key : string, value: any, form : FormGroup} ){
    if(item.subform == "template_items" && item.key == "item_category1"){
      JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_category1',item.value);
      this.crudService.qyeryByValue('Charge',{ "category1" : item.value }).subscribe({
        next : (resp : any) => {
          if(resp.query){
            
            JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_category2','');  
            JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_description',''); 
            JsonHelpers.setSubFieldEnabled(this.formFields,'template_items','item_category2',true); 
            JsonHelpers.setSubFieldEnabled(this.formFields,'template_items','item_description',false);  
            const data = [...new Set(resp.data.map( (item:any) => item.category2))] as string[];
            JsonHelpers.setSubFieldDropdown(
              this.formFields,
              'template_items',
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
    if(item.subform == "template_items" && item.key == "item_category2"){
      JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_category2',item.value);
      let category = item.form.get('item_category1')?.value;
      if(category != undefined){
        this.crudService.qyeryByValue('Charge',{ "category1" : category, "category2" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){ 
              JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_description',''); 
              JsonHelpers.setSubFieldEnabled(this.formFields,'template_items','item_description',true);  
              const data = [...new Set(resp.data.map( (item:any) => item.description))] as string[];
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'template_items',
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
    if(item.subform == "template_items" && item.key == "item_description"){
      JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_description',item.value);
      let category1 = item.form.get('item_category1')?.value;
      let category2 = item.form.get('item_category2')?.value;
      if(category1 != undefined && category2 != undefined){
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "description" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'template_items',
                'item_price',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 'aaaaaaaaaaa'
              )
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'template_items',
                'item_amount',
                resp.data && resp.data.length > 0 ? resp.data[0].price : 'aaaaaaaaaaa'
              )
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'template_items',
                'item_order',
                resp.data && resp.data.length > 0 ? resp.data[0].category_order : 0
              )
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'template_items',
                'item_remarks',
                resp.data && resp.data.length > 0 ? resp.data[0].notes : ''
              )
              
              JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_percent',0);
              JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_value',0);
              JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_total',resp.data[0].price);
            }
          }
        })
      }
    }
    if(item.subform == "template_items" && (item.key == "item_price" || item.key == "item_qty") ){
      if(item.key == "item_price"){
        let quantity = item.form.get('item_qty')?.value;
        JsonHelpers.setSubFieldValue(
          this.formFields,
          'template_items',
          'item_amount',
          quantity * item.value
        )
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_price',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_total', (quantity * item.value).toFixed(2));
      }
      else{
        let price = item.form.get('item_price')?.value;
        JsonHelpers.setSubFieldValue(
          this.formFields,
          'template_items',
          'item_amount',
          price * item.value
        )
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_qty',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_total', (price * item.value).toFixed(2));
      }
      JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_percent',0);
      JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_value', 0);
    }

    if(item.subform == "template_items" && item.key == "item_discount_value"){
      let amount : number = item.form.get('item_amount')?.value;
      if(item.value <= amount){
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_value',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_percent', ((item.value * 100)/amount).toFixed(2));
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_total', (amount - item.value).toFixed(2));
      }
    }

    if(item.subform == "template_items" && item.key == "item_discount_percent"){
      let amount : number = item.form.get('item_amount')?.value;
      if(item.value <= 100){
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_percent',item.value);
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_discount_value', ((amount * item.value)/100).toFixed(2));
        JsonHelpers.setSubFieldValue(this.formFields,'template_items','item_total', (amount - ((amount * item.value)/100)).toFixed(2));
      }
    }

  }
  
}
