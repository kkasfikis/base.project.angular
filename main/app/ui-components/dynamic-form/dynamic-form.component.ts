import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormAction, FormFieldBase, FormFieldType, SubForm } from './dynamic-form.models';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit,OnDestroy {

  @Input() title : string = '';
  @Input() subtitle : string = '';
  @Input() enabled : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input() formFields : (FormFieldBase | SubForm)[] = [];
  @Input() formGap : string = '10px';
  @Input() formAlign : string = 'center';
  @Input() formActions : FormAction[] = [];

  @Output() onFormSubmit : EventEmitter<any> = new EventEmitter<any>();
  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubFormChange : EventEmitter<any> = new EventEmitter<any>();

  form! : FormGroup;
  disabled : boolean = false;

  enabledSub! : Subscription;
  constructor (private formService : DynamicFormService) { }

  localFormFieldType : typeof FormFieldType = FormFieldType;
  
  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.formFields.filter(x=>x.className === 'FormFieldBase') as FormFieldBase[]);
    this.enabledSub = this.enabled.subscribe({  
      next : (val) => {
        if(this.form){
          if(val){
            this.disabled = false;
            this.form.enable();
          }
          else{
            this.disabled = true;
            this.form.disable();
          }
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.enabledSub.unsubscribe();
  }

  handleFormSubmit(){
    if(this.form.invalid){
      return;
    }
    console.log('Submitted Data : ', JSON.stringify(this.getFormData()))
    this.onFormSubmit.emit(this.getFormData());
  }


  handleFieldChange(item : {key:string,value:string,form:FormGroup}){
    this.onFormChange.emit(item)
  }

  handleSubFieldChange(item : {subform : string, key : string, value: string, form : FormGroup} ){
    this.onSubFormChange.emit(item)
  }

  isFieldSubForm(field : any){
    return field.className === 'SubForm';
  }

  sortByOrder(array:any)
  {
    return array.sort(function(a : any, b : any)
    {
      var x = a['order']; 
      var y = b['order'];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).filter( (z:any) => z.type != this.localFormFieldType.Hidden);
  }

  getFormData() : any {
    let obj : any = {};
    this.formFields.forEach( (field,index) => {
      if(field.className == 'FormFieldBase'){
        let fieldBase = field as FormFieldBase;
        obj[fieldBase.key] = this.form.getRawValue()[fieldBase.key];
      }
      else{
        let subform = field as SubForm;
        obj[subform.key] = subform.tableData;
      }
    })    
    return obj;
  }
}
