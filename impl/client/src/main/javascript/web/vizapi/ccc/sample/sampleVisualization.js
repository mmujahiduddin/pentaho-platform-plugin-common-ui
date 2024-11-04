/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2028-08-13
 ******************************************************************************/


require([
  "common-ui/vizapi/VizController"
], function(_VizController) {

  pentaho.visualizations.push({
    id: 'sample_calc',                          // unique identifier
    type: 'calc',                       // generic type id
    source: 'Sample',                          // id of the source library
    name: 'Sample Calculation',                     // visible name, this will come from a properties file eventually
    'class': 'pentaho.sample.Calc',          // type of the Javascript object to instantiate
    args: {                                 // arguments to provide to the Javascript object

    },
    propMap: [],
    dataReqs: [                             // dataReqs describes the data requirements of this visualization
      {
        name: 'Default',
        reqs :
            [
              {
                id: 'rows',             // id of the data element
                dataType: 'string',         // data type - 'string', 'number', 'date', 'boolean', 'any' or a comma separated list
                dataStructure: 'column',    // 'column' or 'row' - only 'column' supported so far
                caption: 'Level',        // visible name
                required: true,              // true or false
                allowMultiple: false,
                ui: {
                  group: "data"
                }
              },
              {   id: 'measures',
                dataType: 'number',
                dataStructure: 'column',
                caption: 'Measure',
                required: true,
                allowMultiple: false,
                ui: {
                  group: "data"
                }
              },
              {
                id: 'calc',
                dataType: 'string',
                values: ["MIN", "MAX", "AVG"],
                ui: {
                  labels: ["Minimum", "Maximum", "Average"],
                  group: "options",
                  type: 'combo',
                  caption: "Calculation"
                }
              }
            ]
      }
    ]
  });

  pentaho.sample = {}

  pentaho.sample.Calc = function(canvasElement){
    this.canvasElement = canvasElement;
    this.numSpan = document.createElement("span");
    this.numSpan.style.fontSize = "42px";
    this.numSpan.style.position = "relative";
    this.canvasElement.appendChild(this.numSpan);

  }
  pentaho.sample.Calc.prototype.resize = function(width, height){
    this.numSpan.style.left = ((this.canvasElement.offsetWidth - this.numSpan.offsetWidth) / 2) + "px"
    this.numSpan.style.top = ((this.canvasElement.offsetHeight - this.numSpan.offsetHeight) / 2) + "px"
  };

  pentaho.sample.Calc.prototype.draw = function(datView, vizOptions) {
    var rows = datView.dataTable.jsonTable.rows;
    var dataArray = [];
    for(var i=0; i<rows.length; i++){
      dataArray.push(rows[i].c[1].v);
    }
    var value = null;
    switch(vizOptions.calc || "MIN") {
      case "MAX":
        for(var i=0; i< dataArray.length; i++){
          if(value == null) {
            value = dataArray[i];
          } else {
            value = Math.max(value, dataArray[i]);
          }
        }
        break;
      case "MIN":
        for(var i=0; i< dataArray.length; i++){
          if(value == null) {
            value = dataArray[i];
          } else {
            value = Math.min(value, dataArray[i]);
          }
        }
        break;
      case "AVG":
        var total = 0;
        for(var i=0; i< dataArray.length; i++){
          total += dataArray[i];
        }
        value = total / dataArray.length;
        break;
      default:

    }

    this.numSpan.innerText = value == null ? "" : value;
    this.resize();
  }
});
