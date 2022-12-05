import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormClassName, FormFieldBase, SubForm } from './dynamic-form.models';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  toFormGroup(formFields : FormFieldBase[] ){
    const group : any = {};
    formFields.forEach(formField => {
      if(formField.className == FormClassName.FormFieldBase){
        let validators : Validators[] = [];
        if( formField.required.getValue() ){
          validators.push(Validators.required);
        }
        if( formField.maxLength.getValue() ){
          validators.push(Validators.maxLength(formField.maxLength.getValue()));
        }
        if( formField.minLength.getValue() ){
          validators.push(Validators.minLength(formField.minLength.getValue()));
        }
        if( formField.regexPattern.getValue() && formField.regexPattern.getValue.length > 0 ){
          validators.push(Validators.pattern(formField.regexPattern.getValue()));
        }
        group[formField.key] = new FormControl(formField.value.getValue() || '',validators as ValidatorFn[])  
      }
    })
    return new FormGroup(group);
  }
}
