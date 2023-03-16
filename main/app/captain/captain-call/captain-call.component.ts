import { Component, ElementRef, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
import { BehaviorSubject } from 'rxjs';
import * as data from './captain-call.ui-config.json'

@Component({
  selector: 'app-captain-call',
  templateUrl: './captain-call.component.html',
  styleUrls: ['./captain-call.component.scss']
})
export class CaptainCallComponent implements OnInit {

  constructor(private crudService : DynamicCrudService,private elementRef : ElementRef) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnDestroy(): void {
    this.formFields.forEach( (field :BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm> )=> {
      field.complete()
    })
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    console.log('Converting Call fields from JSON ....')
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
  }
}
