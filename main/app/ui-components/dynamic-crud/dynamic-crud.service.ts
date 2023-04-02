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

  async update(url:string, item:any, identifier:string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'multipart/form'})
    }

    let formData = new FormData();
    
    await Promise.all( Object.keys(item).map( async (key : string) => {
      console.log('key',key)
      if(key.includes('_file')){
        console.log('file',key)
        const blob = await fetch(`${item[key]}`).then(res => res.blob());
        console.log('BLOOOOOB',blob)
        formData.append(key, blob, 'AAAA.pdf')
      }
      else{
        console.log('value',key)
        formData.append(key,item[key]);
      }
    })).then( () => {
      console.log('FORM DATA',Array.from(formData.entries()))
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
