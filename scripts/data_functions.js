// Function below determines the type of change between the current year and the base year
async function determineChange(matrix, base, ci, improvement, telling) {

   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";

   const response = await fetch(api_url);
   const data = await response.json();
   const {value, dimension} = data;

   const years = Object.values(dimension)[1].category.index;

   var base_position = years.indexOf(base);

   if (matrix.slice(-2) == "NI") {

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

// Function below uses the api to fetch the data and plots it in a line chart
async function createLineChart(matrix, id, title, base, ci, improvement, y_label) {

   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";

   const response = await fetch(api_url);
   const fetched_data = await response.json();
   const {value, dimension} = fetched_data;

   var years = Object.values(dimension)[1].category.index;

   var base_position = years.indexOf(base);

   if (matrix.slice(-2) == "NI") {
      var base_value = value[base_position];
      var data_series = value;
   } else {
      var groups = Object.values(dimension)[2].category.index;

      var num_groups = groups.length;
      var NI_position = groups.indexOf("N92000002");

      var base_value = value[num_groups * base_position + NI_position];

      var data_series = [];

      for (let i = 0; i < value.length; i ++) {
         if (i % num_groups == NI_position) {
            data_series.push(value[i]);
         }
      }
   }

   var value_range = Math.max.apply(Math, data_series) - Math.min.apply(Math, data_series);

   var min_value = Math.min.apply(Math, data_series) - ci - value_range;

   if (min_value < 0) {
      min_value = 0;
   } else if (min_value > 1) {
      var min_value = Math.floor(Math.min.apply(Math, data_series) - ci - value_range);
   }

   var max_value = Math.max.apply(Math, data_series) + ci + value_range;

   if (max_value > 1) {
      max_value = Math.ceil(max_value);
   }

   if (improvement == "increase") {
      red_box_yMin = min_value;
      red_box_yMax = base_value - ci;
      green_box_yMin = base_value + ci;
      green_box_yMax = max_value;
   } else {
      red_box_yMin = base_value + ci;
      red_box_yMax = max_value;
      green_box_yMin = min_value;
      green_box_yMax = base_value - ci;
   }

   if (title.length < 100) {
      title_array = [title]
   } else {
      split = title.indexOf(" ", 100);
      title_array = [title.slice(0, split), title.slice(split + 1)]
   }

   console.log(title.length, title_array)

   const data = {
      labels: years,
      datasets: [{
         label: 'Northern Ireland',
         data: data_series,
         borderColor: "#000000",
         fill: false,
         tension: 0.4
      }]
   };


   const config = {
      type: 'line',
      data,
      options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
            autocolors: false,
            title: {
               display: true,
               text: title_array,
            },
            annotation: {
               annotations: {
                  red_box: {
                        type: "box",
                        xMin: base_position,
                        xMax: years.length - 1,
                        yMin: red_box_yMin,
                        yMax: red_box_yMax,
                        backgroundColor: "#aa000055",
                        borderColor: "#aa0000"
                  },
                  red_text: {
                     type: "label",
                     xValue: years.length - 1,
                     yValue: (red_box_yMin + red_box_yMax) / 2,
                     content: "Worsening",
                     font: {
                        size: 16,
                        weight: "bold",
                        style: "italic"
                     },
                     position: "end"
                  },
                  green_box: {
                     type: "box",
                     xMin: base_position,
                     xMax: years.length - 1,
                     yMin: green_box_yMin,
                     yMax: green_box_yMax,
                     backgroundColor: "#00aa0055",
                     borderColor: "#00aa00"
                  },
                  green_text: {
                     type: "label",
                     xValue: years.length - 1,
                     yValue: (green_box_yMin + green_box_yMax) / 2,
                     content: "Improving",
                     font: {
                        size: 16,
                        weight: "bold",
                        style: "italic"
                     },
                     position: "end"
                  }
               }
            },
            legend: {
               display: false
            }
      },
      scales: {
         x: {
            grid: {
               display: false
            },
            ticks: {
               minRotation: 0,
               maxRotation: 0
            }
         },
         y: {
            beginAtZero: false,
            min: min_value,
            max: max_value,
            title: {
               display: true,
               text: y_label
            },
            ticks: {
               minRotation: 0,
               maxRotation: 0
            }
         }
      }
      }
   };


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
            chart_canvas = document.createElement("canvas");
            chart_canvas.id = this_id;
            chart_canvas.style.display = "none";
            chart_canvas.classList.add("line-chart");
            document.getElementById("line-chart-container").appendChild(chart_canvas);
            
            createLineChart(matrix = this_matrix,
                    id = this_id,
                    title = indicator.chart_title,
                    base = indicator.base_year,
                    ci = indicator.ci,
                    improvement = indicator.improvement,
                    y_label = indicator.y_axis_label);
         


        }          

    }

}

