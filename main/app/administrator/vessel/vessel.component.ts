import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './vessel.ui-config.json'

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []
  tableColumns : TableColumn[] = []
  infoFields : (InfoField|SubFormInfo)[] = []
  filterFields : FilterField[] = []

  ngOnInit(): void {
    console.log('Converting Vessel fields from JSON ....')
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
        this.crudService.qyeryByValue('User',{ role : 'captain' })
      ]).subscribe(
      ([predefinedResp,userResp] : any[]) => {
        if(predefinedResp.read){
          let data = predefinedResp.data;
          let vesselFlags = data.find( (x:any) => x.key=='vesselFlags').values;
          let vesselTypes = data.find( (x:any) => x.key=='vesselTypes').values;
        
          JsonHelpers.setFieldDropdown(this.formFields,'flag',vesselFlags);
          JsonHelpers.setFieldDropdown(this.formFields,'vessel_type',vesselTypes);

          JsonHelpers.setReferenceFieldDropdown(this.formFields,'captain_user','full_name',userResp.data)
        } 
      }
    )
  }
}
