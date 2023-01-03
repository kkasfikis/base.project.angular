import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { DynamicInfoDialogComponent } from '../../dialogs/dynamic-info-dialog/dynamic-info-dialog.component';
import { InfoField } from '../../dynamic-info/dynamic-info.models';
import { TableAction, TableColumn, TableData } from '../../dynamic-table/dynamic-table.models';
import { FormAction, FormFieldBase, FormFieldType, SubForm } from '../dynamic-form.models';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
  selector: 'app-dynamic-sub-form',
  templateUrl: './dynamic-sub-form.component.html',
  styleUrls: ['./dynamic-sub-form.component.scss']
})
export class DynamicSubFormComponent implements OnInit {


  @Input() subformField! : BehaviorSubject<SubForm>;
  
  
  label : string = '';
  enabled : boolean = true
  formAlign : string = 'center';
  hasDelete : boolean = true;
  hasUpdate : boolean = true;
  isTagged : boolean = false;
  tagSeperator : string = '';
  identifierKey : string = '';

  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();

  formField! : SubForm;
  formActions : FormAction[] = [];

  form! : FormGroup;
  disabled : boolean = false;
  enabledSub! : Subscription;

  editInternalId : number = -1;

  updateFunc = this.updateSubRecord.bind(this);
  deleteFunc = this.deleteSubRecord.bind(this);
  infoFunc = this.infoSubRecord.bind(this);
  cancelUpdateFunc = this.cancelUpdate.bind(this);

  columnSubject : BehaviorSubject<TableColumn[]> = new BehaviorSubject<TableColumn[]>([]);
  dataSubject : BehaviorSubject<TableData> = new BehaviorSubject<TableData>( new TableData(0,0,0,[]));
  
  private _unsubscribeSignal$: Subject<void> = new Subject();

  tags : string[] = []

  constructor(private formService : DynamicFormService,public dialog : MatDialog) { }

  ngOnInit(): void {
    let subform = this.subformField.getValue() as SubForm;
    this.label = subform.label ? subform.label : '';
    this.enabled = subform.enabled;
    this.formAlign = subform.align ? subform.align : 'center center';
    this.hasDelete = subform.hasDelete;
    this.hasUpdate = subform.hasUpdate;
    this.isTagged = subform.isTagged;
    this.tagSeperator = subform.tagSeperator;
    this.identifierKey = subform.identifierKey ? subform.identifierKey : '';
    console.log('Mapped Data1',this.mapData)
    this.dataSubject.next(this.mapData(subform));
    this.columnSubject.next(subform.tableColumns);
    this.form = this.formService.toFormGroup(subform.fields as FormFieldBase[]);
    this.formField = subform;
    this.subformField.pipe(takeUntil(this._unsubscribeSignal$)).subscribe({
      next : (field : SubForm) => {
        this.label = field.label ? subform.label : '';
        this.enabled = field.enabled;
        this.formAlign = field.align ? field.align : 'center center';
        this.hasDelete = field.hasDelete;
        this.hasUpdate = field.hasUpdate;
        this.isTagged = field.isTagged;
        this.tagSeperator = field.tagSeperator;
        this.identifierKey = field.identifierKey ? field.identifierKey : '';
        console.log('SUBFORM',field.tableColumns)
        this.columnSubject.next(field.tableColumns)
        this.formField = field;
        this.form = this.formService.toFormGroup(field.fields as FormFieldBase[]);
        this.dataSubject.next(this.mapData(field));
      }
    })
  }

  
  ngOnDestroy(): void {
    this._unsubscribeSignal$.next();
    this._unsubscribeSignal$.unsubscribe();
  }

  mapData(subform : SubForm){
    return new TableData(0,0,0,subform.tableData.map((item :any,index: number)=>{
      let newItem = Object.assign({},item);
      let actions : TableAction[] = [];
      if(subform.hasDelete){
        actions.push(
          {
            icon : 'cancel',
            callbackFunc : this.deleteFunc,
            params : {internalId : index},
            color : 'red',
            tooltip :'Delete'
          } as TableAction)
      }
      if(subform.hasUpdate){
        actions.push(
          {
            icon : 'edit',
            callbackFunc : this.updateFunc,
            params : {internalId : index},
            color : 'orange',
            tooltip :'Update'
          } as TableAction)
      }
      if(subform.hasInfo){
        actions.push(
          {
            icon : 'info',
            callbackFunc : this.infoFunc,
            params : {internalId : index},
            color : 'blue',
            tooltip :'Info'
          } as TableAction)
      }
      newItem['internalId'] = index;
      newItem['actions'] = actions;
      return newItem;
    }))
  }

  updateSubRecord(item : {internalId : number}){
    let subform = this.subformField.getValue() as SubForm;
    let obj = subform.tableData[item.internalId];
    console.log('SUBFORM:',subform,obj)
    Object.keys(obj).forEach( (key : string) => {
      subform.fields.forEach( (field : FormFieldBase) => {
        if(field.key == key){
          field.value = obj[key];
        }
      })
      this.subformField.next(subform);
    })
    this.editInternalId = item.internalId;
    this.formActions = [
      {
        key : 'cancelUpdate',
        icon : 'cancel',
        text : 'Cancel Update',
        color : 'red',
        func : this.cancelUpdateFunc,
        funcParams : {}
      } as FormAction
    ] as FormAction[]
  }

  deleteSubRecord(item : {internalId : number}){
    let subform = this.subformField.getValue() as SubForm;
    subform.tableData.splice(item.internalId,1)
    this.subformField.next(subform);
  }

  infoSubRecord(item : {internalId : number}){
    let subform = this.subformField.getValue() as SubForm;
    this.openInfoDialog('10ms', '10ms', subform.tableData[item.internalId], subform.infoFields)
  }

  handleFormSubmit(){
    if(this.form.invalid){
      return;
    }
    let subform = this.subformField.getValue() as SubForm;
    if(this.editInternalId >= 0 && !this.isTagged){
      let tData : any[] = subform.tableData;
      if(tData.length > 1){
        tData = tData.splice(this.editInternalId,1);
      }
      else{
        if(this.editInternalId == 0){
          tData = [];
        }
        else{
          return;
        }
      }
      tData.push(this.form.getRawValue());
      subform.tableData = tData;
      this.editInternalId = -1;
      this.formActions = [];
    }
    else{
      if(!this.isTagged){
        let tData : any[] = subform.tableData;
        console.log('TABLE DATA BEFORE ADD:',tData)
        tData.push(this.form.getRawValue());
        subform.tableData = tData;
      }
      else{
        let tData : string[] =subform.tableData;
        let form = this.form.getRawValue()
        let item : string = '';
        Object.keys(form).forEach( ( key : string) => {
          item += ( (item.length == 0) ? '' : this.tagSeperator) + form[key];
        })
        tData.push(item);
        subform.tableData = tData;
      }
    }
    subform.fields.forEach( (field : FormFieldBase, index : number) => {
      field.value = '';
    })
    this.subformField.next(subform);
  }

  cancelUpdate(){
    let subform = this.subformField.getValue() as SubForm;
    this.editInternalId = -1;
    this.formActions = [];
    subform.fields.forEach( (field : FormFieldBase, index : number) => {
      field.value = '';
    })
    this.subformField.next(subform);
  }

  deleteTag(tag:string){
    let subform = this.subformField.getValue() as SubForm;
    this.tags = this.tags.filter(e => e !== tag);
    subform.tableData = this.tags; 
    this.subformField.next(subform);
  }

  handleFieldChange(item : {key:string,value:string,form:FormGroup}){
    let subform = this.subformField.getValue() as SubForm;
    this.onFormChange.emit({subform : subform.key, key : item.key , value : item.value, form : item.form })
  }

  openInfoDialog(enterAnimationDuration : string , exitAnimationDuration : string,
                 element :any, infoFields : InfoField[]){
      this.dialog.open(DynamicInfoDialogComponent,{
        enterAnimationDuration,
        exitAnimationDuration,
        data : {
          element : element,
          infoFields : infoFields 
        }
      })
  }

  sortByOrder(array:any)
  {
    return array.sort(function(a : any, b : any)
    {
      let x = a.order;
      let y = b.order;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).filter( (z:any) => z.type != FormFieldType.Hidden);
  } 
}
