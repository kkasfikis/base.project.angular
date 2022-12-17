import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormFieldBase, SubForm } from './dynamic-form.models';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  toFormGroup(formFields : (BehaviorSubject<FormFieldBase> | SubForm)[] ){
    const group : any = {};
    formFields.forEach(formField => {
      if(formField instanceof BehaviorSubject<FormFieldBase>){
        let validators : Validators[] = [];
        if( formField.getValue().required){
          validators.push(Validators.required);
        }
        if( formField.getValue().maxLength){
          validators.push(Validators.maxLength(formField.getValue().maxLength));
        }
        if( formField.getValue().minLength){
          validators.push(Validators.minLength(formField.getValue().minLength));
        }
        if( formField.getValue().regexPattern && formField.getValue().regexPattern.length > 0 ){
          validators.push(Validators.pattern(formField.getValue().regexPattern));
        }
        console.log('value',formField.getValue().value )
        group[formField.getValue().key] = new FormControl(formField.getValue().value || '',validators as ValidatorFn[])  
      }
    })
    return new FormGroup(group);
  }
}
