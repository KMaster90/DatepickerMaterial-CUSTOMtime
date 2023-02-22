import { DatePipeConfig, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient ) {
  
  }
  getTimezone(){
    return this.http
    .get<{ timezone: string }[]>(
      'https://63e4b9b08e1ed4ccf6e48fc4.mockapi.io/currentLocale'
    )
  }

  getDate() {
    return this.http.get<{ date: string }[]>(
      'https://63e4b9b08e1ed4ccf6e48fc4.mockapi.io/date'
    );
  }
  postDate(date: number) {
    return this.http.post('https://63e4b9b08e1ed4ccf6e48fc4.mockapi.io/date', {
      date,
    });
  }
}
