import { Component, OnInit, OnChanges ,AfterViewInit} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import {Model, PivotTable} from "@gooddata/react-components";
import {
  projectId, 
  LocationStateIdentifier, 
  LocationNameIdentifier,
  MenuCategoryIdentifier,
  FranceFeeIdentifier,
  FraceFeeAdRoyalty
} from "../../assets/fixture";

interface PivotProps {
  projectId :any,
  measures :any[],
  rows: any[],
  columns :any[],
}

@Component({
  selector: 'app-pivot-table',
  template :'<div style="height: 500px" [id]="rootDomID"></div>'
})

export class PivotTableComponent implements OnInit {

  measures = [
    Model.measure(FranceFeeIdentifier).localIdentifier("france-fee") ,
    Model.measure(FraceFeeAdRoyalty).localIdentifier("france-fee-adroyalty")
  ] 

  attributes = [
      Model.attribute(LocationNameIdentifier).localIdentifier("name"),
      Model.attribute(MenuCategoryIdentifier).localIdentifier("menucategory")
  ]


  columns =[Model.attribute(LocationStateIdentifier).localIdentifier("state")]

  private rootDomID :string;
  
  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps() : PivotProps  {

    return {
      projectId : projectId,
      measures : this.measures,
      rows : this.attributes,
      columns : this.columns,
    }
  } 

  private isMounted(): boolean {
    return !!this.rootDomID;
  }
  
  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PivotTable, this.getProps()), this.getRootDomNode());
    }
  }
  
  ngOnInit() {
    // this.rootDomID = uuid.v1;
    this.rootDomID = 'rootDomId'; 
  }
  ngOnChanges() {
    this.render();
  }
  ngAfterViewInit() {
    this.render();
  }

}

