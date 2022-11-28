export class MenuOption{
    key : string = "";
    label : string = "";
    icon : string = "";
    isFunction : boolean = false;
    link : string = "";
    func : (args:any) => void = () => {};
    funcParams : any = {};
    subMenus : MenuOption[] = [];
    
    constructor(){}
}

export class SideMenuCategory{

    icon : string = "";
    label : string = "";
    options : MenuOption[] = [];

    constructor() {}
}
