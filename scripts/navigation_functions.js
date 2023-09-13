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
        
        drawMap(matrix = map_select_3.value,
                improvement = domains_data[map_select_1.value].indicators[map_select_2.value].improvement,
                title = domains_data[map_select_1.value].indicators[map_select_2.value].chart_title);

        var further_infos = document.getElementsByClassName("further-info-text");
        var further_expander = document.getElementById("further-expander");

        for (let i = 0; i < further_infos.length; i++) {
            further_infos[i].removeAttribute("style");
            further_infos[i].classList.remove("further-selected");
            further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
            further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
            further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");
        }

        plotOverallHexes("improving");
        plotOverallHexes("no_change");
        plotOverallHexes("worsening");

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

    if (i == 0 || i == 3 || i == 7) {
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
    if (i % 2 == 0) {
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

// Remove living peacefully


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
            hex_container.classList.add("shake-hex");
            var hex = document.createElement("div");
            var hex_label = document.createElement("div");
            var label_text = document.createTextNode(indicators[i]);

            var NI_data = domains_data[domain_name].indicators[indicators[i]].data.NI;
            var LGD_data = domains_data[domain_name].indicators[indicators[i]].data.LGD;
            var EQ_data = domains_data[domain_name].indicators[indicators[i]].data.EQ;

            if (NI_data != "") {
                base_text = document.getElementById(NI_data + "-base-statement").textContent;
            } else if (EQ_data != "" & !["INDHOMELNEQ"].includes(EQ_data)) {
                base_text = document.getElementById(EQ_data + "-base-statement").textContent;
            } else if (LGD_data != "" & !["INDHOMELNLGD"].includes(LGD_data)) {
                base_text = document.getElementById(LGD_data + "-base-statement").textContent;
            }  else {
                base_text = "";
            }

            if (base_text.includes("worsened")) {
                hex.innerHTML = '<i class="fa-solid fa-down-long"></i>';
                hex.classList.add("negative");
            } else if (base_text.includes("improved")) {
                hex.innerHTML = '<i class="fa-solid fa-up-long"></i>';
                hex.classList.add("positive");
            } else {
                hex.innerHTML = '<i class="fa-solid fa-right-long"></i>';
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

                } else if (data.EQ != "" & !["INDHOMELNEQ"].includes(data.EQ)) {

                    chart_id = data.EQ.slice(0, -2) + "-line";

                } else if (data.LGD != "" & !["INDHOMELNLGD"].includes(data.LGD)) {

                    chart_id = data.LGD.slice(0, -3) + "-line";

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
                var data_info = "You can view and download data ";

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
                    further_id = data.NI + "-further-info"
                } else if (data.EQ != "" & !["INDHOMELNEQ"].includes(data.EQ)) {
                    base_id = data.EQ + "-base-statement"
                    further_id = data.EQ + "-further-info"
                } else if (data.LGD != "" & !["INDHOMELNLGD"].includes(data.LGD)) {
                    base_id = data.LGD + "-base-statement"
                    further_id = data.LGD + "-further-info"
                } else {
                    base_id = ""
                    further_id = ""
                }

                var base_statements = document.getElementsByClassName("base-statement");

                for (let k = 0; k < base_statements.length; k++) {

                    if (base_statements[k].id == base_id) {
                        document.getElementById(base_id).style.display = "block";
                    } else {
                        base_statements[k].style.display = "none";
                    }

                }

                var further_infos = document.getElementsByClassName("further-info-text");

                for (let k = 0; k < further_infos.length; k++) {

                    if (further_infos[k].id == further_id) {
                        document.getElementById(further_id).classList.add("further-selected");
                    } else {
                        further_infos[k].classList.remove("further-selected");
                    }

                }

            }

        }

        // Position of key
        num_rows = indicator_hexes.childElementCount;
        var key = document.getElementById("key");
        key.style.marginTop = (400 - indicator_hexes.clientHeight) + "px";

    }

}

// Overall screen
setTimeout(function () {

    improving_indicator = {};
    no_change_indicator = {};
    worsening_indicator = {};
    
    for (let i = 0; i < domains.length; i++) {

        indicators = domains_data[domains[i]].indicators;

        for (let j = 0; j < Object.keys(indicators).length; j++) {
            
            data = Object.values(indicators)[j].data;
            importance = Object.values(indicators)[j].importance;
            source = "This indicator is collected from the <a href='" + Object.values(indicators)[j].source_link + "' target='_blank'>" + Object.values(indicators)[j].source + "</a>.";

            if (data.NI != "") {

                base_id = data.NI + "-base-statement";
                further_id = data.NI + "-further-info";
                chart_id = data.NI.slice(0, -2) + "-line";                              

            } else if (data.EQ != "" & !["INDHOMELNEQ"].includes(data.EQ)) {

                base_id = data.EQ + "-base-statement";
                further_id = data.EQ + "-further-info";
                chart_id = data.EQ.slice(0, -2) + "-line";

            } else if (data.LGD != "" & !["INDHOMELNLGD"].includes(data.LGD)) {

                base_id = data.LGD + "-base-statement";
                further_id = data.LGD + "-further-info";
                chart_id = data.LGD.slice(0, -3) + "-line";

            }
            
            base_text = document.getElementById(base_id).textContent;

            if (base_text.includes("improved")) {
                improving_indicator[Object.keys(indicators)[j]] = {domain: domains[i],
                                                                   importance: importance,
                                                                   base_id: base_id,
                                                                   source: source,
                                                                   chart_id: chart_id,
                                                                   data: data,
                                                                   further_id: further_id};

            } else if (base_text.includes("worsened")) {
                worsening_indicator[Object.keys(indicators)[j]] = {domain: domains[i],
                                                                   importance: importance,
                                                                   base_id: base_id,
                                                                   source: source,
                                                                   chart_id: chart_id,
                                                                   data: data,
                                                                   further_id: further_id};

            } else {
                no_change_indicator[Object.keys(indicators)[j]] = {domain: domains[i],
                                                                   importance: importance,
                                                                   base_id: base_id,
                                                                   source: source,
                                                                   chart_id: chart_id,
                                                                   data: data,
                                                                   further_id: further_id};
            }

        }

    }

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


    improving_indicator = sortObject(improving_indicator);
    worsening_indicator = sortObject(worsening_indicator);
    no_change_indicator = sortObject(no_change_indicator);

    plotOverallHexes = function(change_type) {
        
        gridWidth = document.getElementById("overall-scrn").clientWidth;

        if (Math.floor((gridWidth - 90) / 150) > 6) {
            h = 6
        } else {
            h = Math.floor((gridWidth - 90) / 150);
        }

        className = change_type.replace("_", "-");
        
        while (document.getElementById(className + "-hexes").firstChild) {
            document.getElementById(className + "-hexes").removeChild(document.getElementById(className + "-hexes").firstChild)
        }

        for (let i = 0; i < Object.keys(eval(change_type + "_indicator")).length; i++) {            

            if (i % h == 0) {
                var hex_row = document.createElement("div");
                hex_row.classList.add("row");
                hex_row.classList.add(className + "-hex-row");
                document.getElementById(className + "-hexes").appendChild(hex_row);
            }            
    
            if (i % (h * 2) == h) {
                hex_row.style.marginLeft = "90px";
            } else if (i % (h * 2) == 0) {
                hex_row.style.marginLeft = "15px";
            }
    
            if (i >= h) {
                hex_row.style.marginTop = "-25px";
            }
    
            var hex_container = document.createElement("div");
            hex_container.classList.add("shake-hex");
            var hex = document.createElement("div");
            var hex_label = document.createElement("div");
            var label_text = document.createTextNode(Object.keys(eval(change_type + "_indicator"))[i]);
    
            hex_container.classList.add("ind-hex-container");

            hex.classList.add("ind-hex");            
            hex_label.classList.add("ind-hex-label");
    
            hex_label.appendChild(label_text);
            hex_container.appendChild(hex);
            hex_container.appendChild(hex_label);
    
            if (change_type == "improving") {
                hex.innerHTML = '<i class="fa-solid fa-up-long"></i>';
                hex.classList.add("positive");
            } else if (change_type == "no_change") {
                hex.innerHTML = '<i class="fa-solid fa-right-long"></i>';
            } else if (change_type == "worsening") {
                hex.innerHTML = '<i class="fa-solid fa-down-long"></i>';
                hex.classList.add("negative");
            }

            hex_row.appendChild(hex_container);
    
            hex_container.onclick = function() {

                var indicator_name = Object.keys(eval(change_type + "_indicator"))[i];
                var indicator = eval(change_type + "_indicator")[indicator_name];

                document.getElementById("overall-scrn").style.display = "none";
                document.getElementById("indicator-scrn").style.display = "block";
                document.getElementById("indicator-title").innerHTML = indicator_name;
                document.getElementById("domain-title").innerHTML = indicator.domain;
                document.getElementById("ind-important").innerHTML = indicator.importance;
                document.getElementById("source-info").innerHTML = indicator.source;
    
                breadcrumb_2.innerHTML = "> " + Object.keys(eval(change_type + "_indicator"))[i];
    
                base_statements = document.getElementsByClassName("base-statement");
    
                for (let j = 0; j < base_statements.length; j++) {
                    base_statements[j].style.display = "none";
                }

                further_infos = document.getElementsByClassName("further-info-text");
    
                for (let j = 0; j < further_infos.length; j++) {
                    further_infos[j].classList.remove("further-selected");
                }
    
                line_charts = document.getElementsByClassName("line-chart");
    
                for (let j = 0; j < line_charts.length; j++) {
                    line_charts[j].style.display = "none";
                }
    
                document.getElementById(indicator.chart_id).style.display = "block";
                document.getElementById(indicator.base_id).style.display = "block";
                document.getElementById(indicator.further_id).classList.add("further-selected");
    
                data = indicator.data;   
    
                // Output "More data" paragraph
                var data_info = "You can view and download data ";
    
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

    var further_infos = document.getElementsByClassName("further-info-text");
    var further_expander = document.getElementById("further-expander");

    for (let i = 0; i < further_infos.length; i++) {
        further_infos[i].removeAttribute("style");
        further_infos[i].classList.remove("further-selected");
        further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
        further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
        further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");
    }

    plotOverallHexes("improving");
    plotOverallHexes("no_change");
    plotOverallHexes("worsening");

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

    var further_infos = document.getElementsByClassName("further-info-text");
    var further_expander = document.getElementById("further-expander");

    for (let i = 0; i < further_infos.length; i++) {
        further_infos[i].removeAttribute("style");
        further_infos[i].classList.remove("further-selected");
        further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
        further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
        further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");
    }

}

// Content height
mainContainerHeight = function() {
    top_menu = document.getElementById("top-menu");
    footer = document.getElementsByTagName("footer")[0];
    main_container = document.getElementById("main-container");
    prototype = document.getElementById("prototype");

    var ideal_height = window.innerHeight - top_menu.clientHeight - footer.clientHeight - prototype.clientHeight - 50;

    main_container.style.minHeight = ideal_height + "px";
}

window.onload = function() {
    showCookieBanner();
    sizeForMobile(); 
    mainContainerHeight();
    updateMapSelect2();
    updateMapSelect3();    
};

window.onresize = function() {
    sizeForMobile();
    mainContainerHeight();
    plotOverallHexes("improving");
    plotOverallHexes("no_change");
    plotOverallHexes("worsening");
}

// Map select
var map_select_1 = document.getElementById("map-select-1");
var map_select_2 = document.getElementById("map-select-2");
var map_select_3 = document.getElementById("map-select-3");
var further_expander_map = document.getElementById("further-expander-map");
var further_info_map = document.getElementById("further-info-map");

for (let i = 0; i < domains.length; i++) {
    option = document.createElement("option");
    option.value = domains[i];
    option.innerHTML = domains[i];
    map_select_1.appendChild(option);
}

function updateMapSelect2() {

    indicators = Object.keys(domains_data[map_select_1.value].indicators); 

    while (map_select_2.firstChild) {
        map_select_2.removeChild(map_select_2.firstChild);
    }

    for (let i = 0; i < indicators.length; i++) {

        var data = domains_data[map_select_1.value].indicators[indicators[i]].data;

        if (data.AA != "" || data.LGD != "") {

            option = document.createElement("option");
            option.value = indicators[i];
            option.innerHTML = indicators[i];
            map_select_2.appendChild(option);

        }
    }
}

function updateMapSelect3() {

    further_info_map.removeAttribute("style");
    further_expander_map.getElementsByTagName("span")[0].textContent = "Click to expand";
    further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-minus");
    further_expander_map.getElementsByTagName("i")[0].classList.add("fa-plus");

    var indicator = domains_data[map_select_1.value].indicators[map_select_2.value];
    var data = indicator.data;

    while (map_select_3.firstChild) {
        map_select_3.removeChild(map_select_3.firstChild);
    }

    if (data.AA != "") {
        option = document.createElement("option");
        option.value = data.AA;
        option.innerHTML = "Assembly Area";
        map_select_3.appendChild(option);
    }

    if (data.LGD != "") {
        option = document.createElement("option");
        option.value = data.LGD;
        option.innerHTML = "Local Government District";
        map_select_3.appendChild(option);
    }

    var map_title = document.getElementById("map-title");
    map_title.innerHTML = indicator.chart_title;

    var data_info_map = document.getElementById("data-info-map"); 

    var data_info = "You can view and download data ";

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

    data_info_map.innerHTML = data_info;

    var source_info_map = document.getElementById("source-info-map");
    source_info_map.innerHTML = "This indicator is collected from the <a href='" + indicator.source_link + "' target='_blank'>" + indicator.source + "</a>.";

    var ind_important_map = document.getElementById("ind-important-map");
    ind_important_map.innerHTML = indicator.importance;    

}

map_select_1.onchange =  function() {
    updateMapSelect2();
    updateMapSelect3();
    drawMap(matrix = map_select_3.value,
            improvement = domains_data[map_select_1.value].indicators[map_select_2.value].improvement,
            title = domains_data[map_select_1.value].indicators[map_select_2.value].chart_title);
}

map_select_2.onchange = function() {
    updateMapSelect3();
    drawMap(matrix = map_select_3.value,
            improvement = domains_data[map_select_1.value].indicators[map_select_2.value].improvement,
            title = domains_data[map_select_1.value].indicators[map_select_2.value].chart_title);
}


map_select_3.onchange = function() {

    drawMap(matrix = map_select_3.value,
            improvement = domains_data[map_select_1.value].indicators[map_select_2.value].improvement,
            title = domains_data[map_select_1.value].indicators[map_select_2.value].chart_title);

    further_info_map.removeAttribute("style");
    further_expander_map.getElementsByTagName("span")[0].textContent = "Click to expand";
    further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-minus");
    further_expander_map.getElementsByTagName("i")[0].classList.add("fa-plus");
}



// Resizing for mobile
function sizeForMobile() {
    
    // Elements to variables
    var main_container = document.getElementById("main-container");
    var line_chart_container = document.getElementById("line-chart-container");
    var click_to_see = document.getElementById("click-to-see");
    var domains_grid_container = document.getElementById("domains-grid-container");
    var map_container = document.getElementById("map-container");
    var top_menu_items_div = document.getElementById("top-menu-items");
    var white_box = document.getElementsByClassName("white-box");
    var top_container = document.getElementById("top-container");
    var dashboard_title = document.getElementById("dashboard-title");
    var nisra_logo_container = document.getElementById("nisra-logo-container");
    var footer_container = document.getElementById("footer-container");

    var map_form = document.getElementById("map-form");
    var map_label_2 = document.getElementById("map-label-2");
    var map_label_3 = document.getElementById("map-label-3");
    var breaks = map_form.getElementsByTagName('br');

    nisra_logo_container.style.width = footer_container.clientWidth - 565 + "px"

    // screen is less than 1200px wide
    if (window.innerWidth < 1200) {

        main_container.style.width = window.innerWidth + "px";
        line_chart_container.style.width = (window.innerWidth - 40) + "px";
        line_chart_container.style.marginLeft = "20px";
        line_chart_container.style.marginRight = "20px";
        click_to_see.style.width = "100%";
        domains_grid_container.style.marginLeft = ((window.innerWidth - 800) / 2) + "px";
        map_container.style.marginLeft = ((window.innerWidth - 700) / 2) + "px";
        top_menu_items_div.style.marginBottom = "20px";
        top_menu_items_div.style.marginTop= "10px";
        top_menu_items_div.style.width = "100%";
        dashboard_title.style.width = (top_container.clientWidth - 300) + "px";
        

        for (let i = 0; i < top_menu_items.length; i++) {
            top_menu_items[i].style.fontSize = "18pt";
        }

        for (let i = 0; i < white_box.length; i++) {
            white_box[i].style.fontSize = "14pt";
        }
        
        while (breaks[0]) {
            map_form.removeChild(breaks[0]);
        }

        map_form.insertBefore(document.createElement("br"), map_label_2);
        map_form.insertBefore(document.createElement("br"), map_label_3);
        
    } else {

        main_container.removeAttribute("style");
        line_chart_container.removeAttribute("style");
        click_to_see.style.width = "100px";
        domains_grid_container.style.marginLeft = "200px";
        map_container.removeAttribute("style");
        top_menu_items_div.removeAttribute("style");
        dashboard_title.removeAttribute("style");

        for (let i = 0; i < top_menu_items.length; i++) {
            top_menu_items[i].removeAttribute("style");
        }

        for (let i = 0; i < white_box.length; i++) {
            white_box[i].style.fontSize = "12pt";
        }
        

        while (breaks[0]) {
            map_form.removeChild(breaks[0]);
        }

    }

    box_containers = document.getElementsByClassName("box-container");

    for (let i = 0; i < box_containers.length; i++) {
        if (window.innerWidth < 1200) {
            box_containers[i].style.marginTop = "10px";
            box_containers[i].style.width = "100%";
            box_containers[i].style.paddingLeft = "5%";
            box_containers[i].style.paddingRight = "5%";
        } else {
            box_containers[i].removeAttribute("style");
        }
    }    

}

// Expand further information
var further_expander = document.getElementById("further-expander");

further_expander.onclick = function() {
   info_div = document.getElementsByClassName("further-selected")[0];

   if (info_div.clientHeight == 0) {
      info_div.style.maxHeight = "5000px";
      further_expander.getElementsByTagName("span")[0].textContent = "Click to hide";
      further_expander.getElementsByTagName("i")[0].classList.remove("fa-plus");
      further_expander.getElementsByTagName("i")[0].classList.add("fa-minus");
   } else {
      info_div.removeAttribute("style");
      setTimeout(function() {
        further_expander.getElementsByTagName("span")[0].textContent = "Click to expand"
        further_expander.getElementsByTagName("i")[0].classList.remove("fa-minus");
        further_expander.getElementsByTagName("i")[0].classList.add("fa-plus");
      }, 800)
   }
}

further_expander_map.onclick = function() {

    if (further_info_map.clientHeight == 0) {
        further_info_map.style.maxHeight = "5000px";
        further_expander_map.getElementsByTagName("span")[0].textContent = "Click to hide";
        further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-plus");
        further_expander_map.getElementsByTagName("i")[0].classList.add("fa-minus");
    } else {
        further_info_map.removeAttribute("style");
        setTimeout(function() {
            further_expander_map.getElementsByTagName("span")[0].textContent = "Click to expand";
            further_expander_map.getElementsByTagName("i")[0].classList.remove("fa-minus");
            further_expander_map.getElementsByTagName("i")[0].classList.add("fa-plus");
        }, 800)
    }
    
}