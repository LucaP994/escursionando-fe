import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private getItemList: string = "../../assets/items.json";
  constructor(
    private http: HttpClient
  ) { }
  
  public getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.getItemList);
  }

}
