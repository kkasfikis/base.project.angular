import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  constructor() { }


  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = [
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.Hidden,
      key : '_id',
    } as FormFieldBase),
    new BehaviorSubject<FormFieldBase>({
      value : '',
      type : FormFieldType.TextBox,
      key : 'name',
      label : 'Agent Name',
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
      key : 'exName',
      label : 'ExName',
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
      key : 'flag',
      label : 'Flag',
      order : 2,
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
      key : 'phone',
      label : 'Phone',
      order : 3,
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
      key : 'fax',
      label : 'FAX',
      order : 3,
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
      key : 'telex',
      label : 'Telex',
      order : 3,
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
      key : 'email',
      label : 'Email',
      order : 3,
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
      key : 'SCID',
      label : 'SCID',
      order : 3,
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
      key : 'DWT',
      label : 'DWT',
      order : 3,
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
      key : 'NRT',
      label : 'NRT',
      order : 3,
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
      key : 'BLT',
      label : 'BLT',
      order : 3,
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
      key : 'SCNRT',
      label : 'SCNRT',
      order : 3,
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
      key : 'LOA',
      label : 'LOA',
      order : 3,
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
      key : 'DRAFT',
      label : 'DRAFT',
      order : 3,
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
      key : 'BEAM',
      label : 'BEAM',
      order : 3,
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
      key : 'SCNT',
      label : 'SCNT',
      order : 3,
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
      key : 'SCGT',
      label : 'SCGT',
      order : 3,
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
      key : 'type',
      label : 'type',
      order : 3,
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
      key : 'pilots',
      label : 'pilots',
      order : 3,
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
      key : 'notes',
      label : 'notes',
      order : 3,
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
      key : 'image',
      label : 'image',
      order : 3,
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
      key : 'tonrate',
      label : 'tonrate',
      order : 3,
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
      key : 'name',
      text : 'Port Name',
      isFilterable : true,
      isSortable : true,
      width : 70
    },
  ]

  infoFields : InfoField[] = [
    {
      key : 'name',
      order : 0,
      label : 'Port Name',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      key : 'anchorage',
      order : 1,
      label : 'Anchorage',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      key : 'notes',
      order : 2,
      label : 'Notes',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    },
    {
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

  ngOnInit(): void {
  }

}
