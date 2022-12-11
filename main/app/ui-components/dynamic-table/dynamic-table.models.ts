

export class TableColumn{
    name : string = '';
    text : string = '';
    isFilterable : boolean = false;
    isSortable : boolean = false;
    width : number = 0
}

export class TableData{
    page : number = 0;
    size : number = 0;
    count : number = 0;
    data : any[] = [];


    constructor(page:number, size:number, count:number, data: any[]){
        this.page = page;
        this.size = size;
        this.count = count;
        this.data = data;
    }
}

export class TableAction{
    icon : string = '';
    text : string = '';
    tooltip : string = '';
    color : string = '';
    callbackFunc :  (args : any) => void = () => {};
    params : any;
}