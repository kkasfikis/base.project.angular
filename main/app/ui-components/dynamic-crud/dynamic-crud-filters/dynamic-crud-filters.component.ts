import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormAction, FormFieldBase, FormFieldType, SubForm } from '../../dynamic-form/dynamic-form.models';
import { TableColumn } from '../../dynamic-table/dynamic-table.models';
import { FilterField } from '../dynamic-crud.models';

@Component({
  selector: 'app-dynamic-crud-filters',
  templateUrl: './dynamic-crud-filters.component.html',
  styleUrls: ['./dynamic-crud-filters.component.scss']
})
export class DynamicCrudFiltersComponent implements OnInit {

  constructor() { }

  @Input() filterFields : FilterField[] = [];
  @Output() onFilterSubmit : EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilterCancel : EventEmitter<any> = new EventEmitter<any>();

  searchForm : BehaviorSubject<SubForm>= new BehaviorSubject<SubForm>( new SubForm({key : 'search', order : 0, hasInfo : false, isTagged : true, tagSeperator : ':'}));
  cancelFilterFunc = this.filterCancel.bind(this);

  cancelFilterAction : FormAction = {
    key : 'cancelFitler',
    icon : 'cancel',
    text : 'Clear Filters',
    color : 'red',
    func : this.cancelFilterFunc
  } as unknown as FormAction


  ngOnInit(): void {
    if(this.filterFields && this.filterFields.length > 0){
      this.changeFilter(this.filterFields[0]);
    }
  }

  changeFilter(field : FilterField){
    let sform = this.searchForm.getValue()
    sform.fields = [];
    let filterOptions : {key : string, value:string}[] = [];
    this.filterFields.forEach( (filter) => {
      filterOptions.push({key : filter.key, value: filter.label});
    })
    sform.fields.push( new FormFieldBase({
      key : 'filter',
      label : 'Filter',
      value : field.key,
      order : 0,
      type : FormFieldType.Select,
      options : filterOptions,
      width : 30,
      innerWidth : 98,
      align : 'center'
    }));
    
    sform.fields.push( new FormFieldBase({
      key : 'value',
      label : 'Filter Value',
      order : 2,
      type : field.fieldType,
      width : 70,
      innerWidth : 98,
      align : 'center'
    }));
    
    sform.tableColumns = [];

    sform.tableColumns.push({
      key : 'filter',
      text : 'Filter',
      isFilterable : false,
      isSortable : false,
      width : 20
    } as TableColumn)

    sform.tableColumns.push({
      key : 'value',
      text : 'Filter Value',
      isFilterable : false,
      isSortable : false,
      width : 50
    } as TableColumn)

    this.searchForm.next(sform);
  }

  onSubFormChange(item : {subform : string, key : string, value: string, form : FormGroup} ){
    if(item.key == 'filter'){
      let filter = this.filterFields.filter(x=>x.key == item.value)[0];
      this.changeFilter(filter);
    }
  }

  onFormSubmit(payload : any){
    this.onFilterSubmit.emit(payload);
  }

  
  filterCancel(){
    this.onFilterCancel.emit();
    let sform = this.searchForm.getValue();
    sform.tableData = [];
    this.searchForm.next(sform);
  }
}
