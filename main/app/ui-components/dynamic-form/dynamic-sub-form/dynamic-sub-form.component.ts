import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DynamicInfoDialogComponent } from '../../dialogs/dynamic-info-dialog/dynamic-info-dialog.component';
import { InfoField } from '../../dynamic-info/dynamic-info.models';
import { TableAction, TableColumn } from '../../dynamic-table/dynamic-table.models';
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
  @Input() hasInfo : boolean = true;
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
  dataSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private formService : DynamicFormService,public dialog : MatDialog) { }

  ngOnInit(): void {
    this.dataSubject.next(this.mapData());
    this.columnSubject.next(this.formField.tableColumns);
    this.form = this.formService.toFormGroup(this.formField.fields as FormFieldBase[]);
  }

  mapData(){
    return this.formField.tableData.map((item :any,index: number)=>{
      let newItem = Object.assign({},item);
      let actions : TableAction[] = [];
      if(this.hasDelete){
        actions.push(
          {
            icon : 'trash',
            text : 'Delete',
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
            text : 'Update',
            callbackFunc : this.updateFunc,
            params : {internalId : index},
            color : 'orange',
            tooltip :'Update'
          } as TableAction)
      }
      if(this.hasInfo){
        actions.push(
          {
            icon : 'info',
            text : 'Info',
            callbackFunc : this.infoFunc,
            params : {internalId : index},
            color : 'blue',
            tooltip :'Info'
          } as TableAction)
      }
      newItem['internalId'] = index;
      newItem['actions'] = actions;
      return newItem;
    })
  }

  updateSubRecord(item : {internalId : number}){
    let obj = this.formField.tableData[item.internalId];
    Object.keys(obj).forEach( (key : string) => {
      this.formField.fields.forEach( (field : any, index : number) => {
        if(field.key == key){
          field.value.next(obj[key]);
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
    this.formField.tableData.splice(item.internalId,1)
    this.dataSubject.next(this.mapData());
  }

  infoSubRecord(item : {internalId : number}){
    this.openInfoDialog('10ms','10ms',this.formField.tableData[item.internalId],this.formField.infoFields)
  }

  handleFormSubmit(){
    if(this.form.invalid){
      return;
    }
    if(this.editInternalId >= 0){
      this.formField.tableData.splice(this.editInternalId,1);
      this.formField.tableData.push(this.form.getRawValue())
      console.log('Added1',JSON.stringify(this.formField.tableData))
      this.dataSubject.next(this.mapData());
      console.log('Added2',JSON.stringify(this.formField.tableData))
      this.editInternalId = -1;
      this.formActions = [];
    }
    else{
      this.formField.tableData.push(this.form.getRawValue());
      console.log('Added1',JSON.stringify(this.formField.tableData))
      this.dataSubject.next(this.mapData());
      console.log('Added2',JSON.stringify(this.formField.tableData))
    }
    this.formField.fields.forEach( (field : any, index : number) => {
      field.value.next('');
    })
  }

  cancelUpdate(){
    this.editInternalId = -1;
    this.formActions = [];
    this.formField.fields.forEach( (field : any, index : number) => {
      field.value.next('');
    })
  }

  handleFieldChange(item : {key:string,value:string,form:FormGroup}){
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
      var x = a['order']; 
      var y = b['order'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).filter( (z:any) => z.type != FormFieldType.Hidden);;
  }
}
