import { DatePipe, DatePipeConfig, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import {DateTime} from 'luxon';
const SHOP_TIMEZONE = "America/New_York";
@Pipe({
     name: 'tilbyDate'
})
export class TilbyDatePipe extends DatePipe {    
  constructor(
    @Inject(DATE_PIPE_DEFAULT_OPTIONS) private datePipeConfig: DatePipeConfig,
    @Inject(LOCALE_ID) private localeId: string
    ) {        
      super(localeId);    
    }   

    public override transform(value: any, pattern: string = 'fullDate', timezone:string = this.datePipeConfig.timezone ) : any {        
      return super.transform(value, pattern, timezone);    
    }

    private _shopDate='';
    set shopDate(localDate:string){
      this._shopDate = DateTime.fromISO(localDate).setZone(SHOP_TIMEZONE, {keepLocalTime: true}).toString()
    }
    get shopDate(){return this._shopDate}

    static utcDate(localDate=new Date()){
      return DateTime.fromJSDate(localDate).toUTC().toString();
    }
  }