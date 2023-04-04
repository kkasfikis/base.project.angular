import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, delay, Subject, Subscription, takeUntil } from 'rxjs';
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
  @Input() formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = [];
  @Input() formGap : string = '10px';
  @Input() formAlign : string = 'center';
  @Input() formActions : FormAction[] = [];

  @Output() onFormSubmit : EventEmitter<any> = new EventEmitter<any>();
  @Output() onFormChange : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubFormChange : EventEmitter<any> = new EventEmitter<any>();

  form! : FormGroup;
  disabled : boolean = false;

  enabledSub! : Subscription;
  constructor (private formService : DynamicFormService, private changeDetector : ChangeDetectorRef,public datepipe: DatePipe) { 
    
  }
  private ngUnsubscribe = new Subject<void>();
  localFormFieldType : typeof FormFieldType = FormFieldType;
  
  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.formFields)
    // this.formFields
    //   .forEach( (x:BehaviorSubject<FormFieldBase> | BehaviorSubject<SubForm>) => {
    //     if(x instanceof BehaviorSubject && x.getValue() instanceof FormFieldBase){
    //       let ff = x.getValue() as FormFieldBase;
    //       console.log('Setting value for :', ff.key, ff.value)
    //       this.form.controls[ff.key].patchValue(ff.value, {onlySelf: false, emitEvent: true});
    //     }
    //   })
    this.enabledSub = this.enabled.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next : (enabled : boolean) => {
          if(enabled){
            this.form.enable();
          }
          else{
            this.form.disable();
          }
          this.changeDetector.detectChanges();
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleFormSubmit(){
    if(this.form.invalid){
      const invalid = [];
      const controls = this.form.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      console.log('VALIDATION ERROR !',invalid,this.form)
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
    return field.getValue() instanceof SubForm;
  }

  sortByOrder(array:any)
  {
    return array.sort(function(a : any, b : any)
    {
      let x = (a instanceof SubForm) ? a.order : a.getValue().order;
      let y = (b instanceof SubForm) ? b.order : b.getValue().order;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).filter( (z:any) => z.getValue().type != this.localFormFieldType.Hidden);
  }

  getFormData() : any {
    let obj : any = {};
    this.formFields.forEach( (field : BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>) => {
      if(field.getValue() instanceof  FormFieldBase){
        let fieldBase = field.getValue() as FormFieldBase;

        if(fieldBase.type == FormFieldType.DatePicker){
          console.log('$$$$$$$$$',fieldBase.key,this.form.getRawValue()[fieldBase.key],typeof this.form.getRawValue()[fieldBase.key])
          obj[fieldBase.key] = this.datepipe.transform(this.form.getRawValue()[fieldBase.key], 'yyyy-MM-dd');
        }
        else{
          obj[fieldBase.key] = this.form.getRawValue()[fieldBase.key];
        }
      }
      else{
        let subform = (field as BehaviorSubject<SubForm>).getValue() as SubForm;
        obj[subform.key] = subform.tableData;
      }
    })    
    console.log('submitted form',obj)
    return obj;
  }
}
