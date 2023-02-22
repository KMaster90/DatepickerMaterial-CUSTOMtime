import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { first } from 'rxjs';
import { MatListItem } from '@angular/material/list';
import { ApiService } from './api.service';
import { TilbyDatePipe } from './tilby-date.pipe';
/** @title Datepicker action buttons */
@Component({
  selector: 'datepicker-actions-example',
  templateUrl: 'datepicker-actions-example.html',
  styleUrls: ['datepicker-actions-example.css'],
})
export class DatepickerActionsExample {
  @ViewChildren('hours') hoursItem: QueryList<MatListItem>;
  @ViewChildren('minutes') minutesItem: QueryList<MatListItem>;
  value:string;
  mySelectedDate:any;
  hours = [...Array(24).keys()].map((x) => `${x}`.padStart(2, '0'));
  minutes = [...Array(60).keys()].map((x) => `${x}`.padStart(2, '0'));

  constructor(private api: ApiService, public tilbyDatePipe: TilbyDatePipe) {
    console.log('TilbyDatePipe.utcDate', TilbyDatePipe.utcDate());
    this.api.getTimezone().subscribe(res=>{
      this.tilbyDatePipe.setPipeTimezone(res[0].timezone);
      this.myInit();
    });
  }

  myInit(){
    this.value = TilbyDatePipe.now();
    this.mySelectedDate = {
      date: this.value,
      h: this.getShopDateTime('HH'),
      m: this.getShopDateTime('mm'),
    };
  }

  getShopDateTime(format: string) {
    return this.tilbyDatePipe.transform(this.value, format) || '';
  }

  getDate() {
    this.api.getDate().subscribe((arr) => {
      this.value = arr[arr.length - 1].date;
      this.mySelectedDate.h = this.getShopDateTime('HH');
      this.mySelectedDate.m = this.getShopDateTime('mm');
    });
  }

  setDatePicker(ev?: any) {
    this.mySelectedDate.date = ev?.value;
    const stringDate = this.setDateTime(this.mySelectedDate);
    console.log('STRING_DATE',stringDate)
    this.setShopTimezone(stringDate);
  }

  setDateTime({ date, h, m }: typeof this.mySelectedDate) {
    return new Date(
      new Date(this.mySelectedDate.date).setHours(+h, +m)
    ).toString();
  }

  setShopTimezone(stringDate: string) {
    this.value = this.tilbyDatePipe.shopDate(stringDate);
    const utcDateShop = TilbyDatePipe.utcDate(this.value);
    const utcDate = TilbyDatePipe.utcDate();
    console.log('value',stringDate, this.value,utcDateShop, utcDate);
    // this.api.postDate(utcDate).subscribe(console.log);
    this.api.postDate(utcDateShop).subscribe(console.log);
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
