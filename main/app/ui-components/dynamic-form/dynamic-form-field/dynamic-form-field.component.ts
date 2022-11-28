import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormFieldBase, FormFieldType } from '../dynamic-form.models';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {

  @Input() formField! : FormFieldBase;
  @Input() form! : FormGroup;

  @Output() onFieldChange : EventEmitter<any> = new EventEmitter<any>();

  enableSub! : Subscription;
  requiredSub! : Subscription;
  maxLengthSub! : Subscription;
  minLengthSub! : Subscription;
  regexSub! : Subscription;
  valueSub! : Subscription;

  localFormFieldType : typeof FormFieldType = FormFieldType

  constructor() { }

  ngOnInit(): void {


    let enableObserver = {
      next : (val : any) => {
        if(val){
          this.form.get(this.formField.key)?.enable();
        }
        else{
          this.form.get(this.formField.key)?.disable();
        }
      }
    }
    this.enableSub = this.formField.enabled.subscribe(enableObserver);

    let requiredObserver = {
      next : (val : boolean) => {
        let validators : Validators = [Validators.required]
        if(val){
          this.form.get(this.formField.key)?.addValidators(validators as ValidatorFn[]);
        }
        else{
          this.form.get(this.formField.key)?.removeValidators(validators as ValidatorFn[]);
        }
      }
    }
    this.requiredSub = this.formField.required.subscribe(requiredObserver);

    let maxLengthObserver = {
      next : (val : number) => {
        let validators : Validators = [Validators.maxLength]
        if(val > 0){
          this.form.get(this.formField.key)?.addValidators(validators as ValidatorFn[]);
        }
        else{
          this.form.get(this.formField.key)?.removeValidators(validators as ValidatorFn[]);
        }
      }
    }
    this.maxLengthSub = this.formField.maxLength.subscribe(maxLengthObserver)

    let minLengthObserver = {
      next : (val : number) => {
        let validators : Validators = [Validators.minLength(val)]
        if(val > 0){
          this.form.get(this.formField.key)?.addValidators(validators as ValidatorFn[]);
        }
        else{
          this.form.get(this.formField.key)?.removeValidators(validators as ValidatorFn[]);
        }
      }
    }
    this.minLengthSub = this.formField.minLength.subscribe(minLengthObserver);

    let regexObserver = {
      next : (val : string) => {
        let validators : Validators = [Validators.pattern(val)]
        if(val && val.length > 0){
          this.form.get(this.formField.key)?.addValidators(validators as ValidatorFn[]);
        }
        else{
          this.form.get(this.formField.key)?.removeValidators(validators as ValidatorFn[]);
        }
      }
    }
    this.regexSub = this.formField.regexPattern.subscribe(regexObserver);

    let valueObserver = {
      next : (val : any) => {
        this.form.controls[this.formField.key].patchValue(val, {onlySelf: false, emitEvent: true});
      }
    }
    this.valueSub = this.formField.value.subscribe(valueObserver)
  }

  ngOnDestroy(): void {
    this.enableSub.unsubscribe();
    this.requiredSub.unsubscribe();
    this.maxLengthSub.unsubscribe();
    this.minLengthSub.unsubscribe();
    this.regexSub.unsubscribe();  
    this.valueSub.unsubscribe();
  }

  contentChange(){
    let value = this.form.get(this.formField.key)?.value;
    this.onFieldChange.emit( {key: this.formField.key,value: value, form: this.form})
  }


}
