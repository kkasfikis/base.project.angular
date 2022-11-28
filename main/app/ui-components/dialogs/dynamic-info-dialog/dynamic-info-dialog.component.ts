import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoField } from '../../dynamic-info/dynamic-info.models';

@Component({
  selector: 'app-dynamic-info-dialog',
  templateUrl: './dynamic-info-dialog.component.html',
  styleUrls: ['./dynamic-info-dialog.component.scss']
})
export class DynamicInfoDialogComponent implements OnInit {

  element : any;
  infoFields : InfoField[] = [];

  constructor(public dialogRef : MatDialogRef<DynamicInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) {
    this.element = data.element; 
    this.infoFields = data.infoFields
  }

  ngOnInit(): void {
  }

}
