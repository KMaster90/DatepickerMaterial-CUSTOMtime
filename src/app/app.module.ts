import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { DatepickerActionsExample } from './datepicker-actions-example';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipeConfig, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { TilbyDatePipe } from './tilby-date.pipe';
import { ApiService } from './api.service';

@NgModule({
  declarations: [DatepickerActionsExample, TilbyDatePipe],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {timezone: '0000'}},TilbyDatePipe
],
  bootstrap: [DatepickerActionsExample],
})
export class AppModule {
}
