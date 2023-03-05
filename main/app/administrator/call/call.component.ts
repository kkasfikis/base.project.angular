import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterField } from 'main/app/ui-components/dynamic-crud/dynamic-crud.models';
import { DynamicCrudService } from 'main/app/ui-components/dynamic-crud/dynamic-crud.service';
import { JsonHelpers } from 'main/app/ui-components/scripts/json-helpers';
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
    let result = JsonHelpers.convertFromJson(data);
    this.formFields = result.fields;
    this.filterFields = result.filters;
    this.infoFields = result.infos;
    this.tableColumns = result.columns;
    this.initMods();
  }

  initMods(){
    forkJoin([
        this.crudService.read('admin/predefined'),
        this.crudService.getAttributeWithId('Port','name'),
        this.crudService.getAttributeWithId('Client','name'),
        this.crudService.getAttributeWithId('Vessel','vessel_name'),
        this.crudService.getAttributeWithId('Agent','agent_name')
      ]).subscribe(
      ([predefinedResp,portResp,clientResp,vesselResp,agentResp] : any[]) => {
        if(predefinedResp.read){
          let data = predefinedResp.data;
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
          let callStatus = data.find( (x:any) => x.key == 'callStatus').values;
          let callTypes = data.find( (x:any) => x.key == 'callTypes').values;
          let ports = portResp.data;  
          JsonHelpers.setReferenceFieldDropdown(this.formFields,'port', 'name', ports)
          let clients = clientResp.data;
          JsonHelpers.setReferenceFieldDropdown(this.formFields,'client', 'name', clients)
          let vessels = vesselResp.data;
          JsonHelpers.setReferenceFieldDropdown(this.formFields,'vessel','vessel_name',vessels)
          let agents = agentResp.data;
          JsonHelpers.setReferenceFieldDropdown(this.formFields,'agent','agent_name',agents)

          JsonHelpers.setFieldDropdown(this.formFields,'call_status',callStatus)
          JsonHelpers.setFieldDropdown(this.formFields,'call_type',callTypes)
          
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq1',['first_hotel','second_hotel','position','departure_airport'],[hotels,hotels,positions,airports]);
          JsonHelpers.setSubReferenceFieldDropdown(this.formFields,'inq1',['arrival_port'],[ports])
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq2',['rank','hotel','signin_signoff'],[crewRanks,hotels,[{value:'ON'},{value:'OFF'}]]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq3',['hotel','hotel_referrer'],[hotels,hotelArrangedBy]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq4',['position','medical_type','medical_status'],[hotels,medicalAttendanceTypes,medicalAttendanceStatus]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq5',['offland_description','offland_destination','offland_status','offland_forward_method'],[offlandItemDescriptions,offlandDestinations,offlandStatus,offlandForwardMethods]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq6',['power_supply_status','power_supply_delivery_method'],[powerSupplyStatus,powerSupplyDeliveryMethods]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq7',['domestic_shipment_type','domestic_shipment_status'],[domesticShipmentTypes,domesticShipmentStatus]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq8',['overseas_shipment_type','overseas_shipment_status'],[overseasShipmentTypes,overseasShipmentStatus]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq9',['store_provision_type','store_provision_supplier','store_provision_status','store_provision_delivery_method'],[storeProvisionTypes,storeProvisionSuppliers,storeProvisionStatus,storeProvisionDeliveryMethods]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq10',['bunker_type','bunker_supplier_type','details','bunker_status','bunker_delivery_method'],[bunkerTypes,bunkerSupplierTypes,bunkerDetails,bunkerStatus,bunkerDeliveryMethods]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq11',['ship_pollutant_service','ship_pollutant_status'],[shipPollutantServices,shipPollutantStatus]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq12',['status'],[variousInquiriesStatus]);
          JsonHelpers.setSubFieldDropdown(this.formFields,'inq13',['ctm_operation','currency'],[ctmOperations,currencies]);
        } 
      }
    )
  }

  onFormChange( item : {mode : string, key : string, value : string, form : FormGroup}){
    if(item.key == 'port'){
      this.crudService.infoById('admin/port',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldValue(this.formFields,'port_anchorage',resp.data.anchorage)
        }
      });
    }
    if(item.key == 'client'){
      this.crudService.infoById('admin/client',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldDropdown( 
            this.formFields,
            'client_alias',
            resp.data.client_aliases.map( (x:any) => {
              return {
                key : x.alias, 
                value: x.alias
              } 
            })
          )
        }
      });
    }
    if(item.key == 'vessel'){
      this.crudService.infoById('admin/vessel',item.value).subscribe({
        next : (resp : any) => {
          JsonHelpers.setFieldValue(this.formFields,'vessel_flag',resp.data.flag)
        }
      });
    }
    if(item.key == 'agent'){
      this.crudService.infoById('admin/agent',item.value).subscribe({
        next : (resp : any) => {
          console.log('AGENT',resp)
          JsonHelpers.setFieldDropdown(
            this.formFields,
            'agent_person_in_charge',
            resp.data.agent_people_in_charge.map( (x:any) => {
              return {
                key : x.pic_name, 
                value: x.pic_name
              } 
            })
          )
        }
      })
    }
  }
}
