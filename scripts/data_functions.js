 // Function to return Short month name from number 1-12
 function getMonthName(monthNumber) {
   const date = new Date();
   date.setMonth(monthNumber - 1);
 
   return date.toLocaleString('en-GB', {
     month: 'short',
   });
 }

// Function below uses the api to fetch the data and plots it in a line chart
async function createLineChart(matrix, id, title, base, ci, improvement, y_label, telling) {

   // URL to fetch data from Pre-production data portal
   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";
   // URL when data is on data.nisra.gov.uk
   // api_url = "https://ws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";

   // Fetch data and store in object fetched_data
   const response = await fetch(api_url);
   const fetched_data = await response.json();
   const {value, dimension, updated, note} = fetched_data;
   
   var years = Object.values(dimension)[1].category.index; // Array of years in data
   var num_years = years.length;  // Number of years in data
   
   var base_position = years.indexOf(base); // Which position in the years array is base year
   var current_year = years[years.length-1]; // The current year

   var years_to_add = 2; // Number of blank data points after current year

   if (!isNaN(Number(current_year))) { // For years in YYYY format
      for (let i = 1; i <= years_to_add; i++) {
         years.push(Number(current_year) + i);
      }
   } else if (current_year.indexOf("/") != -1) { // For years in YYYY/YY format
      for (let i = 1; i <= years_to_add; i++) {
         years.push((Number(current_year.slice(0, 4)) + i) + "/" + (Number(current_year.slice(-2)) + i));
      }
   } else if (current_year.indexOf("-") != -1) { // For years in YYYY-YY format
      for (let i = 1; i <= years_to_add; i++) {
         years.push((Number(current_year.slice(0, 4)) + i) + "-" + (Number(current_year.slice(-2)) + i));
      }
   }

   // For NI datasets do the following:
   if (matrix.slice(-2) == "NI") {

      var base_value = value[base_position]; // The value at the base year
      var data_series = value; // The y axis values to plot
      var change_from_baseline = value[value.length - 1] - base_value; // The difference between base year value and last value

   } else {

      var groups = Object.values(dimension)[2].category.index; // All the groupings present in the data (eg, LGD, AA, EQ groups)

      var num_groups = groups.length;     // The number of groups
      var NI_position = groups.indexOf("N92000002");  // The position of Northern Ireland in the list of groups

      var base_value = value[num_groups * base_position + NI_position];  // The value at the base year

      var data_series = []; // Loop below will generate array of y-axis values

      for (let i = 0; i < value.length; i ++) {
         if (i % num_groups == NI_position) {
            data_series.push(value[i]);
         }
      }

      var current_value = data_series[num_years - 1]; // Current value
      var change_from_baseline = current_value - base_value; // The difference between base yaer value and last value

   }

   // The following calculations set the ideal heights for the y axis as well as the green and red boxes
   var max_data = Math.max(...data_series);
   var max_value = Math.max(base_value * 2, max_data);

   if (max_value < 0.2) {
      max_value = Math.ceil(max_value / 0.02) * 0.02;
   } else if (max_value < 20) {
      max_value = Math.ceil(max_value / 2) * 2;
   } else if (max_value < 40) {
      max_value = Math.ceil(max_value / 5) * 5;
   } else if (max_value < 70) {
      max_value = Math.ceil(max_value / 10) * 10;
   } else if (max_value < 200) {
      max_value = Math.ceil(max_value / 20) * 20;
   } else if (max_value < 500) {
      max_value = Math.ceil(max_value / 50) * 50;
   } else if (max_value < 20000) {
      max_value = Math.ceil(max_value / 2000) * 2000;
   } else {
      max_value = Math.round(max_value / 10000) * 10000;
   }

   if ((y_label.includes("%") || y_label.includes("out of 100")) & max_value > 100 || title.includes("respected")) {
      max_value = 100;
   }

   if (title.includes("life expectancy")) {
      max_value = 80;
   }

   if (title.includes("from 0 to 10")) {
      max_value = 10;
   }

   if (title.includes("Housing Stress")) {
      max_value = 40000;
   }

   if (matrix == "INDNICEINI") {
      min_value = 85;
      max_value = 115;
   } else {
      min_value = 0
   }

   // When confidence interval is constant
   if (!isNaN(ci)) {
      var ci_value = ci;
      var years_cumulated = 1;
   } else { // When confidence interval changes year on year
      var ci_value = Number(ci.slice(0, -1));
      var years_cumulated = num_years - base_position - 1;
   }

   if (improvement == "increase") {
      red_box_yMin = min_value;
      red_box_yMax = base_value - ci_value;
      green_box_yMin = base_value + ci_value;
      green_box_yMax = max_value;
      green_box_yHeight = ((max_value - base_value) / 2) + base_value;
      red_box_yHeight = base_value / 2;
   } else {
      red_box_yMin = base_value + ci_value;
      red_box_yMax = max_value;
      green_box_yMin = min_value;
      green_box_yMax = base_value - ci_value;
      green_box_yHeight = base_value / 2;
      red_box_yHeight = ((max_value - base_value) / 2) + base_value;
   }

   // Footnote on when data was last updated
   var updated_note = "Updated on " + Number(updated.slice(8, 10)) + " " + getMonthName(updated.slice(5, 7)) + " " + updated.slice(0, 4);

   // To plot points in School leavers attainment gap as individual points after 2018/19
   if (matrix == "INDSLATTGAPEQ") {

      // First plot the line as far as 2018/19
      var data = {
         labels: years,
         datasets: [{
            label: 'Northern Ireland',
            data: data_series.slice(0, years.indexOf("2019/20")),
            borderColor: "#000000",
            fill: false,
            pointBackgroundColor: "#000000"
         }]
      }

      // An array of all remaining points after 2018/19 to be plotted individually
      var remaining_points = data_series.slice(years.indexOf("2019/20"));

      // Loop through remaining_points
      for (let i = 0; i < remaining_points.length; i++) {

         // Need to create individual data series for each of the remaining points
         var remaining_data = [];
         
         // Create a line that has a null value for every point except the remaining point
         for (j = 0; j < years.length; j ++) {
            if(j != years.indexOf("2019/20") + i) {
               remaining_data.push(null)
            } else {
               remaining_data.push(remaining_points[i])
            }
         }

         // Add those new datasets to the data object above
         data.datasets.push({
            label: "Northern Ireland",
            data: remaining_data,
            borderColor: "#000000",
            fill: false,
            pointBackgroundColor: "#000000"
         })
      }

   } else {
      // Properties of the data series to be plotted for all other indicators
      var data = {
         labels: years,
         datasets: [{
            label: 'Northern Ireland',
            data: data_series,
            borderColor: "#000000",
            fill: false,
            pointBackgroundColor: "#000000"
         }]
      };
   }

   // Custom plugin for drawing top polygon
   const cumulative_top = {
      id: "drawing_top",
      beforeDraw(chart, args, options) {
         const { ctx } = chart;
         ctx.save();

         canvas_width = chart.canvas.clientWidth;
         canvas_height = chart.canvas.clientHeight;

         chart_width = chart.chartArea.width;
         chart_height = chart.chartArea.height;

         space_at_top = chart.chartArea.top;

         startWidth = (base_position / (years.length - 1)) * chart_width + chart.chartArea.left;
         startHeight = (1 - (base_value / max_value)) * chart_height + space_at_top;

         endHeight = (1 - ((base_value + (ci_value * (years.length - base_position - 1))) / max_value)) * chart_height + space_at_top;

         ctx.beginPath();
         ctx.moveTo(startWidth, startHeight);
         ctx.lineTo(startWidth, space_at_top);
         ctx.lineTo(chart.chartArea.right, space_at_top);
         ctx.lineTo(chart.chartArea.right, endHeight);
         ctx.lineTo(startWidth, startHeight);

         if (improvement == "increase") {
            ctx.fillStyle = "#00aa0055";
            ctx.strokeStyle = "#00aa00";
         } else {
            ctx.fillStyle = "#aa000055";
            ctx.strokeStyle = "#aa0000";
         }

         ctx.fill();
         ctx.stroke();
         
      }
   };

   // Custom plugin for drawing bottom polygon
   const cumulative_bottom = {
      id: "drawing_bottom",
      beforeDraw(chart, args, options) {
         const { ctx } = chart;
         ctx.save();

         canvas_width = chart.canvas.clientWidth;
         canvas_height = chart.canvas.clientHeight;

         chart_width = chart.chartArea.width;
         chart_height = chart.chartArea.height;

         space_at_bottom = chart.chartArea.bottom;
         space_at_top = chart.chartArea.top;

         startWidth = (base_position / (years.length - 1)) * chart_width + chart.chartArea.left;
         startHeight = (1 - (base_value / max_value)) * chart_height + space_at_top;

         endHeight = (1 - ((base_value - (ci_value * (years.length - base_position - 1))) / max_value)) * chart_height + space_at_top;

         ctx.beginPath();
         ctx.moveTo(startWidth, startHeight);
         ctx.lineTo(startWidth, space_at_bottom);
         ctx.lineTo(chart.chartArea.right, space_at_bottom);
         ctx.lineTo(chart.chartArea.right, endHeight);
         ctx.lineTo(startWidth, startHeight);

         if (improvement == "decrease") {
            ctx.fillStyle = "#00aa0055";
            ctx.strokeStyle = "#00aa00";
         } else {
            ctx.fillStyle = "#aa000055";
            ctx.strokeStyle = "#aa0000";
         }

         ctx.lineWidth = 2;

         ctx.fill();
         ctx.stroke();

      }
   };

   Number.prototype.countDecimals = function () {
      if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
      return this.toString().split(".")[1].length || 0; 
   }

   var decimal_places = base_value.countDecimals();

   const footer = (tooltipItems) => {

      tooltipItems.forEach(function(tooltipItem) {
         if (tooltipItem.parsed.x >= base_position) {
            if (!isNaN(ci)) {
               if (improvement == "increase") {
                  text = ["Improving value: > " + (Math.round((base_value + ci) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB"),
                          "Worsening value: < " + (Math.round((base_value - ci) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB")];
               } else {
                  text = ["Worsening value: > " + (Math.round((base_value + ci) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB"),
                          "Improving value: < " + (Math.round((base_value - ci) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB")];
               }
            } else {
               if (tooltipItem.parsed.x == base_position) {
                  text = ""
               } else if (improvement == "increase") {
                  text = ["Improving value: > " + (Math.round((base_value + ci.slice(0, -1) * (tooltipItem.parsed.x - base_position)) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB"),
                        "Worsening value: < " + (Math.round((base_value - ci.slice(0, -1) * (tooltipItem.parsed.x - base_position)) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB")]
               } else {
                  text = ["Worsening value: > " + (Math.round((base_value + ci.slice(0, -1) * (tooltipItem.parsed.x - base_position)) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB"),
                          "Improving value: < " + (Math.round((base_value - ci.slice(0, -1) * (tooltipItem.parsed.x - base_position)) * 10 ** decimal_places) / 10 ** decimal_places).toLocaleString("en-GB")]
               }
            }
         } else {
            text = ""
         }
      });

      return text
    };

   // Chart configuration for most charts
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
                     red_box: {
                           type: "box",
                           xMin: base_position,
                           xMax: years.length - 1,
                           yMin: red_box_yMin,
                           yMax: red_box_yMax,
                           backgroundColor: "#aa000055",
                           borderColor: "#aa0000",
                           borderWidth: 2,
                           z: -1
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
                        borderColor: "#00aa00",
                        borderWidth: 2,
                        z: -1
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
               },
               tooltip: {
                  callbacks: {
                     footer: footer
                  }
               }

         },
         scales: {
            x: {
               grid: {
                  display: true,
                  lineWidth: 0,
                  drawTicks: true,
                  tickWidth: 1
               },
               ticks: {
                  minRotation: 0,
                  maxRotation: 0
               }
            },
            y: {
               beginAtZero: true,
               min: min_value,
               max: max_value,
               ticks: {
                  minRotation: 0,
                  maxRotation: 0
               }
            }
         },
         interaction: {
            intersect: false,
            mode: "index"
         }
      },
      plugins: []
   };

   // Chart configuration for charts where improvement is year on year
   const config_c = {
      type: 'line',
      data,
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
               autocolors: false,
               annotation: {
                  annotations: {
                     red_text: {
                        type: "label",
                        xValue: years.length - 1,
                        yValue: red_box_yHeight,
                        content: "Worsening",
                        font: {
                           size: 16,
                           weight: "bold",
                           style: "italic"
                        },
                        position: "end"
                     },
                     green_text: {
                        type: "label",
                        xValue: years.length - 1,
                        yValue: green_box_yHeight,
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
               },
               tooltip: {
                  callbacks: {
                     footer: footer,
                  },
               }
         },
         scales: {
            x: {
               grid: {
                  display: true,
                  lineWidth: 0,
                  tickWidth: 1
               },
               ticks: {
                  minRotation: 0,
                  maxRotation: 0
               }
            },
            y: {
               beginAtZero: true,
               min: min_value,
               max: max_value,
               ticks: {
                  minRotation: 0,
                  maxRotation: 0
               }
            },
         },
         interaction: {
            intersect: false,
            mode: "index"
         }
         },
         plugins: [cumulative_top,
                  cumulative_bottom]
   };

   // Create a div to place all chart content in
   chart_div = document.createElement("div");
   chart_div.id = id;
   chart_div.style.display = "none";
   chart_div.classList.add("line-chart");

   // Create a div to place chart title in
   chart_title = document.createElement("div");
   chart_title.classList.add("chart-title");
   chart_title.innerHTML = title;

   // Create a div row so y axis label and chart sit side by side
   canvas_row = document.createElement("div");
   canvas_row.classList.add("row");

   // Create a div for the y axis label
   y_label_div = document.createElement("div");
   y_label_div.classList.add("y-label");
   y_label_div.innerHTML = y_label;
   canvas_row.appendChild(y_label_div);

   // Create a div for chart canvas to sit in
   canvas_div = document.createElement("div");
   canvas_div.classList.add("canvas-container");
   canvas_row.appendChild(canvas_div);

   // Create a new canvas object to place chart in
   chart_canvas = document.createElement("canvas");
   chart_canvas.id = id + "-canvas";
   canvas_div.appendChild(chart_canvas);

   // Create a div for updated on date div
   date_div = document.createElement("div");
   date_div.classList.add("chart-date");
   date_div.innerHTML = updated_note;

   // Place all divs in chart_div and place chart_div in document
   chart_div.appendChild(chart_title);
   chart_div.appendChild(canvas_row);
   chart_div.appendChild(date_div);
   document.getElementById("line-chart-container").appendChild(chart_div);

   // Place chart in canvas
   if (!isNaN(ci)) {
      new Chart(chart_canvas, config);
   } else {
      new Chart(chart_canvas, config_c);
   }

   // Statement to output based on performance of indicator
   var current_ci = ci_value * years_cumulated;
   
   change_from_baseline = Math.round(change_from_baseline * 10 ** decimal_places) / 10 ** decimal_places;
  
   if (current_year == base) {
      base_statement = "The data for " + base + " will be treated as the base year value for measuring improvement on this indicator. Future performance will be measured against this value."
   } else if ((change_from_baseline >= current_ci & improvement == "increase") || (change_from_baseline <= (current_ci * -1) & improvement == "decrease")) {
      base_statement = "Things have improved since the baseline in " + base + ". " + telling.improved;
   } else if ((change_from_baseline <= (current_ci * -1) & improvement == "increase") || (change_from_baseline >= current_ci & improvement == "decrease")) {
      base_statement = "Things have worsened since the baseline in " + base + ". " + telling.worsened;
   } else {
      base_statement = "There has been no significant change since the baseline in " + base + ". " + telling.no_change;
   };
   
   // Create statement div
   base_statement_div = document.createElement("div");
   base_statement_div.id = matrix + "-base-statement";
   base_statement_div.classList.add("white-box");
   base_statement_div.classList.add("base-statement");
   base_statement_div.style.display = "none";
   base_statement_div.innerHTML = base_statement;

   document.getElementById("change-info").appendChild(base_statement_div);

   // Create further info div
   var further_note = note[0];

   if (further_note.indexOf("Further information") != -1) {
      var further_string = "Further information";
   } else if (further_note.indexOf("Further Information") != -1) {
      var further_string = "Further Information";
   } else if (further_note.indexOf("Notes:") != -1) {
      var further_string = "Notes:";
   } else {
      further_note = "Not available";
   }

   if (further_note != "Not available") {
      further_note = further_note.slice(further_note.indexOf(further_string) + further_string.length);
      further_note = further_note.slice(further_note.indexOf("[/b]") + 4);
      if (further_note.indexOf("[b]") != -1) {
         further_note = further_note.slice(0, further_note.indexOf("[b]"))
      }
      further_note = further_note.replaceAll("[url=", "<a href = '");
      further_note = further_note.replaceAll("[/url]", "' target = '_blank'>here</a>.");
      further_note = further_note.replaceAll("[i]", "<em>");
      further_note = further_note.replaceAll("[/i]", "</em>");
   }

   for (let i = 2; i < 10; i++) {
      further_note = further_note.replaceAll("\n" + i + ".", "<br><br>" + i + ".")
   }

   further_info_div = document.createElement("div");
   further_info_div.id = matrix + "-further-info";
   further_info_div.classList = "further-info-text";
   // further_info_div.style.display = "none";
   further_info_div.innerHTML = further_note;

   links = further_info_div.getElementsByTagName("a");

   for (let i = 0; i < links.length; i++) {
      links[i].href = links[i].href.slice(0, links[i].href.indexOf("]"));
   }

   document.getElementById("further-info").appendChild(further_info_div);

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
            
         // Use EQ data if available
        } else if (data.EQ != "" & !["INDHOMELNEQ"].includes(data.EQ)) { // not on data portal yet

         this_matrix = data.EQ;
         this_breakdown = "EQUALGROUPS";
         this_statistic = this_matrix.slice(0, -2);

        // Use LGD data if available
        } else if (data.LGD != "" & !["INDGRADSLGD", "INDHOMELNLGD"].includes(data.LGD)) { // not on data portal yet

            this_matrix = data.LGD;
            this_breakdown = "LGD2014";
            this_statistic = this_matrix.slice(0, -3);

         // Do nothing if no data available
        } else {
            this_matrix = "";
        }

        if (this_matrix != "") {

         // An id to be used for the canvas containing the chart
         var this_id = this_statistic + "-line";         

         // Plot line chart using createLineChart() function         
         createLineChart(matrix = this_matrix,
                         id = this_id,
                         title = indicator.chart_title,
                         base = indicator.base_year,
                         ci = indicator.ci,
                         improvement = indicator.improvement,
                         y_label = indicator.y_axis_label,
                         telling = indicator.telling);       

        }          

    }

}

async function drawMap(matrix, improvement, title) {

   // Display the loading gif while this function runs
   var map_load = document.getElementById("map-load");
   map_load.style.display = "flex";

   // Target div with id "map-container"
   var map_container = document.getElementById("map-container");

   // Delete any map already inside map-container
   while (map_container.firstChild) {
       map_container.removeChild(map_container.firstChild);
   }

   // URL to query (pre-production)
   api_url = "https://ppws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";
   // URL when data is on data.nisra.gov.uk
   // api_url = "https://ws-data.nisra.gov.uk/public/api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en";


  // Fetch data and store in object fetched_data
  const response = await fetch(api_url);
  const fetched_data = await response.json();
  const {value, dimension, updated} = fetched_data;

  var unit = Object.values(Object.values(dimension)[0].category.unit)[0].label; // The unit of measurement according to the metadata

  var years = Object.values(dimension)[1].category.index; // All years present in the data
//   var current_year = years[years.length-1]; // The current year

  var groups = Object.values(dimension)[2].category.index; // All the groupings present in the data (eg, LGD, AA)

  var num_groups = groups.length;     // The number of groups
  var NI_position = groups.indexOf("N92000002"); // Position of NI in list of groups
  
  // Loop back over previous years and plot map for year with data
  var no_data = true;
  var look_back = 0
  while (no_data == true) {
      data_series = value.slice(value.length - (num_groups * (look_back + 1)), value.length - (num_groups * look_back));

      // If NI appears as a group remove it from data_series
      if (NI_position > -1) {
         data_series.splice(NI_position, 1);
      }

      for (let i = 0; i < data_series.length; i++) {
         if (data_series[i] != null) {
            no_data = false;
            break
         }
      }

      var current_year = years[years.length - look_back - 1]; // The current year
      look_back = look_back + 1;
   }

  var range = Math.max(...data_series) - Math.min(...data_series); // Calculate the range of values

  // Create an array colours, where each value is between 0 and 1 depending on where it falls in the range of values
  colours = [];
  for (let i = 0; i < data_series.length; i++) {
   colours.push((data_series[i] - Math.min(...data_series)) / range);
  }  

  // Create a div for map to sit in
  map_div = document.createElement("div");
  map_div.id = matrix + "-map";
  map_div.classList.add("map");
  map_container.appendChild(map_div);

  // Create a map
  var map = L.map(matrix + "-map",
                       {zoomControl: false, // Turn off zoom controls
                        dragging: false,
                        touchZoom: false,
                        doubleClickZoom: false,
                        scrollWheelZoom: false,
                        boxZoom: false,
                        keyboard: false,
                        attributionControl: false,
                        tap: false}).setView([54.65, -6.8], 8); // Set initial co-ordinates and zoom

       L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
           maxZoom: 19,
           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       }).addTo(map); // Add a background map

       // Colour palettes for increasing/decreasing indicators
       if (improvement == "increase") {
         var palette = ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"];
       } else {
         var palette = ["#f4d0cc", "#e9a299", "#df7366", "#d44533", "#c91600"];
       }

       // When called chooses a colour from above palette based on value of colours array
       function getColor(d) {
           return palette[Math.round(d*4)];
       }

       // Variable name to use if geo data is LGD or AA
       if (matrix.slice(-3) == "LGD") {
           area_var = "LGDNAME"
       } else {
           area_var = "PC_NAME"
       }

       // Function to add tool tip to each layer
       function enhanceLayer(f, l){

           if (f.properties){
               
               if (data_series[f.properties['OBJECTID'] - 1] != null) {
                  l.bindTooltip(f.properties[area_var] + " (" + current_year + "): <b>" + data_series[f.properties['OBJECTID'] - 1].toLocaleString("en-GB") + "</b> (" + unit + ")");
               } else {
                  l.bindTooltip(f.properties[area_var] + " (" + current_year + "): <b>Not available</b>");
               }

               // http://leafletjs.com/reference.html#path-options
               l.setStyle({
                   fillColor: getColor(colours[f.properties['OBJECTID'] - 1]),
                   fillOpacity: 0.75,
                   stroke: true,
                   color: "#555555",
                   opacity: 0.75,
                   weight: 1
               });

               l.on("mouseover", function (e) {
                  l.setStyle({
                     weight: 2,
                     opacity: 1
                  })
               })

               l.on("mouseout", function (e) {
                  l.setStyle({
                     weight: 1,
                     opacity: 0.75
                  })
               })
           }
       }        

   // geojson data atted to map and enhanceLayer function applied to each feature    
   if (matrix.slice(-3) == "LGD") {
       L.geoJSON(LGD_map, {onEachFeature:enhanceLayer}).addTo(map);
       LGD_id = matrix + "-base-statement";
       EQ_id = matrix.slice(0, -3)  + "EQ-base-statement";
   } else {
       L.geoJSON(AA_map, {onEachFeature:enhanceLayer}).addTo(map);
       LGD_id = matrix.slice(0, -2) + "LGD-base-statement";
       EQ_id = matrix.slice(0, -2)  + "EQ-base-statement";
   }
   
   // Target change info
   var change_info_map = document.getElementById("change-info-map");
   var further_info_map = document.getElementById("further-info-map");

   // Which change info div to copy text from
   if (document.getElementById(LGD_id)) {
       base_id = LGD_id;
   } else {
       base_id = EQ_id;
   }

   further_id = base_id.replace("base-statement", "further-info");

   // Write content to change info box
   change_info_map.innerHTML = document.getElementById(base_id).innerHTML;
   further_info_map.innerHTML = document.getElementById(further_id).innerHTML;

   // Legend divs added to map
   legend_div = document.createElement("div");
   legend_div.id = matrix + "-legend";
   legend_div.classList.add("map-legend");
   legend_row_1 = document.createElement("div");
   legend_row_1.classList.add("row");

   min_value = document.createElement("div");
   min_value.innerHTML = Math.min(...data_series).toLocaleString("en-GB");
   min_value.classList.add("legend-min");
   legend_row_1.appendChild(min_value);

   max_value = document.createElement("div");
   max_value.innerHTML = Math.max(...data_series).toLocaleString("en-GB");
   max_value.classList.add("legend-max");
   legend_row_1.appendChild(max_value);

   legend_div.appendChild(legend_row_1);

   legend_row_2 = document.createElement("div");
   legend_row_2.classList.add("row");

   for (let i = 0; i < palette.length; i++) {
      colour_block = document.createElement("div");
      colour_block.style.backgroundColor = palette[i];
      colour_block.classList.add("colour-block");
      legend_row_2.appendChild(colour_block);
      if (i == 0) {
         colour_block.style.marginLeft = "7.5px"
      }
   }

   legend_div.appendChild(legend_row_2);

   map_container.appendChild(legend_div);

   // Footnote on when data was last updated
  var updated_note = "Updated on " + Number(updated.slice(8, 10)) + " " + getMonthName(updated.slice(5, 7)) + " " + updated.slice(0, 4);

  update_div = document.createElement("div");
  update_div.classList.add("map-date");
  update_div.innerHTML = updated_note;
  map_container.appendChild(update_div);

  var map_title = document.getElementById("map-title");
  map_title.innerHTML = title + " (" + current_year + ")";

  // Hide loading gif after map is generated
  map_load.style.display = "none";

}