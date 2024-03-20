 // Function to return Short month name from number 1-12 (eg, 1 returns "Jan", 2 returns "Feb")
 function getMonthName(monthNumber) {
   const date = new Date();
   date.setMonth(monthNumber - 1);
 
   return date.toLocaleString('en-GB', {
     month: 'short',
   });
 }

// A function to sort items alphabetically inside an object based on the object key
function sortObject(o) {
   var sorted = {},
   key, a = [];

   for (key in o) {
         if (o.hasOwnProperty(key)) {
            a.push(key);
         }
   }

   a.sort();

   for (key = 0; key < a.length; key++) {
         sorted[a[key]] = o[a[key]];
   }
   
   return sorted;
}



// Create list of all indicators and sort alphabetically
var domains = Object.keys(domains_data);     // All domains
var all_indicators = []    // Empty list to be populated in loop below

for (let i = 0; i < domains.length; i ++) {
    all_indicators.push(Object.keys(domains_data[domains[i]].indicators));
}

all_indicators = all_indicators.flat().sort();     // Flatten the list and sort alphabetically

// The total number of indicators being measured
var num_indicators = all_indicators.length;

// Empty objects for each type of indicator. When function is called below each indicator will be sorted into the
// appropriate object and these will be used to place objects on the overall screen 
var improving_indicator = {};
var no_change_indicator = {};
var worsening_indicator = {};
var insufficient_indicator = {};

// Function below will loop through all indicators and place them in one of the three objects above depending on their performance
// When dom = null this will use read in all indicators for plotting on the overall screen
// Otherwise it will only read in indicators for the selected domain
async function indicatorPerformance (dom = null) {   

   // Determine whether ro read in all domains or just one:
   if (dom != null) {
      var doms = [dom];
   } else {
      var doms = domains;
   }

   // Loop through all domains in dom:
   for (let i = 0; i < doms.length; i ++) {

      var indicators = Object.keys(domains_data[doms[i]].indicators);   // List of all indicators in the domain

      for (let j = 0; j < indicators.length; j ++) {  // Loop through all indicators

         var indicator = domains_data[doms[i]].indicators[indicators[j]];  // Select the information for the indicator from domains_data.js

         // In the first instance the function checks for NI data for the particular indicator,
         // then it checks for EQ and finally LGD data. The latter two api_url queries have filters that select only the NI data.
         if (indicator.data.NI != "") {
            var matrix = indicator.data.NI;
            var statistic = matrix.slice(0, -2);
            api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (indicator.data.EQ != "") {
            var matrix = indicator.data.EQ;
            var statistic = matrix.slice(0, -2);
            api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22"+ matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else {
            var matrix = indicator.data.LGD;
            var statistic = matrix.slice(0, -3);
            api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22LGD2014%22%5D,%22dimension%22:%7B%22LGD2014%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey
         }

         // The id the line chart canvas element will use
         var id = statistic + "-line";

         // Fetch data and store in object fetched_data
         const response = await fetch(api_url);          // fetches the content of the url
         const fetched_data = await response.json();     // we tell it the data is in json format
         const {result} = fetched_data;                  // and extract the result object key

         if (result == null) {   // Output message to console when indicator is not found / else continue with calculation
            console.log("Warning: No indicator information found for " + indicators[j] + ". Refresh to try again. Check matrix spelling for indicator in domains_data.js if problem persists.");
         } else {

            const {dimension, value} = result;  // from result we then extract the object keys we need

            var years = Object.values(dimension)[1].category.index; // Array of years in data
            var num_years = years.length;  // Number of years in data
            
            var base_position = years.indexOf(indicator.base_year); // Which position in the years array is base year
            var current_year = years[years.length-1]; // The current year

            var base_value = value[base_position]; // The value at the base year
            var data_series = value; // The y axis values to plot
            var change_from_baseline = value[value.length - 1] - base_value; // The difference between base year value and last value

            // When confidence interval is constant
            if (!isNaN(indicator.ci)) {
               var ci_value = indicator.ci;
               var years_cumulated = 1;
            } else { // When confidence interval changes year on year
               var ci_value = Number(indicator.ci.slice(0, -1));
               var years_cumulated = num_years - base_position - 1;
            }

            // Statement to output based on performance of indicator
            var current_ci = ci_value * years_cumulated;

            // Function to count the number of decimal places present in a number
            Number.prototype.countDecimals = function () {
               if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
               return this.toString().split(".")[1].length || 0; 
            }

            // The number of decimal places present in the data set
            var decimals = [];
            for (let i = 0; i < data_series.length; i ++) {
               if (data_series[i] != null) {
                  decimals.push(data_series[i].countDecimals())
               }
            }

            var decimal_places = Math.max(...decimals);
            
            change_from_baseline = Math.round(change_from_baseline * 10 ** decimal_places) / 10 ** decimal_places; // Change from baseline calculated
         
            if (current_year == indicator.base_year) {   // Indicators where current year is base year classed "no change"
               no_change_indicator[indicators[j]] = {domain: doms[i]};
            } else if (indicator.base_year == null) {
               insufficient_indicator[indicators[j]] = {domains:doms[i]}
            } else if ((change_from_baseline >= current_ci & indicator.improvement == "increase") || (change_from_baseline <= (current_ci * -1) & indicator.improvement == "decrease")) {
               improving_indicator[indicators[j]] = {domain: doms[i]};  // "improving" indicators based on condition for improvement met
            } else if ((change_from_baseline <= (current_ci * -1) & indicator.improvement == "increase") || (change_from_baseline >= current_ci & indicator.improvement == "decrease")) {
               worsening_indicator[indicators[j]] = {domain: doms[i]};  // "worsening" indicators based on condition for improvement met
            } else {
               no_change_indicator[indicators[j]] = {domain: doms[i]};  // All others also classed as "no change"
            };            

         }

         if (i == doms.length - 1 && j == indicators.length - 1 && dom == null) {   // On the last iteration of loop, do the following:
            improving_indicator = sortObject(improving_indicator);   // alphabetise improving indicators
            no_change_indicator = sortObject(no_change_indicator);   // alphabetise no change indicators
            worsening_indicator = sortObject(worsening_indicator);   // alphabetise worsening indicators
            insufficient_indicator = sortObject(insufficient_indicator);   // alphabetise insufficient indicators
            plotOverallHexes("improving");                           // Plot hexagons on overall screen for improving
            plotOverallHexes("no_change");                           // Plot hexagons on no change screen for improving
            plotOverallHexes("worsening");                           // Plot hexagons on worsening screen for improving
            plotOverallHexes("insufficient");
            tot_indicators = Object.keys(no_change_indicator).length + Object.keys(improving_indicator).length + Object.keys(worsening_indicator).length + Object.keys(insufficient_indicator).length;      // Calculate total number of indicators read in
            document.getElementById("p-no-change").textContent = "No change (" + Object.keys(no_change_indicator).length + "/" + tot_indicators + ")";      // Output fractions for each label on overall screen
            document.getElementById("p-improving").textContent = "Improving (" + Object.keys(improving_indicator).length + "/" + tot_indicators + ")";
            document.getElementById("p-worsening").textContent = "Worsening (" + Object.keys(worsening_indicator).length + "/" + tot_indicators + ")";
            document.getElementById("p-insufficient").textContent = "Insufficient Data (" + Object.keys(insufficient_indicator).length + "/" + tot_indicators + ")";
            document.getElementById("loading-img").style.display = "none";    // Hide loading image
            document.getElementById("overall-hexes").style.display = "block";    // Display grid

            plotExpandedDomains();

         }

      }

   }

   var currentURL = window.location.href; // Read the current page url

   if (dom != null) {
      generateHexagons(dom);     // Run generateHexagons page for domain grid
   }

}

// Function below uses the api to fetch the data and plots it in a line chart
// It also generates the baseline statement, the source information, the further information and how do we measure this
// using information on the data portal. The two inputs to the function are a domain name "d" and indicator name "e"
// The function is called inside a loop below which runs over all indicators to create all charts as the page loads
async function createLineChart(d, e) {

   var indicator = domains_data[d].indicators[e];  // Select the information for the indicator from domains_data.js

   // In the first instance the function checks for NI data for the particular indicator,
   // then it checks for EQ and finally LGD data. The latter two api_url queries have filters that select only the NI data.
   if (indicator.data.NI != "") {
      var matrix = indicator.data.NI;
      var statistic = matrix.slice(0, -2);
      api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
   } else if (indicator.data.EQ != "") {
      var matrix = indicator.data.EQ;
      var statistic = matrix.slice(0, -2);
      api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22"+ matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
   } else {
      var matrix = indicator.data.LGD;
      var statistic = matrix.slice(0, -3);
      api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22LGD2014%22%5D,%22dimension%22:%7B%22LGD2014%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
   }

   // The id the line chart canvas element will use
   var id = statistic + "-line";

   // Fetch data and store in object fetched_data
   const response = await fetch(api_url);          // fetches the content of the url
   const fetched_data = await response.json();     // we tell it the data is in json format
   const {result} = fetched_data;                  // and extract the result object key

    if (result == null) {
      console.log("Warning: No indicator information found for " + e + ". Refresh to try again. Check matrix spelling for indicator in domains_data.js if problem persists.");
      num_indicators = num_indicators - 1;
      return;  // If one indicator is not working it will still attempt to render rest of them rather than crashing entire loop
    }

   const {dimension, value, updated, note} = result;  // from result we then extract the object keys we need
   
   var years = Object.values(dimension)[1].category.index; // Array of years in data
   var num_years = years.length;  // Number of years in data
   
   var base_position = years.indexOf(indicator.base_year); // Which position in the years array is base year
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

   var base_value = value[base_position]; // The value at the base year
   var data_series = value; // The y axis values to plot
   var change_from_baseline = value[value.length - 1] - base_value; // The difference between base year value and last value

   // Pull chart title and y axis label from metadata
   var chart_title = dimension.STATISTIC.category.label[statistic];
   var y_axis_label = dimension.STATISTIC.category.unit[statistic].label;

   // Recodes of chart titles:
   chart_title = chart_title.replace("?g/m3", "μg/m³");
   chart_title = chart_title.replace("MTCO2e", "MtCO₂e");

   // Recodes of y axis labels:
   if (indicator.data.NI == "INDINTREPNI") {
      y_axis_label = "NBI score (out of 100)";
   } else if (indicator.data.EQ == "INDLIFESATEQ") {
      y_axis_label = "Average (mean) Life Satisfaction score"
   } else if (indicator.data.NI == "INDLCREENI") {
      y_axis_label = "FTE employment"
   } else if (indicator.data.EQ == "INDPREVDTHEQ") {
      y_axis_label = "Deaths per 100,000 population"
   } else if (indicator.data.NI == "INDSFGANI") {
      y_axis_label = "Percentage points"
   } else if (indicator.data.EQ == "INDSLATTGAPEQ") {
      y_axis_label = "Percentage points"
   }  else if (indicator.data.NI == "INDHOMELNNI") {
      y_axis_label = "Number of households"
   } else if (indicator.data.EQ == "INDHOUSTRSEQ") {
      y_axis_label = "Number of Applicants"
   } else if (indicator.data.NI == "INDRIVERQNI") {
      y_axis_label = "mg/l soluble reactive phosphorus (SRP)"
   } else if (indicator.data.NI == "INDGREENHGNI") {
      y_axis_label = "MtCO₂e"
   } else if (indicator.data.NI == "INDAIRPOLNI") {
      y_axis_label = "Annual mean nitrogen dioxide concentration (μg/m³)"
   } else if (indicator.data.NI == "INDNICEINI") {
      y_axis_label = "Index (base 2013-100)"
   } else if (y_axis_label == "Percentage") {
      y_axis_label = "%"
   }

   // The following calculations set the ideal heights for the y axis as well as the green and red boxes
   var max_data = Math.max(...data_series);

   if (indicator.base_year == null) {
      var max_value = max_data + 5;
   } else {
      var max_value = Math.max(base_value * 2, max_data);
   }
   

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

   // Manual recodes for max_value:
   if ((y_axis_label.includes("%") || y_axis_label.includes("out of 100")) & max_value > 100 || chart_title.includes("respected")) {
      max_value = 100;
   }

   if (chart_title.includes("life expectancy")) {
      max_value = 80;
   }

   if (chart_title.includes("from 0 to 10")) {
      max_value = 10;
   }

   if (chart_title.includes("housing stress")) {
      max_value = 40000;
   }

   if (matrix == "INDNICEINI") {
      min_value = 85;
      max_value = 115;
   } else {
      min_value = 0
   }

   // When confidence interval is constant
   if (!isNaN(indicator.ci)) {
      var ci_value = indicator.ci;
      var years_cumulated = 1;
   } else { // When confidence interval changes year on year
      var ci_value = Number(indicator.ci.slice(0, -1));
      var years_cumulated = num_years - base_position - 1;
   }

   // Set the size and position of the red box and green box depending on whether improvement is measured by
   // the value increaseing or decreasing over time:
   if (indicator.improvement == "increase") {
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

      // Gap in Recycled Waste graph:
   } else if (matrix == "INDRECWSTENI") {

      // First plot the line as far as 2011/12
      var data = {
         labels: years,
         datasets: [{
            label: 'Northern Ireland',
            data: data_series.slice(0, years.indexOf("2011/12") + 1),
            borderColor: "#000000",
            fill: false,
            pointBackgroundColor: "#000000"
         }]
      }

      var remaining_data = [];

      for (let i = 0; i < data_series.length; i ++) {
         if (i <= years.indexOf("2011/12")) {
            remaining_data.push(null)
         } else {
            remaining_data.push(data_series[i])
         }
      }

      data.datasets.push({
         label: "Northern Ireland",
         data: remaining_data,
         borderColor: "#000000",
         fill: false,
         pointBackgroundColor: "#000000"
      })

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

   // Custom plugin for drawing top polygon for indicators with year on year improvements
   const cumulative_top = {
      id: "drawing_top",
      beforeDraw(chart, args, options) {
         const { ctx } = chart;
         ctx.save();

         canvas_width = chart.canvas.clientWidth;     // Return the width of the canvas in pixels
         canvas_height = chart.canvas.clientHeight;   // Return the height of the canvas in pixels

         chart_width = chart.chartArea.width;         // Return the width of the chart area in pixels
         chart_height = chart.chartArea.height;       // Return the height of the chart area in pixels
         
         space_at_top = chart.chartArea.top;          // Return the size of the gap between the top of the canvas and top of chart in pixels
         space_at_left = chart.chartArea.left;        // Return the size of the gap between the left edge of the canvas and left edge of chart in pixels

         startWidth = (base_position / (years.length - 1)) * chart_width + space_at_left;    // The pixel position of the x co-ordinate of the first point in the polygon
         startHeight = (1 - (base_value / max_value)) * chart_height + space_at_top;         // The pixel position of the y co-ordinate of the first point in the polygon

         endHeight = (1 - ((base_value + (ci_value * (years.length - base_position - 1))) / max_value)) * chart_height + space_at_top;    // The pixel position of the y co-ordinate of the last point in the polygon

         ctx.beginPath();                                      // Start drawing a polygon
         ctx.moveTo(startWidth, startHeight);                  // Start at the points calculted above
         ctx.lineTo(startWidth, space_at_top);                 // Draw line to top of chart area
         ctx.lineTo(chart.chartArea.right, space_at_top);      // Draw line to right edge of chart area
         ctx.lineTo(chart.chartArea.right, endHeight);         // Draw line to end position calculated above
         ctx.lineTo(startWidth, startHeight);                  // Draw line back to start point to complete polygon

         if (indicator.improvement == "increase") {            // Top box is coloured green on increasing indicators
            ctx.fillStyle = "#00aa0055";
            ctx.strokeStyle = "#00aa00";
         } else {                                              // or red for decreasing indicators
            ctx.fillStyle = "#aa000055";
            ctx.strokeStyle = "#aa0000";
         }

         ctx.lineWidth = 2;            // Set line width then apply stroke and fill
         ctx.fill();
         ctx.stroke();
         
      }
   };

   // Custom plugin for drawing bottom polygon for indicators with year on year improvements
   const cumulative_bottom = {
      id: "drawing_bottom",
      beforeDraw(chart, args, options) {
         const { ctx } = chart;
         ctx.save();

         canvas_width = chart.canvas.clientWidth;     // Return the width of the canvas in pixels
         canvas_height = chart.canvas.clientHeight;   // Return the height of the canvas in pixels

         chart_width = chart.chartArea.width;         // Return the width of the chart area in pixels
         chart_height = chart.chartArea.height;       // Return the height of the chart area in pixels

         space_at_bottom = chart.chartArea.bottom;    // Return the size of the gap between the top of the canvas and top of chart in pixels
         space_at_top = chart.chartArea.top;          // Return the size of the gap between the bottom of the canvas and bottom of chart in pixels
         space_at_left = chart.chartArea.left;        // Return the size of the gap between the left edge of the canvas and left edge of chart in pixels

         startWidth = (base_position / (years.length - 1)) * chart_width + space_at_left;    // The pixel position of the x co-ordinate of the first point in the polygon
         startHeight = (1 - (base_value / max_value)) * chart_height + space_at_top;         // The pixel position of the y co-ordinate of the first point in the polygon

         endHeight = (1 - ((base_value - (ci_value * (years.length - base_position - 1))) / max_value)) * chart_height + space_at_top;    // The pixel position of the y co-ordinate of the last point in the polygon

         ctx.beginPath();                                      // Start drawing a polygon
         ctx.moveTo(startWidth, startHeight);                  // Start at the points calculted above
         ctx.lineTo(startWidth, space_at_bottom);              // Draw line to top of chart area
         ctx.lineTo(chart.chartArea.right, space_at_bottom);   // Draw line to right edge of chart area
         ctx.lineTo(chart.chartArea.right, endHeight);         // Draw line to end position calculated above       
         ctx.lineTo(startWidth, startHeight);

         if (indicator.improvement == "decrease") {         // Bottom box is coloured red on increasing indicators
            ctx.fillStyle = "#00aa0055";
            ctx.strokeStyle = "#00aa00";
         } else {                                          // or green for decreasing indicators
            ctx.fillStyle = "#aa000055";
            ctx.strokeStyle = "#aa0000";
         }

         ctx.lineWidth = 2;            // Set line width then apply stroke and fill
         ctx.fill();
         ctx.stroke();

      }
   };

   // Function to count the number of decimal places present in a number
   Number.prototype.countDecimals = function () {
      if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
      return this.toString().split(".")[1].length || 0; 
   }

   // The number of decimal places present in the data set
   var decimals = [];
   for (let i = 0; i < data_series.length; i ++) {
      if (data_series[i] != null) {
         decimals.push(data_series[i].countDecimals())
      }
   }

   var decimal_places = Math.max(...decimals);

   // Chart configuration for charts with constant increasing/decreasing value:
   const chart_config = {
      type: 'line',
      data,
      options: {
         responsive: true,                   //  Allow resizing of canvas
         maintainAspectRatio: false,         // Any aspect ratio
         plugins: {
               annotation: {
                  annotations: {
                     red_box: {                             // Red box plotted with co-ordinates
                           type: "box",
                           xMin: base_position,
                           xMax: years.length - 1,
                           yMin: red_box_yMin,
                           yMax: red_box_yMax,
                           backgroundColor: "#aa000055",
                           borderColor: "#aa0000",
                           borderWidth: 2
                     },
                     red_text: {                                        // Text inside red box
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
                     green_box: {                             // Green box plotted with co-ordinates
                        type: "box",
                        xMin: base_position,
                        xMax: years.length - 1,
                        yMin: green_box_yMin,
                        yMax: green_box_yMax,
                        backgroundColor: "#00aa0055",
                        borderColor: "#00aa00",
                        borderWidth: 2
                     },
                     green_text: {                                        // Text inside green box
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
                  display: false       // Legend turned off
               }
         },
         scales: {
            x: {
               grid: {
                  lineWidth: 0,     // Remove vertical grid lines
                  drawTicks: true,     // Add ticklines
                  tickWidth: 1         // tickline width
               },
               ticks: {
                  minRotation: 0,      // Stop rotating labels (for accessibility)
                  maxRotation: 0
               }
            },
            y: {
               beginAtZero: true,      // Set axis to begin at zero
               min: min_value,         // Use calculated min and max
               max: max_value,
               ticks: {
                  minRotation: 0,      // Stop rotating labels (for accessibility)
                  maxRotation: 0
               }
            }
         },
         interaction: {
            intersect: false,   // Allow mouse interaction when mouse near points 
            mode: "index"
         }
      },
      plugins: []
   };

   // Chart configuration for charts where improvement is year on year
   // Red box and green box annotations are removed and top 
   const chart_config_c = {
      type: 'line',
      data,
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
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

   // Chart configuration for charts where there is no base year to compare against
   const chart_config_n = {
      type: 'line',
      data,
      options: {
         responsive: true,                   //  Allow resizing of canvas
         maintainAspectRatio: false,         // Any aspect ratio
         plugins: {
               legend: {
                  display: false       // Legend turned off
               }

         },
         scales: {
            x: {
               grid: {
                  lineWidth: 0,     // Remove vertical grid lines
                  drawTicks: true,     // Add ticklines
                  tickWidth: 1         // tickline width
               },
               ticks: {
                  minRotation: 0,      // Stop rotating labels (for accessibility)
                  maxRotation: 0
               }
            },
            y: {
               beginAtZero: true,      // Set axis to begin at zero
               min: min_value,         // Use calculated min and max
               max: max_value,
               ticks: {
                  minRotation: 0,      // Stop rotating labels (for accessibility)
                  maxRotation: 0
               }
            }
         },
         interaction: {
            intersect: false,   // Allow mouse interaction when mouse near points 
            mode: "index"
         }
      },
      plugins: []
   };

   // Create a div to place all chart content in
   chart_div = document.createElement("div");
   chart_div.id = id;
   chart_div.classList.add("line-chart");

   // Create a div to place chart title in
   chart_title_div = document.createElement("div");
   chart_title_div.classList.add("chart-title");
   chart_title_div.innerHTML = chart_title;

   // Create a div row so y axis label and chart sit side by side
   canvas_row = document.createElement("div");
   canvas_row.classList.add("row");

   // Create a div for the y axis label
   y_label_div = document.createElement("div");
   y_label_div.classList.add("y-label");
   y_label_div.innerHTML = y_axis_label;
   canvas_row.appendChild(y_label_div);

   // Create a div for chart canvas to sit in
   canvas_div = document.createElement("div");
   canvas_div.classList.add("canvas-container");
   canvas_row.appendChild(canvas_div);

   // Create a new canvas object to place chart in
   chart_canvas = document.createElement("canvas");
   // chart_canvas.tabIndex = 0;
   chart_canvas.id = id + "-canvas";
   canvas_div.appendChild(chart_canvas);

   // Create a div for updated on date div
   date_div = document.createElement("div");
   date_div.classList.add("chart-date");
   date_div.innerHTML = updated_note;

   // Place all divs in chart_div and place chart_div in document
   chart_div.appendChild(chart_title_div);
   chart_div.appendChild(canvas_row);
   chart_div.appendChild(date_div);
   document.getElementById("line-chart-container").appendChild(chart_div);

   // Place chart in canvas
   if (indicator.base_year == null) {
      new Chart(chart_canvas, chart_config_n);
   } else if (!isNaN(indicator.ci)) {
      new Chart(chart_canvas, chart_config);
   } else {
      new Chart(chart_canvas, chart_config_c);
   }

   // Statement to output based on performance of indicator
   var current_ci = ci_value * years_cumulated;
   
   change_from_baseline = Math.round(change_from_baseline * 10 ** decimal_places) / 10 ** decimal_places;
  
   if (current_year == indicator.base_year) {
      base_statement = "The data for " + indicator.base_year + " will be treated as the base year value for measuring improvement on this indicator. Future performance will be measured against this value."
   } else if (indicator.base_year == null) {
      base_statement = "There is insufficident data available to determine whether this indicator is improving or worsening." + indicator.telling.insufficient
   } else if ((change_from_baseline >= current_ci & indicator.improvement == "increase") || (change_from_baseline <= (current_ci * -1) & indicator.improvement == "decrease")) {
      base_statement = "Things have improved since the comparison year in " + indicator.base_year + ". " + indicator.telling.improved;
   } else if ((change_from_baseline <= (current_ci * -1) & indicator.improvement == "increase") || (change_from_baseline >= current_ci & indicator.improvement == "decrease")) {
      base_statement = "Things have worsened since the comparison year in " + indicator.base_year + ". " + indicator.telling.worsened;
   } else {
      base_statement = "There has been no significant change since the comparison year in " + indicator.base_year + ". " + indicator.telling.no_change;
   };
   
   // Create statement div
   base_statement_div = document.createElement("div");      
   base_statement_div.id = matrix + "-base-statement";
   base_statement_div.classList.add("white-box");
   base_statement_div.classList.add("base-statement");
   base_statement_div.innerHTML = base_statement;

   document.getElementById("change-info").appendChild(base_statement_div);

   // Load/re-load a domain page if user clicks on hexagon while loop is still executing
   var clicked_hex = document.getElementById("clicked-hex");
   if (clicked_hex.textContent != "") {
      generateHexagons(clicked_hex.textContent)
   }

   // Create further info div
   var further_note = note[0];

   // Looks for a heading within the note object key that might donate a "Further Information" paragraph:
   if (further_note.indexOf("Further information") != -1) {
      var further_string = "Further information";
   } else if (further_note.indexOf("Further Information") != -1) {
      var further_string = "Further Information";
   } else if (further_note.indexOf("Notes:") != -1) {
      var further_string = "Notes:";
   } else {
      further_note = "Not available";
   }

   // The "Further Information" paragraph is then extracted from the larger text string:
   if (further_note != "Not available") {
      further_note = further_note.slice(further_note.indexOf(further_string) + further_string.length);
      further_note = further_note.slice(further_note.indexOf("[/b]") + 4);
      if (further_note.indexOf("[b]") != -1) {
         further_note = further_note.slice(0, further_note.indexOf("[b]"))
      }

      // URLS are converted
      link = further_note.slice(further_note.indexOf("[url"), further_note.indexOf("[/url]") + "[/url]".length);

      if (link != "") {

         linked_text = link.slice(link.indexOf("]" ) + 1, link.indexOf("[/"));
         url = link.slice(link.indexOf("=") + 1, link.indexOf("]"));

         further_note = further_note.replace(link, "<a href = '" + url + "' target = '_blank'>" + linked_text + "</a>")

      }

      further_note = further_note.replaceAll("[i]", "<em>");                              // Italic text tags are converted
      further_note = further_note.replaceAll("[/i]", "</em>");
      further_note = further_note.replaceAll("“", '"');
      further_note = further_note.replaceAll("”", '"')
   }

   // Wrap further info as a html list (Accessibility change)
   further_note = "<ol><li>" + further_note.replace("1.", "") + "</li></ol>"

   for (let i = 2; i < 10; i++) {
      further_note = further_note.replaceAll("\n" + i + ".", "</li><li>")  // Line breaks are inserted between individidual points within "Further Information"
   }

   // Div element created for "Further information" and placed in html document:
   further_info_div = document.createElement("div");
   further_info_div.id = matrix + "-further-info";
   further_info_div.classList.add("further-info-text");
   further_info_div.classList.add("further-selected");
   
   further_info_div.innerHTML = further_note;

   document.getElementById("further-info").appendChild(further_info_div);

   if (further_note == "Not available") {
      document.getElementById("further-expander").style.display = "none";
  }

  // The source info is pulled out of the note object
  source_info = note[0];

  // The paragraph containing the source information is isolated:
  source_info = source_info.slice(source_info.indexOf("Source") + "Source".length);
  source_info = source_info.slice(source_info.indexOf("[/b]") + "[/b]".length);

  if (source_info.indexOf("[b]") > -1) {
   source_info = source_info.slice(0, source_info.indexOf("[b]")).trim();
  }  

  if (source_info.indexOf("[url=") > 2) {
   source_name = source_info.slice(0, source_info.indexOf("[url=")).trim();
  } else {
   source_name = source_info.slice(source_info.indexOf("]") + 1);
   source_name = source_name.slice(0, source_name.indexOf("[/url]"));
  }

  if (source_name.includes("The data come from the")) {
   source_name = source_info.slice(source_info.indexOf("]") + 1);
   source_name = source_name.slice(0, source_name.indexOf(".")).trim();
  }

  if (source_name.includes("http")) {
   source_name = source_name.slice(0, source_name.indexOf("http")).trim();
  }

  // URL formatted
  if (source_info.indexOf("[url=") > -1) {
   source_link = source_info.slice(source_info.indexOf("[url=") + "[url=".length);
   source_link = source_link.slice(0, source_link.indexOf("]"));
  } else {
   source_link = source_info.slice(source_info.indexOf("http"))
  }

  // Div element created and placed in html document:
  source_info_div = document.createElement("div");
  source_info_div.id = matrix + "-source-info";
  source_info_div.classList.add("source-info-text");
  source_info_div.innerHTML = "This indicator is collected from <a href='" + source_link + "' target='_blank'>" + source_name + "</a>.";

  document.getElementById("source-info").appendChild(source_info_div);

  // The "how we measure this" is pulled out of the note object
  measure_text = note[0];

  measure_string = "How do we measure this?"

  if (measure_text.indexOf(measure_string) > -1) {
   measure_text = measure_text.slice(measure_text.indexOf(measure_string) + measure_string.length).replace("[/b]", "");
   measure_text = measure_text.slice(0, measure_text.indexOf("[b]")).trim();
   } else {
      measure_string = "How is this measured?"
      if (measure_text.indexOf(measure_string) > -1) {
         measure_text = measure_text.slice(measure_text.indexOf(measure_string) + measure_string.length).replace("[/b]", "");
         measure_text = measure_text.slice(0, measure_text.indexOf("[b]")).trim();
      } else {
         measure_text = "";
      }
   }  

  // Div element created and placed in html document:
  measure_note = document.createElement("div");
  measure_note.id = matrix + "-measure-info";
  measure_note.classList.add("measure-info-text");
  measure_note.classList.add("white-box");

  measure_note.innerHTML = measure_text;

  document.getElementById("measure-info").appendChild(measure_note);

  // Covid text extract
  covid_text = note[0];

  covid_string = "Impact of Covid-19";


  if (covid_text.indexOf(covid_string) > -1) {
   covid_text = covid_text.slice(covid_text.indexOf(covid_string) + covid_string.length).replace("[/b]", "");
   covid_text = covid_text.slice(0, covid_text.indexOf(["[b"])).trim();

   document.getElementById("covid-info").textContent = covid_text;
  }

}

// This function will read the categories within the EQUALGROUPS variable, then output the available groups in the grey box
// Each group will then be linked to a pop-up that calls the data for that group from the data portal and plots bar chart
async function getEqualityGroups(d, e) {

   var matrix = domains_data[d].indicators[e].data.EQ;   // The matrix for the EQ dataset

   var api_url = config.baseURL + "api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en?apiKey=" + config.apiKey; // The url to read from

   // Fetch data and store in object fetched_data
  const response = await fetch(api_url);
  const fetched_data = await response.json();
  const {dimension} = fetched_data;

  var labels = Object.values(dimension.EQUALGROUPS.category.label);  // List of all category labels in EQUALGROUPS variable

  var eq_groups = [];      // Empty array to be filled with groupings

  for (let i = 0; i < labels.length; i ++) {    // Loop through all labels
      if (labels[i] != "Northern Ireland") {    // Exclude Northern Ireland category

         group = labels[i].slice(0, labels[i].indexOf("-")).trim();     // Truncate group name at position of first hyphen (-)

         if (group.includes("Age")) {
            group = "Age"              // Rename any Age category to just "Age"
        }

         if (!eq_groups.includes(group)) {
            eq_groups.push(group)         // If grouping isn't already in eq_groups array, then add it to the array
         }
      }
  }

  for (let i = 0; i < eq_groups.length; i ++) {       // Loop through the eq_groups array

      eq_link = document.createElement("div");           // Create a div for the link
      eq_link.classList.add("eq-link");                  // Give it a class eq-link
      eq_link.textContent = "• " + eq_groups[i];         // Populate link with name of grouping
      eq_link.tabIndex = "0";

      eq_link.onclick = async function () {           // Add function to execute when link clicked:

         if (document.getElementById("pop-up-chart")) {
            main_container.removeChild(document.getElementById("pop-up-chart"));    // Remove any pop ups that may have been previously created
         }

         indicator_scrn.style.filter = "opacity(40%)";         // Set rest of page to 40% brightness

         pop_up_chart = document.createElement("div");         // Create a div to hold the pop-up
         pop_up_chart.id = "pop-up-chart";                     // Give it a class
         pop_up_chart.style.backgroundColor = "#F2F2F2";       // Set its background colour

         // This will position the pop-up to always be immediately below the Indicator title
         pop_up_chart.style.marginTop = prototype.clientHeight + top_container.clientHeight + button_rows[0].clientHeight + button_rows[1].clientHeight + 30 + domain_title.clientHeight + "px";

         // Set the width of the pop-up box depending on screen size/type
         if (window.innerWidth < 1200) {
            pop_up_chart.style.width = window.innerWidth - 20 + "px";
         } else {
            pop_up_chart.style.width = "1190px";
         }

         // Add the pop-up box to the main page
         main_container.appendChild(pop_up_chart);

         close_pop_up = document.createElement("div");      // Div for "X" close button in top corner of pop-up
         close_pop_up.id = "close-pop-up";                  // Give it an id
         close_pop_up.style.marginLeft = pop_up_chart.clientWidth - 30 + "px";      // Position it 30 pixels from end of box
         close_pop_up.innerHTML = '<i class="fa-solid fa-xmark"></i>';        // Place an X icon in box
         close_pop_up.tabIndex = "0";

         close_pop_up.onclick = function () {      // When close button is clicked:
            indicator_scrn.style.filter = "opacity(100%)";     // Set main page brightness back to full
            main_container.removeChild(pop_up_chart);          // Remove the pop-up
         }

         pop_up_chart.appendChild(close_pop_up);   // Insert close button into document

         pop_up_title = document.createElement("div");      // Insert a div for chart title
         pop_up_title.id = "pop-up-title";                  // Give it id
         pop_up_title.textContent = document.getElementsByClassName("chart-title")[0].textContent + " by " + eq_groups[i];    // Take current chart title and add "by grouping" to end

         pop_up_chart.appendChild(pop_up_title);   // Insert chart title into pop-up-chart div

         loading = document.createElement("img");     // create loading image element
         loading.src = "img/page-loading.gif";        // image page
         loading.alt = "Northern Ireland Executive Loading Screen animation";    // image alt text

         pop_up_chart.appendChild(loading);     // insert loading image into document

         loading.style.marginLeft = (pop_up_chart.clientWidth - loading.clientWidth) / 2 + "px";      // Position loading image in centre
         loading.style.marginTop = "100px";     // Add 100px top margin

         chart_row = document.createElement("div");      // Row div for y label and chart to sit side by side
         chart_row.classList.add("row");

         // Create div for y axis label that reads the y axis label content from the line chart:
         y_axis = document.createElement("div");
         y_axis.textContent = document.getElementsByClassName("y-label")[0].textContent;
         y_axis.style.display = "none";
         y_axis.classList.add("y-label");

         chart_row.appendChild(y_axis);

         pop_up_chart.appendChild(chart_row);

         // Container for line chart:
         pop_up_container = document.createElement("div");
         pop_up_container.id = "pop-up-container";
         pop_up_container.style.display = "none";
         chart_row.appendChild(pop_up_container);        

         pop_canvas = document.createElement("canvas");
         // pop_canvas.tabIndex = 0;
         pop_canvas.id = "pop-canvas";
         pop_up_container.appendChild(pop_canvas);

         // Container for footnotes:
         note = document.createElement("div");
         note.style.marginLeft = "25px";
         note.style.marginRight = "25px";
         pop_up_chart.appendChild(note);

         // Plot the bar chart:

         // Start by obtaining x axis values - the years:
         var years = Object.values(dimension)[1].category.index; // Array of years in data
         
         // Contruct api query based on which grouping is selected:
         if (eq_groups[i] == "Sex") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%221%22,%222%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Age") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%223%22,%224%22,%225%22,%226%22,%227%22,%228%22,%2236%22,%2237%22,%2238%22,%2245%22,%2246%22,%2247%22,%2248%22,%2249%22,%2250%22,%2251%22,%2252%22,%2253%22,%2254%22,%2255%22,%2256%22,%2257%22,%2258%22,%2259%22,%2260%22,%2261%22,%2262%22,%2269%22,%2270%22,%2271%22,%2272%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Marital status") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%229%22,%2210%22,%2211%22,%2212%22,%2213%22,%2239%22,%2241%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Dependants") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2217%22,%2218%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Disability") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2219%22,%2220%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Ethnic group") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2221%22,%2222%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Sexual orientation") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2223%22,%2224%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Deprivation") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2225%22,%2226%22,%2227%22,%2228%22,%2229%22,%2240%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Urban Rural") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2230%22,%2231%22,%2232%22,%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Political opinion") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2233%22,%2234%22,%2235%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Religion") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2214%22,%2215%22,%2216%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Household Group") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2263%22,%2264%22,%2265%22,%2266%22,%2267%22,%2268%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Tenure") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2242%22,%2243%22,%2244%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         } else if (eq_groups[i] == "Special Educational Needs") {
            chart_data_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%2273%22,%2274%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22INDSLATTGAPEQ%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
         }

         var result = null;   // Retry plotting chart if data portal link doesn't work first time
         while (result == null) {
            const response = await fetch(chart_data_url);          // fetches the content of the url
            const fetched_data = await response.json();     // we tell it the data is in json format
            var {result} = fetched_data;                  // and extract the result object key
         }

         // After succesful fetch from data portal the loading image is removed and chart is displayed
         loading.style.display = "none";
         y_axis.style.display = "flex";
         pop_up_container.style.display = "block";
         pop_up_chart.style.backgroundColor = "#FFFFFF";

         // Chart centred
         chart_row.style.marginLeft = (pop_up_chart.clientWidth - y_axis.clientWidth - pop_up_container.clientWidth) / 2 + "px";

         // Obtain category labels within each grouping and the values for each:
         groups = Object.values(result.dimension.EQUALGROUPS.category.label);
         
         // Categories out of order on data portal for these two indicators
         if (["Respect", "Cultural identity"].includes(e) & eq_groups[i] == "Age") {
            groups.sort();
         }

         values = {};   // Empty object
         for (let j = 0; j < groups.length; j ++) {

            // Take text after first hyphen as group name, except for Age where it is after first space
            if (eq_groups[i] == "Age") {
               group_label = groups[j].slice(groups[j].indexOf(" ")).trim();
               if (group_label.indexOf("-") == 0) {
                  group_label = group_label.slice(1).trim();
               }
            } else {
               group_label = groups[j].slice(groups[j].indexOf("-") + 1).trim();
            }            

            // For each group pull out the relevant values
            values[group_label] = [];

            for (let k = 0; k < result.value.length; k ++) {
               if (k % groups.length == j) {
                  values[group_label].push(result.value[k])
               }
            }

         }

         // Some age group tidy ups:
         if (eq_groups[i] == "Age") {        
            values = sortObject(values);

            if (e == "Housing stress") {     // Reorder for Housing Stress

               reordered = {
                  "Under 18": values["Under 18"]
               };

               for (let i = 0; i < Object.keys(values).length - 1; i ++) {
                  reordered[Object.keys(values)[i]] = values[Object.keys(values)[i]];
               }

               values = reordered;
            }

            if (Object.keys(values).includes("16-34")) {    // When 16-34 is present in data, remove 16-24 and 25-34
               delete values["16-24"];
               delete values["25-34"];
            }

            if (Object.keys(values).includes("65+")) {      // When 65+ is present, remove 65-74 and 75+
               delete values["65-74"];
               delete values["75+"];
            }

            if (e == "Reoffending rate") {               // For reoffending rate, show only Adult and Youth
               values = {
                  "Adult": Object.values(values["Adult"]),
                  "Youth": Object.values(values["Youth"]),
               }
            }

         }

         if (eq_groups[i] == "Deprivation") {
            if (Object.keys(values).includes("Quintile 4/5")) {      // Deprivation tidy up. If 4/5 is present remove 4 and 5
               delete values["Quintile 4"];
               delete values["Quintile 5 - Least deprived"];
            }
         }

         if (eq_groups[i] == "Marital status") {
            if (Object.keys(values).includes("Divorced/Separated")) {   // Marital status tidy up. If Divorced/Separated is present remove Divorced and Separated
               delete values["Separated"];
               delete values["Divorced"];
            }
            if (Object.keys(values).includes("Married/Civil partnership/Cohabiting")) {
               delete values["Married/Civil partnership"];
            }
         }        

         let years_with_data = [];

         for (let i = 0; i < values[Object.keys(values)[0]].length; i ++) {
            if (values[Object.keys(values)[0]][i] != null) {
               years_with_data.push(i)
            }
         }

         let first_year = Math.min(...years_with_data);

         // Construct data object for chart.js bar chart
         var data = {
            labels: years.slice(first_year),
            datasets: []
         };         

         // Colour palette for bar charts:
         colours = ["#12436D", "#28A197", "#801650", "#F46A25", "#3D3D3D", "#A285D1"];

         for (let j = 0; j < Object.keys(values).length; j ++) {     // Loop through values and create each data series
            data.datasets.push({
               label: Object.keys(values)[j],
               data: values[Object.keys(values)[j]].slice(first_year),
               backgroundColor: [
                  colours[j % colours.length]
               ]
            })
         }

         // Chart configuration for chart.js
         const chart_config = {
            type: 'bar',
            data: data,
            options: {
               responsive: true,                   //  Allow resizing of canvas
               maintainAspectRatio: false,         // Any aspect ratio
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                     minRotation: 0,
                     maxRotation: 0
                  }
                },
                x: {
                  grid: {
                     lineWidth: 0,
                     drawTicks: true,
                     tickWidth: 1
                  },
                  ticks: {
                     minRotation: 0,
                     maxRotation: 0
                  }
                }
              },
              plugins: {
               legend: {
                  title: {
                     display: true,
                     text: "Click legend item to hide/show series in chart"
                  }
               }
              }
            },
          };

         new Chart(pop_canvas, chart_config);      // Plot chart
         
         note_text = result.note[0].replaceAll("\r", "").replaceAll("\n", "").replaceAll("[b] ", "[b]"); // Remove line break characters from note
         
         heading_text = "[b]" + eq_groups[i];   // Find heading text by bold tag and group name

         if (note_text.indexOf(heading_text) == -1) {       // If heading text can't be found, try capitalising first letter of second word and searching again
            heading_text = heading_text.slice(0, heading_text.indexOf(" ") + 1) +
                           heading_text.charAt(heading_text.indexOf(" ") + 1).toUpperCase() +
                           heading_text.slice(heading_text.indexOf(" ") + 2);
         }

         if (note_text.indexOf(heading_text) == -1) {       // If heading text still can't be found, try switching first letter of second word to lower case and searching again
            heading_text = heading_text.slice(0, heading_text.indexOf(" ") + 1) +
                           heading_text.charAt(heading_text.indexOf(" ") + 1).toLowerCase() +
                           heading_text.slice(heading_text.indexOf(" ") + 2);
         }

         note_text = note_text.replaceAll("[i]", " <i>");
         note_text = note_text.replaceAll("[/i]", "</i>");

         if (note_text.indexOf(heading_text) > -1) {

            note_text = note_text.slice(note_text.indexOf(heading_text) + heading_text.length).replaceAll("[/b]", " ").replaceAll("[/url]", "[/url] ").replaceAll(".", ". ");
            if (note_text.indexOf("[b]") > -1) {
               note_text = note_text.slice(0, note_text.indexOf("[b]"));
            }

            if (note_text.indexOf("ual orientation") == 0) {   // To differentiate between "Sex" and "Sexual orientation" headings
               note_text = ""
            }

            notes = [];

            note_number = Number(note_text.slice(note_text.indexOf(".") - 2, note_text.indexOf(".")).trim()); // Find first number note under the heading

            while(note_text.indexOf(note_number + ".") > -1) {
               if (note_text.indexOf((note_number + 1) + ".") > - 1) {
                  notes.push(note_text.slice(note_text.indexOf(note_number + ".") + (note_number + ".").length, note_text.indexOf((note_number + 1) + ".")));
               } else {
                  notes.push(note_text.slice(note_text.indexOf(note_number + ".") + (note_number + ".").length));
               }
               note_number = note_number + 1;
            }

            if (notes.length == 1) {
               note.innerHTML = "<p style = 'font-weight: bold; margin-bottom: 0px'>Note:</p>";
            } else if (notes.length > 1) {
               note.innerHTML = "<p style = 'font-weight: bold; margin-bottom: 0px'>Notes:</p>";
            }

            let notes_list = document.createElement("ol");

            for (j = 0; j < notes.length; j ++) {  
               notes_list_item = document.createElement("li");
               if (notes[j].indexOf(["[url="]) > -1) {      // Add hyperlinks to any url's found
                  link = notes[j].slice(notes[j].indexOf("[url=") + "[url=".length);
                  link = link.slice(0, link.indexOf("]")).replaceAll(". ", ".");
                  notes[j] = notes[j].slice(0, notes[j].indexOf("[url=")) + "<a href = '" + link + "' target = '_blank'>" + link + "</a>";
               }
               notes_list_item.innerHTML = notes[j];
               notes_list.appendChild(notes_list_item);
            }

            note.appendChild(notes_list);
         };           
  
     }

     if (i < eq_groups.length / 2) {  // Separate links into two columns within grey box
         document.getElementById("eq-col-1").appendChild(eq_link);
     } else {
         document.getElementById("eq-col-2").appendChild(eq_link);
     }
      
  }

}

// Function to draw a map. This function is called when there are any changes to the dropdown menus on the map screen
async function drawMap() {

   // Display the loading gif while this function runs
   var map_load = document.getElementById("map-load");
   map_load.style.display = "flex";
   

   // Hide map title during load
   var map_title = document.getElementById("map-title");
   map_title.style.color = "#fafafa";

   // Target div with id "map-container"
   var map_container = document.getElementById("map-container");

   // Delete any map already inside map-container
   while (map_container.firstChild) {
       map_container.removeChild(map_container.firstChild);
   }

   var matrix = map_select_3.value;

   // URL to query (pre-production)
   api_url = config.baseURL + "api.restful/PxStat.Data.Cube_API.ReadDataset/" + matrix + "/JSON-stat/2.0/en?apiKey=" + config.apiKey;

  // Fetch data and store in object fetched_data
  const response = await fetch(api_url);
  const fetched_data = await response.json();
  const {value, dimension, updated, note} = fetched_data;

  var unit = Object.values(Object.values(dimension)[0].category.unit)[0].label; // The unit of measurement according to the metadata

  var years = Object.values(dimension)[1].category.index; // All years present in the data

  var groups = Object.values(dimension)[2].category.index; // All the groupings present in the data (eg, LGD, AA)

  var num_groups = groups.length;     // The number of groups
  var NI_position = groups.indexOf("N92000002"); // Position of NI in list of groups

   if (NI_position > -1) {
      data_series = [];
      for (let i = 0; i < value.length; i ++) {
         if (i % num_groups != NI_position) {
            data_series.push(value[i])
         }
      }

      num_groups = num_groups - 1;

   } else {
      data_series = value
   }

   data_by_year = {}
   
   for (let i = 0; i < years.length; i ++) {

      data_for_year = data_series.slice(num_groups * i, num_groups * (i + 1));

      keep_year = false;
      for (let j = 0; j < data_for_year.length; j ++) {
         if (data_for_year[j] != null && data_for_year[j] != "N/A") {
            keep_year = true;
            break;
         }
      }

      if (keep_year == true) {
         data_by_year[years[i]] = data_for_year;
      }
      
   }
   
   years = Object.keys(data_by_year);

   all_values = [];
   for (let i = 0; i < data_series.length; i ++) {
      if (data_series[i] != null && data_series[i] != "N/A") {
         all_values.push(data_series[i])
      }
   }

   map_select_4 = document.getElementById("map-select-4");
   date_display = document.getElementById("date-display");

   map_select_4.min = "0";
   map_select_4.max = years.length - 1;
   map_select_4.value = years.length - 1;

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

   L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map); // Add a background map   

   function mapForYear () {

      selected_year = years[Number(map_select_4.value)];

      date_display.textContent = selected_year;

      selected_data = data_by_year[selected_year];

      var range_min = Math.floor(Math.min(...all_values));
      var range_max = Math.ceil(Math.max(...all_values));
      
      var range = range_max - range_min; // Calculate the range of values

      // Create an array colours, where each value is between 0 and 1 depending on where it falls in the range of values
      colours = [];
      for (let i = 0; i < selected_data.length; i++) {
         colours.push((selected_data[i] - range_min) / range);
      }

      if (map_select_2.value == "") {
       location.reload();
       return;
      }

      // Colour palettes for increasing/decreasing indicators
      if (domains_data[map_select_1.value].indicators[map_select_2.value].improvement == "increase") {
         var palette = ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"];
      } else {
         var palette = ["#f4d0cc", "#e9a299", "#df7366", "#d44533", "#c91600"];
      }

      // When called chooses a colour from above palette based on value of colours array
      function getColor(d) {

         if (d < 0) {
            return "#d3d3d3";
         } else {
            return palette[Math.round(d*4)];
         }
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
               
               if (selected_data[f.properties['OBJECTID'] - 1] != null) {
                  l.bindTooltip(f.properties[area_var] + " (" + selected_year + "): <b>" + selected_data[f.properties['OBJECTID'] - 1].toLocaleString("en-GB") + "</b> (" + unit + ")");
               } else {
                  l.bindTooltip(f.properties[area_var] + " (" + selected_year + "): <b>Not available</b>");
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
      
      if (typeof shapes !== "undefined") {
         shapes.clearLayers();
      }
      
      // geojson data atted to map and enhanceLayer function applied to each feature    
      if (matrix.slice(-3) == "LGD") {
            shapes = L.geoJSON(LGD_map, {onEachFeature:enhanceLayer}).addTo(map);
      } else {
            shapes = L.geoJSON(AA_map, {onEachFeature:enhanceLayer}).addTo(map);
      }      

      // Further info and how do we measure this divs:
      var measure_info_map = document.getElementById("measure-info-map");
      var further_info_map = document.getElementById("further-info-map");

      // Obtain further info text from query
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
         
         // URLS are converted
         link = further_note.slice(further_note.indexOf("[url"), further_note.indexOf("[/url]") + "[/url]".length);

         if (link != "") {
            linked_text = link.slice(link.indexOf("]" ) + 1, link.indexOf("[/"));
            url = link.slice(link.indexOf("=") + 1, link.indexOf("]"));

            further_note = further_note.replace(link, "<a href = '" + url + "' target = '_blank'>" + linked_text + "</a>")
         }

         further_note = further_note.replaceAll("[i]", "<em>");
         further_note = further_note.replaceAll("[/i]", "</em>");
      }
      
      further_note = "<ol><li>" + further_note.replace("1.", "") + "</li></ol>"

      for (let i = 2; i < 10; i++) {
         further_note = further_note.replaceAll("\n" + i + ".", "</li><li>")  // Line breaks are inserted between individidual points within "Further Information"
      }

      // Obtain how do we measure this text from query
      var measure_text = note[0];

      measure_string = "How do we measure this?"

      if (measure_text.indexOf(measure_string) > -1) {
         measure_text = measure_text.slice(measure_text.indexOf(measure_string) + measure_string.length).replace("[/b]", "");
         measure_text = measure_text.slice(0, measure_text.indexOf("[b]")).trim();
      } else {
         measure_string = "How is this measured?"
         if (measure_text.indexOf(measure_string) > -1) {
            measure_text = measure_text.slice(measure_text.indexOf(measure_string) + measure_string.length).replace("[/b]", "");
            measure_text = measure_text.slice(0, measure_text.indexOf("[b]")).trim();
         } else {
            measure_text = "";
         }
      }      

      // Write content to info boxes
      measure_info_map.innerHTML = measure_text;
      further_info_map.innerHTML = further_note;

      if (further_note == "Not available") {
         further_expander_map.style.display = "none";
     } else {
         further_expander_map.removeAttribute("style");
     }

      // Legend divs added to map
      if (!document.getElementById(matrix + "-legend")) {
         legend_div = document.createElement("div");
         legend_div.id = matrix + "-legend";
         legend_div.classList.add("map-legend");
         legend_row_1 = document.createElement("div");
         legend_row_1.classList.add("row");

         min_value = document.createElement("div");
         min_value.classList.add("legend-min");
         legend_row_1.appendChild(min_value);

         max_value = document.createElement("div");

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

      }        

      min_value.innerHTML = range_min.toLocaleString("en-GB");       
      max_value.innerHTML = range_max.toLocaleString("en-GB");      

      chart_title = Object.values(dimension.STATISTIC.category.label)[0];

      
      map_title.innerHTML = chart_title + " (" + selected_year + ")";

      var source_info_map = document.getElementById("source-info-map");

      // Source info pulled from data portal:
      source_info = note[0];

      source_info = source_info.slice(source_info.indexOf("[b]Source") + "[b]Source".length);
      source_info = source_info.slice(source_info.indexOf("[/b]") + "[/b]".length);
      source_info = source_info.slice(0, source_info.indexOf("[b]"));  

      if (source_info.indexOf("[url=") > 2) {
         source_name = source_info.slice(0, source_info.indexOf("[url=")).trim();
      } else {
         source_name = source_info.slice(source_info.indexOf("]") + 1);
         source_name = source_name.slice(0, source_name.indexOf("[/url]"));
      }

      source_link = source_info.slice(source_info.indexOf("[url=") + 5);
      source_link = source_link.slice(0, source_link.indexOf("]"));

      source_info_map.innerHTML = "This indicator is collected from <a href='" + source_link + "' target='_blank'>" + source_name + "</a>.";

      // Covid text extract
      covid_text = note[0];

      covid_string = "Impact of Covid-19";

      if (covid_text.indexOf(covid_string) > -1) {
         covid_text = covid_text.slice(covid_text.indexOf(covid_string) + covid_string.length).replace("[/b]", "");
         covid_text = covid_text.slice(0, covid_text.indexOf(["[b"])).trim();

         document.getElementById("covid-info-map").textContent = covid_text;
      }

      

   }

   mapForYear();

   map_select_4.oninput = function () {
      mapForYear();
   }

   // Footnote on when data was last updated
   var updated_note = "Updated on " + Number(updated.slice(8, 10)) + " " + getMonthName(updated.slice(5, 7)) + " " + updated.slice(0, 4);

   update_div = document.createElement("div");
   update_div.classList.add("map-date");
   update_div.innerHTML = updated_note;
   map_container.appendChild(update_div);

  // Hide loading gif after map is generated
  map_load.style.display = "none";
  map_title.removeAttribute("style");

}

// This function converts a number to a word
function number_to_word(n) {
   if (n < 0)
     return false;
   single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
   double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
   below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  if (n === 0) return 'Zero'
  function translate(n) {
     word = ""
     if (n < 10) {
        word = single_digit[n] + ' '
     }
     else if (n < 20) {
        word = double_digit[n - 10] + ' '
     }
     else if (n < 100) {
        rem = translate(n % 10)
        word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
     }
     else if (n < 1000) {
        word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
     }
     else if (n < 1000000) {
        word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000)
     }
     else if (n < 1000000000) {
        word = translate(parseInt(n / 1000000)).trim() + ' Million ' + translate(n % 1000000)
     }
     else {
        word = translate(parseInt(n / 1000000000)).trim() + ' Billion ' + translate(n % 1000000000)
     }
     return word
  }
   result = translate(n) 
  return result.trim()
}
