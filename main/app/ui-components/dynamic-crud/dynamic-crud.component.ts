import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FormAction, FormClassName, FormFieldBase, SubForm } from '../dynamic-form/dynamic-form.models';
import { DynamicInfoDialogComponent } from '../dialogs/dynamic-info-dialog/dynamic-info-dialog.component';
import { InfoField, SubFormInfo } from '../dynamic-info/dynamic-info.models';
import { TableAction, TableColumn } from '../dynamic-table/dynamic-table.models';
import { DynamicCrudService } from './dynamic-crud.service';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dynamic-crud',
  templateUrl: './dynamic-crud.component.html',
  styleUrls: ['./dynamic-crud.component.scss']
})
export class DynamicCrudComponent implements OnInit {

  @Input() hasCreate : boolean = true;
  @Input() hasUpdate : boolean = true;
  @Input() hasDelete : boolean =true;
  @Input() hasInfo : boolean = true;

  @Input() endpoint : string = '';

  @Input() identifierKey : string = '';

  @Input() createFormFields : (FormFieldBase|SubForm)[] = [];
  @Input() updateFormFields : (FormFieldBase|SubForm)[] = [];
  @Input() tableColumns : TableColumn[] = [];
  @Input() infoFields : (InfoField|SubFormInfo)[] = [];

  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubFormChange : EventEmitter<any> = new EventEmitter<any>();


  isOnCreateMode : boolean = false;
  isOnUpdateMode : boolean = false;
  isOnReadMode : boolean = true;
  isOnInfoMode : boolean = false;

  infoElement : any;

  tableColumnSubject : BehaviorSubject<TableColumn[]> = new BehaviorSubject<TableColumn[]>([])
  tableDataSubject : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  infoFunc = this.crudInfo.bind(this);
  updateFunc = this.crudUpdate.bind(this);
  deleteFunc = this.crudDelete.bind(this);
  cancelFunc = this.cancelCreateUpdate.bind(this);

  private tableData : any[] = [];

  constructor(private crudService : DynamicCrudService, public dialog : MatDialog, private toastr : ToastrService) { }

  updateFormActions : FormAction[] =[
    {
      key : 'cancel',
      icon : 'cancel',
      color : 'red',
      text : 'Cancel Update',
      func : this.cancelFunc,
      funcParams : { }
    }
  ]

  createFormActions : FormAction[] = [
    {
      key : 'cancel',
      icon : 'cancel',
      color : 'red',
      text : 'Cancel Create',
      func : this.cancelFunc,
      funcParams : { }
    }
  ]

  ngOnInit(): void {
    this.tableColumnSubject.next(this.tableColumns);
    this.switchMode('read')
  }

  handleFormChanges(mode : string, item : any){
    this.onFormChange.emit( {mode : mode, key : item.key, value : item.value, form : item.form} )
  }

  handleSubFormChanges(mode : string, item : any){
    this.onSubFormChange.emit( { mode : mode, subform : item.subform, key : item.key, value : item.value, form : item.form })
  }

  mapData(tableData : any[]){
    return tableData.map((item :any,index: number)=>{
      let actions : TableAction[] = [];
      
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
      if(this.hasUpdate){
        actions.push(
          {
            icon : 'edit',
            text : 'Edit',
            callbackFunc : this.updateFunc,
            params : {internalId : index},
            color : 'orange',
            tooltip :'Edit Record'
          } as TableAction)
      }
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

      item['internalId'] = index;
      item['actions'] = actions;
      return item;
    })
  }

  switchMode(mode : string){
    switch(mode.toLowerCase()){
      case 'update':
        this.isOnCreateMode = false;
        this.isOnUpdateMode = true;
        this.isOnReadMode = false;
        this.isOnInfoMode = false;
        break;
      case 'create':
        this.isOnCreateMode = true;
        this.isOnUpdateMode = false;
        this.isOnReadMode = false;
        this.isOnInfoMode = false;
        break;
      case 'info':
        this.isOnCreateMode = false;
        this.isOnUpdateMode = false;
        this.isOnReadMode = false;
        this.isOnInfoMode = true;
        break;
      default:
        this.crudService.read( this.endpoint , this.tableColumns ).subscribe({
          next : (resp : any) => {
            if(resp.read){
              this.tableData = resp.data;
              this.tableDataSubject.next(this.mapData(resp.data));
            }
            else{
              this.toastr.error('Could not read records', 'Error')
            }
            this.isOnCreateMode = false;
            this.isOnUpdateMode = false;
            this.isOnReadMode = true;
            this.isOnInfoMode = false;
          }
        })
        break;
    }
  }


  cleanForm(isCreate:boolean){
    if(isCreate){
      this.createFormFields.forEach( (field) => {
        if(field.className == FormClassName.SubForm){
          (field as SubForm).fields.forEach( (subfield) => {
            subfield.value.next('');
          })
        }
        else{
          (field as FormFieldBase).value.next('');
        }
      });
    }
    else {
      this.updateFormFields.forEach( (field) => {
        if(field.className == FormClassName.SubForm){
          (field as SubForm).fields.forEach( (subfield) => {
            subfield.value.next('');
          })
        }
        else{
          (field as FormFieldBase).value.next('');
        }
      });
    }
  }


  crudInfo(payload : any){
    this.infoElement = {};
    this.infoElement = this.tableData[payload.internalId];
    this.switchMode('info');
  }

  crudUpdate(payload : any){
    this.cleanForm(false);
    let obj = this.tableData[payload.internalId];
    Object.keys(obj).forEach( (key : string) => {
      this.updateFormFields.forEach( (field : any, index : number) => {
        if(field.key == key){
          if(field.className == FormClassName.SubForm){
            field.tableData = [];
            let row : any = {};
            obj[field.key].forEach( (value : any, index : number) => {
              field.fields.forEach( (subfield : any) => {
                row[subfield.key] = obj[field.key][index][subfield.key]; 
              })
              field.tableData.push(row);
            })
          }
          else{
            field.value.next(obj[key]);
          }
        }
      })
    })
    this.switchMode('update')
  }

  crudUpdateSubmit(payload : any){
    this.crudService.update( this.endpoint, payload, this.identifierKey).subscribe({
      next: (response : any) => {
        if(!response.updated){
          this.toastr.warning('Warning',response['message'])
        }
        else{
          this.switchMode('read');
          this.toastr.success('Success',response['message'])
        }
      },
      error : () => {
        this.switchMode('read');
        this.toastr.error('Error','An error occured while trying to create record')
      }
    })
  }

  crudDelete(item : {internalId : number}){
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmationDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.crudDeleteSubmit(item);
      }
    });
  }

  crudDeleteSubmit(item : {internalId : number}){
    this.crudService.delete( this.endpoint, this.tableData[item.internalId], this.identifierKey ).subscribe({
      next: (response : any) => {
        if(!response.deleted){
          this.toastr.warning('Warning',response['message'])
        }
        else{
          this.switchMode('read');
          this.toastr.success('Success',response['message'])
        }
      },
      error : () => {
        this.switchMode('read');
        this.toastr.error('Error','An error occured while trying to create record')
      }
    })
  }

  crudCreate(){
    this.cleanForm(true)
    this.switchMode('create')
  }

  crudCreateSubmit( payload : any){
    this.crudService.create(  this.endpoint, payload).subscribe({
      next: (response : any) => {
        if(!response.created){
          this.toastr.warning('Warning',response['message'])
        }
        else{
          this.switchMode('read');
          this.toastr.success('Success',response['message'])
        }
      },
      error : () => {
        this.switchMode('read');
        this.toastr.error('Error','An error occured while trying to create record')
      }
    })
  }

  cancelCreateUpdate(){
    this.switchMode('read');
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
    
}
