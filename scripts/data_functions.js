 // Function to return Short month name from number 1-12 (eg, 1 returns "Jan", 2 returns "Feb")
 function getMonthName(monthNumber) {
   const date = new Date();
   date.setMonth(monthNumber - 1);
 
   return date.toLocaleString('en-GB', {
     month: 'short',
   });
 }

 // Define a function named count that takes two parameters: main_str (the main string) and sub_str (the substring to count)
function count(main_str, sub_str) {
    // Convert main_str and sub_str to strings if they are not already
    main_str += '';
    sub_str += '';

    // If sub_str is an empty string or undefined, return the length of main_str plus 1
    if (sub_str.length <= 0) 
    {
        return main_str.length + 1;
    }

    // Escape special characters in sub_str for use in regular expression
    subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Count the occurrences of sub_str in main_str using a regular expression and return the count
    return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
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

   let currentDate = new Date().toISOString().split('T')[0];    

   dp_url = config.baseURL + "api.jsonrpc?data=%7B%0A%09%22jsonrpc%22:%20%222.0%22,%0A%09%22method%22:%20%22PxStat.Data.Cube_API.ReadCollection%22,%0A%09%22params%22:%20%7B%0A%09%09%22language%22:%20%22en%22,%0A%09%09%22datefrom%22:%20%22" + currentDate + "%22%0A%09%7D%0A%7D&apiKey=" + config.apiKey;

   // Fetch data and store in object fetched_data

   let has_error = false;

   try {
      const response = await fetch(dp_url);
      const fetched_data = await response.json();
      let dp_result = fetched_data;
      has_error = dp_result.hasOwnProperty("error");
   } catch (error) {
      has_error = true;
   }

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
            if (has_error) {
               api_url = `backup/${matrix}.json`
            } else {
               api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
            }
         } else if (indicator.data.EQ != "") {
            var matrix = indicator.data.EQ;
            var statistic = matrix.slice(0, -2);
            if (has_error) {
               api_url = `backup/${matrix}-NI-line.json`
            } else {
               api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22"+ matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
            }
         } else {
            var matrix = indicator.data.LGD;
            var statistic = matrix.slice(0, -3);
            if (has_error) {
               api_url = `backup/${matrix}-NI-line.json`
            } else {
               api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22LGD2014%22%5D,%22dimension%22:%7B%22LGD2014%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
            }
         }

         // The id the line chart canvas element will use
         var id = statistic + "-line";

         // Fetch data and store in object fetched_data
         const response = await fetch(api_url);          // fetches the content of the url
         const fetched_data = await response.json();     // we tell it the data is in json format
         const {result} = fetched_data;                  // and extract the result object key

         if (result == null) {   // Output message to console when indicator is not found / else continue with calculation
            console.warn("Warning: No indicator information found for " + indicators[j] + ". Refresh to try again. Check matrix spelling for indicator in domains_data.js if problem persists.");

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

   let currentDate = new Date().toISOString().split('T')[0];    

   dp_url = config.baseURL + "api.jsonrpc?data=%7B%0A%09%22jsonrpc%22:%20%222.0%22,%0A%09%22method%22:%20%22PxStat.Data.Cube_API.ReadCollection%22,%0A%09%22params%22:%20%7B%0A%09%09%22language%22:%20%22en%22,%0A%09%09%22datefrom%22:%20%22" + currentDate + "%22%0A%09%7D%0A%7D&apiKey=" + config.apiKey;

   // Fetch data and store in object fetched_data

   let has_error = false;

   try {
      const response = await fetch(dp_url);
      const fetched_data = await response.json();
      let dp_result = fetched_data;
      has_error = dp_result.hasOwnProperty("error");
   } catch (error) {
      has_error = true;
   }

   var indicator = domains_data[d].indicators[e];  // Select the information for the indicator from domains_data.js

   // In the first instance the function checks for NI data for the particular indicator,
   // then it checks for EQ and finally LGD data. The latter two api_url queries have filters that select only the NI data.
   if (indicator.data.NI != "") {
      var matrix = indicator.data.NI;
      var statistic = matrix.slice(0, -2);
      if (has_error) {
         api_url = `backup/${matrix}.json`
      } else {
         api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
      }
   } else if (indicator.data.EQ != "") {
      var matrix = indicator.data.EQ;
      var statistic = matrix.slice(0, -2);
      if (has_error) {
         api_url = `backup/${matrix}-NI-line.json`
      } else {
         api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22"+ matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
      }
   } else {
      var matrix = indicator.data.LGD;
      var statistic = matrix.slice(0, -3);
      if (has_error) {
         api_url = `backup/${matrix}-NI-line.json`
      } else {
         api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22LGD2014%22%5D,%22dimension%22:%7B%22LGD2014%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
      }
   }

   // The id the line chart canvas element will use
   var id = statistic + "-line";

   // Fetch data and store in object fetched_data
   const response = await fetch(api_url);          // fetches the content of the url
   const fetched_data = await response.json();     // we tell it the data is in json format
   const {result} = fetched_data;                  // and extract the result object key

    if (result == null) {
      console.warn("Warning: No indicator information found for " + e + ". Refresh to try again. Check matrix spelling for indicator in domains_data.js if problem persists.");
      document.getElementById("indicator-content").style.display = "none";
      
      warning_div = document.createElement("div");
      warning_div.id = "warning-div";
      warning_div.innerHTML = "<table><tr><td><i class='fa-solid fa-triangle-exclamation' style = 'margin-right: 5px;'></i></td><td>Information for the <b>" + e + "</b> indicator is currently not available on the NISRA Data Portal. Please try again later.</td></tr></table>" ;

      document.getElementById("indicator-scrn").appendChild(warning_div);

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
      y_axis_label = "Average (mean) life satisfaction score"
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
   } 
   if (matrix == "INDRESDEVNI") {
      min_value = 0;
      max_value = 2000;
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

   } else if (["INDATPUBEQ", "INDATWALKEQ"].includes(matrix)) {

      // First plot the line as far as 2019
      var data = {
         labels: years,
         datasets: [{
            label: 'Northern Ireland',
            data: data_series.slice(0, years.indexOf("2019") + 1),
            borderColor: "#000000",
            fill: false,
            pointBackgroundColor: "#000000"
         }]
      }

      var remaining_data = [];

      for (let i = 0; i < data_series.length; i ++) {
         if (i <= years.indexOf("2019")) {
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
                        position: {
                           x: "end",
                           y: "center"
                        }
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
                        position: {
                           x: "end",
                           y: "center"
                        }
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
      base_statement = "There is insufficient data available to determine whether this indicator is improving or worsening." + indicator.telling.insufficient
   } else if ((change_from_baseline >= current_ci & indicator.improvement == "increase") || (change_from_baseline <= (current_ci * -1) & indicator.improvement == "decrease")) {
      base_statement = "Things have improved since the comparison year in " + indicator.base_year + ". " + indicator.telling.improved;
   } else if ((change_from_baseline <= (current_ci * -1) & indicator.improvement == "increase") || (change_from_baseline >= current_ci & indicator.improvement == "decrease")) {
      base_statement = "Things have worsened since the comparison year in " + indicator.base_year + ". " + indicator.telling.worsened;
   } else {
      base_statement = "There has been no real change since the comparison year in " + indicator.base_year + ". " + indicator.telling.no_change;
   };
   
   // Create statement div
   base_statement_div = document.createElement("div");      
   base_statement_div.id = matrix + "-base-statement";
   base_statement_div.classList.add("white-box");
   base_statement_div.classList.add("base-statement");
   base_statement_div.innerHTML = "<div>" + base_statement + "</div>";

   document.getElementById("change-info").appendChild(base_statement_div);

   // Load/re-load a domain page if user clicks on hexagon while loop is still executing
   var clicked_hex = document.getElementById("clicked-hex");
   if (clicked_hex.textContent != "") {
      generateHexagons(clicked_hex.textContent)
   }

   // Create further info div
   var further_note = note[0].replaceAll("\n", "");

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

      while(further_note.indexOf("[url") > -1) {

         link = further_note.slice(further_note.indexOf("[url"), further_note.indexOf("[/url]") + "[/url]".length);

         linked_text = link.slice(link.indexOf("]" ) + 1, link.indexOf("[/"));
         url = link.slice(link.indexOf("=") + 1, link.indexOf("]"));

         further_note = further_note.replace(link, "<a href = '" + url + "' target = '_blank'>" + linked_text + "</a>")

      }      

      further_note = further_note.replaceAll("[i]", "<em>");                              // Italic text tags are converted
      further_note = further_note.replaceAll("[/i]", "</em>");
      further_note = further_note.replaceAll("“", '"');
      further_note = further_note.replaceAll("”", '"')
   }

   notes = further_note.split("\r");

   for (let i = notes.length - 1; i >= 0; i --) {
      if (notes[i].charAt(0) <= "9" && notes[i].charAt(0) >= "0") {
         notes[i] = notes[i].substring(notes[i].indexOf(".") + 1).trim();
      } else {
         notes[i - 1] += notes[i];
         notes[i] = "";
      }
   }
   
   notes = notes.filter(function (n) {return n != "" & n != " "})

   // Div element created for "Further information" and placed in html document:
   further_info_div = document.createElement("div");
   further_info_list = document.createElement("ol");
   further_info_div.id = matrix + "-further-info";
   further_info_div.classList.add("further-info-text");
   further_info_div.classList.add("further-selected");

   for (let i = 0; i < notes.length; i++) {
      further_info_list.innerHTML += "<li>" + notes[i] + "</li>"
   }
   
   further_info_div.appendChild(further_info_list);

   document.getElementById("further-info").appendChild(further_info_div);

   if (further_note == "Not available") {
      document.getElementById("further-expander").style.display = "none";
  }

  // The source info is pulled out of the note object
  source_info = note[0];

  // The paragraph containing the source information is isolated:
  source_info = source_info.slice(source_info.indexOf("Source") + "Source".length);
  source_info = source_info.slice(source_info.indexOf("[/b]") + "[/b]".length);
  source_info = source_info.slice(0, source_info.indexOf("[b]"));

  num_links = count(source_info, "[url=");

  // Div element created and placed in html document:
  source_info_div = document.createElement("div");
  source_info_div.id = matrix + "-source-info";
  source_info_div.classList.add("source-info-text");

  if (num_links == 1) {

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
   
   source_info_div.innerHTML = "This indicator is collected from <a href='" + source_link + "' target='_blank'>" + source_name + "</a>.";

} else {

   source_names = [];
   source_links = [];
   names_long = source_info;
   links_long = source_info;
   source_info_div.innerHTML = "This indicator is collected from "

   for (let i = 0; i < num_links; i ++) {

      source_names.push(names_long.slice(0, names_long.indexOf("[url=")).replaceAll("\r\n", ""));
      names_long = names_long.slice(names_long.indexOf("[/url]") + "[/url]".length);

      source_links.push(links_long.slice(links_long.indexOf("[url=") + "[url=".length, links_long.indexOf("]")));
      links_long = links_long.slice(links_long.indexOf("[/url]") + "[/url]".length);

      if (i != 0 & i != num_links - 1) {
         source_info_div.innerHTML += ", ";
      } else if (i == num_links - 1) {
         source_info_div.innerHTML += " and ";
      }

      source_info_div.innerHTML += "<a href='" + source_links[i] + "' target='_blank'>" + source_names[i] + "</a>";

   }

   source_info_div.innerHTML += ".";

}

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

   while(covid_text.indexOf("[url") > -1) {

      link = covid_text.slice(covid_text.indexOf("[url"), covid_text.indexOf("[/url]") + "[/url]".length);

      linked_text = link.slice(link.indexOf("]" ) + 1, link.indexOf("[/"));
      url = link.slice(link.indexOf("=") + 1, link.indexOf("]"));

      covid_text = covid_text.replace(link, "<a href = '" + url + "' target = '_blank'>" + linked_text + "</a>")

   } 

   document.getElementById("covid-info").innerHTML = covid_text;
  }

}

// This function will read the categories within the EQUALGROUPS variable, then output the available groups in the grey box
// Each group will then be linked to a pop-up that calls the data for that group from the data portal and plots bar chart
async function getEqualityGroups(d, e) {

   let currentDate = new Date().toISOString().split('T')[0];    

   dp_url = config.baseURL + "api.jsonrpc?data=%7B%0A%09%22jsonrpc%22:%20%222.0%22,%0A%09%22method%22:%20%22PxStat.Data.Cube_API.ReadCollection%22,%0A%09%22params%22:%20%7B%0A%09%09%22language%22:%20%22en%22,%0A%09%09%22datefrom%22:%20%22" + currentDate + "%22%0A%09%7D%0A%7D&apiKey=" + config.apiKey;

   // Fetch data and store in object fetched_data

   let has_error = false;

   try {
      const response = await fetch(dp_url);
      const fetched_data = await response.json();
      let dp_result = fetched_data;
      has_error = dp_result.hasOwnProperty("error");
   } catch (error) {
      has_error = true;
   }

   var matrix = domains_data[d].indicators[e].data.EQ;   // The matrix for the EQ dataset

   if (has_error) {
      var api_url = `backup/${matrix}.json`;
   } else {
      var api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
   }   

   // Fetch data and store in object fetched_data
  const response = await fetch(api_url);
  const fetched_data = await response.json();
  const dimension = fetched_data.result.dimension;

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

  if (e == "Skills") {
   eq_groups.push("Skills Level");
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
         loading.src = "data:image/gif;base64,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sMQWa+yxyCar7LLMNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2zxxRhnrPHGHHfs8ccghyzyyCSXbPLJKKes8sost+zyyzDHLPPMNNds880456zzzjz37PPPQAct9NBEF2300UgnrfTSTDft9NNQRy311FRXbfXVWGet9dZcd+3112CHLfbYZJdt9tlop6322my37fbbcMct99x012333Xjnrfdv3nz37fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlmGeu+eacd+7556CHLvropJdu+umop6766qy37vrrsMcu++y0Qx7OArjnvoA8ct+uO+68x+3778HDPbzuxb99fO7Ju7088L3/DnxAACH5BAUUAP8ALCsAAAAgAEQAAAj+AP8JHEiQYD9gxPoVXMiw4T9yZDRoABPOocWC8ApJ3KjBj7uLDvndksGR44tT/EAWfDalpEsNU5Sp/KfOzsubGuSgs2hv0wmcOE9cwrewH7EgQJNqCAJMoUBzYJRK1UBm5z9RU6euEog1q9KtV71+5So2KdiuZW+eTYtzLduXbt+WjCt3I926Gu7W1SuX71u/bAGn3aoPLd68KS0d3rhJoCdsWvBaiVaKoEgabHG8SskQHqSyheSBJIdmKpltMwUeBVqEWGqC+k6tcCmU6OuC7GxulKPutkPIk31b5MdOnr/jyJMjJ6i8ufPnx5lDn/5cOvXrywdi3+7POvfp3r9YVxeIqp946P3Amjs/vdq/dOyn81sfv779+/jz69/Pv7///wAGKOCAztHjH1Hb8GcODf+goo9++qii3X7h3Vfhd04xFF+GDZ1n3ngCiceZcAXxA888+swUEAAh+QQFFAD/ACwqACIAIQBFAAAI/gD/CRxIsCC+TZv0FVzIsKFAYkE0aAgCrJ/DiwXJlZHIUUOZcBgvwoPUsaSGQvBCFuR3i4ZJky9O8VP579mUlzg1TJGGUZ2dnEA1yEG30JO9TSeCBj1xCV+pgZZ8KJ06sZPAbaKoUl1VTmBWrUpXDfwKFqhYr2WDnv1HNu3LtW3dloQrFyfduibv4u2od6/Evn4B7xWMl3Bdw3LPxos7OOU/S0n9aljRSYZAT+x+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7aq5eQsf3tP376LBiStfrtL48ZnJmUufvtH58+gF8aFipY+69+8Erf4f9+SvvPnz6NOrB8+etvjf5NXLn2++vf3V72/Hp88f/f3/ouX32n79FQjggZgJeBqBBfKH4IOtPScWgw3OB+GFgin4WWj9VDhfPxiGeJeGk4Hijof0uXOKiCyiRc1UEhKVwzYo8lfOFC3myFVQQz3HQCb81NhfP7foaGRWMEl2WgA2CVnhkVA+tc0Tpx2RjZM1RqmlUv3w4gFiJcjSIZZCbmkmT229JZZc9ZBJ5plw5nROGFV1cY6bePoT554sSTWTDczkKaiefBZqkj6coBLkoIIa6uhDjEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq/6wxirrrLTWauutuOaq66689urrr8AGK+ywxBZr7LHIJqvsssw26+yz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuORq++i56Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcs8MAEF2zwwQgnrPDCDDfs8MMQRyzxxBRXbPHFGGes8cYcd+zxxyCHLPLIJJds8skop6zyyiy37PLLMMcs88w012zzzTjnrPPOPPfs889ABy300EQXbfTRSCet9NJMN+3001BHLfXUVFdt9dVYZ6311lx37fXXYIct9thkl2322WinrfbabLft9ttwxy333HTXbffdeOet9zPefPft99+ABy744IQXbvjhiCeu+OKMN+7445BHLvnklCsX6uSXS5555JtD3vnjnzseakAAOw==";        // image page
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

         // Function to transform query select statement into valid URL string
         function transformQuery (query) {

            let chars = {
               ' ': '',
               '"': '%22',
               '{': '%7B',
               '}': '%7D',
               '[': '%5B',
               ']': '%5D',
               '\n': '',
               '\t': ''
            };
            
            for (let j = 0; j < Object.keys(chars).length; j ++) {
               query = query.replaceAll(Object.keys(chars)[j], Object.values(chars)[j])
            }

            return(query);
         }

         // Function that takes shorter input for EQUALGROUPS selection
         // Input to funciton in format queryURL('["x","y"]') to cover numeric indexes of all groups that should be included in query
         function queryURL (query) {
            return(
               config.baseURL +
               transformQuery('api.jsonrpc?data={"jsonrpc":"2.0","method":"PxStat.Data.Cube_API.ReadDataset","params":{"class":"query","id":["EQUALGROUPS"],"dimension":{"EQUALGROUPS":{"category":{"index":') + 
               transformQuery(query) +
               transformQuery('}}},"extension":{"pivot":null,"codes":false,"language":{"code":"en"},"format":{"type":"JSON-stat","version":"2.0"},"matrix":"') +
               matrix +
               transformQuery('"},"version":"2.0"}}') + 
               '&apiKey=' + 
               config.apiKey)
         }
         
         // Contruct api query based on which grouping is selected:
         if (has_error) {
            if (eq_groups[i] == "Skills Level") {
               chart_data_url = "backup/INDSKILLSLEV.json"
            } else {
               chart_data_url = "backup/" + matrix + "-" + eq_groups[i].replaceAll(" ", "-") + ".json";
            }
         } else {
            if (eq_groups[i] == "Sex") {            
               chart_data_url = queryURL('["1","2"]')
            } else if (eq_groups[i] == "Age") {
               chart_data_url = queryURL('["76","59","45","46","47","48","49","99","3","38","50","52","37","60","53","100","54","4","61","55","69","5","56","70","57","6","71","62","58","7","72","36","8","51"]')
            } else if (eq_groups[i] == "Marital status") {
               chart_data_url = queryURL('["9","10","41","11","12","13","39"]')
            } else if (eq_groups[i] == "Dependants") {
               chart_data_url = queryURL('["17","18"]');
            } else if (eq_groups[i] == "Disability") {
               chart_data_url = queryURL('["19","20"]')
            } else if (eq_groups[i] == "Ethnic group") {
               chart_data_url = queryURL('["21","22"]')
            } else if (eq_groups[i] == "Sexual orientation") {
               chart_data_url = queryURL('["23","24"]')
            } else if (eq_groups[i] == "Deprivation") {
               chart_data_url = queryURL('["25","26","27","28","29","40"]')
            } else if (eq_groups[i] == "Urban Rural") {
               chart_data_url = queryURL('["30","31","32"]')
            } else if (eq_groups[i] == "Political opinion") {
               chart_data_url = queryURL('["33","34","35"]')
            } else if (eq_groups[i] == "Religion") {
               chart_data_url = queryURL('["14","15","16"]')
            } else if (eq_groups[i] == "Household Group") {
               chart_data_url = queryURL('["63","64","65","66","67","68","93","94","95","96","97","98"]')
            } else if (eq_groups[i] == "Tenure") {
               chart_data_url = queryURL('["42","43","44","75"]')
            } else if (eq_groups[i] == "Special Educational Needs") {
               chart_data_url = queryURL('["73","74"]')
            } else if (eq_groups[i] == "Skills Level") {
               chart_data_url = transformQuery(config.baseURL + 'api.jsonrpc?data={"jsonrpc":"2.0","method":"PxStat.Data.Cube_API.ReadDataset","params":{"class":"query","id":[],"dimension":{},"extension":{"pivot":null,"codes":false,"language":{"code":"en"},"format":{"type":"JSON-stat","version":"2.0"},"matrix":"' + matrix.replace("EQ", "LEV") + '"},"version":"2.0"}}&apiKey=' + config.apiKey);
            } else if (eq_groups[i] == "Offence category") {
               chart_data_url = queryURL('["81","82","83","84","85","86","87"]')
            } else if (eq_groups[i] == "Court type") {
               chart_data_url = queryURL('["88","89","90"]')
            }   else if (eq_groups[i] == "Year group") {
               chart_data_url = queryURL('["77","78","79","80"]')
            }   else if (eq_groups[i] == "Free School Meals") {
               chart_data_url = queryURL('["91","92"]')
            }   else if (eq_groups[i] == "Industry Sector") {
               chart_data_url = queryURL('["101","102","103","104","105","106","107","108","109"]')
            }  else if (eq_groups[i] == "Occupation") {
               chart_data_url = queryURL('["110","111","112","113","114","115","116","117","118"]')
            }  else if (eq_groups[i] == "Work pattern") {
               chart_data_url = queryURL('["123","124"]')
            }  else if (eq_groups[i] == "Work pattern by Sex") {
               chart_data_url = queryURL('["119","120","121","122"]')
            }
         } 

         var result = null;   // Retry plotting chart if data portal link doesn't work first time
         while (result == null) {
            const response = await fetch(chart_data_url);          // fetches the content of the url
            const fetched_data = await response.json();     // we tell it the data is in json format
            result = fetched_data.result;                  // and extract the result object key
            
         }

        

         // After succesful fetch from data portal the loading image is removed and chart is displayed
         loading.style.display = "none";
         y_axis.style.display = "flex";
         pop_up_container.style.display = "block";
         pop_up_chart.style.backgroundColor = "#FFFFFF";

         // Chart centred
         chart_row.style.marginLeft = (pop_up_chart.clientWidth - y_axis.clientWidth - pop_up_container.clientWidth) / 2 + "px";

         // Obtain category labels within each grouping and the values for each:
         if (result.dimension.hasOwnProperty("EQUALGROUPS")) {
            indexes = Object.values(result.dimension.EQUALGROUPS.category.index);
            groups = [];
            for (let j = 0; j < indexes.length; j ++) {
               groups.push(result.dimension.EQUALGROUPS.category.label[indexes[j]])
            }
         } else {
            groups = Object.values(result.dimension.STATISTIC.category.label)
         }       

         values = {};   // Empty object

         if (eq_groups[i] == "Skills Level") {
            
            for (let j = 0; j < groups.length; j ++) {
               values[groups[j]] = result.value.slice(j * result.value.length / groups.length, (j + 1) * result.value.length / groups.length)
            }

         } else {

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

         // Determine first year that has data in it for particular sub-population
         let first_year = [];
         let year = 0;

         while (first_year.length == 0) {
            if (values[Object.keys(values)[0]][year] != null) {
               first_year.push(year)
            }
            year = year + 1
         }

         // Construct data object for chart.js bar chart
         var data = {
            labels: years.slice(first_year),
            datasets: []
         };         

         // Colour palette for bar charts:
         colours = ["#12436D", "#28A197", "#801650", "#F46A25", "#3D3D3D", "#A285D1", "#0A4D46","#F66068","#472C4C"];

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
         
         note_text = result.note[0].replaceAll("[b] ", "[b]").replaceAll("\n", "");         
         
         if (eq_groups[i] == "Skills Level") {
            heading_text = "[b]Further Information"
         } else {
            heading_text = "[b]" + eq_groups[i];   // Find heading text by bold tag and group name
         }

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

            note_text = note_text.slice(note_text.indexOf(heading_text) + heading_text.length).replaceAll("[/b]", " ").replaceAll("[/url]", "[/url] ") //.replaceAll(".", ". ");
            
            if (note_text.indexOf("[b]") > -1) {
               note_text = note_text.slice(0, note_text.indexOf("[b]"));
            }

            if (note_text.indexOf("ual orientation") == 0) {   // To differentiate between "Sex" and "Sexual orientation" headings
               note_text = ""
            }

            notes = note_text.split("\r")

            for (let i = notes.length - 1; i >= 0; i --) {
               if (notes[i].charAt(0) <= "9" && notes[i].charAt(0) >= "0") {
                  notes[i] = notes[i].substring(notes[i].indexOf(".") + 1).trim();
               } else {
                  notes[i -1] += notes[i];
                  notes[i] = "";
               }
            }
            
            notes = notes.filter(function (n) {return n != "" & n != " "})

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

   let currentDate = new Date().toISOString().split('T')[0];    

   dp_url = config.baseURL + "api.jsonrpc?data=%7B%0A%09%22jsonrpc%22:%20%222.0%22,%0A%09%22method%22:%20%22PxStat.Data.Cube_API.ReadCollection%22,%0A%09%22params%22:%20%7B%0A%09%09%22language%22:%20%22en%22,%0A%09%09%22datefrom%22:%20%22" + currentDate + "%22%0A%09%7D%0A%7D&apiKey=" + config.apiKey;

   // Fetch data and store in object fetched_data

   let has_error = false;

   try {
      const response = await fetch(dp_url);
      const fetched_data = await response.json();
      let dp_result = fetched_data;
      has_error = dp_result.hasOwnProperty("error");
   } catch (error) {
      has_error = true;
   }

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
   if (has_error) {
      api_url = "backup/" + matrix + ".json";
   } else {
      api_url = config.baseURL + "api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22" + matrix + "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=" + config.apiKey;
   }

  // Fetch data and store in object fetched_data
  const response = await fetch(api_url);
  const fetched_data = await response.json();
  const {result} = fetched_data;

   if (await result == null) {
      document.getElementById("map-content").style.display = "none";

      warning_div = document.createElement("div");
      warning_div.id = "warning-div";
      warning_div.innerHTML = "<table><tr><td><i class='fa-solid fa-triangle-exclamation' style = 'margin-right: 5px;'></i></td><td>Information for the <b>" + map_select_2.value + "</b> indicator is currently not available on the NISRA Data Portal. Please try again later.</td></tr></table>" ;

      document.getElementById("maps-scrn").appendChild(warning_div);

   } else {

      document.getElementById("map-content").style.display = "block";
      if (document.getElementById("warning-div")) {
         document.getElementById("warning-div").style.display = "none";
      }

      let value = result.value;
      let dimension = result.dimension;
      let updated = result.updated;
      let note = result.note;      

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

      // Fix in Self-efficacy by LGD map. Blank value for Fermanagh and Omagh in 2020/21 was uploaded to portal with "*" character instead of a blank.
      for (let i = 0; i < data_series.length; i ++) {
         if (data_series[i] == "*") {
            data_series[i] = null;
         }
      }
      
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
         var further_note = note[0].replaceAll("\n", "");

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
            while(further_note.indexOf("[url") > -1) {

               link = further_note.slice(further_note.indexOf("[url"), further_note.indexOf("[/url]") + "[/url]".length);
      
               linked_text = link.slice(link.indexOf("]" ) + 1, link.indexOf("[/"));
               url = link.slice(link.indexOf("=") + 1, link.indexOf("]"));
      
               further_note = further_note.replace(link, "<a href = '" + url + "' target = '_blank'>" + linked_text + "</a>")
      
            } 

            further_note = further_note.replaceAll("[i]", "<em>");
            further_note = further_note.replaceAll("[/i]", "</em>");
         }
         
         notes = further_note.split("\r");

         for (let i = notes.length - 1; i >= 0; i --) {
            if (notes[i].charAt(0) <= "9" && notes[i].charAt(0) >= "0") {
               notes[i] = notes[i].substring(notes[i].indexOf(".") + 1).trim();
            } else {
               notes[i - 1] += notes[i];
               notes[i] = "";
            }
         }
         
         notes = notes.filter(function (n) {return n != "" & n != " "})

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

         further_list = document.createElement("ol");

         for (let i = 0; i < notes.length; i ++) {
            further_list.innerHTML += "<li>" + notes[i] + "</li>"
         }

         // Date slider causing further info to duplicate. Remove any content in div before outputting list.
         if (further_info_map.firstChild) {
            further_info_map.removeChild(further_info_map.firstChild);
         }

         further_info_map.appendChild(further_list);

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
         source_info = note[0].replaceAll("\r", "").replaceAll("\n", "");

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

            while(covid_text.indexOf("[url") > -1) {

               link = covid_text.slice(covid_text.indexOf("[url"), covid_text.indexOf("[/url]") + "[/url]".length);
         
               linked_text = link.slice(link.indexOf("]" ) + 1, link.indexOf("[/"));
               url = link.slice(link.indexOf("=") + 1, link.indexOf("]"));
         
               covid_text = covid_text.replace(link, "<a href = '" + url + "' target = '_blank'>" + linked_text + "</a>")
         
            } 

            document.getElementById("covid-info-map").innerHTML = covid_text;
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

   }

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

// Define function to test if data portal is operational
async function dataPortalLive () {

   let currentDate = new Date().toISOString().split('T')[0];    

   api_url = config.baseURL + "api.jsonrpc?data=%7B%0A%09%22jsonrpc%22:%20%222.0%22,%0A%09%22method%22:%20%22PxStat.Data.Cube_API.ReadCollection%22,%0A%09%22params%22:%20%7B%0A%09%09%22language%22:%20%22en%22,%0A%09%09%22datefrom%22:%20%22" + currentDate + "%22%0A%09%7D%0A%7D&apiKey=" + config.apiKey;

   // Fetch data and store in object fetched_data

   let has_error = false;
   let result = null;

   try {
      const response = await fetch(api_url);
      const fetched_data = await response.json();
      let result = fetched_data;
      has_error = result.hasOwnProperty("error");
   } catch (error) {
      result = null;
      has_error = true;
   }

   // if (has_error) {
      
   //    screens = document.getElementsByClassName("screen");

   //    for (let i = 0; i < screens.length; i ++) {
   //       screens[i].style.display = "none";
   //    }

   //    warning_div = document.createElement("div");
   //    warning_div.id = "warning-div";
   //    warning_div.innerHTML = "<table><tr><td><i class='fa-solid fa-triangle-exclamation' style = 'margin-right: 5px;'></i></td><td>The NISRA Data Portal is currently offline for maintenance. Please try again later.</td></tr></table>";

   //    document.getElementById("main-container").appendChild(warning_div);
   // }

   showCookieBanner();         // Cookie banner pop-up see "cookies_script.js"
   sizeForMobile();            // Resize and re-position page elements
   mainContainerHeight();      // See above
   if (maps_scrn.style.display == "block") {
      drawMap();
   }
   removeAriaFromIcons();

}
