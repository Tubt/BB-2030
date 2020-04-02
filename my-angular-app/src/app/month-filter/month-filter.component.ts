import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { ColumnChart, ErrorComponent, Model } from "@gooddata/react-components";
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import "@gooddata/react-components/styles/css/main.css";
import {
  totalSalesIdentifier,
  monthOfYearDateIdentifier,
  dateDatasetIdentifier,
  projectId,
} from "../../assets/fixture";
  let self: any;
  const dateFormat = "YYYY-MM-DD";
  interface ColumnChartMonthProps {
    projectId: any,
    measures: any,
    viewBy?: any,
    filters?: any[],
  }
  interface MonthpickerProps {
    className?: any,
    selected?: any,
    onChange:any,
    minDate?:any,
    maxDate?:any,
    dateFormat?:any,
  }
  function withGTM0(time) {
    return time.utcOffset("+00:00", true);
  }
@Component({
  selector: 'app-moth-picker',
  templateUrl: './month-filter.component.html',
  styleUrls: ['./month-filter.component.css']
})
export class MonthFilterComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;
  totalSales = [Model.measure(totalSalesIdentifier)
                          .format("#,##0")
                          .alias("$ Total Sales")];
  locationResort = Model.attribute(monthOfYearDateIdentifier);
  state = {
    from: withGTM0(moment("2016-01-01", dateFormat)),
    to: withGTM0(moment("2017-01-01", dateFormat)),
    error: null,
};
currentDate = withGTM0(moment().startOf("months"));
onFromChange(value) {
    self.onDateChange("from", value);
    self.renderFrom();
    self.render();
  }
onToChange(value) {
  self.onDateChange("to", value);
  self.renderTo();
  self.render();
}
onDateChange(prop, value) {
  const { from, to } = this.state;
    const newState = {
        from,
        to,
        error: null,
    };
    newState[prop] = value;
    if (newState.to.isSameOrAfter(newState.from)) {
      this.state = newState
    } else {
      self.error = '"From" date must come before "To" date.';
    }
    self.render();
}
  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  public rootToDomID: string;
  protected getToRootDomNode() {
    const node = document.getElementById(this.rootToDomID);
    invariant(node, `Node '${this.rootToDomID} not found!`);
    return node;
  }
  public rootFromDomID: string;
  protected getFromRootDomNode() {
    const node = document.getElementById(this.rootFromDomID);
    invariant(node, `Node '${this.rootFromDomID} not found!`);
    return node;
  }
  protected getProps() : ColumnChartMonthProps  {
    return {
      projectId : projectId,
      measures : this.totalSales,
      viewBy: this.locationResort,
      filters: [
        {
            relativeDateFilter: {
                dataSet: {
                    identifier: dateDatasetIdentifier,
                },
                granularity: "GDC.time.month",
                from: Math.floor(this.state.from.diff(this.currentDate, "months", true)),
                to: Math.floor(this.state.to.diff(this.currentDate, "months", true)),
            },
        },
      ]
    }
  }
  protected getFromMonthPicker() : MonthpickerProps  {
    const { from } = this.state;
    return {
      className : "gd-input-field",
      selected: from,
      onChange: this.onFromChange,
      minDate:new Date("2015-01-01"),
      maxDate: new Date("2017-12-31"),
      dateFormat: "MM/YYYY"
    }
  }
  protected getToMonthPicker() : MonthpickerProps  {
    const { to } = this.state;
    return {
      className: "gd-input-field",
      selected: to,
      onChange: this.onToChange,
      minDate: new Date("2015-01-01"),
      maxDate: new Date("2017-12-31"),
      dateFormat: "MM/YYYY"
    }
  }
  protected renderTo() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(DatePicker, this.getToMonthPicker()), this.getToRootDomNode());
    }
  }
  protected renderFrom() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(DatePicker, this.getFromMonthPicker()), this.getFromRootDomNode());
    }
  }
  private isMounted(): boolean {
    return !!this.rootDomID;
  }
  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps()), this.getRootDomNode());
    }
  }
  ngOnInit() {
    //sau khi dùng self thì phải gán lại self = this
    self = this;
    this.rootDomID = uuid.v4(); 
    this.rootFromDomID = uuid.v4();
    this.rootToDomID = uuid.v4()
  }
  ngOnChanges() {
    this.renderFrom();
    this.renderTo();
    this.render();
  }
  ngAfterViewInit() {
    this.renderFrom();
    this.renderTo();
    this.render();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}