// Create variable names for various html elements defined in "index.html" so they can be referred to with shorter names further down the code
var top_menu_items = document.getElementsByClassName("top-menu-item");
var back_button_container = document.getElementById("back-button-container");
var button_container = document.getElementById("button-container");
var button_left = document.getElementById("button-left");
var button_right = document.getElementById("button-right");
var domains_grid_container = document.getElementById("domains-grid-container");
var hexagons = document.getElementsByClassName("hex-inner");
var domains_title = document.getElementById("domains-title");
var domain_info = document.getElementById("domain-info-container");
var clicked_hex = document.getElementById("clicked-hex");
var domain_name_text = document.getElementById("domain-name");
var click_to_see = document.getElementById("click-to-see");
var clicked_desc = document.getElementById("clicked-desc");
var indicator_hexes = document.getElementById("indicator-hexes");
var domains_intro = document.getElementById("domains-intro");
var indicator_intro = document.getElementById("indicator-intro");
var button_rows = document.getElementsByClassName("button-row");
var domains_scrn = document.getElementById("domains-scrn");
var overall_scrn = document.getElementById("overall-scrn");
var indicator_scrn = document.getElementById("indicator-scrn");
var maps_scrn = document.getElementById("maps-scrn");
var domain_title = document.getElementById("domain-title");
var indicator_title = document.getElementById("indicator-title");
var ind_important = document.getElementById("ind-important");
var data_info = document.getElementById("data-info");
var map_link = document.getElementById("map-link");
var domains_btn = document.getElementById("domains-btn");
var maps_btn = document.getElementById("maps-btn");
var overall_btn = document.getElementById("overall-btn");
var map_select_1 = document.getElementById("map-select-1");
var map_select_2 = document.getElementById("map-select-2");
var map_select_3 = document.getElementById("map-select-3");
var key = document.getElementById("key");
var top_menu = document.getElementById("top-menu");
var footer = document.getElementsByTagName("footer")[0];
var main_container = document.getElementById("main-container");
var prototype = document.getElementById("prototype");
var further_expander_map = document.getElementById("further-expander-map");
var further_info_map = document.getElementById("further-info-map");
var map_title = document.getElementById("map-title");
var data_info_map = document.getElementById("data-info-map");
var ind_important_map = document.getElementById("ind-important-map");
var line_chart_container = document.getElementById("line-chart-container");
var map_container = document.getElementById("map-container");
var top_menu_items_div = document.getElementById("top-menu-items");
var white_box = document.getElementsByClassName("white-box");
var top_container = document.getElementById("top-container");
var dashboard_title = document.getElementById("dashboard-title");
var nisra_logo_container = document.getElementById("nisra-logo-container");
var footer_container = document.getElementById("footer-container");
var button_rows = document.getElementsByClassName("button-row");
var map_form = document.getElementById("map-form");
var map_label_2 = document.getElementById("map-label-2");
var map_label_3 = document.getElementById("map-label-3");
var breaks = map_form.getElementsByTagName('br');
var domain_info_container = document.getElementById("domain-info-container");
var domain_count = document.getElementById("domain-count");
var box_containers = document.getElementsByClassName("box-container");
var further_expander = document.getElementById("further-expander");
var user_guide_link = document.getElementsByClassName("user-guide-link");
var help_scrn = document.getElementById("help-scrn");
var help_btn = document.getElementById("help-btn");
var chart_link = document.getElementById("chart-link");
var further_infos = document.getElementsByClassName("further-info-text");
var hex_rows = document.getElementsByClassName("hex-row");
var nav_buttons = document.getElementsByClassName("nav-btn");
var search_btn = document.getElementById("search-btn");
var search_text = document.getElementById("search-text");

// Top menu navigation:
for (let i = 0; i < top_menu_items.length; i++) {
    // Create a function for each top menu item
    top_menu_items[i].onclick = function() {

        // Hides the indicators screen
        indicator_scrn.style.display = "none";

        for (let j = 0; j < top_menu_items.length; j++) {

            // the id of the clicked menu item
            var clicked_id = document.getElementById(top_menu_items[j].id);            

            // Switch view to screen relating to clicked item
            if (document.getElementById(top_menu_items[i].id) == clicked_id) {

                // Extra steps for domain screen when indicator screen is foreground
                if (top_menu_items[i].id == "domains-btn") {
                    domains_scrn.getElementsByTagName("h2")[0].style.display = "block"; // Show the title
                    domain_info_container.style.display = "none";       // Hide the domain info
                    domains_grid_container.style.display = "block";     // Show the domains grid
                    click_to_see.style.display = "block";               // Show click to see text
                    domains_intro.style.display = "block";              // Show the domains intro
                    indicator_intro.style.display = "none";             // Hide the indicator intro
                }

                // Updates highlighted item in menu and brings relevant screen to foreground
                clicked_id.classList.add("selected-item");                                          
                clicked_id.firstChild.classList.add("selected-icon");
                document.getElementById(clicked_id.id.replace("btn", "scrn")).style.display = "block";

            } else {
                // Hides all other screens that don't match the one clicked
                clicked_id.classList.remove("selected-item");
                clicked_id.firstChild.classList.remove("selected-icon");
                document.getElementById(clicked_id.id.replace("btn", "scrn")).style.display = "none";
            }

        }
        
        // Run the function to draw a map
        drawMap();

        // Hide expanded further info if navigating from indicator page
        for (let i = 0; i < further_infos.length; i++) {
            further_infos[i].removeAttribute("style");
            further_infos[i].classList.remove("further-selected");
        }

        further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
        further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
        further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");

        // Remove any navigation buttons:
        while (back_button_container.firstChild) {
            back_button_container.removeChild(back_button_container.firstChild);
        }

        for (let i = 0; i < button_rows.length; i ++) {
            button_rows[i].style.display = "none";
        } 

        // Re-draw overall hexagon grid (see function below)
        plotOverallHexes("improving");
        plotOverallHexes("no_change");
        plotOverallHexes("worsening");

    }

    

}

// Count the number of domains in domains_data.js and update text on Domains screen
domains_title.textContent = number_to_word(domains.length) + " Wellbeing Domains";
domain_count.textContent = number_to_word(domains.length).toLowerCase();

// Generate hex grid of domains
var domains = Object.keys(domains_data);

// Loop through every domain in order to create hexagon and place each hexagon in a grid
for (let i = 0; i < domains.length; i++) {

    // Plot the domain hexagons in alternating rows of 3 and 4 hexagons
    if (i % 7 == 0 || i % 7 == 3) {
        var hex_row = document.createElement("div");    // Create a div for the hexagon row
        hex_row.classList.add("row");                   // Add the class "row"
        hex_row.classList.add("hex-row");               // Add the class "hex-row"
        domains_grid_container.appendChild(hex_row);    // Place the div in the div "domains-grid-container"
    }

    var hex = document.createElement("div");            // Create the first div which will be the blue hexagon that acts as a border
    var hex_inner = document.createElement("div");      // Create the second div which is the green heaxagon

    hex.classList.add("hex");                           // Give outer hexagon class "hex"
    hex_inner.classList.add("hex-inner");               // Give inner hexagon class "hex-inner"
    hex_inner.textContent = domains[i];                 // Label the inner div with the name of the domain
    hex.appendChild(hex_inner);                         // Place the inner div in the outer one
    hex_row.appendChild(hex);                           // Place the outer hexagon div in the hexagon row

}

// Loop through each row that has been created and indent
for (let i = 0; i < hex_rows.length; i++) {
    if (i % 2 == 0) {
        hex_rows[i].style.marginLeft = "100px"; // Every odd numbered row will be indented by the width of half a hexagon
    }

    if (i > 0) {
        hex_rows[i].style.marginTop = "-33px";  // Every row after the first row will be moved up so hexagons appear closer together
    }
}




// Function to generate indicator page for domain "d" and indicator "e"
// The function is called when an indicator hexagon is clicked on or when a
// "next indicator" or "previous indicator" button is clicked
function generateIndicatorPage(d, e) {

    domains_scrn.style.display = "none";    // If visible hide Domains screen
    overall_scrn.style.display = "none";    // and hide Overall screen
    indicator_scrn.style.display = "block"; // then show the Indicator screen

    domain_title.innerHTML = d;             // Place the domain name inside the "domain-title" div element

    indicator_title.innerHTML = e;          // Place the indicator name inside the div element "indicator-title"
    ind_important.innerHTML = domains_data[d].indicators[e].importance;   // Update the indicator importance div element
    
    var data = domains_data[d].indicators[e].data;      // The nested "data" object for the relevant indicator

    // Need to determine the data portal matrix and id of the chart created for this indicator. (see createLineChart() function in "data-functions.js" script)
    if (data.NI != "") {
        chart_id = data.NI.slice(0, -2) + "-line";
        matrix = data.NI;                               
    } else if (data.EQ != "") {
        chart_id = data.EQ.slice(0, -2) + "-line";
        matrix = data.EQ;
    } else if (data.LGD != "") {
        chart_id = data.LGD.slice(0, -3) + "-line";
        matrix = data.LGD;
    }

    // An array of all line charts
    var line_charts = document.getElementsByClassName("line-chart");

    // Loop through the array of all line charts
    for (let k = 0; k < line_charts.length; k++) {

        if (line_charts[k].id == chart_id) {
            document.getElementById(chart_id).style.display = "block";  // If the id of a line chart matches the one generated above "chart_id" then display it
        } else {
            line_charts[k].style.display = "none";      // Otherwise hide it
        }

    }

    data_info.innerHTML = writeDataInfo(data);   // Place sentence in "data-info" div

    // Determine the id of the baseline statemnent generated in createLineChart() (see "data_functions.js")
    base_id = matrix + "-base-statement";

    // Array of all baseline statements
    var base_statements = document.getElementsByClassName("base-statement");
    var further_infos = document.getElementsByClassName("further-info-text");
    var source_infos = document.getElementsByClassName("source-info-text");
    var measure_infos = document.getElementsByClassName("measure-info-text");

    for (let i = 0; i < base_statements.length; i++) {          // Loop through all baseline statements

        if (base_statements[i].id == base_id) { // if id matches "base_id" then show the relevant baseline statement, further info, source info and how we measure this info
            document.getElementById(base_id).style.display = "block";   
            document.getElementById(base_id.replace("base-statement", "further-info")).classList.add("further-selected");
            document.getElementById(base_id.replace("base-statement", "source-info")).style.display = "block";
            document.getElementById(base_id.replace("base-statement", "measure-info")).style.display = "block";
        } else {    // Otherwise hide these for other indicators
            base_statements[i].style.display = "none";      
            further_infos[i].classList.remove("further-selected");
            source_infos[i].style.display = "none";
            measure_infos[i].style.display = "none";
        }

    }    

    // This next section will add a link to the relevant map on an indicator page. If available
    while(map_link.firstChild) {
        map_link.removeChild(map_link.firstChild);  // Remove any map links already generated on previous indicator pages viewed
    }

    if (data.AA != "" || data.LGD != "") { // When there is AA or LGD data present for the indicator in domains_data

        see_maps = document.createElement("div");               // Create a new div element
        see_maps.id = "see-maps";                               // Give this div an id "see-maps"
        see_maps.textContent = "See this indicator mapped by:"  // Add text to div

        map_link.appendChild(see_maps);                         // Add this div to the div "map-link"

    }

    // When AA data is present generate a link to it
    if (data.AA != "") {

        AA_link = document.createElement("div");    // new div element for AA link
        AA_link.id = "AA-link";                     // Given id "AA-link"
        AA_link.innerHTML = "<img id = 'assembly-logo' src = 'img/NI_Assembly.svg'>Assembly Area";  // Add text and icon
        map_link.appendChild(AA_link);      // Add link to "map-link" div

        AA_link.onclick = function () {
            jumpToMap("AA");   // Function to execute when link is clicked (see below)
        }

    }

    // When LGD data is present generate a link to it
    if (data.LGD != "") {

        LGD_link = document.createElement("div"); // new div element for LGD link
        LGD_link.id = "LGD-link";                 // Given id "AA-link"
        LGD_link.innerHTML = "<img id = 'council-logo' src = 'img/Northern_Ireland_outline.svg'>Local Government District";  // Add text and icon
        map_link.appendChild(LGD_link);      // Add link to "map-link" div

        LGD_link.onclick = function () {
            jumpToMap("LGD");       // Function to execute when link is clicked (see below)
        }

    }

    // Function to execute when either LGD or AA link is clicked
    function jumpToMap(geography) {

        indicator_scrn.style.display = "none";  // Hide indicator screen
        maps_scrn.style.display = "block";      // Display maps screen

        domains_btn.classList.remove("selected-item");  // Update domains button display
        overall_btn.classList.remove("selected-item");  // Update overall button display
        maps_btn.classList.add("selected-item");        // Update maps button display

        domains_btn.firstChild.classList.remove("selected-icon");   // Update domains button icon display
        overall_btn.firstChild.classList.remove("selected-icon");   // Update overall button icon display
        maps_btn.firstChild.classList.add("selected-icon");         // Update maps button icon display

        map_select_1.value = d;     // Select the domain "d" in the first dropdown menu on maps screen
        updateMapSelect2();         // Run updateMapSelect2() funciton (see below) to update the items in second dropdown menu
        map_select_2.value = e;     // Select the indicator "e" in the second dropdown menu on maps screen
        updateMapSelect3();         // Run updateMapSelect3() funciton (see below) to update the items in third dropdown menu
        map_select_3.value = data[geography];   // Select AA or LGD map in third menu
        drawMap();                  // Run the drawMap() function (see "data_functions.js") based on selections

        // Hide the "next indicator" and "previous indicator" buttons
        button_container.style.display = "none";
        
        // Hide the existing back button
        back_buttons = back_button_container.getElementsByTagName("div");
        for (let i = 0; i < back_buttons.length; i ++) {
            back_buttons[i].style.display = "none";
        }

        // Create a new back button that will direct user back to indicator screen they were on before clicking the map link
        back_btn_4 = document.createElement("div");     // new div for back button
        back_btn_4.id = "back-btn-4";           // id for new back button
        back_btn_4.classList.add("nav-btn");    // "nav-btn" class applied
        back_btn_4.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>'+ e +'</strong> indicator'; // Icon and text on button

        back_button_container.appendChild(back_btn_4);  // Back button inserted into "back-button-container"

        // Function to execute when "back-btn-4" is clicked
        back_btn_4.onclick = function() {

            maps_scrn.style.display = "none";   // Hide map screen
            indicator_scrn.style.display = "block"; // Display indicator screen

            maps_btn.classList.remove("selected-item");     // Change display of maps button
            maps_btn.firstChild.classList.remove("selected-icon");  // Change display of maps button icon

            button_container.style.display = "flex";    // Show "next" and "previous" buttons again

            if (document.getElementById("back-btn-4")) {
                back_button_container.removeChild(back_btn_4);  // Remove "back-btn-4"
            }

            if (back_button_container.firstChild.id == "back-btn") {    // if user was viewing indicator via Domains page do following:
                
                domains_btn.classList.add("selected-item");         // Change display of domains button
                domains_btn.firstChild.classList.add("selected-icon");  // Change display of domains button icon

                back_btn_2.style.display = "block";     // Show back button that directs user "Back to Domains grid"

            } else if (back_button_container.firstChild.id == "back-btn-3") { // if user was viewing indicator via Overall page do following:
                
                overall_btn.classList.add("selected-item");             // Change display of overall button
                overall_btn.firstChild.classList.add("selected-icon");  // Change display of overall button icon

                back_btn_3.style.display = "block";     // Show back button that directs user "Back to Overall grid"

            }
        }

    }

    

}

// This function generates a page when any of the hexagons on the Domains screen are clicked
// "d" refers to the name of the Domain clicked
function generateHexagons (d) {

    // Remove any hexagons inside the div with the id "indicator-hexes"
    while (indicator_hexes.firstChild) {
        indicator_hexes.removeChild(indicator_hexes.firstChild);
    } 

    // An array of the indicators contained inside the selected domain
    indicators = Object.keys(domains_data[d].indicators);
    
    // Loop through all the indicators for this domain and plot a hexagon for each one:
    for (let i = 0; i < indicators.length; i++) {

        if (i % 3 == 0) {   // Rows of three hexagons
            var hex_row = document.createElement("div");    // Create a div for a new row of hexagons
            hex_row.classList.add("row");                   // Add the class "row"
            hex_row.classList.add("ind-hex-row");           // Add the class "ind-hex-row"
            indicator_hexes.appendChild(hex_row);           // Add the row to the div element "indicator-hexes"
        }

        var hex_container = document.createElement("div");  // Create a new div for the hexagon container (into which the hexagon and its label will be nested)
        hex_container.classList.add("shake-hex");           // Give it the class "shake-hex"
        var hex = document.createElement("div");            // Create a new div for the hexagon
        var hex_label = document.createElement("div");      // Create a new div for the label text

        var data = domains_data[d].indicators[indicators[i]].data; // The data object within this indicator

        // Extract the text content of the baseline statement for each indicator
        if (data.NI != "") {
            base_text = document.getElementById(data.NI + "-base-statement").textContent;
        } else if (data.EQ != "") {
            base_text = document.getElementById(data.EQ + "-base-statement").textContent;
        } else if (data.LGD != "") {
            base_text = document.getElementById(data.LGD + "-base-statement").textContent;
        }

        if (base_text.includes("worsened")) {   // If the word "worsened" appears in the baseline statement:
            hex.innerHTML = '<i class="fa-solid fa-down-long"></i>';    // Place a down arrow in the hexagon
            hex.classList.add("negative");      // Add the class "negative" to the hexagon
            hex_label.classList.add("negative");    // Add the class "negative" to the label text
        } else if (base_text.includes("improved")) {    // If the word "improved" appears in the baseline statement:
            hex.innerHTML = '<i class="fa-solid fa-up-long"></i>';  // Place an up arrow in the hexagon
            hex.classList.add("positive");              // Add the class "positive" to the hexagon
            hex_label.classList.add("positive");        // Add the class "negative" to the label text
        } else {    // Otherwise:
            hex.innerHTML = '<i class="fa-solid fa-right-long"></i>';   // Place a sideways arrow in the hexagon
        }

        hex_container.classList.add("ind-hex-container");   // Add class "ind-hex-container" to the hexagon container
        hex.classList.add("ind-hex");               // Add class "ind-hex" to the hexagon
        hex_label.classList.add("ind-hex-label");   // Add class "ind-hex-label" to the label

        hex_label.textContent = indicators[i];      // Place the indicator name in the label
        hex_container.appendChild(hex);             // Place the hexagon in the hexagon container
        hex_container.appendChild(hex_label);       // Place the label in the hexagon container
                
        hex_row.appendChild(hex_container);         // Place the hexagon container into the hexagon row

    }

    // After all hexagons are plotted we will get an array of all the hexagon rows
    ind_hex_rows = document.getElementsByClassName("ind-hex-row");

    for (let i = 0; i < ind_hex_rows.length; i++) { // Loop through the rows
        if (i % 2 == 1) {   
            ind_hex_rows[i].style.marginLeft = "90px";      // Even numbered rows will be indented half the width of one hexagon
        }
    
        if (i > 0) {
            ind_hex_rows[i].style.marginTop = "-30px";      // All rows after first row will be moved up by 30px
        }
    }

    // Clinking an indicator name
    var indicator_links = document.getElementById("indicator-hexes").getElementsByClassName("ind-hex-container");

    for (let i = 0; i < indicator_links.length; i++) {

        indicator_links[i].onclick = function() {

            // Generate indicator page for clicked hexagon
            var indicator_name = indicator_links[i].getElementsByClassName("ind-hex-label")[0].innerHTML;

            // Run generateIndicatorPage() function (see above) for initial selection
            generateIndicatorPage(d, indicator_name);

            // Hide nav buttons currently on display
            for (let j = 0; j < nav_buttons.length; j ++) {
                nav_buttons[j].style.display = "none";
            }

            // Generate button for "Back to Domains"
            back_btn_2 = document.createElement("div");     // Div for back button
            back_btn_2.id = "back-btn-2";                   // Give it id "back-btn-2"
            back_btn_2.classList.add("nav-btn");            // Add class "nav-btn"
            back_btn_2.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>' + d + '</strong> domain';  // Text and icon on button

            back_button_container.appendChild(back_btn_2);  // Append "Back to Domains" to the div "back-button-container"

            // The "Previous Indicator" and "Next Indicator" buttons:
            current_index = i;  // A numeric index of the indicator currently in view

            // "Previous indicator" button
            previous_btn_2 = document.createElement("div");     // Div for previous indicator button
            previous_btn_2.id = "previous-btn-2";               // Given the id "previous-btn-2"
            previous_btn_2.classList.add("nav-btn");            // Given the class "nav-btn"

            // The button text and icon are generated (except when the indicator clicked on is the first indicator for that domain)
            if (current_index != 0) {
                previous_btn_2.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + indicator_links[current_index - 1].textContent +'</strong>';
            }

            button_left.appendChild(previous_btn_2);    // Button is added to div "button-left"

            // "Next indicator" button
            next_btn_2 = document.createElement("div");     // Div for next indicator button
            next_btn_2.id = "next-btn-2";                   // Given the id "next-btn-2"
            next_btn_2.classList.add("nav-btn");            // Given the class "nav-btn"

            // The button text and icon are generated (except when the indicator clicked on is the last indicator for that domain)
            if (current_index != indicator_links.length - 1) {
                next_btn_2.innerHTML = 'Next indicator: <strong>' + indicator_links[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
            }

            button_right.appendChild(next_btn_2);   // Button is added to div "button-right"

            // Function inside "Back to Domains" to hide indicators and display grid again
            back_btn_2.onclick = function () {

                indicator_scrn.style.display = "none";  // Hide indicator screen
                domains_scrn.style.display = "block";   // Show domains screen

                for (let j = 0; j < nav_buttons.length; j ++) {
                    nav_buttons[j].style.display = "block"; // Show the buttons previously hidden by clicking on one of the Domains
                }

                back_button_container.removeChild(back_btn_2);  // Remove the "Back to Domains" button
                button_left.removeChild(previous_btn_2);        // Remove "Previous Indicator button"
                button_right.removeChild(next_btn_2);           // Remove "Next Indicator button"
            
            }

            // Function inside "Previous indicator" button
            previous_btn_2.onclick = function() {

                // Hide expanded further info
                for (let i = 0; i < further_infos.length; i++) {
                    further_infos[i].removeAttribute("style");
                    further_infos[i].classList.remove("further-selected");
                }

                further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
                further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
                further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");

                // Get the name of previous indicator from the button text
                var previous_indicator_name = previous_btn_2.textContent.replace("Previous indicator:", "").trim();

                // Run generateIndicatorPage() function (see above) for previous_indicator_name
                generateIndicatorPage(d, previous_indicator_name);

                // Update the current_index counter to one less than its current value
                current_index = current_index - 1;

                // Generate new text on "Previous indicator" button (except when user is looking at first indicator for that domain)
                if (current_index != 0) {
                    previous_btn_2.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + indicator_links[current_index - 1].textContent +'</strong>';
                } else {
                    previous_btn_2.innerHTML = "";
                }

                // Generate new text on "Next indicator" button (except when user is looking at last indicator for that domain)
                if (current_index != indicator_links.length - 1) {
                    next_btn_2.innerHTML = 'Next indicator: <strong>' + indicator_links[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
                } else {
                    next_btn_2.innerHTML = ""
                }

            }

            // Function inside "Next indicator" button
            next_btn_2.onclick = function() {

                // Hide expanded further info
                for (let i = 0; i < further_infos.length; i++) {
                    further_infos[i].removeAttribute("style");
                    further_infos[i].classList.remove("further-selected");
                }

                further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
                further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
                further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");

                // Get the name of next indicator from the button text
                var next_indicator_name = next_btn_2.textContent.replace("Next indicator:", "").trim();

                // Run generateIndicatorPage() function (see above) for next_indicator_name
                generateIndicatorPage(d, next_indicator_name);

                // Update the current_index counter to one more than its current value
                current_index = current_index + 1;

                // Generate new text on "Previous indicator" button (except when user is looking at first indicator for that domain)
                if (current_index != 0) {
                    previous_btn_2.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + indicator_links[current_index - 1].textContent +'</strong>';
                } else {
                    previous_btn_2.innerHTML = "";
                }

                // Generate new text on "Next indicator" button (except when user is looking at last indicator for that domain)
                if (current_index != indicator_links.length - 1) {
                    next_btn_2.innerHTML = 'Next indicator: <strong>' + indicator_links[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
                } else {
                    next_btn_2.innerHTML = ""
                }

            }

        }

    }

    // Position of key at bottom of domain page (stop it varying depending on Domain)
    key.style.marginTop = (508 - indicator_hexes.clientHeight) + "px";

}

// This next loop will go through all the hexagons on the Domains screen and functionality for clicking on each Domain
for (let i = 0; i < hexagons.length - 1; i++) {     // "hexagons.length - 1" is used to exclude the Hexagon that serves as a title on the individual Domain pages

    hexagons[i].parentElement.classList.add("shake-hex");   // Add the "shake-hex" class to each hexagon

    // Add click functionality
    hexagons[i].onclick = function() {

        // Hide domains grid and display indicators
        domains_title.style.display = "none";   // Hide the "domains-title" div
        domain_info.style.display = "flex";     // Show the "domain-info" div
        domains_grid_container.style.display = "none";  // Hide the domains grid
        click_to_see.style.display = "none";        // Hide the "click-to-see" div
        domains_intro.style.display = "none";       // Hide the "domains-intro" div
        indicator_intro.style.display = "block";    // Show the "indicator-intro" div

        var domain_name = hexagons[i].innerHTML;    // Obtain domain name from hexagon text

        clicked_hex.innerHTML = domain_name;    // Update text inside "clicked-hex"
        domain_name_text.textContent = domain_name;     // Update "domain-name-text" inside intro paragraph

        clicked_desc.innerHTML = domains_data[domain_name].description; // Update description of domain

        // Run generateHexagons(d) function (see above) for selected domain
        generateHexagons(domain_name);

        for (let i = 0; i < button_rows.length; i ++) {
            button_rows[i].style.display = "flex";          // Show all the divs with the class "button-row"
        }        

        // Remove buttons from nav bar
        while (button_left.firstChild) {
            button_left.removeChild(button_left.firstChild);    // Remove any "Previous indicator" or "Previous domain" buttons previously generated
        }

        while (button_right.firstChild) {
            button_right.removeChild(button_right.firstChild);  // Remove any "Next indicator" or "Next domain" buttons previously generated
        }

        // Generate button for "Back to Domains"
        back_btn = document.createElement("div");       // New div for "Back to Domains" button
        back_btn.id = "back-btn";                       // Give it the id "back-btn"
        back_btn.classList.add("nav-btn");              // Give it the class "nav-btn"
        back_btn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>Domains</strong> grid';      // Icon and text put inside button

        back_button_container.appendChild(back_btn);    // "back-btn" is added to "back-button-container" div

        // Function inside "Back to Domains" to hide indicators and display grid again
        back_btn.onclick = function () {

            domains_title.style.display = "block";  // Show the "domains-title" div
            domains_intro.style.display = "block";  // Show the "domains-intro" div
            indicator_intro.style.display = "none"; // Hide the "indicator-intro" div
            domains_grid_container.style.display = "block"; // Show the "domains-grid-container" div
            click_to_see.style.display = "block";   // Show the "click-to-see" div
            domain_info.style.display = "none";     // Hide the "domain-info" div

            for (let i = 0; i < button_rows.length; i ++) {
                button_rows[i].style.display = "none";  // Hide all divs with class "button-row"
            } 

            back_button_container.removeChild(back_btn);    // Remove the "back-btn" div
        
        }

        // The "Previous Domain" and "Next Domain" buttons:
        var current_index = i;  // A numeric counter of the Domain currently on view

        // Generate "see Previous domain" button
        previous_btn = document.createElement("div");   // Div for previous domain button
        previous_btn.id = "previous-domain";            // Given the id "previous-domain"
        previous_btn.classList.add("nav-btn");          // Given the class "nav-btn"

        // The button text and icon are generated (except when the first Domain is clicked)
        if (current_index != 0) {
            previous_btn.innerHTML =  '</strong> <i class="fa-solid fa-backward"></i> Previous domain: <strong>' + hexagons[current_index - 1].textContent;
        }

        button_left.appendChild(previous_btn);  // Button is added to div "button-left"

        // Generate "see Next domain" button
        next_btn = document.createElement("div");       // Div for next domain button
        next_btn.id = "next-domain";                    // Given the id "next-domain"
        next_btn.classList.add("nav-btn");              // Given the class "nav-btn"

        // The button text and icon are generated (except when the last Domain is clicked)
        if (current_index != hexagons.length - 2) {
            next_btn.innerHTML = 'Next domain: <strong>' + hexagons[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
        }

        button_right.appendChild(next_btn);   // Button is added to div "button-right"

        // Function behind "Previous Domain" button
        previous_btn.onclick = function () {

            // Get the name of previous domain from the hexagon text
            previous_domain_name = hexagons[current_index - 1].textContent;
            
            clicked_hex.innerHTML = previous_domain_name;   // Update the text content inside the "clicked-hex" hexagon
            clicked_desc.innerHTML = domains_data[previous_domain_name].description;    // Update the description                       

            // Run generateHexagons(d) function (see above) for previous_domain_name
            generateHexagons(previous_domain_name);
            
            // Update the current_index counter to one less than its current value
            current_index = current_index - 1;

            // Generate new text on "Previous domain" button (except when user is looking at first Domain)
            if (current_index != 0) {
                previous_btn.innerHTML =  '</strong> <i class="fa-solid fa-backward"></i> Previous domain: <strong>' + hexagons[current_index - 1].textContent;
            } else {
                previous_btn.innerHTML = "";
            }

            // Generate new text on "Next domain" button (except when user is looking at last Domain)
            if (current_index != hexagons.length - 2) {
                next_btn.innerHTML = 'Next domain: <strong>' + hexagons[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
            } else {
                next_btn.innerHTML = "";
            }

        }
        
        // Function behind "Next Domain" button
        next_btn.onclick = function () {

            // Get the name of next domain from the hexagon text
            next_domain_name = hexagons[current_index + 1].textContent;
            
            clicked_hex.innerHTML = next_domain_name;   // Update the text content inside the "clicked-hex" hexagon
            clicked_desc.innerHTML = domains_data[next_domain_name].description;   // Update the description                                           

            // Run generateHexagons(d) function (see above) for next_domain_name
            generateHexagons(next_domain_name);
            
            // Update the current_index counter to one less than its current value
            current_index = current_index + 1;
            next_btn.innerHTML = 'Next domain: <strong>' + hexagons[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';

            // Generate new text on "Previous domain" button (except when user is looking at first Domain)
            if (current_index != 0) {
                previous_btn.innerHTML =  '</strong> <i class="fa-solid fa-backward"></i> Previous domain: <strong>' + hexagons[current_index - 1].textContent;
            } else {
                previous_btn.innerHTML = "";
            }

            // Generate new text on "Next domain" button (except when user is looking at last Domain)
            if (current_index != hexagons.length - 2) {
                next_btn.innerHTML = 'Next domain: <strong>' + hexagons[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
            } else {
                next_btn.innerHTML = "";
            }

        }


    }

}

// Overall screen
// The function below plots the Hexagons on the Overall and is called three times. Once each for "improving", "no_change" and "worsening" indicators
// The function runs any time the user resizes the window and when the Overall screen is accessed via the menu at top or a back button
plotOverallHexes = function(change_type) {
        
    // Use the user's screen size to determine a value "h" which will be the number of hexagons that can fit in a single row
    gridWidth = overall_scrn.clientWidth - 150;

    // Set "h" to a maximum of 6 or the number of hexagons that will fit on screen
    if (Math.floor((gridWidth - 105) / 180) > 6) {
        h = 6
    } else {
        h = Math.floor((gridWidth - 105) / 180);
    }

    // The change type "no_change" has the class "no-change"
    className = change_type.replace("_", "-");
    
    // Remove any hexagons created in previous calls of plotOverallHexes()
    while (document.getElementById(className + "-hexes").firstChild) {
        document.getElementById(className + "-hexes").removeChild(document.getElementById(className + "-hexes").firstChild)
    }

    // Loop through the indicators within each change_type
    for (let i = 0; i < Object.keys(eval(change_type + "_indicator")).length; i++) {            

        // Ensuring there are "h" hexagons per row
        if (i % h == 0) {
            var hex_row = document.createElement("div");    // Create a div for a new row
            hex_row.classList.add("row");                   // Give div the class "row"
            hex_row.classList.add(className + "-hex-row");  // Give div the class 'className + "-hex-row"' (eg, "improving-hex-row")
            document.getElementById(className + "-hexes").appendChild(hex_row);     // Place hex-row in relevant div on Overall page (eg, "improving-hex-row" goes into "improving-hexes")
        }            

        if (i % (h * 2) == h) {
            hex_row.style.marginLeft = "105px"; // Even numbered rows are indented by 105px
        } else if (i % (h * 2) == 0) {
            hex_row.style.marginLeft = "15px";  // And odd numbered ones by 15px
        }

        if (i >= h) {
            hex_row.style.marginTop = "-30px";  // All rows after first row are moved up by 30px
        }

        var hex_container = document.createElement("div");      // Create a hexagon container div. The hexagon div and the hexagon label div will be nested under this one
        hex_container.classList.add("shake-hex");               // Give it the class "shake-hex"
        var hex = document.createElement("div");                // Create a hexagon div
        var hex_label = document.createElement("div");          // Create a hexagon label

        hex_container.classList.add("ind-hex-container");       // Give hexagon conatiner the class "ind-hex-container"

        hex.classList.add("ind-hex");                           // Give hexagon the class "ind-hex"
        hex_label.classList.add("ind-hex-label");               // Give hexagon label the class "ind-hex-label"

        hex_label.textContent = Object.keys(eval(change_type + "_indicator"))[i];   // Hexagon label text is outputted
        hex_container.appendChild(hex);                                             // Hexagon is placed inside the hexagon container
        hex_container.appendChild(hex_label);                                       // Hexagon label is placed inside the hexagon container

        if (change_type == "improving") {   // For improving indicators:
            hex.innerHTML = '<i class="fa-solid fa-up-long"></i>';      // Up arrow is placed in hexagon
            hex.classList.add("positive");                              // Hexagon is given class "positive"
            hex_label.classList.add("positive");                        // Hexagon label is given class "positive" 
        } else if (change_type == "no_change") { // For no_change indicators:
            hex.innerHTML = '<i class="fa-solid fa-right-long"></i>';   // Right arrow is placed in hexagon
        } else if (change_type == "worsening") {    // For worsening indicators:
            hex.innerHTML = '<i class="fa-solid fa-down-long"></i>';    // Down arrow is placed in hexagon
            hex.classList.add("negative");                              // Hexagon is given class "negative"
        hex_label.classList.add("negative");                            // Hexagon label is given class "negative"
        }

        hex_row.appendChild(hex_container);     // The hexagon is placed in the hexagon row        

        // Function below for what happens when an Overall screen hexagon is clicked on
        hex_container.onclick = function() {

            var indicator_name = Object.keys(eval(change_type + "_indicator"))[i];     // Indicator name is computed
            var domain_name = eval(change_type + "_indicator")[indicator_name].domain;  // The domain name is computed

            // The generateIndicatorPage(d, e) function (see above) is called on the selection
            generateIndicatorPage(domain_name, indicator_name);

            // Any back buttons previously generated are removed
            while(back_button_container.firstChild) {
                back_button_container.removeChild(back_button_container.firstChild)
            }

            // Any "Previous domain" or "Previous indicator" previously generated are removed
            while(button_left.firstChild) {
                button_left.removeChild(button_left.firstChild)
            }

            // Any "Next domain" or "Next indicator" previously generated are removed
            while(button_right.firstChild) {
                button_right.removeChild(button_right.firstChild)
            }

            // The button container is displayed
            button_container.style.display = "flex";

            // All button rows are displayed
            for (let i = 0; i < button_rows.length; i++) {
                button_rows[i].style.display = "flex";
            }

            // Generate button for "back to Overall"
            back_btn_3 = document.createElement("div");     // New div for "Back to Overall grid" button
            back_btn_3.id = "back-btn-3";                   // Given the id "back-btn-3"
            back_btn_3.classList.add("nav-btn");            // Given the class "nav-btn"
            back_btn_3.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>Overall</strong> grid';  // Icon and text generated

            back_button_container.appendChild(back_btn_3);  // Button is placed in the "back-button-container" div

            // Next and previous indicator buttons:
            current_index = i;          // A numeric index of the current selected indicator
            current_change = change_type;   // The current change type the user is cycling through if clicking "next" and "previous" buttons

            // Which indicator to move to if the user is on the first or last indicator within a particular change type
            if (current_change == "improving") {            // If cycling through "improving" indicators:
                next_change = "no_change";                      // Move to "no change" indicators after clicking Next on the last "improving" indicator
                previous_change = "worsening";                  // Move to "worsening" indicators after clicking Previous on the first "improving" indicator
            } else if (current_change == "no_change") {     // If cycling through "no change" indicators:
                next_change = "worsening";                      // Move to "worsening" indicators after clicking Next on the last "no change" indicator
                previous_change = "improving";                  // Move to "improving" indicators after clicking Previous on the first "no change" indicator
            } else if (current_change == "worsening") {     // If cycling through "worsening" indicators:
                next_change = "improving";                      // Move to "improving" indicators after clicking Next on the last "worsening" indicator
                previous_change = "no_change";                  // Move to "no change" indicators after clicking Previous on the first "worsening" indicator
            }
            
            // "Previous indicator" button
            previous_btn_3 = document.createElement("div");     // New div for "Previous indicator" button
            previous_btn_3.id = "previous-btn-3";               // Give div id "previous-btn-3"
            previous_btn_3.classList.add("nav-btn");            // Give div class "nav-btn"

            // The button text and icon are generated (as either the previous indicator within that change type or the last indicator within the previous change type)
            if (current_index != 0) {
                previous_btn_3.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(eval(current_change + "_indicator"))[current_index - 1] +'</strong>';
            } else {
                previous_btn_3.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(eval(previous_change + "_indicator"))[Object.keys(eval(previous_change + "_indicator")).length - 1] +'</strong>';
            }

            button_left.appendChild(previous_btn_3);    // Button is added to div "button-left"

            // "Next indicator" button
            next_btn_3 = document.createElement("div");     // New div for "Next indicator" button
            next_btn_3.id = "next-btn-3";                   // Give div id "next-btn-3"
            next_btn_3.classList.add("nav-btn");            // Give div class "nav-btn"

            // The button text and icon are generated (as either the next indicator within that change type or the first indicator within the next change type)
            if (current_index != Object.keys(eval(current_change + "_indicator")).length - 1) {
                next_btn_3.innerHTML = 'Next indicator: <strong>' + Object.keys(eval(current_change + "_indicator"))[current_index + 1] +'</strong> <i class="fa-solid fa-forward"></i> ';
            } else {
                next_btn_3.innerHTML = 'Next indicator: <strong>' + Object.keys(eval(next_change + "_indicator"))[0] +'</strong> <i class="fa-solid fa-forward"></i> ';
            }

            button_right.appendChild(next_btn_3);    // Button is added to div "button-right"

            // Function inside "back to Overall" to hide indicators and display grid again
            back_btn_3.onclick = function () {

                indicator_scrn.style.display = "none";   // Hide indicator screen
                overall_scrn.style.display = "block";    // Show Overall screen
               
                for (let i = 0; i < button_rows.length; i++) {
                    button_rows[i].style.display = "none";      // Hide all div elements with the class "button-row"
                }

                back_button_container.removeChild(back_btn_3);  // Remove the "back-btn-3" div

                // Re-run plotOverallHexes() on all three change types to allow for any window resizing that may have happened when viewing Indicator page
                plotOverallHexes("improving");      
                plotOverallHexes("no_change");
                plotOverallHexes("worsening");
            
            }

            // "Previous indicator" function
            previous_btn_3.onclick = function() {

                // Hide expanded further info
                for (let i = 0; i < further_infos.length; i++) {
                    further_infos[i].removeAttribute("style");
                    further_infos[i].classList.remove("further-selected");
                }

                further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
                further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
                further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");

                if (current_index == 0) {       // Only when currently on the first indicator of a change type:

                    // Change the value of "current_change" to be that of "previous_change"
                    current_change = previous_change;

                    // Re-compute values of "previous_change" and "next_change" based on the new value of "current_change"
                    if (current_change == "improving") {            // If cycling through "improving" indicators:
                        next_change = "no_change";                      // Move to "no change" indicators after clicking Next on the last "improving" indicator
                        previous_change = "worsening";                  // Move to "worsening" indicators after clicking Previous on the first "improving" indicator
                    } else if (current_change == "no_change") {     // If cycling through "no change" indicators:
                        next_change = "worsening";                      // Move to "worsening" indicators after clicking Next on the last "no change" indicator
                        previous_change = "improving";                  // Move to "improving" indicators after clicking Previous on the first "no change" indicator
                    } else if (current_change == "worsening") {     // If cycling through "worsening" indicators:
                        next_change = "improving";                      // Move to "improving" indicators after clicking Next on the last "worsening" indicator
                        previous_change = "no_change";                  // Move to "no change" indicators after clicking Previous on the first "worsening" indicator
                    }

                    // Update "current_index" to be the last value in the new "current_change" type
                    current_index = Object.keys(eval(current_change + "_indicator")).length;

                }

                var previous_indicator_name = Object.keys(eval(current_change + "_indicator"))[current_index - 1];  // Derive name of previous indicator
                var previous_domain_name = eval(current_change + "_indicator")[previous_indicator_name].domain;     // Derive domain of previous indicator

                // Run generateIndicatorPage() function (see above) for previous_indicator_name
                generateIndicatorPage(previous_domain_name, previous_indicator_name);

                // Update the current_index counter to one less than its current value
                current_index = current_index - 1;

                // The button text and icon are generated (as either the previous indicator within that change type or the last indicator within the previous change type)
                if (current_index != 0) {
                    previous_btn_3.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(eval(current_change + "_indicator"))[current_index - 1] +'</strong>';
                } else {
                    previous_btn_3.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(eval(previous_change + "_indicator"))[Object.keys(eval(previous_change + "_indicator")).length - 1] +'</strong>';
                }

                // The button text and icon are generated (as either the next indicator within that change type or the first indicator within the next change type)
                if (current_index != Object.keys(eval(current_change + "_indicator")).length - 1) {
                    next_btn_3.innerHTML = 'Next indicator: <strong>' + Object.keys(eval(current_change + "_indicator"))[current_index + 1] +'</strong> <i class="fa-solid fa-forward"></i> ';
                } else {
                    next_btn_3.innerHTML = 'Next indicator: <strong>' + Object.keys(eval(next_change + "_indicator"))[0] +'</strong> <i class="fa-solid fa-forward"></i> ';
                }

            }

            // "Next indicator" function
            next_btn_3.onclick = function() {

                // Hide expanded further info
                for (let i = 0; i < further_infos.length; i++) {
                    further_infos[i].removeAttribute("style");
                    further_infos[i].classList.remove("further-selected");
                }

                further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
                further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
                further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");

                if (current_index == Object.keys(eval(current_change + "_indicator")).length - 1) {     // Only when currently on the last indicator of a change type:

                    // Change the value of "current_change" to be that of "next_change"
                    current_change = next_change;

                    // Re-compute values of "previous_change" and "next_change" based on the new value of "current_change"
                    if (current_change == "improving") {            // If cycling through "improving" indicators:
                        next_change = "no_change";                      // Move to "no change" indicators after clicking Next on the last "improving" indicator
                        previous_change = "worsening";                  // Move to "worsening" indicators after clicking Previous on the first "improving" indicator
                    } else if (current_change == "no_change") {     // If cycling through "no change" indicators:
                        next_change = "worsening";                      // Move to "worsening" indicators after clicking Next on the last "no change" indicator
                        previous_change = "improving";                  // Move to "improving" indicators after clicking Previous on the first "no change" indicator
                    } else if (current_change == "worsening") {     // If cycling through "worsening" indicators:
                        next_change = "improving";                      // Move to "improving" indicators after clicking Next on the last "worsening" indicator
                        previous_change = "no_change";                  // Move to "no change" indicators after clicking Previous on the first "worsening" indicator
                    }

                    // Update "current_index" to be the first value in the new "current_change" type
                    current_index = -1;

                }

                var next_indicator_name = Object.keys(eval(current_change + "_indicator"))[current_index + 1];  // Derive name of next indicator
                var next_domain_name = eval(current_change + "_indicator")[next_indicator_name].domain;         // Derive name of next domain

                // Run generateIndicatorPage() function (see above) for next_indicator_name
                generateIndicatorPage(next_domain_name, next_indicator_name);

                // Update the current_index counter to one more than its current value
                current_index = current_index + 1;

                // The button text and icon are generated (as either the previous indicator within that change type or the last indicator within the previous change type)
                if (current_index != 0) {
                    previous_btn_3.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(eval(current_change + "_indicator"))[current_index - 1] +'</strong>';
                } else {
                    previous_btn_3.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(eval(previous_change + "_indicator"))[Object.keys(eval(previous_change + "_indicator")).length - 1] +'</strong>';
                }

                // The button text and icon are generated (as either the next indicator within that change type or the first indicator within the next change type)
                if (current_index != Object.keys(eval(current_change + "_indicator")).length - 1) {
                    next_btn_3.innerHTML = 'Next indicator: <strong>' + Object.keys(eval(current_change + "_indicator"))[current_index + 1] +'</strong> <i class="fa-solid fa-forward"></i> ';
                } else {
                    next_btn_3.innerHTML = 'Next indicator: <strong>' + Object.keys(eval(next_change + "_indicator"))[0] +'</strong> <i class="fa-solid fa-forward"></i> ';
                }

            }               

        }

    }

}

// Function to Write the "More data" sentence on indicator and map pages
function writeDataInfo(d) {
    // Output "More data" sentence
    var data_info_text = "You can view and download data ";  // Start the sentence with this text

    if (d.NI != "") {    // If there is NI level data add a link to it to the sentence
        data_info_text = data_info_text + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + d.NI + '" target = "_blank">Northern Ireland level</a>, ';
    }

    if (d.LGD != "") {   // If there is LGD data add a link to it to the sentence
        data_info_text = data_info_text + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + d.LGD + '" target = "_blank">Local Government District</a>, ';
    }

    if (d.AA != "") {    // If there is AA data add a link to it to the sentence
        data_info_text = data_info_text + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + d.AA + '" target = "_blank">Assembly Area</a>, ';
    }

    if (d.EQ != "") {    // If there is EQ data add a link to it to the sentence
        data_info_text = data_info_text + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + d.EQ + '" target = "_blank">Equality Groups</a>, ';
    }

    data_info_text = data_info_text + ' on the NISRA Data Portal.'        // Close the sentence with this 

    if (data_info_text.lastIndexOf(",") > 0 ) { // Remove the last comma from the sentence
        data_info_text = data_info_text.substring(0, data_info_text.lastIndexOf(",")) + data_info_text.substring(data_info_text.lastIndexOf(",") + 1, data_info_text.length);
    }

    if (data_info_text.lastIndexOf(",") > 0 ) {  // Change the comma that is now the last comma into the word "and"
        data_info_text = data_info_text.substring(0, data_info_text.lastIndexOf(",")) + " and " + data_info_text.substring(data_info_text.lastIndexOf(",") + 1, data_info_text.length);
    }

    return data_info_text;

}

// Function below waits until all the functions in "data_functions.js" have completed and then determines the change type of each indicator
// Start by declaring three empty objects for each change type:
improving_indicator = {};
no_change_indicator = {};
worsening_indicator = {};

setTimeout(function () {    // setTimeOut() puts a time delay on the execution of the code inside this function. This is set below to 3000ms
    
    // Loop through all domains
    for (let i = 0; i < domains.length; i ++) {

        // All the indicators inside the domain:
        indicators = domains_data[domains[i]].indicators;

        // Then loop through each indicator:
        for (let j = 0; j < Object.keys(indicators).length; j++) {
            
            // The data object for each indicator
            data = Object.values(indicators)[j].data;

            // Determine the id of the baseline statement based on which data is available:
            if (data.NI != "") {
                base_id = data.NI + "-base-statement";                              
            } else if (data.EQ != "") {
                base_id = data.EQ + "-base-statement";
            } else if (data.LGD != "") {
                base_id = data.LGD + "-base-statement";
            }
            
            // Extract the text from the baseline statement
            base_text = document.getElementById(base_id).textContent;

            // If the baseline text contains the word "improved" then add this indicator and its domain name to the "improving_indicator" object
            if (base_text.includes("improved")) {
                improving_indicator[Object.keys(indicators)[j]] = {domain: domains[i]};

            // If the baseline text contains the word "worsened" then add this indicator and its domain name to the "worsening_indicator" object
            } else if (base_text.includes("worsened")) {
                worsening_indicator[Object.keys(indicators)[j]] = {domain: domains[i]};
            // Otherwise add this indicator and its domain name to the "no_change_indicator" object
            } else {
                no_change_indicator[Object.keys(indicators)[j]] = {domain: domains[i]};
            }

        }

    }

    // Sort each of the three change type objects alphabetically:
    improving_indicator = sortObject(improving_indicator);
    worsening_indicator = sortObject(worsening_indicator);
    no_change_indicator = sortObject(no_change_indicator);

    // The total number of indicators being measured
    num_indicators = Object.keys(improving_indicator).length + Object.keys(worsening_indicator).length + Object.keys(no_change_indicator).length;
    
    // Output text on overall screen showing what proportion of indicators are found in each change type:
    document.getElementById("improving-label").textContent = "Improving (" + Object.keys(improving_indicator).length + "/" + num_indicators + ")";
    document.getElementById("no-change-label").textContent = "No change (" + Object.keys(no_change_indicator).length + "/" + num_indicators + ")";
    document.getElementById("worsening-label").textContent = "Worsening (" + Object.keys(worsening_indicator).length + "/" + num_indicators + ")";

    // Run plotOverallHexes() function (see above) on all three change types
    plotOverallHexes("improving");
    plotOverallHexes("no_change");
    plotOverallHexes("worsening");

    document.getElementById("loading-img").style.display = "none";      // Hide the loading screen gif
    document.getElementById("overall-hexes").style.display = "block";   // Show the "overall-hexes" div

}, 3000);   // Time out set to 3000ms

// This function displays a message about not loading if there is a data portal error:
setTimeout(function () {

    not_loading = document.createElement("div");    // New div for "not loading" message
    not_loading.id = "not-loading";                 // Given id of "not-loading"
    not_loading.innerHTML = "<p>Data not loading? <a href='.'>Click here to refresh</a></p>"    // Next with link to refresh page generated

    if (document.getElementById("overall-hexes").style.display != "block") {
        document.getElementById("overall-scrn").appendChild(not_loading);       // If the "overall-hexes" div has failed to display (usually due to data portal problems) then generate the not loading message
    }

}, 3001)    // Time out set to 3001ms


// Main container height function
// This function will set a minimum height for the "main container" (ie, the space between the header and the footer)
// Doing this will guarantee that the footer never appears halfway up the page or with any extra white space below it
mainContainerHeight = function() {

    // Determine the heights of any button rows visible on the page when function is called
    button_rows = document.getElementsByClassName("button-row");
    button_height = 0;
    for (let i = 0; i < button_rows.length; i ++) {
        button_height = button_height + button_rows[i].clientHeight;
    }

    // Determine the height for the main container by substracting header, footer, etc heights from the window height. Allowing 50px for top and bottom margins
    var ideal_height = window.innerHeight - top_menu.clientHeight - footer.clientHeight - prototype.clientHeight - button_height - 50;

    // Set a minimum height for the main container
    main_container.style.minHeight = ideal_height + "px";
}

// Execute the following functions when window loads for first time:
window.onload = function() {
    showCookieBanner();         // Cookie banner pop-up see "cookies_script.js"
    sizeForMobile();            // Resize and re-position page elements (see below)
    mainContainerHeight();      // See above
    updateMapSelect2();         // Update list of options inside second map drop down menu
    updateMapSelect3();         // Update list of options inside third map drop down menu
};

// Execute the following functions anytime the window is resized:
window.onresize = function() {
    sizeForMobile();                // Resize and re-position page elements (see below)
    mainContainerHeight();          // See above
    plotOverallHexes("improving");  // Re-plot improving hexagons on Overall screen (see above)
    plotOverallHexes("no_change");  // Re-plot no change hexagons Overall screen (see above)
    plotOverallHexes("worsening");  // Re-plot worsening hexagons Overall screen (see above)
}

// Use the list of Domains to create the items inside the first Maps dropdown menu
for (let i = 0; i < domains.length; i ++) {

    // List of indicators inside each domain
    indicators = Object.keys(domains_data[domains[i]].indicators);

    // Check that at least one indicator inside the domain has geo data (ie, AA or LGD data)
    var has_geo_data = false;   // First set value "has_geo_data" to false

    for (let j = 0; j < indicators.length; j ++) {  // Then loop through indicators

        data = domains_data[domains[i]].indicators[indicators[j]].data; // The data object for that indicator

        if (data.AA != "" || data.LGD != "") {
            has_geo_data = true;    // If LGD or AA data are found "has_geo_data" is set to true
            break;                  // Loop stops iterating
        }

    }
                
    if (has_geo_data == true) {                     // When there is geographical data for any indicator in this domain:
        option = document.createElement("option");      // Create an "option" element
        option.value = domains[i];                      // Set the value of the option to the Domain name
        option.innerHTML = domains[i];                  // Set the text label of the option to the Domain name
        map_select_1.appendChild(option);               // Add the option to the first dropdown menu on Maps screen
    }

}

// This function updates the second dropdown menu on the maps screen based on what has been selected by the user in the first dropdown menu
function updateMapSelect2() {

    // List all the indicators in the domain selected in first dropdown:
    indicators = Object.keys(domains_data[map_select_1.value].indicators); 

    // Remove any options already in second dropdown menu:
    while (map_select_2.firstChild) {
        map_select_2.removeChild(map_select_2.firstChild);
    }

    // Loop through all indicators under the domain:
    for (let i = 0; i < indicators.length; i++) {

        // The data object:
        var data = domains_data[map_select_1.value].indicators[indicators[i]].data;

        // If data exists for either AA or LGD generate an option in second dropdown menu:
        if (data.AA != "" || data.LGD != "") {

            option = document.createElement("option");      // Create an "option" element
            option.value = indicators[i];                   // Set the value of the option to the Indicator name
            option.innerHTML = indicators[i];               // Set the text label of the option to the Indicator name
            map_select_2.appendChild(option);               // Add the option to the second dropdown menu on Maps screen

        }
    }
}

// This function updates the third dropdown menu on the maps screen based on what has been selected by the user in the second dropdown menu
function updateMapSelect3() {

    // If the further info has been expanded when looking at the lsat map then collapse it again:
    further_info_map.removeAttribute("style");  // Remove style attributes
    further_expander_map.getElementsByTagName("span")[0].textContent = "Click to expand"; // Change text back to "click to expand"
    further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-minus");         // remove minus sign icon   
    further_expander_map.getElementsByTagName("i")[0].classList.add("fa-plus");             // add plus sign icon

    // The indicator based on selections in first two dropdowns:
    var indicator = domains_data[map_select_1.value].indicators[map_select_2.value];
    var data = indicator.data;      // The data object within that indicator

    // Remove any options in third dropdown
    while (map_select_3.firstChild) {
        map_select_3.removeChild(map_select_3.firstChild);
    }

    // If AA data is available then add a dropdown option:
    if (data.AA != "") {
        option = document.createElement("option");  // Create an "option" element
        option.value = data.AA;                     // Set the value of the option to the AA matrix name
        option.innerHTML = "Assembly Area";         // Set the text label to "Assembly Area"
        map_select_3.appendChild(option);           // Add the option to the third dropdown menu on the Map screen
    }

    // If LGD data is available then add a dropdown option:
    if (data.LGD != "") {               
        option = document.createElement("option");          // Create an "option" element
        option.value = data.LGD;                            // Set the value of the option to the LGD matrix name
        option.innerHTML = "Local Government District";     // Set the text label to "Local Government District"
        map_select_3.appendChild(option);                   // Add the option to the third dropdown menu on the Map screen
    }

    // Update the map title div
    map_title.innerHTML = indicator.chart_title;

    // Update the More data section (see writeDataInfo() function above)
    data_info_map.innerHTML = writeDataInfo(data);

    // Update "Why is this indicator important" section
    ind_important_map.innerHTML = indicator.importance;    

}

// When there is any change to the first dropdown menu on the maps screen run the following functions:
map_select_1.onchange =  function() {
    updateMapSelect2();     // Update options in second dropdown (see above)
    updateMapSelect3();     // Update options in third dropdown (see above)
    drawMap();              // Draw the map based on current selections (see data_functions.js)
}

// When there is any change to the second dropdown menu on the maps screen run the following functions:
map_select_2.onchange = function() {
    updateMapSelect3();     // Update options in third dropdown (see above)
    drawMap();              // Draw the map based on current selections (see data_functions.js)
}

// When there is any change to the third dropdown menu on the maps screen run the following functions:
map_select_3.onchange = function() {

    drawMap();      // Draw the map based on current selections (see data_functions.js)

    // If the further info has been expanded when looking at the lsat map then collapse it again:
    further_info_map.removeAttribute("style");  // Remove style attributes
    further_expander_map.getElementsByTagName("span")[0].textContent = "Click to expand"; // Change text back to "click to expand"
    further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-minus");         // remove minus sign icon   
    further_expander_map.getElementsByTagName("i")[0].classList.add("fa-plus");             // add plus sign icon
}



// Resizing for mobile
function sizeForMobile() {

    // Size of the NISRA logo container
    nisra_logo_container.style.width = footer_container.clientWidth - 565 + "px"

    // If screen is less than 1200px wide do following:
    if (window.innerWidth < 1200) {

        main_container.style.width = window.innerWidth + "px";  // Update the main container width to match that of the screen
        line_chart_container.style.width = (window.innerWidth - 40) + "px";     // have the line chart take up the full width (less 40px)
        line_chart_container.style.marginLeft = "20px";         // 20px margin to left of chart
        line_chart_container.style.marginRight = "20px";        // 20px margin to right of chart
        click_to_see.style.width = "100%";                      // Click to see div is now full width
        domains_grid_container.style.marginLeft = ((window.innerWidth - 800) / 2) + "px";   // Re-position domains grid in middle of screen
        map_container.style.marginLeft = ((window.innerWidth - 700) / 2) + "px";        // Re-position map in middle of screen
        top_menu_items_div.style.marginBottom = "20px";                                 // Extra space underneath top menu items
        top_menu_items_div.style.marginTop= "10px";                                     // Extra space above top menu items
        top_menu_items_div.style.width = "100%";                                        // Move top menu onto its own row by setting it to full width
        dashboard_title.style.width = (top_container.clientWidth - 300) + "px";         // Space for title to 300px less than window width

        button_left.style.width = "100%";                       // "Previous indicator/domain" button to its own row by making it full width
        button_left.style.justifyContent = "center";            // Centre the button
        button_right.style.width = "100%";                      // "Next indicator/domain" button to its own row by making it full width
        button_right.style.justifyContent = "center";           // Centre the button

        for (let i = 0; i < top_menu_items.length; i++) {
            top_menu_items[i].style.fontSize = "18pt";          // Top menu buttons to size 18pt
        }

        for (let i = 0; i < button_rows.length; i++) {
            button_rows[i].style.fontSize = "18pt";             // Navigation buttons to size 18pt
        }

        for (let i = 0; i < white_box.length; i++) {
            white_box[i].style.fontSize = "14pt";           // Text inside white boxes to 14pt
        }
        
        while (breaks[0]) {
            map_form.removeChild(breaks[0]);                // Remove any line breaks between map dropdown menus
        }

        map_form.insertBefore(document.createElement("br"), map_label_2);   // Insert a line break before second dropdown
        map_form.insertBefore(document.createElement("br"), map_label_3);   // Insert a line break before third dropdown
        
    } else {    // When screen size is over 1200px wide:

        main_container.removeAttribute("style");            // Remove any style attributes set above for main container
        line_chart_container.removeAttribute("style");      // Remove any style attributes set above for line chart container
        click_to_see.style.width = "100px";                 // Reset click-to-see width to 100px
        domains_grid_container.style.marginLeft = "50px";   // Reset domains grid left margin to 50px
        map_container.removeAttribute("style");             // Remove any style attributes set above for map container
        top_menu_items_div.removeAttribute("style");        // Remove any style attributes set above for top menu items div
        dashboard_title.removeAttribute("style");           // Remove any style attributes set above dashboard title

        for (let i = 0; i < top_menu_items.length; i++) {
            top_menu_items[i].removeAttribute("style");     // Remove any style attributes set above for top menu items
        }

        for (let i = 0; i < button_rows.length; i++) {
            button_rows[i].style.fontSize = "12pt";         // Reset button font size to 12pt
        }

        for (let i = 0; i < white_box.length; i++) {
            white_box[i].style.fontSize = "12pt";           // Reset white box text to 12pt
        }
        

        while (breaks[0]) {
            map_form.removeChild(breaks[0]);            // Remove any line breaks between dropdown menus
        }

        button_left.removeAttribute("style");           // Remove any style attributes set above on "previous indicator/domain" button
        button_right.removeAttribute("style");           // Remove any style attributes set above on "next indicator/domain" button

    }
    
    // Resize box containers
    for (let i = 0; i < box_containers.length; i++) {
        if (window.innerWidth < 1200) { // When width is less than 1200px:
            box_containers[i].style.marginTop = "10px";     // Top margin of 10px
            box_containers[i].style.width = "100%";         // Full width of page
            box_containers[i].style.paddingLeft = "5%";     // 5% spacing on left
            box_containers[i].style.paddingRight = "5%";    // 5% spacing on right
        } else {    // Greater than 1200px:
            box_containers[i].removeAttribute("style");     // Remove all above
        }
    }    

}

// Functionality when user clicks on "Expand further information"
further_expander.onclick = function() {

   info_div = document.getElementsByClassName("further-selected")[0];   // The div containing the further information for the relevant indicator

   if (info_div.clientHeight == 0) {        // When the "info_div" isn't visible, then show it:
      info_div.style.maxHeight = "5000px";                                                  // Set max height to very high value to allow it to expand
      further_expander.getElementsByTagName("span")[0].textContent = "Click to hide";       // Change display text
      further_expander.getElementsByTagName("i")[0].classList.remove("fa-plus");            // Remove plus sign icon
      further_expander.getElementsByTagName("i")[0].classList.add("fa-minus");              // Show minus sign icon
   } else {     // When it is shown, hide it:
      info_div.removeAttribute("style");    // Revert style applid above
      setTimeout(function() {
        further_expander.getElementsByTagName("span")[0].textContent = "Click to expand";   // Change display text
        further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");         // Remove minus sign icon
        further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");             // Add plus sign icon
      }, 800)
   }
}

further_expander_map.onclick = function() {

    if (further_info_map.clientHeight == 0) { // When the "further_info_map" div isn't visible, then show it:
        further_info_map.style.maxHeight = "5000px";                                              // Set max height to very high value to allow it to expand
        further_expander_map.getElementsByTagName("span")[0].textContent = "Click to hide";       // Change display text
        further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-plus");            // Remove plus sign icon
        further_expander_map.getElementsByTagName("i")[0].classList.add("fa-minus");              // Show minus sign icon
    } else {
        further_info_map.removeAttribute("style");    // Revert style applid above
        setTimeout(function() {
            further_expander_map.getElementsByTagName("span")[0].textContent = "Click to expand";   // Change display text
            further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-minus");         // Remove minus sign icon
            further_expander_map.getElementsByTagName("i")[0].classList.add("fa-plus");             // Add plus sign icon
        }, 800)
    }
    
}


// Any link on the dashboard that directs the user to the Help Screen
for (let i = 0; i < user_guide_link.length; i ++) {

    user_guide_link[i].onclick = function() {

        domains_scrn.style.display = "none";    // Hide domains screen
        overall_scrn.style.display = "none";    // Hide overall screen
        help_scrn.style.display = "block";      // Show Help screen

        domains_btn.classList.remove("selected-item");              // Remove highlight from domains button
        domains_btn.firstChild.classList.remove("selected-icon");   // Remove highlight from domains icon
        overall_btn.classList.remove("selected-item");              // Remove highlight from overall button
        overall_btn.firstChild.classList.remove("selected-icon");   // Remove highlight from overall icon
        help_btn.classList.add("selected-item");                    // Add highlight to help button

    }    

}


// The link to the Indicator page on map screen:
chart_link.onclick = function() {

    maps_scrn.style.display = "none";       // Hide maps screen
    indicator_scrn.style.display = "block"; // Show indicators screen

    maps_btn.classList.remove("selected-item");     // Remove highlight from maps button
    maps_btn.firstChild.classList.remove("selected-icon");  // Remove hightlight from maps icon
    
    overall_btn.classList.add("selected-item");             // Add highlight to overall button
    overall_btn.firstChild.classList.add("selected-icon");  // Add highlight to overall icon

    for (let i = 0; i < button_rows.length; i ++) {
        button_rows[i].style.display = "flex";          // Show navigation button containers
    }

    buttons = document.getElementsByClassName("nav-btn");

    for (let i = 0; i < buttons.length; i ++) {     
        buttons[i].style.display = "none";       // Hide navigation buttons
    }
    
    // Use the values in the first two dropdown menus to generate the indicator page
    // See above for function
    generateIndicatorPage(map_select_1.value, map_select_2.value); 

    // Generate a back button to take user back to map:
    back_btn_5 = document.createElement("div");     // Create a div for back button
    back_btn_5.id = "back-btn-5";                   // Give div the id "back-btn-5"
    back_btn_5.classList.add("nav-btn");            // Give it the class "nav-btn"
    back_btn_5.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>'+ map_select_2.value +'</strong> map';      // Text and icon for button

    if (document.getElementById("back-btn-3")) {
        document.getElementById("back-btn-3").style.display = "block";      // If the back to Overall button already exists, show it again
    } else {

        // If back to Overall buttons 
        back_btn_3 = document.createElement("div");     // Create a div for back button
        back_btn_3.id = "back-btn-3";                   // Give the div id "back-btn-3"
        back_btn_3.classList.add("nav-btn");            // Give it class "nav-btn"
        back_btn_3.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>Overall</strong> grid';      // Text and icon for back button

        back_button_container.appendChild(back_btn_3);  // Add it to back button container

        // Function behind new "back to overall" button
        back_btn_3.onclick = function () {

            document.getElementById("indicator-scrn").style.display = "none";   // Hide indicator screen
            document.getElementById("overall-scrn").style.display = "block";    // Show Overall screen
           
            for (let i = 0; i < button_rows.length; i++) {
                button_rows[i].style.display = "none";          // Hide buttons
            }

            // Re-run plotOverallHexes to account for any screen resizes (See above)
            plotOverallHexes("improving");
            plotOverallHexes("no_change");
            plotOverallHexes("worsening");

            back_button_container.removeChild(back_btn_3);  // Remove "back to overall button"
        
        }

    }

    back_button_container.appendChild(back_btn_5);  // Add "back to map" button to back button container

    // Function inside "back to map" button:
    back_btn_5.onclick = function() {

        document.getElementById("maps-scrn").style.display = "block";       // Show maps screen
        document.getElementById("indicator-scrn").style.display = "none";   // Hide indicator screen

        document.getElementById("maps-btn").classList.add("selected-item");             // Highlight maps button
        document.getElementById("maps-btn").firstChild.classList.add("selected-icon");  // Highlight maps icon
    
        document.getElementById("overall-btn").classList.remove("selected-item");               // Remove highlight from Overall button
        document.getElementById("overall-btn").firstChild.classList.remove("selected-icon");    // Remove highlight from Overall icon

        back_button_container.removeChild(back_btn_5);      // Remove "back to map" button

        for (let i = 0; i < button_rows.length; i ++) {
            button_rows[i].style.display = "none";  // Hide all buttons
        }

    }

}

// Create list of all indicators and sort alphabetically
var all_indicators = []

for (let i = 0; i < domains.length; i ++) {
    all_indicators.push(Object.keys(domains_data[domains[i]].indicators));
}

all_indicators = all_indicators.flat().sort();

// Function adapted from one found on https://www.w3schools.com/howto/howto_css_searchbar.asp
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a div element that will contain the items (values):*/
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.insertBefore(a, search_text);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].toUpperCase().includes(val.toUpperCase())) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("div");
            /*make the matching letters bold:*/
            b.innerHTML = arr[i].substr(0, arr[i].toUpperCase().indexOf(val.toUpperCase()));
            b.innerHTML += "<strong>" + arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase()), val.length) + "</strong>";
            b.innerHTML += arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase()) + val.length);

            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();

          if (all_indicators.includes(this.value)) {
            search_btn.click()
          } else {
            search_text.value = "";
            search_text.placeholder = "Not a valid indicator name"
          }

          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }

        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }


// Run above function
autocomplete(search_text, all_indicators);

// Code to execute when someone clicks on search button
search_btn.onclick = function () {

    // Run search when value in search bar matches one of the indicator names
    if (all_indicators.includes(search_text.value)) {

        // Hide any back buttons etc
        for (let i = 0; i < nav_buttons.length; i ++) {
            nav_buttons[i].style.display = "none";
        }

        // show container for buttons if currently hidden
        for (let i = 0; i < button_rows.length; i ++) {
            button_rows[i].style.display = "flex";
        }

        // Create a new back button
        back_btn_6 = document.createElement("div");
        back_btn_6.id = "back-btn-6";
        back_btn_6.classList.add("nav-btn");
        back_button_container.appendChild(back_btn_6);

        // New back button directs user back to page they were on before searching:
        if (indicator_scrn.style.display == "block") {

            last_indicator = indicator_title.textContent;
            last_domain = domain_title.textContent;

            back_btn_6.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>' + last_indicator + '</strong> indicator';

            back_btn_6.onclick = function() {

                generateIndicatorPage(last_domain, last_indicator)

                back_button_container.removeChild(back_btn_6);

                back_btn_2.style.display = "block";
                previous_btn_2.style.display = "block";
                next_btn_2.style.display = "block";                

            }

        } else if (domains_scrn.style.display == "block") {

            if (domains_grid_container.style.display == "block") {
                back_btn_6.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>Domains</strong> grid';
            } else {
                back_btn_6.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>' + clicked_hex.textContent + '</strong> domain';
            }

            back_btn_6.onclick = function () {
                indicator_scrn.style.display = "none";
                domains_scrn.style.display = "block";

                if (domains_grid_container.style.display == "block") {
                    for (let i = 0; i < button_rows.length; i ++) {
                        button_rows[i].style.display = "none";
                    }
                } else {
                    back_btn.style.display = "block";
                    previous_btn.style.display = "block";
                    next_btn.style.display = "block";
                }

                back_button_container.removeChild(back_btn_6);
            }

        } else if (help_scrn.style.display == "block") {

            back_btn_6.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>Help</strong> screen';

            back_btn_6.onclick = function() {
                indicator_scrn.style.display = "none";
                help_scrn.style.display = "block";
                back_button_container.removeChild(back_btn_6);
            }

        } else if (maps_scrn.style.display == "block") {

            back_btn_6.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>' + map_select_2.value + '</strong> map';

            back_btn_6.onclick = function() {
                indicator_scrn.style.display = "none";
                maps_scrn.style.display = "block";
                back_button_container.removeChild(back_btn_6);
            }

        } else if (overall_scrn.style.display == "block") {

            back_btn_6.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to <strong>Overall</strong> grid';

            back_btn_6.onclick = function() {
                indicator_scrn.style.display = "none";
                overall_scrn.style.display = "block";
                back_button_container.removeChild(back_btn_6);

                for (let i = 0; i < button_rows.length; i ++) {
                    button_rows[i].style.display = "none";
                }
            }

        }        

        // Hide all screens except for indicator screen
        domains_scrn.style.display = "none";
        help_scrn.style.display = "none";
        maps_scrn.style.display = "none";
        overall_scrn.style.display = "none";
        indicator_scrn.style.display = "block";
    
        // Obtain the domain name for the given indicator
        for (let i = 0; i < domains.length; i ++) {
            if (Object.keys(domains_data[domains[i]].indicators).includes(search_text.value)) {
                search_domain = domains[i];
                break;
            };
        }
    
        // Produce the indicator page
        generateIndicatorPage(search_domain, search_text.value)

        // Reset the text in search bar
        search_text.value = "";
        search_text.placeholder = "Search by indicator"

    } else {
        // If indicator not found inform user inside search bar
        search_text.value = "";
        search_text.placeholder = "Not a valid indicator name"
    } 

}
