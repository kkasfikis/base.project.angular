import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './invoice.ui-config.json'
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
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
      this.crudService.read('admin/predefined'),
      this.crudService.getAttributeWithId('Call','estimated_date,client_name,client_alias,port_name,vessel_name,agent_name'),
      this.crudService.getAttributeWithId('Breakdown','breakdown_entry,breakdown_info,breakdown_status'),
      this.crudService.getAttributeWithId('Client','name'),
      this.crudService.read('admin/charge')
    ]).subscribe(
    ([predefinedResp,callResp,breakdownResp,clientResp,chargeResp] : any[]) => {
      JsonHelpers.setFieldDropdown(this.formFields, 'invoice_type', predefinedResp.data.find( ( x:any ) => x.key == 'documentTypes' ).values )
      JsonHelpers.setReferenceFieldDropdown(this.formFields,'client','name',clientResp.data)
      //JsonHelpers.setReferenceFieldDropdown(this.formFields,'call','estimated_date,client_name,client_alias,port_name,vessel_name,agent_name',callResp.data)
      //JsonHelpers.setReferenceFieldDropdown(this.formFields,'breakdown','breakdown_entry,breakdown_info,breakdown_status',breakdownResp.data)
      JsonHelpers.setSubFieldDropdown(
        this.formFields,
        'invoice_items',
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
    if(item.subform == "invoice_items" && item.key == "item_category1"){
      JsonHelpers.setSubFieldValue(this.formFields,'invoice_items','item_category1',item.value);
      this.crudService.qyeryByValue('Charge',{ "category1" : item.value }).subscribe({
        next : (resp : any) => {
          if(resp.query){
            const data = [...new Set(resp.data.map( (item:any) => item.category2))] as string[];
            JsonHelpers.setSubFieldDropdown(
              this.formFields,
              'invoice_items',
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
    if(item.subform == "invoice_items" && item.key == "item_category2"){
      JsonHelpers.setSubFieldValue(this.formFields,'invoice_items','item_category2',item.value);
      let category = item.form.get('item_category1')?.value;
      if(category != undefined){
        this.crudService.qyeryByValue('Charge',{ "category1" : category, "category2" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              const data = [...new Set(resp.data.map( (item:any) => item.category3))] as string[];
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'invoice_items',
                ['item_category3'],
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
    if(item.subform == "invoice_items" && item.key == "item_category3"){
      JsonHelpers.setSubFieldValue(this.formFields,'invoice_items','item_category3',item.value);
      let category1 = item.form.get('item_category1')?.value;
      let category2 = item.form.get('item_category2')?.value;
      if(category1 != undefined && category2 != undefined){
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "category3" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              const data = [...new Set(resp.data.map( (item:any) => item.description))] as string[];
              JsonHelpers.setSubFieldDropdown(
                this.formFields,
                'invoice_items',
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
    if(item.subform == "invoice_items" && item.key == "item_description"){
      JsonHelpers.setSubFieldValue(this.formFields,'invoice_items','item_description',item.value);
      let category1 = item.form.get('item_category1')?.value;
      let category2 = item.form.get('item_category2')?.value;
      let category3 = item.form.get('item_category3')?.value;
      if(category1 != undefined && category2 != undefined && category3 != undefined){
        this.crudService.qyeryByValue('Charge',{ "category1" : category1, "category2" : category2, "category3" : category3, "description" : item.value }).subscribe({
          next : (resp : any) => {
            if(resp.query){
              JsonHelpers.setSubFieldValue(
                this.formFields,
                'invoice_items',
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
