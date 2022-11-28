import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TableAction, TableColumn } from './dynamic-table.models';

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
  @Input() tableData : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


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
      this.columnSub = this.tableColumns.subscribe({
        next : (val : TableColumn[]) => {
          this.columns = val;//.map(x=>x.name);
          if(this.hasActions){
            this.displayedColumns = [...this.columns.map(x=>x.name),'actions']
          }
          else{
            this.displayedColumns = [...this.columns.map(x=>x.name)]
          }
          this.filterInputs = {}
          this.filterValues = {}
          
          this.tableSource.filterPredicate = this.createFilter();
          this.columns.forEach((val)=>{
            this.filterInputs[val.name] = new FormControl('');
            
            this.filterValues[val.name] = '';
            
            this.filterInputs[val.name].valueChanges.subscribe( (filterValue : string) => {
                this.filterValues[val.name] = filterValue;
                this.tableSource.filter = JSON.stringify(this.filterValues)
            })
          })

        }
      });
      this.dataSub = this.tableData.subscribe({
        next : (val : any[]) => {
          if(val){
            this.tableSource.data = val;
            this.tableSource.paginator = this.matPaginator;
          }
          this.setColumnWidth();
        }
      })
    })
    
  }

  ngOnDestroy(): void {
    if(this.dataSub != undefined ){ this.dataSub.unsubscribe(); }
    if(this.columnSub != undefined){ this.columnSub.unsubscribe(); }
  }


  sortData(sort: Sort) {
    const data = this.tableSource.data;
    if (!sort.active || sort.direction === '') {
      this.tableSource.data = data;
      return;
    }

    this.tableSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active],b[sort.active],isAsc);
    });
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
          check =false;
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
      css += '.mat-column-' + item.name + '{ min-width:' + item.width + '%; width:' + item.width + '%; padding-left:5px;padding-right:5px }';
      
    });
    css += '}';
    this.headStyles = document.createElement('style');
    this.headStyles.appendChild(document.createTextNode(css));
    head.appendChild(this.headStyles)
  }

}
