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


  @Input() title : string = '';
  @Input() subtitle : string = '';
  @Input() enabled : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input() formField! : any;
  @Input() formGap : string = '10px';
  @Input() formAlign : string = 'center';
  @Input() hasDelete : boolean = true;
  @Input() hasUpdate : boolean = true;
  @Input() identifierKey : string = '';

  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();

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

  constructor(private formService : DynamicFormService,public dialog : MatDialog) { }

  ngOnInit(): void {
    this.dataSubject.next(this.mapData());
    this.columnSubject.next(this.formField.tableColumns);
    this.form = this.formService.toFormGroup(this.formField.fields as BehaviorSubject<FormFieldBase>[]);
    this.formField.tableData.pipe(takeUntil(this._unsubscribeSignal$)).subscribe({
      next : () => {
        this.dataSubject.next(this.mapData())
      }
    })
  }

  
  ngOnDestroy(): void {
    this._unsubscribeSignal$.next();
    this._unsubscribeSignal$.unsubscribe();
  }

  mapData(){
    return new TableData(0,0,0,this.formField.tableData.getValue().map((item :any,index: number)=>{
      let newItem = Object.assign({},item);
      let actions : TableAction[] = [];
      if(this.hasDelete){
        actions.push(
          {
            icon : 'cancel',
            callbackFunc : this.deleteFunc,
            params : {internalId : index},
            color : 'red',
            tooltip :'Delete'
          } as TableAction)
      }
      if(this.hasUpdate){
        actions.push(
          {
            icon : 'edit',
            callbackFunc : this.updateFunc,
            params : {internalId : index},
            color : 'orange',
            tooltip :'Update'
          } as TableAction)
      }
      if(this.formField.hasInfo){
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
    let obj = this.formField.tableData.getValue()[item.internalId];
    Object.keys(obj).forEach( (key : string) => {
      this.formField.fields.forEach( (field : BehaviorSubject<FormFieldBase>, index : number) => {
        let tField = field.getValue();
        if(tField.key == key){
          tField.value = obj[key];
          field.next(tField);
        }
      })
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
    this.formField.tableData.getValue().splice(item.internalId,1)
    this.dataSubject.next(this.mapData());
  }

  infoSubRecord(item : {internalId : number}){
    this.openInfoDialog('10ms','10ms',this.formField.tableData.getValue()[item.internalId],this.formField.infoFields)
  }

  handleFormSubmit(){
    if(this.form.invalid){
      return;
    }
    if(this.editInternalId >= 0){
      this.formField.tableData.getValue().splice(this.editInternalId,1);
      this.formField.tableData.getValue().push(this.form.getRawValue())
      this.dataSubject.next(this.mapData());
      this.editInternalId = -1;
      this.formActions = [];
    }
    else{
      this.formField.tableData.getValue().push(this.form.getRawValue());
      this.dataSubject.next(this.mapData());
    }
    this.formField.fields.forEach( (field : BehaviorSubject<FormFieldBase>, index : number) => {
      let tField = field.getValue();
      tField.value = '';
      field.next(tField);
    })
  }

  cancelUpdate(){
    this.editInternalId = -1;
    this.formActions = [];
    this.formField.fields.forEach( (field : BehaviorSubject<FormFieldBase>, index : number) => {
      let tField = field.getValue();
      tField.value = '';
      field.next(tField);
    })
  }

  handleFieldChange(item : {key:string,value:string,form:FormGroup}){
    console.log('INSIDE',{subform : this.formField.key, key : item.key , value : item.value, form : item.form })
    this.onFormChange.emit({subform : this.formField.key, key : item.key , value : item.value, form : item.form })
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
      let x = a.getValue().order;
      let y = b.getValue().order;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).filter( (z:any) => z.getValue().type != FormFieldType.Hidden);
  } 
}
