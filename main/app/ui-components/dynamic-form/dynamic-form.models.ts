import { SafeUrl } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { InfoField, SubFormInfo } from "../dynamic-info/dynamic-info.models";
import { TableColumn } from "../dynamic-table/dynamic-table.models";

export enum FormFieldType{
    TextBox,
    TextArea,
    Select,
    MultiSelect,
    DatePicker,
    RadioBox,
    CheckBox,
    Password,
    Number,
    Decimal,
    ColorPicker,
    Hidden,
    Image,
    PDF
}
export interface SelectedFile {
    type: string;
    url: SafeUrl;
  }

export class FormFieldBase{
    key : string = '';
    order : number = 0;
    value : any | any[];
    type : FormFieldType = FormFieldType.TextBox;
    label : string = '';
    options : {
        key : string, 
        value : string, 
        foreColor : string, 
        backColor : string
    }[] = [];
    enabled : boolean = true;
    required : boolean = false;
    minLength : number = 0;
    maxLength : number = 0;
    regexPattern : string = '';
    width : number = 100;
    innerWidth : number = 100;
    align : string = 'center';

    constructor(init?:Partial<FormFieldBase>) {
        Object.assign(this, init);
    }
}

export class SubForm{
    key : string = '';
    label : string = '';
    order : number = 0;
    enabled : boolean = true;
    fields : FormFieldBase[] = [];
    tableData : string[] | any[] = [];  
    tableColumns : TableColumn[] = [];
    infoFields : InfoField[] =[];
    hasDelete : boolean = true;
    hasUpdate : boolean = true;
    hasInfo : boolean = true; 
    visible : boolean = true;
    identifierKey : string = '_id';
    width : number = 100;
    innerWidth : number = 100;
    align : string = 'center';
    isTagged : boolean = false;
    tagSeperator : string = ':';
    beforeSubmitActions : ( (args:any) => Promise<boolean> ) 
        | undefined = undefined;

    constructor(init?:Partial<SubForm>) {
        Object.assign(this, init);
    }
}

export class FormAction{
    key : string = '';
    icon : string = '';
    color : string = '';
    text : string = '';
    func : (args : any) => void = () => {};
    funcParams : any;

    constructor(){}
}
