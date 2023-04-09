import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormAction, FormFieldBase, SubForm } from '../dynamic-form/dynamic-form.models';
import { DynamicInfoDialogComponent } from '../dialogs/dynamic-info-dialog/dynamic-info-dialog.component';
import { InfoField, SubFormInfo } from '../dynamic-info/dynamic-info.models';
import { TableAction, TableColumn, TableData } from '../dynamic-table/dynamic-table.models';
import { DynamicCrudService } from './dynamic-crud.service';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { FilterField } from './dynamic-crud.models';
import { LoadingService } from '../services/loading.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dynamic-crud',
  templateUrl: './dynamic-crud.component.html',
  styleUrls: ['./dynamic-crud.component.scss']
})
export class DynamicCrudComponent implements OnInit {

  @Input() title : string = '';

  @Input() hasCreate : boolean = true;
  @Input() hasUpdate : boolean = true;
  @Input() hasDelete : boolean =true;
  @Input() hasInfo : boolean = true;
  @Input() hasReport : boolean = true;

  @Input() isUpdateCustom : boolean = false;
  @Input() isCreateCustom : boolean = false;
  @Input() isDeleteCustom : boolean = false;
  @Input() isInfoCustom : boolean = false;
  @Input() customFinished : Subject<void> = new Subject<void>()

  @Input() beforeCreateActions : (args:any) => void = () => {}
  @Input() beforeUpdateActions : (args:any) => void = () => {}
  
  @Input() reportTitle : string = 'FORCE MARINE';
  @Input() reportHeader : string = '<h1>THIS IS A TEST</h1>';

  @Input() endpoint : string = '';

  @Input() identifierKey : string = '';

  @Input() createFormFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = [];
  @Input() updateFormFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = [];
  @Input() tableColumns : TableColumn[] = [];
  @Input() infoFields : (InfoField|SubFormInfo)[] = [];

  @Input() hasFilters : boolean = false;
  @Input() filterFields : FilterField[] = [];

  @Input() isPaginated : boolean = false;
  @Input() pageSize : number = 5;

  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubFormChange : EventEmitter<any> = new EventEmitter<any>();

  @Output() onCreate : EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpdate : EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete : EventEmitter<any> = new EventEmitter<any>();
  @Output() onInfo : EventEmitter<any> = new EventEmitter<any>();

  originalCreateFormFields : (FormFieldBase|SubForm)[] = [];
  originalUpdateFormFields : (FormFieldBase|SubForm)[] = [];

  isOnCreateMode : boolean = false;
  isOnUpdateMode : boolean = false;
  isOnReadMode : boolean = true;
  isOnInfoMode : boolean = false;

  infoElement : any;


  reportUrl : SafeUrl = '';

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
  private sort : string = '';
  private sortColumn : string = '';

  private filterMode: boolean =false;
  private filterPayload : any;

  constructor(private crudService : DynamicCrudService, public dialog : MatDialog, private loadingService : LoadingService, private toastr : ToastrService, private sanitizer : DomSanitizer) { }
  
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
    
    this.originalCreateFormFields = [];
    this.createFormFields.forEach( ( x : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)) => {
      if(x.getValue() instanceof FormFieldBase){
        this.originalCreateFormFields.push( new FormFieldBase( JSON.parse( JSON.stringify(x.getValue()) )))
      }
      else{
        let subform : SubForm = new SubForm( JSON.parse( JSON.stringify(x.getValue()) ) )
        subform.fields = subform.fields.map( (x:any) => { return new FormFieldBase(x) })
        subform.infoFields = subform.infoFields.map( (x:any) => {return new InfoField(x)} )
        subform.tableColumns = subform.tableColumns.map( (x:any) => {return new TableColumn(x)} )
        subform.tableData = [];
        this.originalCreateFormFields.push(subform)
      }
    });

    this.originalUpdateFormFields = [];
    this.updateFormFields.forEach( ( x : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)) => {
      if(x.getValue() instanceof FormFieldBase){
        this.originalUpdateFormFields.push( new FormFieldBase( JSON.parse( JSON.stringify(x.getValue()) )))
      }
      else{
        let subform : SubForm = new SubForm( JSON.parse( JSON.stringify(x.getValue()) ) )
        subform.fields = subform.fields.map( (x:any) => { return new FormFieldBase(x) })
        subform.infoFields = subform.infoFields.map( (x:any) => {return new InfoField(x)} )
        subform.tableColumns = subform.tableColumns.map( (x:any) => {return new TableColumn(x)} )
        subform.tableData = [];
        this.originalUpdateFormFields.push(subform)
      }
    });
    
    this.customFinished.subscribe( () => {this.switchMode('read'); } )

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
    this.page = item.page;
    this.size = item.size;
    this.read();
  }

  onSortChange(item : any){
    this.sort = item.direction;
    this.sortColumn = item.active;
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
    this.loadingService.setLoading(true);
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
        this.loadingService.setLoading(false);
      }
    })
  }

  paginatedRead(){
    this.loadingService.setLoading(true)
    this.crudService.paginatedRead(this.endpoint,this.page,this.size,this.sort,this.sortColumn).subscribe({
      next : (resp : any) => {
        if(resp.read){
          if(resp.overflow){
            this.toastr.warning('The requested page does not exist. Returned first page of data', 'Warning')
            this.tableData = resp.data;
            this.page = 0;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
            
          }
          else{
            this.tableData = resp.data;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
          }
          this.pageSize = this.size;
        }
        else{
          this.toastr.error('Could not read records', 'Error')
        }
        this.loadingService.setLoading(false)
      }
    })
  }

  filterRead(){
    this.loadingService.setLoading(true);
    this.crudService.filter(this.endpoint,this.page,this.pageSize,this.filterPayload,this.sort,this.sortColumn).subscribe({
      next : (resp : any) => {
        if(resp.read){
          if(resp.overflow){
            this.toastr.warning('The requested page does not exist. Returned first page of data', 'Warning')
            this.tableData = resp.data;
            this.page = 0;
            this.tableDataSubject.next(this.mapData(this.page,this.size,resp.count,resp.data));
          }
          else{
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
        this.loadingService.setLoading(false);
      }
    })
  }

  cleanForm(isCreate:boolean){
    if(isCreate){
      this.originalCreateFormFields.forEach( (item:any) => {
        let x = this.createFormFields.find( (x:any) => x.getValue().key == item.key )
        console.log('clean create',x);
        x?.next(item);
      });
    }
    else {
      this.originalUpdateFormFields.forEach( (item:any) => {
        this.updateFormFields.find( (x:any) => x.getValue().key == item.key )?.next(item);
      });
    }
  }


  crudInfo(payload : any){
    if(this.isInfoCustom){
      this.onInfo.emit({ _id : this.tableData[payload.internalId], internalId : payload.internalId });
      return;
    }
    this.infoElement = {};
    this.loadingService.setLoading(true);
    this.crudService.info(this.endpoint, this.tableData[payload.internalId], this.identifierKey).subscribe({
      next : (resp : any) => {
        if(resp.info){
          this.infoElement = resp.data;
          this.switchMode('info');
        }
        else{
          this.toastr.error(resp.message,'Error')
        }
        this.loadingService.setLoading(false);
      }
    });
  }

  crudUpdate(payload : any){
    if(this.isUpdateCustom){
      this.onUpdate.emit({ _id : this.tableData[payload.internalId], internalId : payload.internalId });
      return;
    }
    this.cleanForm(false);
    this.loadingService.setLoading(true);
    this.crudService.info(this.endpoint,this.tableData[payload.internalId],this.identifierKey).subscribe({
      next : (resp : any) => {
        let obj = resp.data;
        Object.keys(obj).forEach( (key : string) => {
          this.updateFormFields.forEach( (field : any, index : number) => {
              if(field.getValue() instanceof SubForm){
                let tField = field.getValue() as SubForm;
                if(tField.key == key){
                  tField.tableData = [];
                  let data : any[] = [];
                  if(tField.isTagged){
                    tField.tableData = obj[tField.key];
                  }
                  else{
                    obj[tField.key].forEach( (value : any, index : number) => {
                      let row : any = {};
                      tField.fields.forEach( (subfield : any) => {
                        row[subfield.key] = obj[tField.key][index][subfield.key]; 
                      })
                      data.push(row);
                    })
                    tField.tableData = data;
                    field.next(tField)
                  }
                  
                }
              }
              else{
                let sField = field.getValue();
                if(sField.key == key){
                  console.log(key,obj[key])
                  if(typeof obj[key] === 'object' && '_id' in obj[key]){
                    sField.value = obj[key]['_id'];
                  }
                  else{
                    sField.value = obj[key];
                  }
                  field.next(sField);
                }
              }
          })
        })
        this.loadingService.setLoading(false);
        this.beforeUpdateActions(this.updateFormFields)
        console.log('After update actions')
        this.switchMode('update')
      } 
    })
    
  }

  async crudUpdateSubmit(payload : any){
    this.loadingService.setLoading(true);
    (await this.crudService.update( this.endpoint, payload, this.identifierKey)).subscribe({
      next: (response : any) => {
        if(!response.updated){
          this.toastr.warning(response['message'],'Warning')
        }
        else{
          this.switchMode('read');
          this.toastr.success(response['message'],'Success')
        }
        this.loadingService.setLoading(false);
      },
      error : () => {
        this.switchMode('read');
        this.toastr.error('Error','An error occured while trying to create record')
        this.loadingService.setLoading(false);
      }
    })
  }

  crudDelete(item : {internalId : number}){
    if(this.isUpdateCustom){
      this.onDelete.emit({ _id : this.tableData[item.internalId], internalId : item.internalId });
      return;
    }

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
    this.loadingService.setLoading(true);
    this.crudService.delete( this.endpoint, this.tableData[item.internalId], this.identifierKey ).subscribe({
      next: (response : any) => {
        if(!response.deleted){
          this.toastr.warning(response['message'],'Warning')
        }
        else{
          this.switchMode('read');
          this.toastr.success(response['message'],'Success')
        }
        this.loadingService.setLoading(false);
      },
      error : () => {
        this.switchMode('read');
        this.toastr.error('Error','An error occured while trying to create record')
        this.loadingService.setLoading(false);
      }
    })
  }

  crudCreate(){
    if(this.isUpdateCustom){
      this.onDelete.emit();
      return;
    }
    this.cleanForm(true)
    this.beforeCreateActions(this.createFormFields);
    this.switchMode('create')
  }

  async crudCreateSubmit( payload : any){
    (await this.crudService.create(  this.endpoint, payload)).subscribe({
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
    this.page = 0;
    this.filterMode = false;
    this.filterPayload = undefined;
    this.read();
  }

  generatePDF(){
    // const doc = document.implementation.createHTMLDocument();
    // doc.head.innerHTML = this.reportHeader
    // doc.body.title = this.reportTitle
    // doc.body.innerHTML = document.getElementById('infoContainer')?.innerHTML!;
    // console.log('generating report',doc.body.innerHTML)
    // const blob = new Blob([doc.documentElement.outerHTML], { type: 'application/pdf' });
    // this.reportUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    // console.log('Generated blob : ',blob)
  

    let DATA: any = document.getElementById('infoContainer');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage('./assets/images/user.jpg','PNG',0, 0 ,50,50)
      PDF.addImage(FILEURI, 'PNG', 0, 60, fileWidth, fileHeight);
    
      PDF.save('angular-demo.pdf');
    });
  }

}
