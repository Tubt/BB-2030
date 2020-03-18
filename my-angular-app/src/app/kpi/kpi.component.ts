import { Component, OnInit, OnChanges ,AfterViewInit,OnDestroy} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import {Kpi, Model} from "@gooddata/react-components";

import {projectId, TotalCostIdentifier} from "../../assets/fixture"
interface KpiProps {
  projectId :any;
  measure: any;
}
@Component({
  selector: 'app-kpi',
  template: '<div style="height: 200px" [id]="rootDomID"></div>'
})
export class KPIComponent implements OnInit {
  
private rootDomID :string;

protected getRootDomNode() {
  const node = document.getElementById(this.rootDomID);
  invariant(node, `Node '${this.rootDomID} not found!`);
  return node;
}


protected getProps(): KpiProps {
  return {
    projectId : projectId,
    measure : TotalCostIdentifier
  }
}
private isMounted(): boolean {
  return !!this.rootDomID;
}

protected render() {
  if (this.isMounted()) {
    ReactDOM.render(React.createElement(Kpi, this.getProps()), this.getRootDomNode());
  }
}

  ngOnInit() {
    this.rootDomID = uuid.v1;
  }
  ngOnChanges() {
    this.render();
  }
  ngAfterViewInit() {
    this.render();
  }
} 
