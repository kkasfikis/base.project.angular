import { Component, OnInit } from '@angular/core';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  formFields : (BehaviorSubject<FormFieldBase> | BehaviorSubject<SubForm>)[] = [
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
    new BehaviorSubject<SubForm>(new SubForm({
      key : 'peopleInCharge',
      order : 18,
      fields : [
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        }),
        new FormFieldBase({
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
        })
      ] as FormFieldBase[],
      tableData : [],
      tableColumns : [
        {
          key : 'title',
          text : 'Title',
          isFilterable : true,
          isSortable : true,
          width : 10
        },
        {
          key : 'name',
          text : 'Name',
          isFilterable : true,
          isSortable : true,
          width : 40
        },
        {
          key : 'position',
          text : 'Position',
          isFilterable : true,
          isSortable : true,
          width : 20
        },
      ] as TableColumn[],
      hasInfo : true,
      infoFields : [
        new InfoField({
          key : 'title',
          order : 0,
          label : 'Title',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'name',
          order : 1,
          label : 'Name',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'position',
          order : 2,
          label : 'Position',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'phone',
          order : 3,
          label : 'Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'mobile',
          order : 4,
          label : 'Mobile Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'fax',
          order : 5,
          label : 'FAX',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'internalNumber',
          order : 6,
          label : 'Internal Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'notes',
          order : 7,
          label : 'Notes',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        })
      ] as InfoField[],
      width : 100,
      innerWidth : 100,
      align : 'center'
    })),
    new BehaviorSubject<SubForm>(new SubForm({
      key : 'aliases',
      order : 19,
      fields : [
        new FormFieldBase({
          value : '',
          type : FormFieldType.TextBox,
          key : 'alias',
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
        }),
        new FormFieldBase({
          value : '',
          type : FormFieldType.TextArea,
          key : 'text',
          label : 'Description',
          order : 1,
          options :[],
          enabled : true,
          required : false,
          minLength : 3,
          maxLength : 255,
          regexPattern : '',
          width : 100,
          innerWidth : 98,
          align : 'center center'
        })
      ] as FormFieldBase[],
      tableData : [],
      tableColumns : [
        {
          key : 'alias',
          text : 'Alias',
          isFilterable : true,
          isSortable : true,
          width : 70
        },
      ] as TableColumn[],
      hasInfo : true,
      infoFields : [
        new InfoField({
          key : 'alias',
          order : 0,
          label : 'Alias',
          type : InfoType.Text,
          width : '100',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'text',
          order : 5,
          label : 'Description',
          type : InfoType.Text,
          width : '100',
          innerWidth : '100',
          align : 'center'
        }),
      ] as InfoField[],
      width : 100,
      innerWidth : 100,
      align : 'center'
    })),
  ]

  tableColumns : TableColumn[] = [
    {
      key : 'name',
      text : 'Port Name',
      isFilterable : true,
      isSortable : true,
      width : 25
    },
    {
      key : 'category',
      text : 'Category',
      isFilterable : true,
      isSortable : true,
      width : 25
    },
    {
      key : 'status',
      text : 'Status',
      isFilterable : true,
      isSortable : true,
      width : 20
    },
  ]

  infoFields : (InfoField|SubFormInfo)[] = [
    new InfoField({
      key : 'name',
      order : 0,
      label : 'Name',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'category',
      order : 1,
      label : 'category',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'status',
      order : 2,
      label : 'Status',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'occupation',
      order : 3,
      label : 'Occupation',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'VAT',
      order : 4,
      label : 'VAT',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'VATpercentage',
      order : 4,
      label : 'VAT %',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'email',
      order : 4,
      label : 'Email',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'phone',
      order : 5,
      label : 'Phone',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'fax',
      order : 6,
      label : 'FAX',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'country',
      order : 7,
      label : 'Country',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'town',
      order : 8,
      label : 'Town',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'address',
      order : 9,
      label : 'Address',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'zip',
      order : 10,
      label : 'ZIP',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'priority',
      order : 11,
      label : 'Priority',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'paymentMethod',
      order : 12,
      label : 'Payment Method',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'bank',
      order : 13,
      label : 'Bank',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'account',
      order : 14,
      label : 'Account',
      type : InfoType.Text,
      width : '50',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'notes',
      order : 15,
      label : 'notes',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    }),
    new InfoField({
      key : 'notes',
      order : 16,
      label : 'notes',
      type : InfoType.Text,
      width : '100',
      innerWidth : '100',
      align : 'center'
    }),
    new SubFormInfo({
      key : 'peopleInCharge',
      order : 17,
      label : 'People In Charge',
      fields : [
        new InfoField({
          key : 'title',
          order : 0,
          label : 'Title',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'name',
          order : 1,
          label : 'Name',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'position',
          order : 2,
          label : 'Position',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'phone',
          order : 3,
          label : 'Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'mobile',
          order : 4,
          label : 'Mobile Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'fax',
          order : 5,
          label : 'FAX',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'internalNumber',
          order : 6,
          label : 'Internal Phone Number',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        }),
        new InfoField({
          key : 'notes',
          order : 7,
          label : 'Notes',
          type : InfoType.Text,
          width : '50',
          innerWidth : '100',
          align : 'center'
        })
      ]
    }),
    new SubFormInfo({
      key : 'aliases',
      order : 18,
      label : 'Aliases',
      fields : [
        {
          key : 'alias',
          order : 0,
          label : 'Alias',
          type : InfoType.Text,
          width : '100',
          innerWidth : '100',
          align : 'center'
        },
        {
          key : 'text',
          order : 0,
          label : 'Desription',
          type : InfoType.Text,
          width : '100',
          innerWidth : '100',
          align : 'center'
        }
      ]
    })
  ]

  enabledSubj : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

}
