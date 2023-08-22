// Function below uses the api to fetch the data and plots it in a line chart
async function createLineChart (id, title, statistic, breakdown, matrix, y_label) {   

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
              "api": {
                 "query": {
                    "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
                    "data": {
                       "jsonrpc": "2.0",
                       "method": "PxStat.Data.Cube_API.ReadDataset",
                       "params": {
                          "class": "query",
                          "id": ["STATISTIC", breakdown],
                          "dimension": {
                             "STATISTIC": {
                                "category": {
                                   "index": [statistic]
                                }
                             },
                             [breakdown]: {
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
                    "reverse": false,
                    "minRotation": 0,
                    "maxRotation": 0
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

// Function below determines the type of change between the current year and the base year
async function determineChange(matrix, base, ci, improvement, telling) {

   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";

   const response = await fetch(api_url);
   const data = await response.json();
   const {value, dimension} = data;

   const years = Object.values(dimension)[1].category.index;

   var base_position = years.indexOf(base);

   if (matrix.slice(-2) == "NI") {

      // var labels = years.slice(baseline_index, years.length);
      var change_from_baseline = value[value.length - 1] - value[base_position];

   } else {

      var groups = Object.values(dimension)[2].category.index;

      var num_years = years.length;

      var num_groups = groups.length;
      var NI_position = groups.indexOf("N92000002");

      var base_value = value[num_groups * base_position + NI_position];
      var current_value = value[num_groups * (num_years - 1) + NI_position];

      var change_from_baseline = current_value - base_value;

   }   

   if ((change_from_baseline > ci & improvement == "increase") || (change_from_baseline < (ci * -1) & improvement == "decrease")) {
      base_statement = "Things have improved since the baseline in " + base + ". " + telling.improved;
   } else if ((change_from_baseline < (ci * -1) & improvement == "increase") || (change_from_baseline > ci & improvement == "decrease")) {
      base_statement = "Things have worsened since the baseline in " + base + ". " + telling.worsened;
   } else {
      base_statement = "There has been no significant change since the baseline in " + base + ". " + telling.no_change;
   };
   
   base_statement_div = document.createElement("div");
   base_statement_div.id = matrix + "-base-statement";
   base_statement_div.classList.add("white-box");
   base_statement_div.classList.add("base-statement");
   base_statement_div.style.display = "none";
   base_statement_div.innerHTML = base_statement;

   document.getElementById("change-info").appendChild(base_statement_div);

};

async function getData(matrix, id) {

   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";

   const response = await fetch(api_url);
   const fetched_data = await response.json();
   const {value, dimension} = fetched_data;

   var years = Object.values(dimension)[1].category.index;

   // setup 
 const data = {
   labels: years,
   datasets: [{
     label: 'Northern Ireland',
     data: value,
     borderColor: "#000000",
     fill: false,
     tension: 0.4

   }]
 };

 // config 
 const config = {
   type: 'line',
   data,
   options: {
    responsive: true,
    maintainAspectRatio: false,
     plugins: {
         autocolors: false,
         annotation: {
             annotations: {
                 box1: {
                     type: "box",
                     xMin: 0.5,
                     xMax: 3.5,
                     yMin: 5.9,
                     yMax: value.max,
                     backgroundColor: "#aa000077"
                 }
             }
         },
         legend: {
            display: false
         }
     },
     scales: {
       y: {
         beginAtZero: false
       }
     }
   }
 };

 // render init block
 const myChart = new Chart(
   document.getElementById(id),
   config
 );

   

 }



// Loop through domains_data to generate line charts for each indicator (see domains_data.js)
// Assign list of domains to variable "domains"
var domains = Object.keys(domains_data);

for (let i = 0; i < domains.length; i++) {
    // Inside each domain we will return a list of "indicators"
    var indicators = domains_data[domains[i]].indicators;

    // Loop through each indicator
    for (let j = 0; j < Object.keys(indicators).length; j++) {

        var indicator = Object.values(indicators)[j];
        var data = indicator.data;

        // Use NI data if available
        if (data.NI != "") {

            this_matrix = data.NI;
            this_breakdown = "NI";
            this_statistic = this_matrix.slice(0, -2);                       

        // Use LGD data if available
        } else if (data.LGD != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD"].includes(data.LGD)) { // first 3 exclusions have no NI in LGD dataset, other 3 not on data portal yet

            this_matrix = data.LGD;
            this_breakdown = "LGD2014";
            this_statistic = this_matrix.slice(0, -3);

        // Use EQ data if available
        } else if (data.EQ != "" & !["INDGRADSEQ", "INDHOMELNEQ"].includes(data.EQ)) { // not on data portal yet

            this_matrix = data.EQ;
            this_breakdown = "EQUALGROUPS";
            this_statistic = this_matrix.slice(0, -2);
         // Do nothing if no data available
        } else {
            this_matrix = "";
        }

        if (this_matrix != "") {

         // Run the above function determineChange() for this indicator
         determineChange(this_matrix, indicator.base_year, indicator.ci, indicator.improvement, indicator.telling);

         // Create the "What is this indicator telling us" box and append to HTML
         var this_id = this_statistic + "-line";         

         // Plot line chart using createLineChart() function

         if (this_matrix != "INDSFGANI") {

            chart_container = document.createElement("div");
            chart_container.id = this_id;
            chart_container.classList.add("pxwidget");
            chart_container.classList.add("line-chart");
            chart_container.style.display = "none";
            chart_container.style.height = "500px";

         document.getElementById("line-chart-container").appendChild(chart_container);

            createLineChart(id = this_id,
               title = indicator.chart_title,
               statistic = this_statistic,
               breakdown = this_breakdown,
               matrix = this_matrix,
               y_label = indicator.y_axis_label)

         } else {

            chart_canvas = document.createElement("canvas");
            chart_canvas.id = this_id;
            chart_canvas.style.display = "none";
            chart_canvas.classList.add("line-chart");
            document.getElementById("line-chart-container").appendChild(chart_canvas);
            
            getData(this_matrix, this_id);
         }

        }          

    }

}

