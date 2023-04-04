import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './agent.ui-config.json'

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []
  tableColumns : TableColumn[] = []
  infoFields : (InfoField|SubFormInfo)[] = []
  filterFields : FilterField[] = []

  beforeCreateUpdateActions = this.initMods.bind(this);

  ngOnInit(): void {
    console.log('Converting Vessel fields from JSON ....')
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods(this.formFields);
  }

  initMods(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[]){
    this.crudService.qyeryByValue('User',{ role : 'agent' }).subscribe({
      next : (resp : any) => {
        JsonHelpers.setReferenceFieldDropdown(formFields,'agent_user','full_name',resp.data)
      }
    })
  }

}
