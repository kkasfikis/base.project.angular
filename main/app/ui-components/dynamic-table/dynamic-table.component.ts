import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, EventEmitter, Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { TableAction, TableColumn, TableData } from './dynamic-table.models';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit,AfterViewInit,OnDestroy {

  public tableSource = new MatTableDataSource<any>([]);
  public displayedColumns : string[] = []

  @ViewChild(MatPaginator,{static:false}) matPaginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() paginationSizes : number[] = [5,10,20];
  @Input() defaultPageSize : number = 5;

  @Input() hasActions : boolean = false;

  @Input() tableColumns : BehaviorSubject<TableColumn[]> = new BehaviorSubject<TableColumn[]>([]);
  @Input() tableData : BehaviorSubject<TableData> = new BehaviorSubject<TableData>(new TableData(0,0,0,[]));

  @Input() isPaginated : boolean = false;
  @Output() pageChanged : EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChanged : EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribeSignal$: Subject<void> = new Subject();

  columns : TableColumn[] = []

  dataSub : Subscription | undefined = undefined;
  columnSub : Subscription | undefined = undefined;

  filterInputs : any = {}
  filterValues : any = {}

  headStyles : HTMLStyleElement | undefined;

  ngOnInit(): void {
    this.setColumnWidth();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.columnSub = this.tableColumns.pipe(takeUntil(this._unsubscribeSignal$)).subscribe({
        next : (val : TableColumn[]) => {
          this.columns = val;//.map(x=>x.name);
          if(this.hasActions){
            this.displayedColumns = [...this.columns.map(x=>x.key),'actions']
          }
          else{
            this.displayedColumns = [...this.columns.map(x=>x.key)]
          }
          this.filterInputs = {}
          this.filterValues = {}
          if (!this.isPaginated){
            this.tableSource.filterPredicate = this.createFilter();
            this.columns.forEach((val)=>{
              this.filterInputs[val.key] = new FormControl('');
              this.filterValues[val.key] = '';
              this.filterInputs[val.key].valueChanges.subscribe( (filterValue : string) => {
                  this.filterValues[val.key] = filterValue;
                  this.tableSource.filter = JSON.stringify(this.filterValues)
              })
            })
          }

        }
      });
      this.dataSub = this.tableData.pipe(takeUntil(this._unsubscribeSignal$)).subscribe({
        next : (val : TableData) => {
          if(val){
            if(this.isPaginated){ 
              let data = [];
              for (let i = 0 ; i < val.page * val.size; i++){
                data.push({});
              }
              data.push(...val.data);
              this.tableSource = new MatTableDataSource<any>(data)
              this.matPaginator.pageIndex = val.page;
              this.matPaginator.pageSize = val.size;
              this.tableSource.data.length = val.count; 
            }
            else{
              this.tableSource.data = val.data;
            }
            this.tableSource._updateChangeSubscription();
            this.tableSource.paginator = this.matPaginator;
          }
          this.setColumnWidth();
        }
      })
    })
    
  }

  ngOnDestroy(): void {
    this._unsubscribeSignal$.next();
    this._unsubscribeSignal$.unsubscribe();
  }


  sortData(sort: Sort) {
    if(!this.isPaginated){
      let data = this.tableSource.data;
      if (!sort.active || sort.direction === '') {
        this.tableSource.data = data;
        return;
      }
  
      this.tableSource.data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return this.compare(a[sort.active],b[sort.active],isAsc);
      });
    }
    else{
      this.sortChanged.emit(sort)
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let check = true;
      Object.keys(data).forEach((key : string)=>{
        if(searchTerms[key] && searchTerms[key] != '' &&  data[key].toString().toLowerCase().indexOf(searchTerms[key].toString()) == -1){
          check = false;
        }
      });
      return check;
    }
    return filterFunction;
  }

  setColumnWidth(){
    let head = document.getElementsByTagName('head')[0];
    if(this.headStyles != undefined){
      head.removeChild(this.headStyles!);
    }
    let css = '@media (min-width:760px){'
    this.columns.forEach( (item : TableColumn )=>{
      css += '.mat-column-' + item.key + '{ min-width:' + item.width + '%; width:' + item.width + '%; padding-left:5px;padding-right:5px }';
    });
    css += '}';
    this.headStyles = document.createElement('style');
    this.headStyles.appendChild(document.createTextNode(css));
    head.appendChild(this.headStyles)
  }

  pageChange(event:any){
    if(this.isPaginated){
      let previousIndex = event.previousPageIndex;
      let previousSize = event.previousPageSize;
      let pageIndex = event.pageIndex;
      let pageSize = event.pageSize;
      this.pageChanged.emit({page : pageIndex, size: pageSize});
      this.matPaginator.pageIndex = previousIndex;
      this.matPaginator.pageSize = previousSize;
    }
  }

}
