import { Component, Input, OnInit, EventEmitter, Output, OnDestroy, ElementRef, ViewChild, Renderer2, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { FormFieldBase, FormFieldType } from '../dynamic-form.models';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy,AfterViewInit,OnChanges {

  @Input() formField! : FormFieldBase | BehaviorSubject<FormFieldBase>;
  @Input() form! : FormGroup;

  @Output() onFieldChange : EventEmitter<any> = new EventEmitter<any>();

  localFormField! : FormFieldBase;
  localFormFieldType : typeof FormFieldType = FormFieldType
  private ngUnsubscribe = new Subject<void>();
  constructor(private elementRef : ElementRef,private renderer: Renderer2) { }

  selectForeColor : string = '';
  selectBackColor : string = '';

  colorStyles : HTMLStyleElement | undefined;
  @ViewChild('formField') public element! : ElementRef;
  
  initFormField(field : FormFieldBase){
    this.localFormField = field;
    this.form.clearValidators();
    let validators : ValidatorFn[] = [];

    if(field.type == FormFieldType.DatePicker){
      console.log(field.type,field.value);
      field.value = new Date(field.value);
    }

    if(field.required){ validators.push(Validators.required); }
    if(field.maxLength > 0) { validators.push(Validators.maxLength(field.maxLength))}
    if(field.minLength > 0) {validators.push(Validators.minLength(field.minLength))}
    if(field.regexPattern && field.regexPattern != '') {validators.push(Validators.pattern(field.regexPattern))}
    console.log('Inside FormField', this.localFormField.key, this.localFormField)
    if(field.enabled) {this.form.get(this.localFormField.key)?.enable();} else { this.form.get(this.localFormField.key)?.disable(); }
    this.form.get(this.localFormField.key)?.addValidators(validators);
    this.form.controls[this.localFormField.key].patchValue(field.value, {onlySelf: false, emitEvent: true});
    
    if(this.localFormField.type == FormFieldType.Select && this.localFormField.value != undefined && this.localFormField.value.length > 0){      
      let item : any = this.localFormField.options.find( (x:any) => x.value == this.localFormField.value);
      if(item && !!item.foreColor && item.foreColor.length > 0 && !!item.backColor && item.backColor.length > 0){
        this.selectForeColor = item.foreColor;
        this.selectBackColor = item.backColor;
        this.setSelectColor(this.selectForeColor,this.selectBackColor)
      }
    }
  }

  setSelectColor(foreColor : string , backColor : string){
    let element =  document.getElementsByTagName('head')[0];//document.getElementById(this.localFormField.key)//this.element.nativeElement as HTMLElement
    if(this.colorStyles != undefined){
      element!.removeChild(this.colorStyles!);
    }
    let css = `
      .${this.localFormField.key} .mat-select-value-text {
        color:${foreColor} !important;
        background-color: ${backColor};
      }      
    `
    this.colorStyles = document.createElement('style');
    this.colorStyles.appendChild(document.createTextNode(css));
    element!.prepend(this.colorStyles)
  }

  ngAfterViewInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
   if(this.formField instanceof FormFieldBase){
    console.log('Inside change',changes)
    
   }
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
      this.initFormField(this.formField as FormFieldBase)
    }
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    let element =  document.getElementsByTagName('head')[0];
    if(this.colorStyles != undefined){
      element!.removeChild(this.colorStyles!);
    }

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
    console.log('value changed to value:',value)
    if(this.localFormField.type == FormFieldType.ColorPicker){   
      console.log('Color picker value',value)
    }
    if(this.localFormField.type == FormFieldType.Select){      
      let item : any = this.localFormField.options.find( (x:any) => x.value == value);
      if(item && !!item.foreColor && item.foreColor.length > 0 && !!item.backColor && item.backColor.length > 0){
        this.selectForeColor = item.foreColor;
        this.selectBackColor = item.backColor;
        this.setSelectColor(this.selectForeColor,this.selectBackColor)
      }
    }
 
    this.onFieldChange.emit( {key: this.localFormField.key, value: value, form: this.form})
  }


}
