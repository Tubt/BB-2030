import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KPIComponent } from './kpi/kpi.component';
import { TestComponent } from './test/test.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DynamicSortingComponent } from './dynamic-sorting/dynamic-sorting.component';
import { IgxDatePickerModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveAsDashboardComponent } from './save-as-dashboard/save-as-dashboard.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MonthFilterComponent } from './month-filter/month-filter.component';
import { ExportComponent } from './export/export.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    KPIComponent,
    TestComponent,
    DatePickerComponent,
    DynamicSortingComponent,
    SaveAsDashboardComponent,
    MonthFilterComponent,
    ExportComponent,
    BarChartComponent,
    
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    IgxDatePickerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
