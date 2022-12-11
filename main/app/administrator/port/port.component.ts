import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { FormFieldBase, FormFieldType } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoClassName, InfoField, InfoType } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formFields : BehaviorSubject<FormFieldBase>[] = [
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.Hidden,
      key : '_id',
      label : 'ID',
      order : 0,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase),
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'name',
      label : 'Port Name',
      order : 0,
      enabled : true,
      required : true,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase),
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'anchorage',
      label : 'Anchorage',
      order : 1,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase),
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'notes',
      label : 'Notes',
      order : 1,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 1000,
      regexPattern : '',
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase),
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'weatherLink',
      label : 'Weather URL',
      order : 1,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase)
  ]

  tableColumns : TableColumn[] = [
    {
      name : 'name',
      text : 'Port Name',
      isFilterable : true,
      isSortable : true,
      width : 70
    },
  ]

  infoFields : InfoField[] = [
    {
      className : InfoClassName.Field,
      key : 'name',
      order : 0,
      label : 'Port Name',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'anchorage',
      order : 1,
      label : 'Anchorage',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'notes',
      order : 2,
      label : 'Notes',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'weatherLink',
      order : 2,
      label : 'Weather Link',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    }
  ]

  filterFields = [
    {
      key : 'name',
      label : 'Name',
      fieldType : FormFieldType.TextBox
    } as FilterField,
    {
      key : 'filter2',
      label : 'Filter 2',
      fieldType : FormFieldType.DatePicker
    } as FilterField,
  ] as FilterField[]
}
