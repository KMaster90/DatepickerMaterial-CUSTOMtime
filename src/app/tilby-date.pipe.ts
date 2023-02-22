import { DatePipe, DatePipeConfig, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import {DateTime} from 'luxon';
import { ApiService } from './api.service';
@Pipe({
     name: 'tilbyDate'
})
export class TilbyDatePipe extends DatePipe {  
  shopTimezoneName='';
  constructor(
    @Inject(DATE_PIPE_DEFAULT_OPTIONS) private datePipeConfig: DatePipeConfig,
    @Inject(LOCALE_ID) private localeId: string,
    ) {        
      super(localeId); 
     
    }   

    public override transform(value: any, pattern: string = 'fullDate', timezone:string = this.datePipeConfig.timezone ) : any {        
      return super.transform(value, pattern, timezone);    
    }

    getGMTOffset(timezoneName: string){
      return DateTime.local().setZone(timezoneName).offsetNameShort;
    }
    setPipeTimezone(timezoneName:string){
      this.shopTimezoneName=timezoneName;
      this.datePipeConfig.timezone = this.getGMTOffset(timezoneName);
    }

    shopDate(localDate:string){
      return DateTime.fromJSDate(new Date(localDate)).setZone(this.shopTimezoneName, {keepLocalTime: true}).toString()
    }

    
  static now(){
    return DateTime.now().toString();
  }

    static utcDate(localDate=new Date().toString()){
      return DateTime.fromJSDate(new Date(localDate)).toMillis();
    }
  }