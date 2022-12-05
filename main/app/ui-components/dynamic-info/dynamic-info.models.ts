export enum InfoType{
    Text,
    Image
}
export enum InfoClassName{
    Field,
    SubForm
}

export class InfoField{
    className : InfoClassName = InfoClassName.Field;
    key : string = ''; 
    order : number = 0;
    label : string = '';
    type : InfoType = InfoType.Text;
    width : string = '';
    innerWidth : string = '';
    align : string = '';

    constructor() {}
}

export class SubFormInfo{
    className : InfoClassName = InfoClassName.SubForm;
    key : string = '';
    order : number = 0;
    label : string = '';
    fields : InfoField[] = [];
    
    constructor() {}
}