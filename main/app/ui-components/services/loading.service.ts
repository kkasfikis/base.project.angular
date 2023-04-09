import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading : Observable<boolean> = this._loading.asObservable();

  constructor() { }

  setLoading(isLoading : boolean){
    this._loading.next(isLoading);
  }
}
