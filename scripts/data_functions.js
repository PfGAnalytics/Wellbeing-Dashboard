// customTitle plugin for chart.js
// source from https://stackoverflow.com/questions/71379551/ability-to-rotate-y-axis-title-in-chart-js
// and adapted to include up to 6 line breaks
const customTitle = {
   id: 'customTitle',
   beforeLayout: (chart, args, opts) => {
     const {
       display,
       font
     } = opts;
     if (!display) {
       return;
     }
 
     const {
       ctx
     } = chart;
     ctx.font = font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
 
     const {
       width
     } = ctx.measureText(opts.text);
      if (width > 42) {
         chart.options.layout.padding.left = 80;
      } else {
         chart.options.layout.padding.left = width;
      };
   },
   afterDraw: (chart, args, opts) => {
     const {
       font,
       text,
       color
     } = opts;
     const {
       ctx,
       chartArea: {
         top,
         bottom,
         left,
         right
       }
     } = chart;
 
     if (opts.display) {      
      
       ctx.fillStyle = color || Chart.defaults.color
       ctx.font = font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif'

      // Initially split text into 10 character long substrings
       s_text = [];

       for (let i = 0; i < 6; i++) {
          if (i == 0) {
             s_text.push(text.slice(0, 9));
          } else {
             s_text.push(text.slice(i * 10 - 1, (i + 1) * 10 - 1));
          }
       }
 
       // Fix string splits that occur in middle of a word
       for (let i = 0; i < s_text.length - 1; i++) {
 
          if (s_text[i + 1].charAt(0) != " " & s_text[i].charAt(s_text[i].length - 1) != " ") {
             space = s_text[i].lastIndexOf(" ");
             n_space = s_text[i + 1].lastIndexOf(" ");
             if (space != -1) {
                s_text[i + 1] = s_text[i].slice(space + 1) + s_text[i + 1];
                s_text[i] = s_text[i].slice(0, space);
             } else if (n_space != -1) {
                s_text[i] = s_text[i] + s_text[i + 1].slice(0, n_space);
                s_text[i + 1] = s_text[i + 1].slice(n_space + 1);
             } else {
                s_text[i] = s_text[i] + s_text[i + 1];
                s_text[i + 1] = "";
             }
          }
 
       }

       // Remove blank spaces
       lines = [];     

       for (let i = 0; i < s_text.length; i++) {         

         if (s_text[i] != "") {
            lines.push(s_text[i].trim())
         }

       }

       // Center text along y axis depending on how many lines it was split over
       if (lines.length == 1) {
         ctx.fillText([lines[0]], 3, (top + bottom) / 2)
      } else if (lines.length == 2) {
         ctx.fillText([lines[0]], 3, (top + bottom) / 2 - 6.5)
         ctx.fillText([lines[1]], 3, (top + bottom) / 2 + 6.5)
      } else if (lines.length == 3) {
         ctx.fillText([lines[0]], 3, (top + bottom) / 2 - 13)
         ctx.fillText([lines[1]], 3, (top + bottom) / 2)
         ctx.fillText([lines[2]], 3, (top + bottom) / 2 + 13)
      } else if (lines.length == 4) {
         ctx.fillText([lines[0]], 3, (top + bottom) / 2 - 19.5)
         ctx.fillText([lines[1]], 3, (top + bottom) / 2 - 6.5)
         ctx.fillText([lines[2]], 3, (top + bottom) / 2 + 6.5)
         ctx.fillText([lines[3]], 3, (top + bottom) / 2 + 19.5)
      } else if (lines.length == 5) {
         ctx.fillText([lines[0]], 3, (top + bottom) / 2 - 26)
         ctx.fillText([lines[1]], 3, (top + bottom) / 2 - 13)
         ctx.fillText([lines[2]], 3, (top + bottom) / 2)
         ctx.fillText([lines[3]], 3, (top + bottom) / 2 + 13)
         ctx.fillText([lines[4]], 3, (top + bottom) / 2 + 26)
      } else if (lines.length == 6) {
         ctx.fillText([lines[0]], 3, (top + bottom) / 2 - 32.5)
         ctx.fillText([lines[1]], 3, (top + bottom) / 2 - 19.5)
         ctx.fillText([lines[2]], 3, (top + bottom) / 2 - 6.5)
         ctx.fillText([lines[3]], 3, (top + bottom) / 2 + 6.5)
         ctx.fillText([lines[4]], 3, (top + bottom) / 2 + 19.5)
         ctx.fillText([lines[5]], 3, (top + bottom) / 2 + 32.5)
      }
     }
   }
 }

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

   // Fetch data and store in object fetched_data
   const response = await fetch(api_url);
   const fetched_data = await response.json();
   const {value, dimension, updated} = fetched_data;
   
   var years = Object.values(dimension)[1].category.index; // Array of years in data
   
   var base_position = years.indexOf(base); // Which position in the years array is base year

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

      var num_years = years.length;  // Number of years in data
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
      max_value = Math.ceil(max_value / 10000) * 10000;
   }

   if (y_label.includes("%") & max_value > 100) {
      max_value = 100;
   }

   if (title.includes("life expectancy")) {
      max_value = 80;
   }

   if (improvement == "increase") {
      red_box_yMin = 0;
      red_box_yMax = base_value - ci;
      green_box_yMin = base_value + ci;
      green_box_yMax = max_value;
   } else {
      red_box_yMin = base_value + ci;
      red_box_yMax = max_value;
      green_box_yMin = 0;
      green_box_yMax = base_value - ci;
   }

   if (title.length < 100) {
      title_array = [title]
   } else {
      split = title.indexOf(" ", 100);
      title_array = [title.slice(0, split), title.slice(split + 1)]
   }

   // Footnote on when data was last updated
   var updated_note = "Updated on " + Number(updated.slice(8, 10)) + " " + getMonthName(updated.slice(5, 7)) + " " + updated.slice(0, 4) +  "                                                                                                                                            ";

   // Properties of the data series to be plotted
   const data = {
      labels: years,
      datasets: [{
         label: 'Northern Ireland',
         data: data_series,
         borderColor: "#000000",
         fill: false
      }]
   };

   // Chart configuration
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
            customTitle: {
               display: true,
               text: y_label
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
            },
            title: {
               display: true,
               text: ["", updated_note]
            }
         },
         y: {
            beginAtZero: true,
            min: 0,
            max: max_value,
            ticks: {
               minRotation: 0,
               maxRotation: 0
            }
         }
      }
      },
      plugins: [customTitle]
   };

   // Create a new canvas object to place chart in
   chart_canvas = document.createElement("canvas");
   chart_canvas.id = id;
   chart_canvas.style.display = "none";
   chart_canvas.classList.add("line-chart");
   document.getElementById("line-chart-container").appendChild(chart_canvas);

   // Place chart in canvas
   const myChart = new Chart(
      document.getElementById(id),
      config
   );

   // Statement to output based on performance of indicator
   if ((change_from_baseline > ci & improvement == "increase") || (change_from_baseline < (ci * -1) & improvement == "decrease")) {
      base_statement = "Things have improved since the baseline in " + base + ". " + telling.improved;
   } else if ((change_from_baseline < (ci * -1) & improvement == "increase") || (change_from_baseline > ci & improvement == "decrease")) {
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