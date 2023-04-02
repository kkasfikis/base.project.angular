import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfoField, InfoType } from '../dynamic-info.models';

@Component({
  selector: 'app-dynamic-info-field',
  templateUrl: './dynamic-info-field.component.html',
  styleUrls: ['./dynamic-info-field.component.scss']
})
export class DynamicInfoFieldComponent implements OnInit, AfterViewInit {

  @Input() infoField! : InfoField;
  @Input() value : any | any[];

  localInfoType : typeof InfoType = InfoType;
  selectedFilePath : SafeResourceUrl | undefined = undefined

  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    console.log('aaaaaa',!!this.value[this.infoField.key],this.value[this.infoField.key],this.value)
    if(this.infoField.type == InfoType.PDF){
      let contentType =  'data:application/pdf;base64,'
      let value = contentType + this.value 
      this.selectedFilePath = this.sanitizer.bypassSecurityTrustResourceUrl(value);
      console.log(value)
      
    }
  }

  ngAfterViewInit() : void{
  }


}
