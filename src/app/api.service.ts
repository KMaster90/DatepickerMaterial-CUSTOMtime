import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getDate(){
    return this.http.get<{date:string}[]>('https://63e4b9b08e1ed4ccf6e48fc4.mockapi.io/date');
  }
  postDate(date:string){
    return this.http.post('https://63e4b9b08e1ed4ccf6e48fc4.mockapi.io/date',{date});
  }
}