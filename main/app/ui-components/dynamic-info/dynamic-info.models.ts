export enum InfoType{
    Text,
    Image
}

export class InfoField{
    key : string = ''; 
    order : number = 0;
    label : string = '';
    type : InfoType = InfoType.Text;
    width : string = '';
    innerWidth : string = '';
    align : string = '';

    constructor(init?:Partial<InfoField>) {
        Object.assign(this, init);

    }
}

export class SubFormInfo{
    key : string = '';
    order : number = 0;
    label : string = '';
    fields : InfoField[] = [];
    
    constructor(init?:Partial<SubFormInfo>) {
        Object.assign(this, init);
    }
}