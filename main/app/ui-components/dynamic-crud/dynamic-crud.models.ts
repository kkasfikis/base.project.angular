import { FormFieldType } from "../dynamic-form/dynamic-form.models";

export class FilterField{
    key : string = '';
    label : string = '';
    order : number = 0;
    multiple : boolean = false;
    fieldType : FormFieldType = FormFieldType.TextBox;
    options : {key:string, value:string}[] = [];
}