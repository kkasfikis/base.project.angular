import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { BehaviorSubject } from 'rxjs';
import * as data from './client-breakdown.ui-config.json'

@Component({
  selector: 'app-client-breakdown',
  templateUrl: './client-breakdown.component.html',
  styleUrls: ['./client-breakdown.component.scss']
})
export class ClientBreakdownComponent implements OnInit {

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
  }
}
