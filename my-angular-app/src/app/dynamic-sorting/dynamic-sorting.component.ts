import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ColumnChart, Model } from '@gooddata/react-components';
import {
  totalSalesIdentifier,
  locationStateDisplayFormIdentifier,
  locationStateAttributeCaliforniaUri,
  monthDateIdentifier,
  monthDateIdentifierJanuary,
  projectId,
} from "../../assets/fixture";

let self: any;

interface MeasureSortingBucketProps {
  projectId: any;
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  sortBy?: any[];
}
@Component({
  selector: 'app-dynamic-sorting',
  template: '<div class="s-dynamic-sorting-chart" style="height:500px" [id]="rootDomID"></div>',
})

export class DynamicSortingComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  
  state = {
      sortOption: undefined,
      direction: "asc",
  };
 
  onSortOptionChange = sortOption => () => {
      ({
          sortOption,
      });
  };

  onDirectionChange = direction => () => {
    ({
        direction,
    });
  };

  getOrderLabel = dir =>
    ({
      desc: "descending",
      asc: "ascending",
    }[dir]);
    
  xMeasures = [Model.measure(totalSalesIdentifier).format("#,##0").alias("$ Total Sales").localIdentifier(totalSalesIdentifier)]

  xViewBy = [Model.attribute(monthDateIdentifier).localIdentifier(monthDateIdentifier)]

  stackBy = Model.attribute(locationStateDisplayFormIdentifier).localIdentifier(locationStateDisplayFormIdentifier)

  
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(sortBy): MeasureSortingBucketProps {
    console.log(sortBy)
    // console.log(sortOption.sortBy(this.state.direction))
    return {
      projectId: projectId,
      measures: this.xMeasures,
      viewBy: this.xViewBy,
      stackBy: this.stackBy,
      sortBy
      // sortBy: sortOption.sortBy(direction)
    };
  }
  private isMounted(): boolean {
    return !!this.rootDomID;
  }
  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps(this.state.sortOption ? this.state.sortOption.sortBy(this.state.direction) : '')), this.getRootDomNode());
    }
    var direction = this.state.direction;
    var sortOptions = [
      {
        key: "default",
        label: "Default sorting",
        overrideDirection: "asc",
        description: function description() {
          return "By default, the chart is sorted by the date attribute dir ascending order";
        }.bind(this),
        sortBy: function sortBy() {
          return [];
        }.bind(this)
      },
      {
        key: "state",
        label: "State",
        description: function description(dir) {
          return (
            "The column stacks (states) are sorted alphabetically by the label of the state attribute in " +
            this.getOrderLabel(dir) +
            " order."
          );
        }.bind(this),
        sortBy: function sortBy(dir) {
          return [Model.attributeSortItem(locationStateDisplayFormIdentifier, dir)];
        }.bind(this)
      },
      {
        key: "date",
        label: "Date attribute",
        description: function description(dir) {
          return (
            "The columns (date) are sorted by the value of the date attribute in " +
            this.getOrderLabel(dir) +
            " order."
          );
        }.bind(this),
        sortBy: function sortBy(dir) {
          return [Model.attributeSortItem(monthDateIdentifier, dir)];
        }.bind(this)
      },
      {
        key: "sum-of-column",
        label: "Date attribute by sum of the column",
        description: function description(dir) {
          return (
            "The columns (date) are sorted by the sum of the Total Sales stacks in each column in " +
            this.getOrderLabel(dir) +
            " order."
          );
        }.bind(this),
        sortBy: function sortBy(dir) {
          return [
            Model.attributeSortItem(monthDateIdentifier, dir).aggregation("sum")
          ];
        }.bind(this)
      },
      {
        key: "sum-of-stacks",
        label: "State attribute by sum of individual stacks",
        description: function description(dir) {
          return (
            "The stacks (state) are sorted by the sum of the Total Sales stacks across all columns in " +
            this.getOrderLabel(dir) +
            " order."
          );
        }.bind(this),
        sortBy: function sortBy(dir) {
          return [
            Model.attributeSortItem(
              locationStateDisplayFormIdentifier,
              dir
            ).aggregation("sum")
          ];
        }.bind(this)
      },
      {
        key: "state-element",
        label: "Measure of California",
        description: function description(dir) {
          return (
            "The columns (date) are sorted by the value of the Total Sales of California stack in " +
            this.getOrderLabel(dir) +
            " order."
          );
        }.bind(this),
        sortBy: function sortBy(dir) {
          return [
            Model.measureSortItem(totalSalesIdentifier, dir).attributeLocators({
              attributeIdentifier: locationStateDisplayFormIdentifier,
              element: locationStateAttributeCaliforniaUri
            })
          ];
        }.bind(this)
      },
      {
        key: "date-element",
        label: "Measure of January",
        description: function description(dir) {
          return (
            "The column stacks (states) are sorted by the value of Total Sales in the January column in " +
            this.getOrderLabel(dir) +
            " order."
          );
        }.bind(this),
        sortBy: function sortBy(dir) {
          return [
            Model.measureSortItem(totalSalesIdentifier, dir).attributeLocators({
              attributeIdentifier: monthDateIdentifier,
              element: monthDateIdentifierJanuary
            })
          ];
        }.bind(this)
      },
      {
        key: "multi",
        label: "Multi-sort",
        overrideDirection: "niether",
        description: function description() {
    
          return "You can combine multiple sortItems together, even mix different directions.";
        }.bind(this),
        sortBy: function sortBy() {
          return [
            Model.measureSortItem(totalSalesIdentifier, "asc").attributeLocators({
              attributeIdentifier: locationStateDisplayFormIdentifier,
              element: locationStateAttributeCaliforniaUri
            }),
            Model.measureSortItem(totalSalesIdentifier, "desc").attributeLocators({
              attributeIdentifier: monthDateIdentifier,
              element: monthDateIdentifierJanuary
            })
          ];
        }.bind(this)
      }
    ];

    const { sortOption = sortOptions[0] } = this.state;
    console.log('sortOption state', sortOption)
    const isAsc = sortOption.overrideDirection
        ? sortOption.overrideDirection === "asc"
        : direction === "asc";
    const isDesc = sortOption.overrideDirection
        ? sortOption.overrideDirection === "desc"
        : direction === "desc";

        ReactDOM.render(React.createElement(
            "div",
            {
              className: "s-dynamic-sorting"
            },
            React.createElement(
              "style",
              {
                jsx: true
              },
              `.sorting-options {
                  margin: -10px -10px 10px -10px;
                  display: flex;
                  flex-wrap: wrap;
              }

              .sorting-option {
                  margin: 5px 10px;
              }

              .sorting-label {
                  margin: 5px 10px;
                  padding: 6px 0;
              }`,
            React.createElement(
              "div",
              {
                className: "sorting-options"
              },
              React.createElement(
                "span",
                {
                  className: "sorting-label"
                },
                "Sort by"
              ),
              sortOptions.map(sortOptionItem => {
                  return React.createElement(
                    "button",
                    {
                      key: sortOptionItem.key,
                      className:
                        "sorting-option gd-button gd-button-secondary s-" +
                        sortOptionItem.key +
                        " " +
                        (sortOption.key === sortOptionItem.key ? " is-active" : ""),
                        onClick: this.onSortOptionChange(sortOption)
                    },
                    sortOptionItem.label
                  );
                }
              )
            ),
            React.createElement(
              "div",
              {
                className: "sorting-options"
              },
              React.createElement(
                "span",
                {
                  className: "sorting-label"
                },
                "Direction"
              ),
              React.createElement(
                "button",
                {
                  className:
                    "sorting-option gd-button gd-button-secondary s-ascending" +
                    (isAsc ? " is-active" : ""),
                  onClick: this.onDirectionChange("asc")
                },
                "Ascending"
              ),
              React.createElement(
                "button",
                {
                  className:
                    "sorting-option gd-button gd-button-secondary s-descending",
                  onClick: this.onDirectionChange("desc")
                },
                "Descending"
              )
            ),
            React.createElement("p", null, sortOption.description(direction)),
            React.createElement("hr", {
              className: "separator"
            }),
            React.createElement(
              "div",
              {
                style: {
                  height: 600
                },
                className: "s-dynamic-sorting-chart"
              },
              React.createElement(ColumnChart, {
                projectId: projectId,
                measures: this.xMeasures,
                viewBy: this.xViewBy,
                stackBy: this.stackBy,
                sortBy: sortOption.sortBy(direction)
              }), this.getRootDomNode()
              )
            )
          ));
  }
  
  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
