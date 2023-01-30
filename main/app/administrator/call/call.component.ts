import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { FormFieldBase, FormFieldType, SubForm } from 'main/app/ui-components/dynamic-form/dynamic-form.models';
import { InfoField, InfoType, SubFormInfo } from 'main/app/ui-components/dynamic-info/dynamic-info.models';
import { TableColumn } from 'main/app/ui-components/dynamic-table/dynamic-table.models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { PredefinedService } from '../predefined/predefined.service';
import * as data from './call.ui-config.json'


@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, OnDestroy{

  constructor(private crudService : DynamicCrudService,private elementRef : ElementRef) { }


  formFields : (BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm>)[] = []

  tableColumns : TableColumn[] = []

  infoFields : (InfoField|SubFormInfo)[] = []

  filterFields : FilterField[] = []

  ngOnDestroy(): void {
    this.formFields.forEach( (field :BehaviorSubject<FormFieldBase>|BehaviorSubject<SubForm> )=> {
      field.complete()
    })
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    console.log('Converting Call fields from JSON ....')
    this.convertFromJson();
    this.initMods();
  }

  convertFromJson(){
    this.formFields = [];
    let obj = JSON.parse(JSON.stringify(data as any)) //deep copy workaround
    this.tableColumns = obj.columns;
    
    if(obj.filters && obj.filters.length > 0){
      obj.filters.forEach( (value:any) => {
        value.fieldType = FormFieldType[value.fieldType];
        this.filterFields.push(new FilterField(value));
      })
    }
    
    if(obj.infos && obj.infos.length > 0){
      obj.infos.forEach((value:any, index:number) => {
        value.type = InfoType[value.type];
        this.infoFields.push(new InfoField(value));
      })
    }

    if(obj.subinfos && obj.subinfos.length > 0){
      obj.subinfos.forEach((value:any, index:number) => {
        value.fields.forEach((subvalue:any)=>{
          subvalue.type = InfoType[subvalue.type];
        })
        this.infoFields.push(new SubFormInfo(value))
      })
    }

    if(obj.fields && obj.fields.length > 0){
      obj.fields.forEach( (value : any) => {
        value.type = FormFieldType[value.type]; 
        this.formFields.push(new BehaviorSubject<FormFieldBase>(new FormFieldBase(value)))
        
      })
    }
     
    if(obj.subforms && obj.subforms.length > 0){
      obj.subforms.forEach( (value : any) => {
        let tfields:FormFieldBase[] = []
        value.fields.forEach((subvalue : any) => {
          subvalue.type = FormFieldType[subvalue.type]
          tfields.push(new FormFieldBase(subvalue));
        });
        let tcolumns:TableColumn[] = []
        value.tableColumns.forEach((subvalue : any) => {
          tcolumns.push(new TableColumn(subvalue));
        });
        let tinfos :InfoField[] = []
        value.infoFields.forEach((subvalue : any) => {
          subvalue.type = InfoType[subvalue.type];
          tinfos.push(new InfoField(subvalue));
        });
        value.fields = tfields;
        value.tableColumns = tcolumns;
        value.infoFields = tinfos;
        let subj = new BehaviorSubject<SubForm>(new SubForm(value))
        this.formFields.push(subj);
      })
    }
    
  }

  setField(fieldKey : string, values : string[]){
    let field = this.formFields.find(x => x.getValue().key == fieldKey) as BehaviorSubject<FormFieldBase>
    let fieldValue = field.getValue() as FormFieldBase;
    fieldValue.options = values.map( (x:string) => {
        return {
          key : x,
          value : x
        }
      }
    )
    field.next(fieldValue)
  }

  setSubFormField(subformKey : string, fields : string[], values : string[][]){
    console.log(`SETTING SUFORM ${subformKey}`,fields,values)
    let subForm = this.formFields.find( x => x.getValue().key == subformKey) as BehaviorSubject<SubForm>;
    let subFormValue = subForm?.getValue() as SubForm

    if (fields && fields.length > 0 && values && values.length > 0 && fields.length == values.length){
      fields.forEach( (field : string, index : number) => {
        console.log('FIELD',field)
        subFormValue.fields.find(x=>x.key == field)!.options = values[index].map( (item : any) => {
          return {
            key : item,
            value : item
          };
        })
      })
    }

    subForm?.next(subFormValue)
  }

  initMods(){
    forkJoin([this.crudService.read('predefined'),this.crudService.getAttribute('Port','name')]).subscribe(
      ([resp,resp1] : any[]) => {
        if(resp.read){
          let data = resp.data;
          let hotels = data.find( (x:any) => x.key=='hotels').values;
          let airports = data.find( (x:any) => x.key=='airports').values;
          let positions = data.find( (x:any) => x.key=='positions').values;
          let crewRanks = data.find( (x:any) => x.key == 'crewRanks').values;
          let hotelArrangedBy = data.find( (x:any) => x.key == 'hotelArrangedBy').values;
          let offlandItemDescriptions = data.find( (x:any) => x.key == 'offlandItemDescriptions').values;
          let offlandDestinations = data.find( (x:any) => x.key == 'offlandItemDescriptions').values;
          let offlandForwardMethods = data.find( (x:any) => x.key == 'offlandForwardMethods').values;
          let offlandStatus = data.find( (x:any) => x.key == 'offlandStatus').values;
          let medicalAttendanceTypes = data.find( (x:any) => x.key == 'medicalAttendanceTypes').values;
          let medicalAttendanceStatus = data.find( (x:any) => x.key == 'medicalAttendanceStatus').values;
          let powerSupplyStatus =  data.find( (x:any) => x.key == 'powerSupplyStatus').values;
          let powerSupplyDeliveryMethods =  data.find( (x:any) => x.key == 'powerSupplyDeliveryMethods').values;
          let domesticShipmentTypes = data.find( (x:any) => x.key == 'domesticShipmentTypes').values;
          let domesticShipmentStatus = data.find( (x:any) => x.key == 'domesticShipmentStatus').values;
          let overseasShipmentTypes = data.find( (x:any) => x.key == 'overseasShipmentTypes').values;
          let overseasShipmentStatus = data.find( (x:any) => x.key == 'overseasShipmentStatus').values;
          let storeProvisionTypes = data.find( (x:any) => x.key == 'storeProvisionTypes').values;
          let storeProvisionSuppliers = data.find( (x:any) => x.key == 'storeProvisionSuppliers').values;
          let storeProvisionStatus = data.find( (x:any) => x.key == 'storeProvisionStatus').values;
          let storeProvisionDeliveryMethods = data.find( (x:any) => x.key == 'storeProvisionDeliveryMethods').values;
          let shipPollutantServices = data.find( (x:any) => x.key == 'shipPollutantServices').values;
          let shipPollutantStatus = data.find( (x:any) => x.key == 'shipPollutantStatus').values;
          let bunkerTypes = data.find( (x:any) => x.key == 'bunkerTypes').values;
          let bunkerSupplierTypes = data.find( (x:any) => x.key == 'bunkerSupplierTypes').values;
          let bunkerDeliveryMethods = data.find( (x:any) => x.key == 'bunkerDeliveryMethods').values;
          let bunkerStatus = data.find( (x:any) => x.key == 'bunkerStatus').values;
          let bunkerDetails = data.find( (x:any) => x.key == 'bunkerDetails').values;
          let variousInquiriesStatus = data.find( (x:any) => x.key == 'variousInquiriesStatus').values;
          let ctmOperations = data.find( (x:any) => x.key == 'ctmOperations').values;
          let currencies = data.find( (x:any) => x.key == 'currencies').values;
          let ports = resp1.data;
          this.setField('port_name',ports)
          
          this.setSubFormField('inq1',['first_hotel','second_hotel','position','arrival_port','departure_airport'],[hotels,hotels,positions,ports,airports]);
          this.setSubFormField('inq2',['rank','hotel','signin_signoff'],[crewRanks,hotels,['ON','OFF']]);
          this.setSubFormField('inq3',['hotel','hotel_referrer'],[hotels,hotelArrangedBy]);
          this.setSubFormField('inq4',['position','medical_type','medical_status'],[hotels,medicalAttendanceTypes,medicalAttendanceStatus]);
          this.setSubFormField('inq5',['offland_description','offland_destination','offland_status','offland_forward_method'],[offlandItemDescriptions,offlandDestinations,offlandStatus,offlandForwardMethods]);
          this.setSubFormField('inq6',['power_supply_status','power_supply_delivery_method'],[powerSupplyStatus,powerSupplyDeliveryMethods]);
          this.setSubFormField('inq7',['domestic_shipment_type','domestic_shipment_status'],[domesticShipmentTypes,domesticShipmentStatus]);
          this.setSubFormField('inq8',['overseas_shipment_type','overseas_shipment_status'],[overseasShipmentTypes,overseasShipmentStatus]);
          this.setSubFormField('inq9',['store_provision_type','store_provision_supplier','store_provision_status','store_provision_delivery_method'],[storeProvisionTypes,storeProvisionSuppliers,storeProvisionStatus,storeProvisionDeliveryMethods]);
          this.setSubFormField('inq10',['bunker_type','bunker_supplier_type','details','bunker_status','bunker_delivery_method'],[bunkerTypes,bunkerSupplierTypes,bunkerDetails,bunkerStatus,bunkerDeliveryMethods]);
          this.setSubFormField('inq11',['ship_pollutant_service','ship_pollutant_status'],[shipPollutantServices,shipPollutantStatus]);
          this.setSubFormField('inq12',['status'],[variousInquiriesStatus]);
          this.setSubFormField('inq13',['ctm_operation','currency'],[ctmOperations,currencies]);
        } 
      }
    )
  }
}
