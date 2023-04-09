import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormFieldBase, SubForm } from './dynamic-form.models';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  toFormGroup(formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] | FormFieldBase[]){
    const group : any = {};
    formFields.forEach(formField => {
      if(formField instanceof BehaviorSubject<FormFieldBase> || formField instanceof FormFieldBase){
        let validators : Validators[] = [];
        let field = ((formField instanceof FormFieldBase) ? formField : formField.getValue()) as FormFieldBase
        if( field.required){
          validators.push(Validators.required);
        }
        if( field.maxLength){
          validators.push(Validators.maxLength(field.maxLength));
        }
        if( field.minLength){
          validators.push(Validators.minLength(field.minLength));
        }
        if( field.regexPattern && field.regexPattern.length > 0 ){
          validators.push(Validators.pattern(field.regexPattern));
        }
        group[field.key] = new FormControl(field.value,validators as ValidatorFn[])
      }
    })
    return new FormGroup(group);
  }
}
