function createLineChart (id, title, statistic, geography, matrix) {    

    pxWidget.queue('chart', id, {
        "autoupdate": true,
        "matrix": null,
        "type": "line",
        "copyright": false,
        "link": `https://ppdata.nisra.gov.uk/table/${matrix}`,
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
              "pointRadius": 2,
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
                    "display": false,
                    "labelString": null
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
              "display": true,
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
    
}

var domains = Object.keys(domains_data);

for (let i = 0; i < domains.length; i++) {
    
    indicators = domains_data[domains[i]].indicators;

    for (let j = 0; j < Object.keys(indicators).length; j++) {

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

            

        } else if (LGD_matrix != "") {

            this_matrix = LGD_matrix;
            this_geography = "LGD2014";
            this_statistic = this_matrix.substring(0, this_matrix.length - 3);

        } else if (EQ_matrix != "") {

            this_matrix = LGD_matrix;
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

         document.getElementById("line-chart").appendChild(chart_container);

         createLineChart(id = this_id,
            title = Object.keys(indicators)[j],
            statistic = this_statistic,
            geography = this_geography,
            matrix = this_matrix)

        }          

    }

}

function rewriteLinks() {

   var links = document.getElementsByTagName("a");

   for (let i = 0; i < links.length; i++) {

       if (links[i].innerHTML.includes("ppdata")) {
         links[i].innerHTML = "See data on NISRA Data Portal";
       }

   }

}

document.onclick = rewriteLinks;

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



