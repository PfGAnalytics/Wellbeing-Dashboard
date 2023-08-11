function createLineChart (id, title, statistic, geography, matrix, y_label) {

    pxWidget.queue('chart', id, {
        "autoupdate": true,
        "matrix": null,
        "type": "line",
        "copyright": false,
        "link": "",
        "sort": false,
        "metadata": {
           "xAxis": {
              "TLIST(A1)": [],
              "role": "time"
           },
           "fluidTime": [],
           "api": {
              "query": {
                 "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
                 "data": {
                    "jsonrpc": "2.0",
                    "method": "PxStat.Data.Cube_API.ReadMetadata",
                    "params": {
                       "matrix": matrix,
                       "language": "en",
                       "format": {
                          "type": "JSON-stat",
                          "version": "2.0"
                       }
                    },
                    "version": "2.0"
                 }
              },
              "response": {}
           }
        },
        "data": {
           "labels": [],
           "datasets": [{
              "label": "Northern Ireland",
              "borderColor": "#000000",
              "pointBackgroundColor": "#000000",
              "pointBorderColor": "#000000",
              "pointRadius": 3,
              "pointHoverRadius": 4,
              "maxBarThickness": 90,
              "api": {
                 "query": {
                    "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
                    "data": {
                       "jsonrpc": "2.0",
                       "method": "PxStat.Data.Cube_API.ReadDataset",
                       "params": {
                          "class": "query",
                          "id": ["STATISTIC", geography],
                          "dimension": {
                             "STATISTIC": {
                                "category": {
                                   "index": [statistic]
                                }
                             },
                             [geography]: {
                                "category": {
                                   "index": ["N92000002"]
                                }
                             }
                          },
                          "extension": {
                             "language": {
                                "code": "en"
                             },
                             "format": {
                                "type": "JSON-stat",
                                "version": "2.0"
                             },
                             "matrix": matrix,
                             "m2m": false
                          },
                          "version": "2.0"
                       }
                    }
                 },
                 "response": {}
              },
              "data": [],
              "unit": [],
              "decimal": [],
              "fluidTime": [],
              "fill": false
           }],
           "null": ".."
        },
        "options": {
           "responsive": true,
           "maintainAspectRatio": false,
           "title": {
              "display": true,
              "text": [title]
           },
           "tooltips": {
              "mode": "index",
              "callbacks": {}
           },
           "hover": {
              "mode": "nearest",
              "intersect": true
           },
           "scales": {
              "xAxes": [{
                 "ticks": {
                    "beginAtZero": false,
                    "maxTicksLimit": null,
                    "reverse": false
                 },
                 "gridLines": {
                    "display": false
                 },
                 "scaleLabel": {
                    "display": false,
                    "labelString": null
                 },
                 "stacked": false
              }],
              "yAxes": [{
                 "display": true,
                 "position": "left",
                 "id": "y-axis-1",
                 "ticks": {
                    "beginAtZero": false
                 },
                 "callback": null,
                 "scaleLabel": {
                    "display": true,
                    "labelString": y_label
                 },
                 "stacked": false
              }]
           },
           "plugins": {
              "stacked100": {
                 "enable": false
              },
              "colorschemes": {
                 "scheme": "tableau.Tableau10"
              }
           },
           "legend": {
              "display": false,
              "position": "bottom"
           },
           "elements": {
              "line": {
                 "tension": 0.4
              }
           },
           "updated": "",
           "layout": {
              "padding": {
                 "left": 22,
                 "right": 22,
                 "top": 0,
                 "bottom": 22
              }
           }
        },
        "datasetLabels": ["Northern Ireland"],
        "plugins": [{}]
     });
    
};

async function getBaseValue(matrix, base) {
   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + NI_matrix + "/JSON-stat/2.0/en";

   const response = await fetch(api_url);
   const data = await response.json();
   const {value, dimension} = data;

   const years = Object.values(dimension)[1].category.index;

   const baseline_index = years.indexOf(base) - 1;

   const labels = years.slice(baseline_index, years.length);

   const change_from_baseline = value[value.length - 1] - value[baseline_index];              


   if (change_from_baseline > 0) {
      base_statement = "Things have improved since the baseline in " + base + ".";
   } else {
      base_statement = "Things have worsened since the baseline in " + base + ".";
   };
   
   base_statement_div = document.createElement("div");
   base_statement_div.id = matrix + "-base-statement";
   base_statement_div.classList.add("white-box");
   base_statement_div.classList.add("base-statement");
   base_statement_div.style.display = "none";
   base_statement_div.innerHTML = base_statement;

   document.getElementById("change-info").appendChild(base_statement_div);

};

// Loop through domains_data to generate line charts for each indicator (see domains_data.js)
// Assign list of domains to variable "domains"
var domains = Object.keys(domains_data);

for (let i = 0; i < domains.length; i++) {
    // Inside each domain we will return a list of "indicators"
    var indicators = domains_data[domains[i]].indicators;

    for (let j = 0; j < Object.keys(indicators).length; j++) {

        var chart_title = Object.values(indicators)[j].chart_title;
        var y_axis_label = Object.values(indicators)[j].y_axis_label;

        var NI_matrix = Object.values(indicators)[j].data.NI;
        var LGD_matrix = Object.values(indicators)[j].data.LGD;
        var EQ_matrix = Object.values(indicators)[j].data.EQ;

        if (NI_matrix != "") {

            this_matrix = NI_matrix;
            this_geography = "NI";

            if (["INDGREENHGNI", "INDNICEINI", "INDRIVERQNI"].includes(this_matrix)) {
               this_statistic = this_matrix;
            } else {
               this_statistic = this_matrix.substring(0, this_matrix.length - 2);
            }

            var baseline = Object.values(indicators)[j].base_year;
            
            if (baseline != "TBD") {

               getBaseValue(NI_matrix, baseline);

            };

        } else if (LGD_matrix != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD"].includes(LGD_matrix)) {

            this_matrix = LGD_matrix;
            this_geography = "LGD2014";
            this_statistic = this_matrix.substring(0, this_matrix.length - 3);

        } else if (EQ_matrix != "") {

            this_matrix = EQ_matrix;
            this_geography = "EQUALGROUPS";
            this_statistic = this_matrix.substring(0, this_matrix.length - 2);  

        } else {
         this_matrix = ""
        }

        if (this_matrix != "") {

         var this_id = this_statistic + "-line";

         chart_container = document.createElement("div");
         chart_container.id = this_id;
         chart_container.classList.add("pxwidget");
         chart_container.classList.add("line-chart");
         chart_container.style.display = "none";
         chart_container.style.height = "500px";

         document.getElementById("line-chart-container").appendChild(chart_container);

         createLineChart(id = this_id,
            title = chart_title,
            statistic = this_statistic,
            geography = this_geography,
            matrix = this_matrix,
            y_label = y_axis_label)

        }          

    }

}

// function createMap(id, title, matrix, indicator) {

//     pxWidget.queue('map', id, {
//         "autoupdate": true,
//         "matrix": null,
//         "mapDimension": "LGD2014",
//         "copyright": true,
//         "link": `<a href="https://ppdata.nisra.gov.uk/table/${matrix}" target="_blank">See data here</a>`,
//         "title": title,
//         "borders": true,
//         "colorScale": "red",
//         "tooltipTitle": null,
//         "fullScreen": {
//         "title": "View Fullscreen",
//         "titleCancel": "Exit Fullscreen",
//         "center": [54.65, -6.8]
//         },
//         "data": {
//         "datasets": [{
//             "api": {
//                 "query": {
//                     "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
//                     "data": {
//                     "jsonrpc": "2.0",
//                     "method": "PxStat.Data.Cube_API.ReadDataset",
//                     "params": {
//                         "class": "query",
//                         "id": ["STATISTIC", "TLIST(A1)"],
//                         "dimension": {
//                             "STATISTIC": {
//                                 "category": {
//                                 "index": [indicator]
//                                 }
//                             },
//                             "TLIST(A1)": {
//                                 "category": {
//                                 "index": ["2020/21"]
//                                 }
//                             }
//                         },
//                         "extension": {
//                             "language": {
//                                 "code": "en"
//                             },
//                             "format": {
//                                 "type": "JSON-stat",
//                                 "version": "2.0"
//                             },
//                             "matrix": matrix
//                         },
//                         "version": "2.0",
//                         "m2m": false
//                     }
//                     }
//                 },
//                 "response": {}
//             },
//             "fluidTime": [0]
//         }]
//         },
//         "metadata": {
//         "api": {
//             "query": {
//                 "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
//                 "data": {
//                     "jsonrpc": "2.0",
//                     "method": "PxStat.Data.Cube_API.ReadMetadata",
//                     "params": {
//                     "matrix": matrix,
//                     "language": "en",
//                     "format": {
//                         "type": "JSON-stat",
//                         "version": "2.0"
//                     }
//                     },
//                     "version": "2.0"
//                 }
//             },
//             "response": {}
//         }
//         },
//         "options": {
//         "mode": "e",
//         },
//         "baseMap": {
//         "leaflet": [],
//         "esri": []
//         }
//     });

// }



