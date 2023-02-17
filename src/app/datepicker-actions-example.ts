import {Component} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { first } from 'rxjs';

/** @title Datepicker action buttons */
@Component({
  selector: 'datepicker-actions-example',
  templateUrl: 'datepicker-actions-example.html',
  styleUrls: ['datepicker-actions-example.css'],
})
export class DatepickerActionsExample {
  value='2022-02-10T09:50';
  mySelectedDate={date:'',h:'',m:''}
  hours = [...Array(24).keys()].map(x=>`${x}`.padStart(2,'0'));
  minutes = [...Array(60).keys()].map(x=>`${x}`.padStart(2,'0'));

  setDatePicker(ev?:any){
    console.log(this.value)
  this.mySelectedDate.date=ev?.value;
    console.log(this.value, this.mySelectedDate)
  }
}



/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */