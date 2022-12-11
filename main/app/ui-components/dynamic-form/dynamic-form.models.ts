import { BehaviorSubject } from "rxjs";
import { InfoField, SubFormInfo } from "../dynamic-info/dynamic-info.models";
import { TableColumn } from "../dynamic-table/dynamic-table.models";

export enum FormFieldType{
    TextBox,
    Select,
    MultiSelect,
    DatePicker,
    RadioBox,
    CheckBox,
    Hidden
}


export class FormFieldBase{
    key : string = '';
    order : number = 0;
    value : any | any[];
    type : FormFieldType = FormFieldType.TextBox;
    label : string = '';
    options : {key : string, value : string}[] = [];
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
    order : number = 0;
    fields : BehaviorSubject<FormFieldBase>[] = [];
    tableData : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    tableColumns : TableColumn[] = [];
    infoFields : (InfoField|SubFormInfo)[] =[];
    hasInfo : boolean = true;
    width : number = 100;
    innerWidth : number = 100;
    align : string = 'center';
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
