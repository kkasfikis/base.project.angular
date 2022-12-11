import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { FormFieldBase, FormFieldType } from '../dynamic-form.models';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {

  @Input() formFieldSubj! : BehaviorSubject<FormFieldBase>;
  @Input() form! : FormGroup;

  @Output() onFieldChange : EventEmitter<any> = new EventEmitter<any>();

  formField! : FormFieldBase;
  localFormFieldType : typeof FormFieldType = FormFieldType
  private ngUnsubscribe = new Subject<void>();
  constructor() { }

  ngOnInit(): void {
    this.formField = this.formFieldSubj.getValue();
    //console.log(this.form.controls[this.formField.key]);
    let formFieldObserver = {
      next : (field : FormFieldBase) => {
        this.formField = field;
        //console.log('aaaaaaaaaaaa',this.formField)
        this.form.clearValidators();
        let validators : ValidatorFn[] = [];
        if(field.required){ validators.push(Validators.required); }
        if(field.maxLength > 0) { validators.push(Validators.maxLength(field.maxLength))}
        if(field.minLength > 0) {validators.push(Validators.minLength(field.minLength))}
        if(field.regexPattern && field.regexPattern != '') {validators.push(Validators.pattern(field.regexPattern))}
        if(field.enabled) {this.form.get(this.formField.key)?.enable();} else { this.form.get(this.formField.key)?.disable(); }
        this.form.get(this.formField.key)?.addValidators(validators);
        this.form.controls[this.formField.key].patchValue(field.value, {onlySelf: false, emitEvent: true});
      }
    }
    this.formFieldSubj.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(formFieldObserver);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  contentChange(){
    let value = this.form.get(this.formField.key)?.value;
    this.onFieldChange.emit( {key: this.formField.key,value: value, form: this.form})
  }


}
