// Top menu navigation function
var top_menu_items = document.getElementsByClassName("top-menu-item");
var breadcrumb_1 = document.getElementById("breadcrumb-1");
var breadcrumb_2 = document.getElementById("breadcrumb-2");
var breadcrumb_3 = document.getElementById("breadcrumb-3");

// Create a function for each top menu item
for (let i = 0; i < top_menu_items.length; i++) {

    top_menu_items[i].onclick = function() {

        // Hides the indicators screen
        document.getElementById("indicator-scrn").style.display = "none";

        for (let j = 0; j < top_menu_items.length; j++) {

            // the id of the clicked menu item
            var clicked_id = document.getElementById(top_menu_items[j].id);            

            // Switch view to screen relating to clicked item
            if (document.getElementById(top_menu_items[i].id) == clicked_id) {

                // Extra steps for domain screen when indicator screen is foreground
                if(top_menu_items[i].id == "domains-btn") {
                    document.getElementById("domains-scrn").getElementsByTagName("h2")[0].style.display = "block";
                    document.getElementById("domain-info-container").style.display = "none";
                    document.getElementById("domains-grid-container").style.display = "block";
                    document.getElementById("click-to-see").style.display = "block";
                }

                // Updates highlighted item in menu and brings relevant screen to foreground
                clicked_id.classList.add("selected-item");
                clicked_id.firstChild.classList.add("selected-icon");
                document.getElementById(clicked_id.id.replace("btn", "scrn")).style.display = "block";
                breadcrumb_1.innerHTML = clicked_id.textContent;

            } else {
                // Hides all other screens that don't match the one clicked
                clicked_id.classList.remove("selected-item");
                clicked_id.firstChild.classList.remove("selected-icon");
                document.getElementById(clicked_id.id.replace("btn", "scrn")).style.display = "none";
            }

            // Removes all text from position 2 and 3 of breadcrumb trail
            breadcrumb_2.innerHTML = "";
            breadcrumb_3.innerHTML = "";

        }        

    }    

}

var indicator_intros = document.getElementsByClassName("indicators-intro");

for (let i = 0; i < indicator_intros.length; i++)  {
    indicator_intros[i].innerHTML = "We have developed a set of indicators composed of Official and National Statistics. By looking at the evidence provided by these indicators, we can gain valuable insights into Northern Ireland's wellbeing, the areas where we are making progress, and where progress still needs to be made."
}

// Generate hex grid of domains
var domains = Object.keys(domains_data);
var domains_grid_container = document.getElementById("domains-grid-container");

for (let i = 0; i < domains.length; i++) {

    if (i % 3 == 0) {
        var hex_row = document.createElement("div");
        hex_row.classList.add("row");
        hex_row.classList.add("hex-row");
        domains_grid_container.appendChild(hex_row);
    }

    var hex = document.createElement("div");
    var hex_inner = document.createElement("div");
    var label = document.createTextNode(domains[i]);

    hex.classList.add("hex");
    hex_inner.classList.add("hex-inner");
    hex_inner.appendChild(label);
    hex.appendChild(hex_inner);
    hex_row.appendChild(hex);

}

var hex_rows = document.getElementsByClassName("hex-row");

for (let i = 0; i < hex_rows.length; i++) {
    if (i % 2 == 1) {
        hex_rows[i].style.marginLeft = "100px";
    }

    if (i > 0) {
        hex_rows[i].style.marginTop = "-25px";
    }
}

// Click on a domain
var hexagons = document.getElementsByClassName("hex-inner");
var domains_heading = document.getElementById("domains-scrn").getElementsByTagName("h2")[0];
var domain_info = document.getElementById("domain-info-container");
var clicked_hex = document.getElementById("clicked-hex");
var click_to_see = document.getElementById("click-to-see");
var clicked_desc = document.getElementById("clicked-desc");
var indicator_hexes = document.getElementById("indicator-hexes");
var indicator_intro = document.getElementById("domains-scrn").getElementsByClassName("indicators-intro")[0];


for (let i = 0; i < hexagons.length - 1; i++) {

    hexagons[i].parentElement.classList.add("shake-hex");

    hexagons[i].onclick = function() {

        domains_heading.style.display = "none";
        domain_info.style.display = "flex";
        domains_grid_container.style.display = "none";
        click_to_see.style.display = "none";
        indicator_intro.style.display = "block";

        var domain_name = hexagons[i].innerHTML;

        clicked_hex.innerHTML = domain_name;
        breadcrumb_2.innerHTML = "> " + domain_name;

        clicked_desc.innerHTML = domains_data[domain_name].description;

        var indicators = Object.keys(domains_data[domain_name].indicators);

        indicator_hexes.innerHTML = "";

        for (let i = 0; i < indicators.length; i++) {

            if (i % 3 == 0) {
                var hex_row = document.createElement("div");
                hex_row.classList.add("row");
                hex_row.classList.add("ind-hex-row");
                indicator_hexes.appendChild(hex_row);
            }

            var hex_container = document.createElement("div");
            var hex = document.createElement("div");
            var hex_label = document.createElement("div");
            var label_text = document.createTextNode(indicators[i]);

            var NI_data = domains_data[domain_name].indicators[indicators[i]].data.NI;
            var LGD_data = domains_data[domain_name].indicators[indicators[i]].data.LGD;
            var EQ_data = domains_data[domain_name].indicators[indicators[i]].data.EQ;

            if (NI_data != "") {
                base_text = document.getElementById(NI_data + "-base-statement").textContent;
            } else if (LGD_data != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD"].includes(LGD_data)) {
                base_text = document.getElementById(LGD_data + "-base-statement").textContent;
            }  else if (EQ_data != "" & !["INDGRADSEQ", "INDHOMELNEQ"].includes(EQ_data)) {
                base_text = document.getElementById(EQ_data + "-base-statement").textContent;
            } else {
                base_text = "";
            }

            if (base_text.includes("worsened")) {
                hex.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
                hex.classList.add("negative");
            } else if (base_text.includes("improved")) {
                hex.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
                hex.classList.add("positive");
            } else {
                hex.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            }

            hex_container.classList.add("ind-hex-container");
            hex.classList.add("ind-hex");            
            hex_label.classList.add("ind-hex-label");

            hex_label.appendChild(label_text);
            hex_container.appendChild(hex);
            hex_container.appendChild(hex_label);

            hex_row.appendChild(hex_container);

        }

        ind_hex_rows = document.getElementsByClassName("ind-hex-row");

        for (let i = 0; i < ind_hex_rows.length; i++) {
            if (i % 2 == 1) {
                ind_hex_rows[i].style.marginLeft = "75px";
            }
        
            if (i > 0) {
                ind_hex_rows[i].style.marginTop = "-25px";
            }
        }

        // Clinking an indicator name
        var indicator_links = document.getElementById("indicator-hexes").getElementsByClassName("ind-hex-container");

        for (let j = 0; j < indicator_links.length; j++) {

            indicator_links[j].onclick = function() {

                var indicator_name = indicator_links[j].getElementsByClassName("ind-hex-label")[0].innerHTML;
                breadcrumb_3.innerHTML = "> " + indicator_name;

                document.getElementById("domains-scrn").style.display = "none";
                document.getElementById("overall-scrn").style.display = "none";
                document.getElementById("indicator-scrn").style.display = "block";

                document.getElementById("domain-title").innerHTML = domain_name;

                document.getElementById("indicator-title").innerHTML = indicator_name;
                document.getElementById("ind-important").innerHTML = domains_data[domain_name].indicators[indicator_name].importance;

                
                var data = domains_data[domain_name].indicators[indicator_name].data;

                if (data.NI != "") {
                    
                    chart_id = data.NI.slice(0, -2) + "-line";                               

                } else if (data.LGD != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD"].includes(data.LGD)) {

                    chart_id = data.LGD.slice(0, -3) + "-line";

                } else if (data.EQ != "") {

                    chart_id = data.EQ.slice(0, -2) + "-line";

                }

                var line_charts = document.getElementsByClassName("line-chart");

                for (let k = 0; k < line_charts.length; k++) {

                    if (line_charts[k].id == chart_id) {
                        document.getElementById(chart_id).style.display = "block";
                    } else {
                        line_charts[k].style.display = "none";
                    }

                }

                // Output source
                var source_info = "This indicator is collected from the <a href='" + domains_data[domain_name].indicators[indicator_name].source_link + "' target='_blank'>" + domains_data[domain_name].indicators[indicator_name].source + "</a>.";

                document.getElementById("source-info").innerHTML = source_info;

                // Output "More data" paragraph
                var data_info = "You can view data ";

                if (data.NI != "") {
                    data_info = data_info + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + data.NI + '" target = "_blank">Northern Ireland level</a>, ';
                }

                if (data.LGD != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + data.LGD + '" target = "_blank">Local Government District</a>, ';
                }

                if (data.AA != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + data.AA + '" target = "_blank">Assembly Area</a>, ';
                }

                if (data.EQ != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + data.EQ + '" target = "_blank">Equality Groups</a>, ';
                }

                data_info = data_info + ' on the NISRA Data Portal.'

                if (data_info.lastIndexOf(",") > 0 ) {
                    data_info = data_info.substring(0, data_info.lastIndexOf(",")) + data_info.substring(data_info.lastIndexOf(",") + 1, data_info.length);
                }

                if (data_info.lastIndexOf(",") > 0 ) {
                    data_info = data_info.substring(0, data_info.lastIndexOf(",")) + " and " + data_info.substring(data_info.lastIndexOf(",") + 1, data_info.length);
                }

                document.getElementById("data-info").innerHTML = data_info;

                // Output things have improved/worsened
                if (data.NI != "") {
                    base_id = data.NI + "-base-statement"
                } else if (data.LGD != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD"].includes(data.LGD)) {
                    base_id = data.LGD + "-base-statement"
                } else if (data.EQ != "" & !["INDGRADSEQ", "INDHOMELNEQ"].includes(data.EQ)) {
                    base_id = data.EQ + "-base-statement"
                } else {
                    base_id = ""
                }

                var base_statements = document.getElementsByClassName("base-statement");

                for (let k = 0; k < base_statements.length; k++) {

                    if (base_statements[k].id == base_id) {
                        document.getElementById(base_id).style.display = "block";
                    } else {
                        base_statements[k].style.display = "none";
                    }

                }

        }

}

    }

}

// Overall screen
setTimeout(function () {

    improving_indicator = [];
    improving_domain = [];
    improving_importance = [];
    improving_base_id = [];
    improving_source = []
    improving_chart = [];

    no_change_indicator = [];
    no_change_domain = [];
    no_change_importance = [];
    no_change_base_id = [];
    no_change_source = []
    no_change_chart = [];

    worsening_indicator = [];
    worsening_domain = [];
    worsening_importance = [];
    worsening_base_id = [];
    worsening_source = []
    worsening_chart = [];

    for (let i = 0; i < domains.length; i++) {

        indicators = domains_data[domains[i]].indicators;

        for (let j = 0; j < Object.keys(indicators).length; j++) {
            
            data = Object.values(indicators)[j].data;
            importance = Object.values(indicators)[j].importance;
            source = Object.values(indicators)[j].source;

            if (data.NI != "") {

                base_id = data.NI + "-base-statement";
                chart_id = data.NI.slice(0, -2) + "-line";                              

            } else if (data.LGD != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD"].includes(data.LGD)) {

                base_id = data.LGD + "-base-statement";
                chart_id = data.LGD.slice(0, -3) + "-line";

            } else if (data.EQ != "" & !["INDGRADSEQ", "INDHOMELNEQ"].includes(data.EQ)) {

                base_id = data.EQ + "-base-statement";
                chart_id = data.EQ.slice(0, -2) + "-line";

            }
            
            base_text = document.getElementById(base_id).textContent;

            if (base_text.includes("improved")) {
                improving_indicator.push(Object.keys(indicators)[j]);
                improving_domain.push(domains[i]);
                improving_importance.push(importance);
                improving_base_id.push(base_id);
                improving_source.push(source);
                improving_chart.push(chart_id);
            } else if (base_text.includes("worsened")) {
                worsening_indicator.push(Object.keys(indicators)[j]);
                worsening_domain.push(domains[i]);
                worsening_importance.push(importance);
                worsening_base_id.push(base_id);
                worsening_source.push(source);
                worsening_chart.push(chart_id);
            } else {
                no_change_indicator.push(Object.keys(indicators)[j]);
                no_change_domain.push(domains[i]);
                no_change_importance.push(importance);
                no_change_base_id.push(base_id);
                no_change_source.push(source);
                no_change_chart.push(chart_id);
            }

        }

    }

    plotOverallHexes = function(change_type) {

        for (let i = 0; i < eval(change_type + "_indicator").length; i++) {

            className = change_type.replace("_", "-");

            if (i % 6 == 0) {
                var hex_row = document.createElement("div");
                hex_row.classList.add("row");
                hex_row.classList.add(className + "-hex-row");
                document.getElementById(className + "-hexes").appendChild(hex_row);
            }
    
            if (i % 12 == 6) {
                hex_row.style.marginLeft = "75px"
            }
    
            if (i >= 6) {
                hex_row.style.marginTop = "-25px";
            }
    
            var hex_container = document.createElement("div");
            var hex = document.createElement("div");
            var hex_label = document.createElement("div");
            var label_text = document.createTextNode(eval(change_type + "_indicator")[i]);
    
            hex_container.classList.add("ind-hex-container");
            hex.classList.add("ind-hex");            
            hex_label.classList.add("ind-hex-label");
    
            hex_label.appendChild(label_text);
            hex_container.appendChild(hex);
            hex_container.appendChild(hex_label);
    
            if (change_type == "improving") {
                hex.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
                hex.classList.add("positive");
            } else if (change_type == "no_change") {
                hex.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            } else if (change_type == "worsening") {
                hex.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
                hex.classList.add("negative");
            }

            hex_row.appendChild(hex_container);
    
            hex_container.onclick = function() {
                document.getElementById("overall-scrn").style.display = "none";
                document.getElementById("indicator-scrn").style.display = "block";
                document.getElementById("indicator-title").innerHTML = eval(change_type + "_indicator")[i];
                document.getElementById("domain-title").innerHTML = eval(change_type + "_domain")[i];
                document.getElementById("ind-important").innerHTML = eval(change_type + "_importance")[i];
                document.getElementById("source-info").innerHTML = eval(change_type + "_source")[i];
    
                breadcrumb_2.innerHTML = "> " + eval(change_type + "_indicator")[i];
    
                base_statements = document.getElementsByClassName("base-statement");
    
                for (let j = 0; j < base_statements.length; j++) {
                    base_statements[j].style.display = "none";
                }
    
                document.getElementById(eval(change_type + "_base_id")[i]).style.display = "block";
    
                line_charts = document.getElementsByClassName("line-chart");
    
                for (let j = 0; j < line_charts.length; j++) {
                    line_charts[j].style.display = "none";
                }
    
                document.getElementById(eval(change_type + "_chart")[i]).style.display = "block";
    
                data = domains_data[eval(change_type + "_domain")[i]].indicators[eval(change_type + "_indicator")[i]].data;   
    
                // Output "More data" paragraph
                var data_info = "You can view data ";
    
                if (data.NI != "") {
                    data_info = data_info + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + data.NI + '" target = "_blank">Northern Ireland level</a>, ';
                }
    
                if (data.LGD != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + data.LGD + '" target = "_blank">Local Government District</a>, ';
                }
    
                if (data.AA != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + data.AA + '" target = "_blank">Assembly Area</a>, ';
                }
    
                if (data.EQ != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + data.EQ + '" target = "_blank">Equality Groups</a>, ';
                }
    
                data_info = data_info + ' on the NISRA Data Portal.'
    
                if (data_info.lastIndexOf(",") > 0 ) {
                    data_info = data_info.substring(0, data_info.lastIndexOf(",")) + data_info.substring(data_info.lastIndexOf(",") + 1, data_info.length);
                }
    
                if (data_info.lastIndexOf(",") > 0 ) {
                    data_info = data_info.substring(0, data_info.lastIndexOf(",")) + " and " + data_info.substring(data_info.lastIndexOf(",") + 1, data_info.length);
                }
    
                document.getElementById("data-info").innerHTML = data_info;
    
            }
    
        }

    }

    plotOverallHexes("improving");
    plotOverallHexes("no_change");
    plotOverallHexes("worsening");


    document.getElementById("loading-img").style.display = "none";
    document.getElementById("overall-hexes").style.display = "block";

}, 3000);

setTimeout(function () {

    not_loading = document.createElement("div");
    not_loading.id = "not-loading";
    not_loading.innerHTML = "<p>Data not loading? <a href='.'>Click here to refresh</a></p>"

    if (document.getElementById("overall-hexes").style.display != "block") {
        document.getElementById("overall-scrn").appendChild(not_loading);
    }

}, 3001)

// Click on breadcrumb 1
breadcrumb_1.onclick = function() {

    text_content = breadcrumb_1.textContent.trim();

    if (text_content == "Domains") {
        document.getElementById("domains-scrn").style.display = "block";
        document.getElementById("domains-scrn").getElementsByTagName("h2")[0].style.display = "block";
        document.getElementById("indicator-scrn").style.display = "none";
        document.getElementById("domain-info-container").style.display = "none";
        document.getElementById("domains-grid-container").style.display = "block";
        document.getElementById("click-to-see").style.display = "block";
    } else if (text_content == "Overall") {
        document.getElementById("overall-scrn").style.display = "block";
        document.getElementById("indicator-scrn").style.display = "none";
    }

    breadcrumb_2.innerHTML = "";
    breadcrumb_3.innerHTML = "";

}

// Click on breadcrumb 2
breadcrumb_2.onclick = function() {

    text_content_1 = breadcrumb_1.textContent.trim();
    text_content_2 = breadcrumb_2.textContent.replace(">", "").trim();

    if (text_content_1 == "Domains") {
        document.getElementById("domains-scrn").style.display = "block";
        document.getElementById("indicator-scrn").style.display = "none";
    }

    breadcrumb_3.innerHTML = "";

}

// Content height
mainContainerHeight = function() {
    top_menu = document.getElementById("top-menu");
    footer = document.getElementsByTagName("footer")[0];
    main_container = document.getElementById("main-container");

    var ideal_height = window.innerHeight - top_menu.clientHeight - footer.clientHeight;

    main_container.style.minHeight = ideal_height + "px";
}

window.onload = function() {
    showCookieBanner();
    mainContainerHeight();
};

window.onresize = mainContainerHeight;

