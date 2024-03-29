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


  @Input() subformField! : SubForm | BehaviorSubject<SubForm>;
  
  
  label : string = '';
  enabled : boolean = true
  formAlign : string = 'center';
  hasDelete : boolean = true;
  hasUpdate : boolean = true;
  isTagged : boolean = false;
  tagSeperator : string = '';
  identifierKey : string = '';
  
  visible : boolean = true;

  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();

  subformFields : FormFieldBase[] = [];

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

  initSubForm(subForm : SubForm){
    
    this.label = subForm.label ? subForm.label : '';
    this.enabled = subForm.enabled;
    this.formAlign = subForm.align ? subForm.align : 'center center';
    this.hasDelete = subForm.hasDelete;
    this.hasUpdate = subForm.hasUpdate;
    this.visible = subForm.visible;
    this.isTagged = subForm.isTagged;
    this.tagSeperator = subForm.tagSeperator;
    this.identifierKey = subForm.identifierKey ? subForm.identifierKey : '';
    this.columnSubject.next(subForm.tableColumns)
    this.formField = subForm;
    this.formField.fields = [...subForm.fields];
    console.log('INIT SBUFORM',subForm)
    this.formField.beforeSubmitActions = subForm.beforeSubmitActions;
    this.formField.beforeUpdateActions = subForm.beforeUpdateActions; 
    if(!this.form){
      this.form = this.formService.toFormGroup(subForm.fields as FormFieldBase[]);
    }
    
    this.subformFields = []
    setTimeout( () => { 
      this.subformFields = []
      subForm.fields.forEach( (field : FormFieldBase) => {
        if(!field.value){
          let control = this.form.get(field.key);
          if (control){
            field.value = control.value;
          }
        }
        this.subformFields.push(field) 
      });
      this.form = this.formService.toFormGroup(subForm.fields as FormFieldBase[]);
    });

    this.isTagged ? this.tags = subForm.tableData : this.dataSubject.next(this.mapData(subForm))

  }

  ngOnInit(): void {
    if(this.subformField instanceof SubForm){
      this.initSubForm(this.subformField)
    }
    else{
      this.subformField.pipe(takeUntil(this._unsubscribeSignal$)).subscribe({
        next : (field : SubForm) => {
          console.log('RECEIVED FIELD',field)
          this.initSubForm(field)
        }
      })
    }
  }

  
  ngOnDestroy(): void {
    this._unsubscribeSignal$.next();
    this._unsubscribeSignal$.unsubscribe();
  }

  mapData(subform : SubForm){
    let data = subform.tableData.map((item :any,index: number)=>{
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
    })  
    return new TableData(0,0,0,data);
  }

  updateSubRecord(item : {internalId : number}){
    
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;

    let beforeUpdate : Promise<boolean> = (subform.beforeUpdateActions != undefined) ? 
          subform.beforeUpdateActions({subform : this.subformField, item : subform.tableData[item.internalId], id : item.internalId}) 
          : Promise.resolve(true) 

    console.log('before Update', this.subformField,beforeUpdate)

    beforeUpdate.then( (update : boolean) => {
      if( !update ){
        return;
      }
      else{
        let obj = subform.tableData[item.internalId];
    
        Object.keys(obj).forEach( (key : string) => {
          subform.fields.forEach( (field : FormFieldBase) => {
            if(field.key == key){
              if(field.type == FormFieldType.DatePicker){
                field.value = new Date(obj[key]);
              }
              else{
                field.value = obj[key];
                if(field.type != FormFieldType.PDF){
                  console.log('key',key,'value',obj[key])
                }
              }
            }
          });
        });
    
        if(this.subformField instanceof SubForm){
          this.subformField = subform;
          this.initSubForm(this.subformField);
        }
        else{
          this.subformField.next(subform);
        }
    
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
    } )
  }

  deleteSubRecord(item : {internalId : number}){
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;
    subform.tableData.splice(item.internalId,1);
    if(this.subformField instanceof SubForm){
      this.subformField = subform;
      this.initSubForm(this.subformField);
    }
    else{
      this.subformField.next(subform);
    }
  }

  infoSubRecord(item : {internalId : number}){
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;
    this.openInfoDialog('10ms', '10ms', subform.tableData[item.internalId], subform.infoFields)
  }

  handleFormSubmit(){
    if(this.form.invalid){
      const invalid = [];
      const controls = this.form.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      return;
    }
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;
    if(this.isTagged){
      let tData : string[] = subform.tableData;
      let form = this.form.getRawValue()
      let item : string = '';
      Object.keys(form).forEach( ( key : string) => {
        item += ( (item.length == 0) ? '' : this.tagSeperator) + form[key];
      })
      tData.push(item);
      //subform.tableData = tData;
      this.tags = tData;

      subform.fields.forEach( (field: FormFieldBase, index : number) => {
        field.value = '';
      });

      if(this.subformField instanceof SubForm){
        this.subformField = subform;
        this.initSubForm(this.subformField);
      }
      else{
        this.subformField.next(subform);
      }
    }
    else{

      let rawFormData = this.form.getRawValue();
      ( (subform.beforeSubmitActions != undefined) ? 
          subform.beforeSubmitActions(rawFormData) 
          : Promise.resolve(true) 
      ).then( (x:boolean) => {
        if(!x){
          return;
        }
        else{
          let formData : any = {}
          Object.keys(rawFormData).forEach( (key:string) => {
            if(this.subformFields.find( x => x.key == key)?.type == FormFieldType.DatePicker){
              formData[key] = rawFormData[key].toISOString().split('.')[0];
            }
            else{
              formData[key] = rawFormData[key];
            }
          })
    
          if(this.editInternalId >= 0){
            let tData : any[] = subform.tableData;
            
            (tData.length > 1) ? tData.splice(this.editInternalId,1) : tData = [];
            tData.push(formData);
            subform.tableData = tData;
            this.editInternalId = -1;
            this.formActions = [];
          } 
          else{
            let tData : any[] = subform.tableData;
            tData.push(formData);
            subform.tableData = tData;
          }
        }
        subform.fields.forEach( (field : FormFieldBase, index : number) => {
          field.value = '';
        });
          
        if(this.subformField instanceof SubForm){
          this.subformField = subform;
          this.initSubForm(this.subformField);
        }
        else{
          this.subformField.next(subform);
        }
      });
    }
  }

  cancelUpdate(){
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;
    this.editInternalId = -1;
    this.formActions = [];
    subform.fields.forEach( (field : FormFieldBase, index : number) => {
      field.value = '';
    });
    (this.subformField instanceof SubForm) 
      ? this.subformField = subform : (this.subformField).next(subform);
  }

  deleteTag(tag:string){
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;
    this.tags = this.tags.filter(e => e !== tag);
    subform.tableData = this.tags; 
    (this.subformField instanceof SubForm) 
      ? this.subformField = subform : (this.subformField).next(subform);
  }

  handleFieldChange(item : {key:string,value:string,form:FormGroup}){
    let subform = ((this.subformField instanceof SubForm) 
      ? this.subformField : this.subformField.getValue()) as SubForm;
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
