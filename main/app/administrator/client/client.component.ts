import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './client.ui-config.json'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

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
      this.crudService.qyeryByValue('User',{ role : 'client' })
    ]).subscribe(
      ([predefinedResp,userResp] : any[]) => {
        if(predefinedResp.read){
          let data = predefinedResp.data;
          let clientStatus = data.find( (x:any) => x.key=='clientStatus').values;
          let clientCategories = data.find( (x:any) => x.key=='clientCategories').values;
          let countries = data.find( (x:any) => x.key=='countries').values;
          let priorities = data.find( (x:any) => x.key=='priorities').values;
          let paymentMethods = data.find( (x:any) => x.key=='paymentMethods').values;
          let banks = data.find( (x:any) => x.key=='banks').values;
          
          JsonHelpers.setFieldDropdown(formFields,'category',clientCategories);
          JsonHelpers.setFieldDropdown(formFields,'status',clientStatus);
          JsonHelpers.setFieldDropdown(formFields,'country',countries);
          JsonHelpers.setFieldDropdown(formFields,'priority',priorities);
          JsonHelpers.setFieldDropdown(formFields,'bank',banks);
          JsonHelpers.setFieldDropdown(formFields,'payment_method',paymentMethods);
          
          JsonHelpers.setReferenceFieldDropdown(formFields,'client_user','full_name',userResp.data)
        } 
      }
    )
  }
}
