import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormFieldBase, FormFieldType, SubForm } from '../ui-components/dynamic-form/dynamic-form.models';
import { InfoField } from '../ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from '../ui-components/dynamic-table/dynamic-table.models';

@Component({
  selector: 'app-test-crud',
  templateUrl: './test-crud.component.html',
  styleUrls: ['./test-crud.component.scss']
})
export class TestCrudComponent implements OnInit {

  constructor() { }


/*

ME EXEIS VALEI ANAMONH !!!!!!!!!


*/

  createFormFields : (FormFieldBase | SubForm)[] = [
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 0,
      type : FormFieldType.Hidden,
      key : 'Id',
      label : 'Id',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 0,
      type : FormFieldType.TextBox,
      key : 'field1',
      label : 'Field 1',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 1,
      type : FormFieldType.TextBox,
      key : 'field2',
      label : 'Field 2',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 2,
      type : FormFieldType.TextBox,
      key : 'field3',
      label : 'Field 3',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
  ]
  updateFormFields : (FormFieldBase | SubForm)[] = [
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 0,
      type : FormFieldType.Hidden,
      key : 'Id',
      label : 'Id',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 0,
      type : FormFieldType.TextBox,
      key : 'field1',
      label : 'Field 1',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 1,
      type : FormFieldType.TextBox,
      key : 'field2',
      label : 'Field 2',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>(''),
      order : 2,
      type : FormFieldType.TextBox,
      key : 'field3',
      label : 'Field 3',
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 33,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
  ]

  tableColumns : TableColumn[] = [
    {
      name : 'Id',
      text : 'Id',
      isFilterable : true,
      isSortable : true,
      width : 40
    },
    {
      name : 'field1',
      text : 'Field 1',
      isFilterable : true,
      isSortable : true,
      width : 40
    },
    {
      name : 'field3',
      text : 'Field 3',
      isFilterable : true,
      isSortable : true,
      width : 40
    },
  ]

  infoFields : InfoField[] = [
    {
      key : 'field1',
      order : 0,
      label : 'Field 1',
      type : 'text',
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      key : 'field2',
      order : 0,
      label : 'Field 2',
      type : 'text',
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      key : 'field3',
      order : 0,
      label : 'Field 3',
      type : 'text',
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    // key : string = '';
    // order : number = 0;
    // label : string = '';
    // type : string = 'text';
    // width : string = '';
    // innerWidth : string = '';
    // align : string = '';
  ]

  ngOnInit(): void {
  }

}
