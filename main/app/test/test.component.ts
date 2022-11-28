import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormFieldBase, FormFieldType, SubForm } from '../ui-components/dynamic-form/dynamic-form.models';
import { TableAction, TableColumn } from '../ui-components/dynamic-table/dynamic-table.models';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit,AfterViewInit {

  public enabledSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public formData : (FormFieldBase|SubForm)[] = [
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>('aaaa'),
      type : FormFieldType.TextBox,
      key : 'text1',
      label : 'text1',
      order: 1,
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 30,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'FormFieldBase',
      value : new BehaviorSubject<any>('bbbb'),
      type : FormFieldType.TextBox,
      key : 'text2',
      label : 'text2',
      order : 0,
      enabled : new BehaviorSubject<boolean>(true),
      required : new BehaviorSubject<boolean>(false),
      minLength : new BehaviorSubject<number>(0),
      maxLength : new BehaviorSubject<number>(0),
      regexPattern : new BehaviorSubject<string>(''),
      width : 70,
      innerWidth : 98,
      align : 'center center'
    } as FormFieldBase,
    {
      className : 'SubForm',
      key : 'subform1',
      title : 'SubForm 1',
      subtitle : 'This is a test subform',
      order:2,
      fields : [
        {
          className : 'FormFieldBase',
          value : new BehaviorSubject<any>('sub1 text1'),
          order : 2,
          type : FormFieldType.TextBox, 
          key : 'sub1text1',
          label : 'sub1 text1',
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
          value : new BehaviorSubject<any>('sub1 text2'),
          order : 1,
          type : FormFieldType.TextBox,
          key : 'sub1text2',
          label : 'sub1 text2',
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
          value : new BehaviorSubject<any>('sub1 text3'),
          order : 0,
          type : FormFieldType.TextBox,
          key : 'sub1text3',
          label : 'sub1 text3',
          enabled : new BehaviorSubject<boolean>(true),
          required : new BehaviorSubject<boolean>(false),
          minLength : new BehaviorSubject<number>(0),
          maxLength : new BehaviorSubject<number>(0),
          regexPattern : new BehaviorSubject<string>(''),
          width : 33,
          innerWidth : 98,
          align : 'center center'
        } as FormFieldBase,
      ] as FormFieldBase[],
      tableData : [],
      tableColumns : [
        {
            name : 'sub1text1',
            text : 'sub1text1',
            width : 35
        } as TableColumn,
        {
          name : 'sub1text2',
          text : 'sub1text2',
          width : 35
        } as TableColumn,
      ],
      infoFields : [
        {
          key : 'sub1text1',
          order : 2,
          label: 'sub1',
          type : 'text',
          width : '50',
          innerWidth : '98',
          align : 'center'
        },
        {
          key : 'sub1text2',
          order : 1,
          label: 'sub2',
          type : 'text',
          width : '50',
          innerWidth : '98',
          align : 'center'
        },
        {
          key : 'sub1text3',
          order : 0,
          label: 'sub3',
          type : 'text',
          width : '50',
          innerWidth : '98',
          align : 'center'
        },
      ],
      width : 100,
      innerWidth : 98,
      align : 'center center'
    } as SubForm
  ]

  data: any[] = [
    {id:1,position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {id:2,position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {id:3,position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {id:4,position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {id:5,position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {id:6,position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {id:7,position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {id:8,position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {id:9,position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {id:10,position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  tableColumns = [
    {
      name : 'id',
      text : 'id',
      isSortable : true,
      width :15
    } as TableColumn,
    {
      name : 'position',
      text : 'position',
      width : 15
    } as TableColumn,
    {
      name : 'name',
      text : 'name',
      isFilterable : true,
      width : 15
    } as TableColumn,
    {
      name : 'weight',
      text : 'weight',
      width : 15
    } as TableColumn,
    {
      name : 'symbol',
      text : 'symbol',
      isSortable : true,
      isFilterable : true,
      width : 15
    } as TableColumn,
  ]

  columnSubject : BehaviorSubject<TableColumn[]> = new BehaviorSubject<TableColumn[]>(this.tableColumns);
  dataSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.data);

  constructor() { }

  deleteFunc = this.testDelete.bind(this);
  editFunc = this.testEdit.bind(this);

  ngOnInit(): void {
  
    this.data.map(x => {
      // can add logic for different actions per row here
      if(x['id'] % 2){
        x['actions'] = [
          {
            icon:'menu',
            text:'delete',
            color : 'orange',
            callbackFunc: this.deleteFunc,
            params : { id : x['id']}
          } as TableAction,
          {
            icon:'edit',
            text:'edit',
            color : 'red',
            callbackFunc: this.editFunc,
            params : { id : x['id']}
          } as TableAction
        ] as TableAction[]
      }
      else{
        x['actions'] = [
          {
            icon:'menu',
            text:'delete',
            color : 'orange',
            callbackFunc: this.deleteFunc,
            params : { id : x['id']}
          } as TableAction
        ] as TableAction[]
      }
      
    })
  
  }

  ngAfterViewInit(): void {
    
  }

  testEdit( params : any){ 
    alert('editing id : ' + params['id'])
  }

  testDelete( params : any){
    alert('deleting id : ' + params['id'])
  }

  handleFormChanges(item : {key : string, value : string, form : FormGroup}){
    alert('Main Form Changed : ' + item.key + "|" + item.value + "|" + item.form)
  }

  handleSubFormChanges(item : {subform : string, key : string, value : string, form : FormGroup } ){
    alert('Sub Form ' + item.subform +  ' Changed : ' + item.key + "|" + item.value + "|" + item.form)
  }

  handleFormSubmit(formData : any){
    console.log('Main Form Submitted : ' + JSON.stringify(formData))
  }


}
