import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FormAction, FormFieldBase, SubForm } from '../dynamic-form/dynamic-form.models';
import { DynamicInfoDialogComponent } from '../dialogs/dynamic-info-dialog/dynamic-info-dialog.component';
import { InfoField, SubFormInfo } from '../dynamic-info/dynamic-info.models';
import { TableAction, TableColumn, TableData } from '../dynamic-table/dynamic-table.models';
import { DynamicCrudService } from './dynamic-crud.service';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { FilterField } from './dynamic-crud.models';

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

  @Input() createFormFields : (BehaviorSubject<FormFieldBase>|SubForm)[] = [];
  @Input() updateFormFields : (BehaviorSubject<FormFieldBase>|SubForm)[] = [];
  @Input() tableColumns : TableColumn[] = [];
  @Input() infoFields : (InfoField|SubFormInfo)[] = [];

  @Input() hasFilters : boolean = false;
  @Input() filterFields : FilterField[] = [];

  @Input() isPaginated : boolean = false;
  @Input() pageSize : number = 5;

  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubFormChange : EventEmitter<any> = new EventEmitter<any>();

  

  isOnCreateMode : boolean = false;
  isOnUpdateMode : boolean = false;
  isOnReadMode : boolean = true;
  isOnInfoMode : boolean = false;

  infoElement : any;

  tableColumnSubject : BehaviorSubject<TableColumn[]> = new BehaviorSubject<TableColumn[]>([])
  tableDataSubject : BehaviorSubject<TableData> = new BehaviorSubject<TableData>(new TableData(0,0,0,[]))

  infoFunc = this.crudInfo.bind(this);
  updateFunc = this.crudUpdate.bind(this);
  deleteFunc = this.crudDelete.bind(this);
  cancelFunc = this.cancelCreateUpdate.bind(this);


  createEnabledSubj : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateEnabledSubj : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private tableData : any[] = [];
  private page : number = 0;
  private size : number = 0;

  private filterMode: boolean =false;
  private filterPayload : any;

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
    this.size = this.pageSize;
    this.switchMode('read')
  }

  handleFormChanges(mode : string, item : any){
    this.onFormChange.emit( {mode : mode, key : item.key, value : item.value, form : item.form} )
  }

  handleSubFormChanges(mode : string, item : any){
    this.onSubFormChange.emit( { mode : mode, subform : item.subform, key : item.key, value : item.value, form : item.form })
  }

  mapData(page: number, size:number, count: number, tableData : any[]){
    return new TableData(page,size,count,tableData.map((item :any,index: number)=>{
      let actions : TableAction[] = [];
      
      if(this.hasInfo){
        actions.push(
          {
            icon : 'info',
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
            callbackFunc : this.updateFunc,
            params : {internalId : index},
            color : 'orange',
            tooltip :'Edit Record'
          } as TableAction)
      }
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

      item['internalId'] = index;
      item['actions'] = actions;
      return item;
    }));
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
        this.read();
        this.isOnCreateMode = false;
        this.isOnUpdateMode = false;
        this.isOnReadMode = true;
        this.isOnInfoMode = false;
        break;
    }
  }

  onPageChange(item : {page : number, size : number}){
    console.log('Change page event with page : ' + item.page + ' and size : ' + item.size);
    this.page = item.page;
    this.size = item.size;
    this.read();
  }

  read(){
    if(this.isPaginated){
      if(this.filterMode){
        this.filterRead();
      }
      else{
        this.paginatedRead();
      }
    }
    else{
        this.normalRead();
    }
  }

  normalRead(){
    this.crudService.read(this.endpoint).subscribe({
      next : (resp : any) => {
        if(resp.read){
          this.tableData = resp.data;
          this.tableDataSubject.next(this.mapData(0,0,0,resp.data));
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
  }

  paginatedRead(){
    this.crudService.paginatedRead(this.endpoint,this.page,this.size).subscribe({
      next : (resp : any) => {
        if(resp.read){
          if(resp.overflow){
            this.toastr.warning('The requested page does not exist. Returned first page of data', 'Warning')
            this.tableData = resp.data;
            this.page = 0;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
            
          }
          else{
            console.log(resp.data)
            this.tableData = resp.data;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
          }
          this.pageSize = this.size;
        }
        else{
          this.toastr.error('Could not read records', 'Error')
        }
      }
    })
  }

  filterRead(){
    console.log('Filter Payload : ', this.filterPayload)
    this.crudService.filter(this.endpoint,0,this.pageSize,this.filterPayload).subscribe({
      next : (resp : any) => {
        if(resp.read){
          if(resp.overflow){
            this.toastr.warning('The requested page does not exist. Returned first page of data', 'Warning')
            this.tableData = resp.data;
            this.page = 0;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
          }
          else{
            console.log(resp.data)
            this.tableData = resp.data;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
          }
          this.pageSize = this.size;
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
  }

  cleanForm(isCreate:boolean){
    if(isCreate){
      this.createFormFields.forEach( (field) => {
        if(field instanceof SubForm){
          (field as SubForm).fields.forEach( (subfield) => {
            let sField = subfield.getValue();
            sField.value = '';
            subfield.next(sField);
          })
        }
        else{
          let sField = (field as BehaviorSubject<FormFieldBase>).getValue();
          sField.value = '';
          (field as BehaviorSubject<FormFieldBase>).next(sField);
        }
      });
    }
    else {
      this.updateFormFields.forEach( (field) => {
        if(field instanceof SubForm){
          (field as SubForm).fields.forEach( (subfield) => {
            let sField = subfield.getValue();
            sField.value = '';
            subfield.next(sField);
          })
        }
        else{
          let sField = (field as BehaviorSubject<FormFieldBase>).getValue();
          sField.value = '';
          (field as BehaviorSubject<FormFieldBase>).next(sField);
        }
      });
    }
  }


  crudInfo(payload : any){
    this.infoElement = {};
    this.crudService.info(this.endpoint, this.tableData[payload.internalId], this.identifierKey).subscribe({
      next : (resp : any) => {
        if(resp.info){
          this.infoElement = resp.data;
          this.switchMode('info');
        }
        else{
          this.toastr.error(resp.message,'Error')
        }
      }
    });
  }

  crudUpdate(payload : any){
    this.cleanForm(false);
    let obj = this.tableData[payload.internalId];
    Object.keys(obj).forEach( (key : string) => {
      this.updateFormFields.forEach( (field : any, index : number) => {
        
          if(field instanceof SubForm){
            if(field.key == key){
              field.tableData.next([]);
              let data = field.tableData.getValue();
              let row : any = {};
              obj[field.key].forEach( (value : any, index : number) => {
                field.fields.forEach( (subfield : any) => {
                  let tField = subfield.getValue();
                  row[tField.key] = obj[field.key][index][tField.key]; 
                })
                data.push(row);
              })
              field.tableData.next(data);
            }
          }
          else{
            let sField = field.getValue();
            if(sField.key == key){
              sField.value = obj[key];
              field.next(sField);
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
          this.toastr.warning(response['message'],'Warning')
        }
        else{
          this.switchMode('read');
          this.toastr.success(response['message'],'Success')
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
          this.toastr.warning(response['message'],'Warning')
        }
        else{
          this.switchMode('read');
          this.toastr.success(response['message'],'Success')
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
          this.toastr.warning(response['message'],'Warning')
        }
        else{
          this.switchMode('read');
          this.toastr.success(response['message'],'Success')
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

    

  filterSumbit( payload : any){
    this.page = 0;
    this.size = this.pageSize;
    this.filterMode = true;
    this.filterPayload = payload;
    this.filterRead();
  }

  filterCancel(){
    this.filterMode = false;
    this.filterPayload = undefined;
    this.read();
  }

}
