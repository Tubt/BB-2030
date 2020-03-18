import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KPIComponent } from './kpi/kpi.component';
import { PivotTableComponent } from './pivot-table/pivot-table.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    KPIComponent,
    PivotTableComponent,
    TestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
