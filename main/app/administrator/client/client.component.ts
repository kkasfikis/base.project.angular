import { Component, OnInit } from '@angular/core';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoClassName, InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  formFields : (BehaviorSubject<FormFieldBase> | SubForm)[] = [
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.Hidden,
      key : '_id',
      label : 'ID',
      order : 0,
      enabled : true,
      required : false,
      minLength : 33,
      maxLength : 55,
      regexPattern : '',
      width : 100,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'name',
      label : 'Client Name',
      order : 0,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'category',
      label : 'Category',
      order : 1,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '' ,
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'status',
      label : 'Status',
      order : 2,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'occupation',
      label : 'Occupation',
      order : 3,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : new BehaviorSubject<any>(''),
      type : FormFieldType.TextBox,
      key : 'VAT',
      label : 'VAT',
      order : 4,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'VATpercentage',
      label : 'VAT %',
      order : 5,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'email',
      label : 'Email',
      order : 6,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'phone',
      label : 'Phone',
      order : 7,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'fax',
      label : 'FAX',
      order : 8,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'country',
      label : 'Country',
      order : 9,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'town',
      label : 'Town',
      order : 10,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'address',
      label : 'Address',
      order : 11,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'zip',
      label : 'Zip',
      order : 12,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'priority',
      label : 'Priority',
      order : 13,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'paymentMethod',
      label : 'Payment Method',
      order : 14,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'bank',
      label : 'Bank',
      order : 15,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'account',
      label : 'Account',
      order : 16,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new BehaviorSubject<FormFieldBase>(new FormFieldBase({
      value : '',
      type : FormFieldType.TextBox,
      key : 'notes',
      label : 'Notes',
      order : 17,
      enabled : true,
      required : false,
      minLength : 3,
      maxLength : 255,
      regexPattern : '',
      width : 50,
      innerWidth : 98,
      align : 'center center'
    })),
    new SubForm({
      key : 'peopleInCharge',
      order : 18,
      fields : [
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'name',
          label : 'Name',
          order : 0,
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'position',
          label : 'Position',
          order : 1,
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'title',
          label : 'Title',
          order : 2,
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
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
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'mobile',
          label : 'Mobile Number',
          order : 4,
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'fax',
          label : 'FAX',
          order : 5,
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'internalNumber',
          label : 'Internal Phone Number',
          order : 6,
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 50,
          innerWidth : 98,
          align : 'center center'
        })),
        new BehaviorSubject<FormFieldBase>(new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'notes',
          label : 'Notes',
          order : 7,
          enabled : true,
          options : [],
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 100,
          innerWidth : 98,
          align : 'center center'
        })),
      ] as BehaviorSubject<FormFieldBase>[],
      tableData : new BehaviorSubject<any[]>([]),
      tableColumns : [
        {
          name : 'title',
          text : 'Title',
          isFilterable : true,
          isSortable : true,
          width : 10
        },
        {
          name : 'name',
          text : 'Name',
          isFilterable : true,
          isSortable : true,
          width : 40
        },
        {
          name : 'position',
          text : 'Position',
          isFilterable : true,
          isSortable : true,
          width : 20
        },
      ] as TableColumn[],
      hasInfo : true,
      infoFields : [
        {
          className : InfoClassName.Field,
          key : 'title',
          order : 0,
          label : 'Title',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'name',
          order : 1,
          label : 'Name',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'position',
          order : 2,
          label : 'Position',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'phone',
          order : 3,
          label : 'Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'mobile',
          order : 4,
          label : 'Mobile Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'fax',
          order : 5,
          label : 'FAX',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'internalNumber',
          order : 6,
          label : 'Internal Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'notes',
          order : 7,
          label : 'Notes',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },
      ] as (InfoField|SubFormInfo)[],
      width : 100,
      innerWidth : 100,
      align : 'center'
    }),
    new SubForm({
      key : 'aliases',
      order : 19,
      fields : [
        new BehaviorSubject<FormFieldBase>({
          value : '',
          type : FormFieldType.TextBox,
          key : 'name',
          label : 'Alias',
          order : 0,
          options :[],
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 100,
          innerWidth : 98,
          align : 'center center'
        } as FormFieldBase),
      ] as BehaviorSubject<FormFieldBase>[],
      tableData : new BehaviorSubject<any[]>([]),
      tableColumns : [
        {
          name : 'name',
          text : 'Alias',
          isFilterable : true,
          isSortable : true,
          width : 70
        },
      ] as TableColumn[],
      hasInfo : false,
      infoFields : [] as (InfoField|SubFormInfo)[],
      width : 100,
      innerWidth : 100,
      align : 'center'
    }),
  ]

  tableColumns : TableColumn[] = [
    {
      name : 'name',
      text : 'Port Name',
      isFilterable : true,
      isSortable : true,
      width : 25
    },
    {
      name : 'category',
      text : 'Category',
      isFilterable : true,
      isSortable : true,
      width : 25
    },
    {
      name : 'status',
      text : 'Status',
      isFilterable : true,
      isSortable : true,
      width : 20
    },
  ]

  infoFields : (InfoField|SubFormInfo)[] = [
    {
      className : InfoClassName.Field,
      key : 'name',
      order : 0,
      label : 'Name',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'category',
      order : 1,
      label : 'category',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'status',
      order : 2,
      label : 'Status',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'occupation',
      order : 3,
      label : 'Occupation',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'VAT',
      order : 4,
      label : 'VAT',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'VATpercentage',
      order : 4,
      label : 'VAT %',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'email',
      order : 4,
      label : 'Email',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'phone',
      order : 5,
      label : 'Phone',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'fax',
      order : 6,
      label : 'FAX',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'country',
      order : 7,
      label : 'Country',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'town',
      order : 8,
      label : 'Town',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'address',
      order : 9,
      label : 'Address',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'zip',
      order : 10,
      label : 'ZIP',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'priority',
      order : 11,
      label : 'Priority',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'paymentMethod',
      order : 12,
      label : 'Payment Method',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'bank',
      order : 13,
      label : 'Bank',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'account',
      order : 14,
      label : 'Account',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'notes',
      order : 15,
      label : 'notes',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.Field,
      key : 'notes',
      order : 16,
      label : 'notes',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    },
    {
      className : InfoClassName.SubForm,
      key : 'peopleInCharge',
      order : 17,
      label : 'People In Charge',
      fields : [
        {
          className : InfoClassName.Field,
          key : 'title',
          order : 0,
          label : 'Title',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'name',
          order : 1,
          label : 'Name',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'position',
          order : 2,
          label : 'Position',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'phone',
          order : 3,
          label : 'Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'mobile',
          order : 4,
          label : 'Mobile Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'fax',
          order : 5,
          label : 'FAX',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'internalNumber',
          order : 6,
          label : 'Internal Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        },{
          className : InfoClassName.Field,
          key : 'notes',
          order : 7,
          label : 'Notes',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }
      ]
    },
    {
      className : InfoClassName.SubForm,
      key : 'aliases',
      order : 18,
      label : 'Aliases',
      fields : [
        {
          className : InfoClassName.Field,
          key : 'name',
          order : 0,
          label : 'Name',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }
      ]
    },
  ]

  enabledSubj : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

}
