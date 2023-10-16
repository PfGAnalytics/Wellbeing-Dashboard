// Create variable names for various html elements defined in "index.html" so they can be referred to with shorter names further down the code
var top_menu_items = document.getElementsByClassName("top-menu-item");
var back_button_container = document.getElementById("back-button-container");
var button_container = document.getElementById("button-container");
var button_left = document.getElementById("button-left");
var button_right = document.getElementById("button-right");
var domains_grid_container = document.getElementById("domains-grid-container");
var domains_title = document.getElementById("domains-title");
var domain_info = document.getElementById("domain-info");
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
var search_bar = document.getElementById("search-bar");
var search_box = document.getElementById("search-box");
var framework_structure = document.getElementById("framework-structure");
var overall_labels = document.getElementsByClassName("overall-label");
var change_info = document.getElementById("change-info");
var loading_img = document.getElementById("loading-img");
var loading_img_2 = document.getElementById("loading-img-2");
var loading_img_3 = document.getElementById("loading-img-3");
var intro = document.getElementsByClassName("intro");
var domains_footer = document.getElementById("domains-footer");
var back_button = document.getElementById("back-button");

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

    var hex = document.createElement("button");            // Create the first div which will be the blue hexagon that acts as a border
    var hex_inner = document.createElement("div");      // Create the second div which is the green heaxagon

    hex.classList.add("hex");                           // Give outer hexagon class "hex"
    hex.name = "domain";
    hex.value = domains[i].toLowerCase();

    hex_inner.classList.add("hex-inner");               // Give inner hexagon class "hex-inner"
    hex_inner.innerHTML = domains[i].replace(" ", " <br>");                 // Label the inner div with the name of the domain
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

    domain_title.innerHTML = d;             // Place the domain name inside the "domain-title" div element

    indicator_title.innerHTML = e;          // Place the indicator name inside the div element "indicator-title"
    ind_important.innerHTML = domains_data[d].indicators[e].importance;   // Update the indicator importance div element
    
    var data = domains_data[d].indicators[e].data;      // The nested "data" object for the relevant indicator

    data_info.innerHTML = writeDataInfo(data);   // Place sentence in "data-info" div    

    // This next section will add a link to the relevant map on an indicator page. If available
    while(map_link.firstChild) {
        map_link.removeChild(map_link.firstChild);  // Remove any map links already generated on previous indicator pages viewed
    }

    if (data.AA != "" || data.LGD != "" || data.EQ != "") { // When there is AA or LGD data present for the indicator in domains_data

        if (data.AA != "" || data.LGD != "") {
            see_maps = document.createElement("div");               // Create a new div element
            see_maps.textContent = "See this indicator mapped by:"  // Add text to div
            see_maps.id = "see-maps";                               // Give this div an id "see-maps"
            map_link.appendChild(see_maps);                         // Add this div to the div "map-link"
        }       

    } else {
        map_link.style.display = "none"
    }

    // When AA data is present generate a link to it
    if (data.AA != "") {

        AA_link = document.createElement("button");    // new button element for AA link
        AA_link.id = "AA-link";                     // Given id "AA-link"
        AA_link.innerHTML = "<img id = 'assembly-logo' src = 'img/NI_Assembly.svg' alt = 'Northern Ireland Assembly logo'>Assembly Area";  // Add text and icon
        AA_link.name = "map";
        AA_link.value = data.AA;
        map_link.appendChild(AA_link);      // Add link to "map-link" button

    }

    // When LGD data is present generate a link to it
    if (data.LGD != "") {

        LGD_link = document.createElement("button"); // new button element for LGD link
        LGD_link.id = "LGD-link";                 // Given id "AA-link"
        LGD_link.innerHTML = "<img id = 'council-logo' src = 'img/Northern_Ireland_outline.svg' alt = 'Northern Ireland outline icon'>Local Government District";  // Add text and icon
        LGD_link.name = "map";
        LGD_link.value = data.LGD;
        map_link.appendChild(LGD_link);      // Add link to "map-link" div

    }

    if (data.EQ != "") {
        see_eq = document.createElement("div");
        see_eq.textContent = "See indicator trends by:"
        see_eq.id = "see-eq";
        map_link.appendChild(see_eq);
        getEqualityGroups(d, e)           
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

        var hex_container = document.createElement("button");  // Create a new div for the hexagon container (into which the hexagon and its label will be nested)
        hex_container.classList.add("shake-hex");           // Give it the class "shake-hex"
        var hex = document.createElement("div");            // Create a new div for the hexagon
        var hex_label = document.createElement("div");      // Create a new div for the label text

        var data = domains_data[d].indicators[indicators[i]].data; // The data object within this indicator

        if (Object.keys(worsening_indicator).includes(indicators[i])) {   // If the word "worsened" appears in the baseline statement:
            hex.innerHTML = '<i class="fa-solid fa-down-long"></i>';    // Place a down arrow in the hexagon
            hex.classList.add("negative");      // Add the class "negative" to the hexagon
            hex_label.classList.add("negative");    // Add the class "negative" to the label text
        } else if (Object.keys(improving_indicator).includes(indicators[i])) {    // If the word "improved" appears in the baseline statement:
            hex.innerHTML = '<i class="fa-solid fa-up-long"></i>';  // Place an up arrow in the hexagon
            hex.classList.add("positive");              // Add the class "positive" to the hexagon
            hex_label.classList.add("positive");        // Add the class "negative" to the label text
        } else {    // Otherwise:
            hex.innerHTML = '<i class="fa-solid fa-right-long"></i>';   // Place a sideways arrow in the hexagon
        }

        hex_container.classList.add("ind-hex-container");   // Add class "ind-hex-container" to the hexagon container
        hex_container.name = "indicator";
        hex_container.value = indicators[i].replace(/[^a-z ]/gi, '').toLowerCase();
        hex.classList.add("ind-hex");               // Add class "ind-hex" to the hexagon
        hex_label.classList.add("ind-hex-label");   // Add class "ind-hex-label" to the label

        hex_label.textContent = indicators[i];      // Place the indicator name in the label
        hex_container.appendChild(hex);             // Place the hexagon in the hexagon container
        hex_container.appendChild(hex_label);       // Place the label in the hexagon container
                
        hex_row.appendChild(hex_container);         // Place the hexagon container into the hexagon row

        if (i == indicators.length - 1) {
            loading_img_3.style.display = "none";
            domain_info.style.display = "block";
        }

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

    // Position of key at bottom of domain page (stop it varying depending on Domain)
    key.style.marginTop = (508 - indicator_hexes.clientHeight) + "px";

}

// This next loop will go through all the hexagons on the Domains screen and functionality for clicking on each Domain
hexagons = domains_grid_container.getElementsByClassName("hex-inner");
for (let i = 0; i < hexagons.length; i++) {
    hexagons[i].parentElement.classList.add("shake-hex");   // Add the "shake-hex" class to each hexagon
}

// Overall screen
// The function below plots the Hexagons on the Overall and is called three times. Once each for "improving", "no_change" and "worsening" indicators
// The function runs any time the user resizes the window and when the Overall screen is accessed via the menu at top or a back button
function plotOverallHexes (change_type) {
        
    // Use the user's screen size to determine a value "h" which will be the number of hexagons that can fit in a single row
    gridWidth = overall_scrn.clientWidth - 195;

    // Set "h" to the number of hexagons that will fit on screen
    h = Math.floor(gridWidth / 180);

    // The change type "no_change" has the class "no-change"
    className = change_type.replace("_", "-");
    
    // Remove any hexagons created in previous calls of plotOverallHexes()
    while (document.getElementById(className + "-hexes").firstChild) {
        document.getElementById(className + "-hexes").removeChild(document.getElementById(className + "-hexes").firstChild)
    }

    // Loop through the indicators within each change_type
    for (let i = 0; i < Object.keys(eval(change_type + "_indicator")).length; i++) {            

        // Ensuring there are "h" and "h - 1" hexagons in alternating rows
        if (i % (2 * h - 1) == 0 || i % (2 * h - 1) == h)  {
            var hex_row = document.createElement("div");    // Create a div for a new row
            hex_row.classList.add("row");                   // Give div the class "row"
            hex_row.classList.add(className + "-hex-row");  // Give div the class 'className + "-hex-row"' (eg, "improving-hex-row")
            document.getElementById(className + "-hexes").appendChild(hex_row);     // Place hex-row in relevant div on Overall page (eg, "improving-hex-row" goes into "improving-hexes")
        }            

        if (i % (2 * h - 1) == h) {
            hex_row.style.marginLeft = "105px"; // Even numbered rows are indented by 105px
        } else if (i % (2 * h - 1) == 0) {
            hex_row.style.marginLeft = "15px";  // And odd numbered ones by 15px
        }

        if (i >= h) {
            hex_row.style.marginTop = "-30px";  // All rows after first row are moved up by 30px
        }

        if (h < 2) {
            hex_row.style.marginTop = "0px"; // Re-position hexagons if screen very narrow
        }

        var hex_container = document.createElement("button");      // Create a hexagon container div. The hexagon div and the hexagon label div will be nested under this one
        hex_container.classList.add("shake-hex");               // Give it the class "shake-hex"
        var hex = document.createElement("div");                // Create a hexagon div
        var hex_label = document.createElement("div");          // Create a hexagon label

        hex_container.classList.add("ind-hex-container");       // Give hexagon conatiner the class "ind-hex-container"
        hex_container.name = "oindicator";
        hex_container.value = Object.keys(eval(change_type + "_indicator"))[i].replace(/[^a-z ]/gi, '').toLowerCase();

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

    }

}

// Function to Write the "More data" sentence on indicator and map pages
function writeDataInfo (d) {
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

// Top menu navigation:
var currentURL = window.location.href;

if (!currentURL.includes("?")) {
    loading_img.style.display = "none";
    domains_scrn.style.display = "block"
}

if (currentURL.includes("tab=")) {

    currentTab = currentURL.slice(currentURL.indexOf("tab=") + "tab=".length);
    
    if (currentTab.indexOf("&") > - 1) {
        currentTab = currentTab.slice(0, currentTab.indexOf("&"))
    }

    for (let i = 0; i < top_menu_items.length; i++) {        
        
        if (top_menu_items[i].id.includes(currentTab)) {
            document.getElementById(currentTab + "-btn").classList.add("selected-item");
            document.getElementById(currentTab + "-btn").firstChild.classList.add("selected-icon");
            document.getElementById(top_menu_items[i].id.replace("btn", "scrn")).style.display = "block";
        } else {
            document.getElementById(top_menu_items[i].id.replace("btn", "scrn")).style.display = "none";
            top_menu_items[i].classList.remove("selected-item");
            top_menu_items[i].firstChild.classList.remove("selected-icon");
        }

        if (currentTab == "maps") {
            loading_img.style.display = "none";
            maps_scrn.style.display = "block";

            updateMapSelect2();         // Update list of options inside second map drop down menu
            updateMapSelect3();         // Update list of options inside third map drop down menu

            setTimeout(function() {
                if (map_select_3.value != map_select_3.options[0].value) {
                    location.reload();
                }
            }, 1)

        } else if (currentTab == "overall") {
            indicatorPerformance();
        } else {
            loading_img.style.display = "none";
        }

    }

}

// Page navigation when a domain hexagon is clicked:
if (currentURL.includes("?domain=")) {

    currentDomain = currentURL.slice(currentURL.indexOf("?domain=") + "?domain=".length);
    var lookUpDomain = "";

    for (let i = 0; i < domains.length; i ++) {
        if (currentDomain == domains[i].toLowerCase().replace(" ", "+")) {
            lookUpDomain = domains[i]
        }
    }

    // List of indicators for selected domain
    indicators = Object.keys(domains_data[lookUpDomain].indicators);

    indicatorPerformance(dom = lookUpDomain);

    // Hide domains grid and display indicators
    domains_title.style.display = "none";   // Hide the "domains-title" div
    domain_info_container.style.display = "flex";     // Show the "domain-info" div
    domains_grid_container.style.display = "none";  // Hide the domains grid
    click_to_see.style.display = "none";        // Hide the "click-to-see" div
    domains_intro.style.display = "none";       // Hide the "domains-intro" div
    indicator_intro.style.display = "block";    // Show the "indicator-intro" div

    var domain_name = lookUpDomain;    // Obtain domain name from hexagon text

    clicked_hex.innerHTML = domain_name.replace(" ", " <br>");    // Update text inside "clicked-hex"
    domain_name_text.textContent = domain_name;     // Update "domain-name-text" inside intro paragraph

    clicked_desc.innerHTML = domains_data[domain_name].description; // Update description of domain

    for (let i = 0; i < button_rows.length; i ++) {
        button_rows[i].style.display = "flex";          // Show all the divs with the class "button-row"
    }

    // The "Previous Domain" and "Next Domain" buttons:
    var current_index = domains.indexOf(lookUpDomain);  // A numeric counter of the Domain currently on view

    // Generate "see Previous domain" button
    // The button text and icon are generated (except when the first Domain is clicked)
    

    if (current_index != 0) {
        previous_btn = document.createElement("button");   // Div for previous domain button
        previous_btn.id = "previous-domain";            // Given the id "previous-domain"
        previous_btn.classList.add("nav-btn");          // Given the class "nav-btn"
        previous_btn.name = "domain";
        previous_btn.value = domains[current_index - 1].toLowerCase();
        previous_btn.innerHTML =  '</strong> <i class="fa-solid fa-backward"></i> Previous domain: <strong>' + hexagons[current_index - 1].textContent;
        button_left.appendChild(previous_btn);  // Button is added to div "button-left"
    }



    // Generate "see Next domain" button   
    // The button text and icon are generated (except when the last Domain is clicked)
    if (current_index != hexagons.length - 1) {
        next_btn = document.createElement("button");       // Div for next domain button
        next_btn.id = "next-domain";                    // Given the id "next-domain"
        next_btn.classList.add("nav-btn");              // Given the class "nav-btn"
        next_btn.name = "domain";        
        next_btn.value = domains[current_index + 1].toLowerCase();
        next_btn.innerHTML = 'Next domain: <strong>' + hexagons[current_index + 1].textContent +'</strong> <i class="fa-solid fa-forward"></i> ';
        button_right.appendChild(next_btn);   // Button is added to div "button-right"
    }

    // Generate "back to domains button"
    back_btn = document.createElement("button");
    back_btn.classList.add("nav-btn");
    back_btn.name = "tab";
    back_btn.value = "domains";
    back_btn.innerHTML = '<i class="fa-solid fa-arrow-turn-up fa-flip-horizontal"></i> Back to <strong>Domains</strong> grid';
    back_button.appendChild(back_btn);
    
}

domain_title.onclick = function() {

    titleDomain = domain_title.textContent.toLowerCase();
    domain_btns = document.getElementsByName("domain");

    for (let i = 0; i < domain_btns.length; i ++) {
        if (titleDomain == domain_btns[i].value) {
            domain_btns[i].click();
        }
    }
}

// Page navigation when indicator is clicked
if (currentURL.includes("?indicator=")) {

    currentIndicator = currentURL.slice(currentURL.indexOf("?indicator=") + "?indicator=".length);

    lookUpIndicator = "";
    for (let i = 0; i < all_indicators.length; i ++) {
        if (currentIndicator == all_indicators[i].replace(/[^a-z ]/gi, '').toLowerCase().replaceAll(" ", "+")) {
            lookUpIndicator = all_indicators[i]
        }
    }

    lookUpDomain = "";
    for (let i = 0; i < domains.length; i ++) {
        
        indicators = Object.keys(domains_data[domains[i]].indicators);

        if (indicators.includes(lookUpIndicator)) {
            lookUpDomain = domains[i];
        }

    }

    domains_scrn.style.display = "none";    // Hide Domains screen
    indicator_scrn.style.display = "block"; // Show the Indicator screen

    createLineChart(lookUpDomain, lookUpIndicator);
    generateIndicatorPage(lookUpDomain, lookUpIndicator);

    for (let i = 0; i < button_rows.length; i ++) {
        button_rows[i].style.display = "flex";          // Show all the divs with the class "button-row"
    }

    // The "Previous Indicator" and "Next Indicator" buttons:
    current_index = Object.keys(domains_data[lookUpDomain].indicators).indexOf(lookUpIndicator);  // A numeric index of the indicator currently in view

    // "Previous indicator" button
    // The button text and icon are generated (except when the indicator clicked on is the first indicator for that domain)
    if (current_index != 0) {
        previous_btn_2 = document.createElement("button");     // Div for previous indicator button
        previous_btn_2.id = "previous-btn-2";               // Given the id "previous-btn-2"
        previous_btn_2.classList.add("nav-btn");            // Given the class "nav-btn"
        previous_btn_2.name = "indicator";
        previous_btn_2.value = Object.keys(domains_data[lookUpDomain].indicators)[current_index - 1].replace(/[^a-z ]/gi, '').toLowerCase();
        previous_btn_2.innerHTML = '<i class="fa-solid fa-backward"></i> Previous indicator: <strong>' + Object.keys(domains_data[lookUpDomain].indicators)[current_index - 1] +'</strong>';
        button_left.appendChild(previous_btn_2);    // Button is added to div "button-left"
    }    

    // "Next indicator" button   
    // The button text and icon are generated (except when the indicator clicked on is the last indicator for that domain)
    if (current_index != Object.keys(domains_data[lookUpDomain].indicators).length - 1) {
        next_btn_2 = document.createElement("button");     // Div for next indicator button
        next_btn_2.id = "next-btn-2";                   // Given the id "next-btn-2"
        next_btn_2.classList.add("nav-btn");            // Given the class "nav-btn"
        next_btn_2.name = "indicator";
        next_btn_2.value = Object.keys(domains_data[lookUpDomain].indicators)[current_index + 1].replace(/[^a-z ]/gi, '').toLowerCase();
        next_btn_2.innerHTML = 'Next indicator: <strong>' + Object.keys(domains_data[lookUpDomain].indicators)[current_index + 1] +'</strong> <i class="fa-solid fa-forward"></i> ';
        button_right.appendChild(next_btn_2);   // Button is added to div "button-right"
    }

    back_btn = document.createElement("button");
    back_btn.classList.add("nav-btn");
    back_btn.name = "domain";
    back_btn.value = lookUpDomain.toLowerCase();
    back_btn.innerHTML = '<i class="fa-solid fa-arrow-turn-up fa-flip-horizontal"></i> Back to <strong>' + lookUpDomain + '</strong> domain';
    back_button.appendChild(back_btn);

}

// Page navigation when indicator is clicked from Overall screen
if (currentURL.includes("?oindicator=")) {

    currentIndicator = currentURL.slice(currentURL.indexOf("?oindicator=") + "?oindicator=".length);

    domains_btn.classList.remove("selected-item");
    domains_btn.firstChild.classList.remove("selected-icon");
    overall_btn.classList.add("selected-item");
    overall_btn.firstChild.classList.add("selected-icon");

    lookUpIndicator = "";
    for (let i = 0; i < all_indicators.length; i ++) {
        if (currentIndicator == all_indicators[i].replace(/[^a-z ]/gi, '').toLowerCase().replaceAll(" ", "+")) {
            lookUpIndicator = all_indicators[i]
        }
    }

    lookUpDomain = "";
    for (let i = 0; i < domains.length; i ++) {
        
        indicators = Object.keys(domains_data[domains[i]].indicators);

        if (indicators.includes(lookUpIndicator)) {
            lookUpDomain = domains[i];
        }

    }  

    domains_scrn.style.display = "none";    // Hide Domains screen
    indicator_scrn.style.display = "block"

    createLineChart(lookUpDomain, lookUpIndicator);
    generateIndicatorPage(lookUpDomain, lookUpIndicator);

    button_rows[0].style.display = "flex";

    back_btn = document.createElement("button");
    back_btn.classList.add("nav-btn");
    back_btn.name = "tab";
    back_btn.value = "overall";
    back_btn.innerHTML = '<i class="fa-solid fa-arrow-turn-up fa-flip-horizontal"></i> Back to <strong>Overall</strong> grid';
    back_button.appendChild(back_btn);

}

if (currentURL.includes("map=")) {

    domains_btn.classList.remove("selected-item");
    domains_btn.firstChild.classList.remove("selected-icon");
    maps_btn.classList.add("selected-item");
    maps_btn.firstChild.classList.add("selected-icon");

    currentMap = currentURL.slice(currentURL.indexOf("map=") + "map=".length);

    domains_scrn.style.display = "none";
    maps_scrn.style.display = "block";

    // Find the domain and indicator name
    for (let i = 0; i < domains.length; i ++) {

        indicators = Object.keys(domains_data[domains[i]].indicators);

        for (let j = 0; j < indicators.length; j ++) {

            AA_data = domains_data[domains[i]].indicators[indicators[j]].data.AA;
            LGD_data = domains_data[domains[i]].indicators[indicators[j]].data.LGD;

            if (currentMap == AA_data && AA_data != "") {
                currentDomain = domains[i];
                currentIndicator = indicators[j];
                break;
            } else if (currentMap == LGD_data && LGD_data != "") {
                currentDomain = domains[i];
                currentIndicator = indicators[j];
                break;
            }
            
        }
    }

    map_select_1.value = currentDomain;
    updateMapSelect2();
    map_select_2.value = currentIndicator;
    updateMapSelect3();
    map_select_3.value = currentMap;

    setTimeout(function() {
        if (map_select_3.value != currentMap) {
            location.reload();
        }
    }, 1)

}


// Activate search bar:
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
            search_btn.click();
        } else {
            search_text.value = "";
            search_text.placeholder = "Not a valid indicator name";
            search_box.removeAttribute("style");
            search_box.style.animation = "shake 0.5s";
            search_box.style.animationIterationCount =  "one"; 
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
    if (maps_scrn.style.display == "block") {
        drawMap();
    }
};

// Execute the following functions anytime the window is resized:
window.onresize = function() {
    sizeForMobile();                // Resize and re-position page elements (see below)
    mainContainerHeight();          // See above
    plotOverallHexes("improving");  // Re-plot improving hexagons on Overall screen (see above)
    plotOverallHexes("no_change");  // Re-plot no change hexagons Overall screen (see above)
    plotOverallHexes("worsening");  // Re-plot worsening hexagons Overall screen (see above)
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
    map_form.submit();
}

// When there is any change to the second dropdown menu on the maps screen run the following functions:
map_select_2.onchange = function() {
    updateMapSelect3();     // Update options in third dropdown (see above)
    map_form.submit();
}

// When there is any change to the third dropdown menu on the maps screen run the following functions:
map_select_3.onchange = function() {
    map_form.submit()
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
        click_to_see.style.width = "400px";                      // Click to see div is now full width
        click_to_see.style.marginLeft = ((main_container.clientWidth - 400) / 2) + "px";
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

        for (let i = 0; i < intro.length; i++) {
            intro[i].style.fontSize = "14pt";           // Intro text to 14pt
        }

        domains_footer.style.fontSize = "14pt";
        
        while (breaks[0]) {
            map_form.removeChild(breaks[0]);                // Remove any line breaks between map dropdown menus
        }

        map_form.insertBefore(document.createElement("br"), map_label_2);   // Insert a line break before second dropdown
        map_form.insertBefore(document.createElement("br"), map_label_3);   // Insert a line break before third dropdown
        
    } else {    // When screen size is over 1200px wide:

        main_container.removeAttribute("style");            // Remove any style attributes set above for main container
        line_chart_container.removeAttribute("style");      // Remove any style attributes set above for line chart container
        click_to_see.style.width = "150px";                 // Reset click-to-see width to 100px
        click_to_see.style.marginLeft = "0px"
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

        for (let i = 0; i < intro.length; i++) {
            intro[i].style.fontSize = "12pt";           // Intro text to 12pt
        }

        domains_footer.style.fontSize = "12pt";
        

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
        help_btn.click(); // Have it simulate clicking the help screen button in the menu
    }    

}


// The link to the Indicator page on map screen:
chart_link.onclick = function() {
    chart_link.value = map_select_2.value.replace(/[^a-z ]/gi, '').toLowerCase();
}

// Code to execute when someone clicks on search button
search_btn.onclick = function () {

    // Run search when value in search bar matches one of the indicator names
    if (!all_indicators.includes(search_text.value) || search_text.value == "") {

        // If indicator not found inform user inside search bar
        search_text.value = "";
        search_text.placeholder = "Not a valid indicator name";
        search_box.removeAttribute("style");
        search_box.style.animation = "shake 0.5s";
        search_box.style.animationIterationCount =  "one";

        

    } else {
        search_text.value = search_text.value.replace(/[^a-z ]/gi, '').toLowerCase();
        search_bar.submit()
    } 

}

// Framework structure diagram
// Start by looping through all domains
for (let i = 0; i < domains.length; i ++) {

    framework_row = document.createElement("div");      // Create a row for each heaxagon and blue label to sit in
    framework_row.classList.add("row");                 // Give it class "row"

    hex_outer = document.createElement("div");          // Create the outer blue hexagon
    hex_outer.classList.add("hex");                     // Give it class "hex"
    hex_outer.style.cursor = "default";                 // Remove the hand cursor as there is no clicking on these

    hex_inner = document.createElement("div");                  // Create the inner green hexagon
    hex_inner.classList.add("hex-inner");                       // give it class "hex_inner"
    hex_inner.innerHTML = domains[i].replace(" ", " <br>")      // Insert domain name and line break between words

    hex_outer.appendChild(hex_inner);                       // Place inner hex in outer hex
    framework_row.appendChild(hex_outer);                   // Place outer hex in row

    desc = document.createElement("div");                   // Create div for description to sit in
    desc.classList.add("blue-label");                       // Give it the class "blue-label"
    desc.style.width = "500px";                             // Set width to 500px
    desc.style.minHeight = "76px";                          // Set min height to 76px
    desc.textContent = domains_data[domains[i]].description;        // Insert domain description from domains_data

    framework_row.appendChild(desc);                        // Place label in row

    if (i % 2 == 1) {
        framework_row.style.marginLeft = "100px";       // Indent even numbered rows by 100px
    }

    if (i > 0) {
        framework_row.style.marginTop = "-33px";        // Move all rows after first row up by 33px
    }

    framework_structure.appendChild(framework_row)      // Insert row into html document

}


// Pulsating icons on labels
for (let i = 0; i < overall_labels.length; i ++) {    

    overall_labels[i].onmouseover = function() {
        icon = overall_labels[i].getElementsByTagName("i")[0];
        icon.classList.add("fa-beat");
        overall_labels[i].style.cursor = "default";
    }

    overall_labels[i].onmouseout = function() {
        icon = overall_labels[i].getElementsByTagName("i")[0];
        icon.classList.remove("fa-beat")
    }
    
}