import { BehaviorSubject, ignoreElements } from "rxjs";
import { FormFieldBase, FormFieldType, SubForm } from "../dynamic-form/dynamic-form.models";
import { InfoField, InfoType, SubFormInfo } from "../dynamic-info/dynamic-info.models";
import { TableColumn } from "../dynamic-table/dynamic-table.models";
import { FilterField } from "./dynamic-crud.models";

export abstract class JsonHelpers {     
    public static convertFromJson(config : any){
        let data = JSON.parse(JSON.stringify(config as any)) //deep copy workaround
        let formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = [];
        let tableColumns : TableColumn[] = data.columns
        let filterFields : FilterField[] = []
        let infoFields :  (InfoField|SubFormInfo)[] = []
        if(data.filters && data.filters.length > 0){
          data.filters.forEach( (value:any) => {
            value.fieldType = FormFieldType[value.fieldType];
            filterFields.push(new FilterField(value));
          })
        }
        
        if(data.infos && data.infos.length > 0){
          data.infos.forEach((value:any, index:number) => {
            value.type = InfoType[value.type];
            infoFields.push(new InfoField(value));
          })
        }
    
        if(data.subinfos && data.subinfos.length > 0){
          data.subinfos.forEach((value:any, index:number) => {
            value.fields.forEach((subvalue:any)=>{
              subvalue.type = InfoType[subvalue.type];
            })
            infoFields.push(new SubFormInfo(value))
          })
        }
    
        if(data.fields && data.fields.length > 0){
          data.fields.forEach( (value : any) => {
            value.type = FormFieldType[value.type]; 
            formFields.push(new BehaviorSubject<FormFieldBase>(new FormFieldBase(value)))
            
          })
        }
         
        if(data.subforms && data.subforms.length > 0){
          data.subforms.forEach( (value : any) => {
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
            formFields.push(subj);
          })
        }
        
        return {
            fields : formFields,
            columns : tableColumns,
            infos : infoFields,
            filters : filterFields
        }
      }
    
      public static setReferenceFieldDropdown(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[],fieldKey:string, fieldName:string, data:any[]){
        let field = formFields.find(x => x.getValue().key == fieldKey) as BehaviorSubject<FormFieldBase>
        let fieldValue = field.getValue() as FormFieldBase;
        fieldValue.options = data.map( (x:any) => {
            let val = '';
            let first = true;
            
            if(fieldName.includes(',')){
              fieldName.split(',').forEach( (key : string) => {
                (first) ? val = x[key] : val += ',' + x[key]
                first = false;
              })
            }
            else{
              val = x[fieldName]
            }
            return {
              key : x._id,
              value : val,
              foreColor : '',
              backColor : ''
            }
          }
        )
        field.next(fieldValue)
      }
    
      public static setFieldDropdown(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[],fieldKey : string, values : any[]){
        let field = formFields.find(x => x.getValue().key == fieldKey) as BehaviorSubject<FormFieldBase>
        let fieldValue = field.getValue() as FormFieldBase;
        fieldValue.options = values.map( (x:any) => {
            return {
              key : x.value,
              value : x.value,
              foreColor : x.fore_color,
              backColor : x.back_color
            }
          }
        )
        field.next(fieldValue);
      }
    
      public static setFieldValue(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[],fieldKey : string, value : string){
        let field = formFields.find(x => x.getValue().key == fieldKey) as BehaviorSubject<FormFieldBase>
        let fieldValue = field.getValue() as FormFieldBase;
        fieldValue.value = value
        field.next(fieldValue)
      }
    
      public static setSubFormField(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[],subformKey : string, fields : string[], values : string[][]){
        let subForm = formFields.find( x => x.getValue().key == subformKey) as BehaviorSubject<SubForm>;
        let subFormValue = subForm?.getValue() as SubForm
    
        if (fields && fields.length > 0 && values && values.length > 0 && fields.length == values.length){
          fields.forEach( (field : string, index : number) => {
            
            subFormValue.fields.find(x=>x.key == field)!.options = values[index].map( (item : any) => {
              return {
                key : item.value,
                value : item.value,
                foreColor : item.fore_color,
                backColor : item.back_color  
              };
            })
          })
        }
    
        subForm?.next(subFormValue)
      }
}