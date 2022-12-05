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

export enum FormClassName{
    SubForm,
    FormFieldBase
}

export class FormFieldBase{
    key : string = '';
    order : number = 0;
    value : BehaviorSubject<any | any[]> = new BehaviorSubject<any | any[]>({});
    type : FormFieldType = FormFieldType.TextBox;
    label : string = '';
    options : {key : string, value : string}[] = [];
    enabled : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    required : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    minLength : BehaviorSubject<number> = new BehaviorSubject<number>(0);
    maxLength : BehaviorSubject<number> = new BehaviorSubject<number>(0);
    regexPattern : BehaviorSubject<string> = new BehaviorSubject<string>('');
    width : number = 100;
    innerWidth : number = 100;
    align : string = 'center';

    constructor(public className = FormClassName.FormFieldBase) {}
}

export class SubForm{
    key : string = '';
    order : number = 0;
    fields : FormFieldBase[] = [];
    tableData : any[] = [];
    tableColumns : TableColumn[] = [];
    infoFields : (InfoField|SubFormInfo)[] = [];
    hasInfo : boolean = true;
    width : number = 100;
    innerWidth : number = 100;
    align : string = 'center';
    constructor(public className = FormClassName.SubForm) {}
}

export class FormAction{
    key : string = '';
    icon : string = '';
    color : string = '';
    text : string = '';
    func : (args : any) => void = () => {};
    funcParams : any;
}
