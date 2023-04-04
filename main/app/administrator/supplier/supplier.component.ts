import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject } from 'rxjs';
import * as data from './supplier.ui-config.json'

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  beforeCreateUpdateActions = this.initMods.bind(this)

  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnInit(): void {
    console.log('Converting Supplier fields from JSON ....')
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods(this.formFields);
  }
  
  initMods(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[]){
    this.crudService.read('admin/predefined').subscribe({
      next : (resp : any) => {
        JsonHelpers.setFieldDropdown(formFields, 'status' , resp.data.find( ( x:any ) => x.key == 'supplierStatus' ).values );
        JsonHelpers.setFieldDropdown(formFields,  'category', resp.data.find( (x:any) => x.key == 'supplierCategories').values );
        JsonHelpers.setFieldDropdown(formFields,  'country', resp.data.find( (x:any) => x.key == 'countries').values );
        JsonHelpers.setFieldDropdown(formFields,  'supplier_object', resp.data.find( (x:any) => x.key == 'supplierOccupations').values );
        JsonHelpers.setFieldDropdown(formFields,  'priority', resp.data.find( (x:any) => x.key == 'priorities').values );
        JsonHelpers.setFieldDropdown(formFields,  'bank', resp.data.find( (x:any) => x.key == 'banks').values );
        JsonHelpers.setFieldDropdown(formFields, 'payment_method', resp.data.find( (x:any) => x.key == 'paymentMethods').values );
      }
    })
  }
}
