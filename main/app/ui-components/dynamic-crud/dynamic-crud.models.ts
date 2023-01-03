import { FormFieldType } from "../dynamic-form/dynamic-form.models";

export class FilterField{
    key : string = '';
    label : string = '';
    order : number = 0;
    multiple : boolean = false;
    isSub : boolean = false;
    fieldType : FormFieldType = FormFieldType.TextBox;
    options : {key:string, value:string}[] = [];
    constructor(init?:Partial<FilterField>){
        Object.assign(this, init);
    }
}