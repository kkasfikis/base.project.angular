import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PredefinedService {

  constructor(private http: HttpClient) { }

  public getByKey(key : string){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.get(`/predefined/${key}`, {...options} )
  }

}
