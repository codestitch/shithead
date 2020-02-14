import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './models/item';

@Injectable({
   providedIn: 'root'
})
export class ApiService {
   private dataURL = 'https://www.techiediaries.com/api/data.json';
   constructor(private httpClient: HttpClient) {}
   fetch(): Observable<Item[]> {
      return this.httpClient.get(this.dataURL) as Observable<Item[]>;
   }
}
