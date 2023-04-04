import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableColumn } from '../dynamic-table/dynamic-table.models';

@Injectable({
  providedIn: 'root'
})
export class DynamicCrudService {

  constructor(private http: HttpClient) { }

  async create(url:string, item : any){
    
    let formData = new FormData();
    
    await Promise.all( Object.keys(item).map( async (key : string) => {
      console.log('key',key)
      if(key.includes('_file')){
        const blob = await fetch(`${item[key]}`).then(res => res.blob());
        formData.append(key, blob)
        delete item[key]
      }
    })).then( () => {
      formData.append('data', JSON.stringify(item));
    })

    return this.http.post(url, formData);
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

  async update(url:string, item:any, identifier:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'multipart/form'})
    }

    let formData = new FormData();
    
   await Promise.all( Object.keys(item).map( async (key : string) => {
      console.log('key',key)
      if(key.includes('_file')){
        const blob = await fetch(`${item[key]}`).then(res => res.blob());
        formData.append(key, blob)
        delete item[key]
      }
    })).then( () => {
      formData.append('data', JSON.stringify(item));
    })
    
    return this.http.put(url + '/' + item[identifier], formData);
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

  infoById(url:string, id : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get(url  + '/' + id, {...options} )
  }

  getAttribute(collection:string, attribute:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get('getAttributeList?class_name=' + collection + "&attribute=" + attribute, {...options} )
  }

  getAttributeWithId(collection:string, attribute:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get('getAttributeList?class_name=' + collection + "&attribute=" + attribute + '&mode=identified', {...options} )
  }
  
  getSingleAttribute(collection:string, id:string, attribute:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get('getSingleAttribute?class_name=' + collection + "&id=" + id + "&attribute=" + attribute + '&mode=identified', {...options} )
  }

  qyeryByValue(collection:string, query:any){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    let data = {
      class_name : collection,
      query : query
    }
    return this.http.post('queryByValue', data, {...options});
  }
}
