import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { first } from 'rxjs';
import 'moment-timezone';
import moment, { utc } from 'moment';
import { MatListItem } from '@angular/material/list';
import { ApiService } from './api.service';

/** @title Datepicker action buttons */
@Component({
  selector: 'datepicker-actions-example',
  templateUrl: 'datepicker-actions-example.html',
  styleUrls: ['datepicker-actions-example.css'],
})
export class DatepickerActionsExample {
  @ViewChildren('hours') hoursItem: QueryList<MatListItem>;
  @ViewChildren('minutes') minutesItem: QueryList<MatListItem>;
  value = new Date().toString();
  mySelectedDate = {
    date: this.value,
    h: new Date().getHours().toString(),
    m: new Date().getMinutes().toString(),
  };
  hours = [...Array(24).keys()].map((x) => `${x}`.padStart(2, '0'));
  minutes = [...Array(60).keys()].map((x) => `${x}`.padStart(2, '0'));
  SHOP_TIMEZONE_OFFSET;

  constructor(private api:ApiService) {
    moment.tz.setDefault('America/New_York');
    this.SHOP_TIMEZONE_OFFSET = moment(new Date()).format('ZZ');
  }

  getDate(){
    this.api.getDate().subscribe((arr)=>this.value=arr[arr.length-1].date);
  }

  setDatePicker(ev?: any) {
    this.mySelectedDate.date = ev?.value;
    const stringDate = this.setDateTime(this.mySelectedDate);
    this.setShopTimezone(stringDate);
  }

  setDateTime({ date, h, m }: typeof this.mySelectedDate) {
    return new Date(
      new Date(this.mySelectedDate.date).setHours(+h, +m)
    ).toString();
  }

  setShopTimezone(stringDate: string) {
    const regex = /^([A-Za-z]{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/;
    const match = regex.exec(stringDate);
    this.value = `${match ? match[1] : null} GMT${this.SHOP_TIMEZONE_OFFSET}`;
    const utcDate = `${new Date(this.value).getTime()}`;
    console.log('value', this.value, utcDate)
    this.api.postDate(utcDate).subscribe(console.log);
  }

  scrollIntoView() {
    const center: ScrollIntoViewOptions = {
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    };
    setTimeout(() => {
      this.hoursItem
        .find((i) => i._elementRef.nativeElement.classList.contains('selected'))
        ?._elementRef.nativeElement.scrollIntoView(center);
      this.minutesItem
        .find((i) => i._elementRef.nativeElement.classList.contains('selected'))
        ?._elementRef.nativeElement.scrollIntoView(center);
    });
  }
}
