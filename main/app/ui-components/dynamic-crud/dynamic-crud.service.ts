import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableColumn } from '../dynamic-table/dynamic-table.models';

@Injectable({
  providedIn: 'root'
})
export class DynamicCrudService {

  constructor(private http: HttpClient) { }

  create(url:string, item : any){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    let data : any = {};
    Object.keys(item).forEach( (key) => {
      data[key] = item[key];
    })
    return this.http.post(url, data, {...options});
  }

  read(url:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get(url, {...options} )
  }

  paginatedRead(url:string, page :number, size:number, sort:string = '', sortColumn:string=''){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    url += "/" + page + "/" + size
    if (sort != ''){
      url += '/' + sort + '/' + sortColumn;
    }
    return this.http.get( url , {...options} )
  }

  filter(url:string, page:number, size:number, payload:any, sort:string = '', sortColumn:string=''){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    url += "/" + page + "/" + size
    if (sort != ''){
      url += '/' + sort + '/' + sortColumn;
    }
    return this.http.post( url , payload, {...options});
  }

  update(url:string, item:any, identifier:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.put(url + '/' + item[identifier], item, {...options});
  }

  delete(url:string, item : any, identifier : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.delete(url + '/' + item[identifier], {...options});
  }

  info(url:string, item : any, identifier : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get(url  + '/' + item[identifier], {...options} )
  }

}
