import { Component, OnInit } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import * as data from './vessel.ui-config.json'

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  constructor(private crudService : DynamicCrudService) { }

  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []
  tableColumns : TableColumn[] = []
  infoFields : (InfoField|SubFormInfo)[] = []
  filterFields : FilterField[] = []

  ngOnInit(): void {
    console.log('Converting Vessel fields from JSON ....')
    this.convertFromJson();
    this.initMods();
  }

  convertFromJson(){
    let obj = JSON.parse(JSON.stringify(data as any)) //deep copy workaround;
    this.tableColumns = obj.columns;
    
    if(obj.filters && obj.filters.length > 0){
      obj.filters.forEach( (value:any) => {
        value.fieldType = FormFieldType[value.fieldType];
        this.filterFields.push(new FilterField(value));
      })
    }
    
    if(obj.infos && obj.infos.length > 0){
      obj.infos.forEach((value:any, index:number) => {
        value.type = InfoType[value.type];
        this.infoFields.push(new InfoField(value));
      })
    }

    if(obj.subinfos && obj.subinfos.length > 0){
      obj.subinfos.forEach((value:any, index:number) => {
        value.fields.forEach((subvalue:any)=>{
          subvalue.type = InfoType[subvalue.type];
        })
        this.infoFields.push(new SubFormInfo(value))
      })
    }

    if(obj.fields && obj.fields.length > 0){
      obj.fields.forEach( (value : any) => {
        value.type = FormFieldType[value.type]; 
        this.formFields.push(new BehaviorSubject<FormFieldBase>(new FormFieldBase(value)))
        
      })
    }
     
    if(obj.subforms && obj.subforms.length > 0){
      obj.subforms.forEach( (value : any) => {
        let tfields:FormFieldBase[] = []
        value.fields.forEach((subvalue : any) => {
          subvalue.type = FormFieldType[subvalue.type]
          tfields.push(new FormFieldBase(subvalue));
        });
        let tcolumns:TableColumn[] = []
        value.tableColumns.forEach((subvalue : any) => {
          tcolumns.push(new TableColumn(subvalue));
        });
        let tinfos :InfoField[] = []
        value.infoFields.forEach((subvalue : any) => {
          subvalue.type = InfoType[subvalue.type];
          tinfos.push(new InfoField(subvalue));
        });
        value.fields = tfields;
        value.tableColumns = tcolumns;
        value.infoFields = tinfos;
        let subj = new BehaviorSubject<SubForm>(new SubForm(value))
        this.formFields.push(subj);
      })
    }
    
  }

  setReferenceField(fieldKey:string, fieldName:string, data:any[]){
    let field = this.formFields.find(x => x.getValue().key == fieldKey) as BehaviorSubject<FormFieldBase>
    let fieldValue = field.getValue() as FormFieldBase;
    fieldValue.options = data.map( (x:any) => {
        return {
          key : x._id,
          value : x[fieldName]
        }
      }
    )
    field.next(fieldValue)
  }

  setField(fieldKey : string, values : string[]){
    let field = this.formFields.find(x => x.getValue().key == fieldKey) as BehaviorSubject<FormFieldBase>
    let fieldValue = field.getValue() as FormFieldBase;
    fieldValue.options = values.map( (x:string) => {
        return {
          key : x,
          value : x
        }
      }
    )
    field.next(fieldValue)
  }

  setSubFormField(subformKey : string, fields : string[], values : string[][]){
    console.log(`SETTING SUFORM ${subformKey}`,fields,values)
    let subForm = this.formFields.find( x => x.getValue().key == subformKey) as BehaviorSubject<SubForm>;
    let subFormValue = subForm?.getValue() as SubForm

    if (fields && fields.length > 0 && values && values.length > 0 && fields.length == values.length){
      fields.forEach( (field : string, index : number) => {
        console.log('FIELD',field)
        subFormValue.fields.find(x=>x.key == field)!.options = values[index].map( (item : any) => {
          return {
            key : item,
            value : item
          };
        })
      })
    }

    subForm?.next(subFormValue)
  }

  initMods(){
    forkJoin([this.crudService.read('predefined')]).subscribe(
      ([predefinedResp] : any[]) => {
        if(predefinedResp.read){
          let data = predefinedResp.data;
          let vesselFlags = data.find( (x:any) => x.key=='vesselFlags').values;
          let vesselTypes = data.find( (x:any) => x.key=='vesselTypes').values;
          this.setField('flag',vesselFlags);
          this.setField('vessel_type',vesselTypes);
        } 
      }
    )
  }
}
