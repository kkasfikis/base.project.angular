

export class TableColumn{
    name : string = '';
    text : string = '';
    isFilterable : boolean = false;
    isSortable : boolean = false;
    width : number = 0
}

export class TableAction{
    icon : string = '';
    text : string = '';
    tooltip : string = '';
    color : string = '';
    callbackFunc :  (args : any) => void = () => {};
    params : any;
}