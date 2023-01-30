import { Component, Input, OnInit, EventEmitter, Output, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { FormFieldBase, FormFieldType } from '../dynamic-form.models';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {

  @Input() formField! : FormFieldBase | BehaviorSubject<FormFieldBase>;
  @Input() form! : FormGroup;

  @Output() onFieldChange : EventEmitter<any> = new EventEmitter<any>();

  localFormField! : FormFieldBase;
  localFormFieldType : typeof FormFieldType = FormFieldType
  private ngUnsubscribe = new Subject<void>();
  constructor(private elementRef : ElementRef) { }

  initFormField(field : FormFieldBase){
    this.localFormField = field;
    this.form.clearValidators();
    let validators : ValidatorFn[] = [];
    if(field.required){ validators.push(Validators.required); }
    if(field.maxLength > 0) { validators.push(Validators.maxLength(field.maxLength))}
    if(field.minLength > 0) {validators.push(Validators.minLength(field.minLength))}
    if(field.regexPattern && field.regexPattern != '') {validators.push(Validators.pattern(field.regexPattern))}
    if(field.enabled) {this.form.get(this.localFormField.key)?.enable();} else { this.form.get(this.localFormField.key)?.disable(); }
    this.form.get(this.localFormField.key)?.addValidators(validators);
    this.form.controls[this.localFormField.key].patchValue(field.value, {onlySelf: false, emitEvent: true});
  }

  ngOnInit(): void {
    if(!(this.formField instanceof FormFieldBase)){
      this.formField.pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe({
        next : (field : FormFieldBase) => {
          this.initFormField(field)
        }
      });
    }
    else{
      this.initFormField(this.formField)
    }
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    if(!(this.formField instanceof FormFieldBase)){
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
    else{
    }
    this.elementRef.nativeElement.remove();
  }

  contentChange(){
    let value = this.form.get(this.localFormField.key)?.value;
    this.onFieldChange.emit( {key: this.localFormField.key,value: value, form: this.form})
  }


}
