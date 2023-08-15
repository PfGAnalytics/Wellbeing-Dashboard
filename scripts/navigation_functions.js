// Menu navigation function
var top_menu_items = document.getElementsByClassName("top-menu-item");

for (let i = 0; i < top_menu_items.length; i++) {

    top_menu_items[i].onclick = function() {

        document.getElementById("indicator-scrn").style.display = "none";

        for (let j = 0; j < top_menu_items.length; j++) {

            var clicked_id = document.getElementById(top_menu_items[j].id);

            if (document.getElementById(top_menu_items[i].id) == clicked_id) {
                clicked_id.classList.add("selected-item");
                clicked_id.firstChild.classList.add("selected-icon");
                document.getElementById(clicked_id.id.replace("btn", "scrn")).style.display = "block";                
            } else {
                clicked_id.classList.remove("selected-item");
                clicked_id.firstChild.classList.remove("selected-icon");
                document.getElementById(clicked_id.id.replace("btn", "scrn")).style.display = "none";
            }

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
var domain_intro = document.getElementById("domain-intro");
var domain_info = document.getElementById("domain-info");
var clicked_hex = document.getElementById("clicked-hex");
var click_to_see = document.getElementById("click-to-see");
var clicked_desc = document.getElementById("clicked-desc");
var indicator_hexes = document.getElementById("indicator-hexes");
var indicator_intro = document.getElementById("domains-scrn").getElementsByClassName("indicators-intro")[0];

for (let i = 0; i < hexagons.length - 1; i++) {

    hexagons[i].parentElement.classList.add("shake-hex");

    hexagons[i].onclick = function() {

        domains_heading.style.display = "none";
        domain_intro.style.display = "none";
        domain_info.style.display = "block";
        domains_grid_container.style.display = "none";
        click_to_see.style.display = "none";
        indicator_intro.style.display = "block";

        var domain_name = hexagons[i].innerHTML;

        clicked_hex.innerHTML = domain_name;

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
            } else if (LGD_data != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD", "INDHSTRESLGD", "INDSPORTSLGD"].includes(LGD_data)) {
                base_text = document.getElementById(LGD_data + "-base-statement").textContent;
            }  else if (EQ_data != "" & !["INDGRADSEQ", "INDHOMELNEQ", "INDHSTRESEQ", "INDSPORTSEQ"].includes(EQ_data)) {
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

                document.getElementById("domains-scrn").style.display = "none";
                document.getElementById("overall-scrn").style.display = "none";
                document.getElementById("indicator-scrn").style.display = "block";

                document.getElementById("domain-title").innerHTML = domain_name;

                document.getElementById("indicator-title").innerHTML = indicator_name;
                document.getElementById("ind-important").innerHTML = domains_data[domain_name].indicators[indicator_name].importance;

                var NI_matrix = domains_data[domain_name].indicators[indicator_name].data.NI;
                var LGD_matrix = domains_data[domain_name].indicators[indicator_name].data.LGD;
                var EQ_matrix = domains_data[domain_name].indicators[indicator_name].data.EQ;
                var AA_matrix = domains_data[domain_name].indicators[indicator_name].data.AA;


                if (NI_matrix != "") {

                    if (["INDGREENHGNI", "INDNICEINI", "INDRIVERQNI"].includes(NI_matrix)) {
                        chart_id = NI_matrix + "-line";
                    } else {
                        chart_id = NI_matrix.substring(0, NI_matrix.length - 2) + "-line";
                    }            

                } else if (LGD_matrix != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD", "INDHSTRESLGD", "INDSPORTSLGD"].includes(LGD_matrix)) {

                    chart_id = LGD_matrix.substring(0, LGD_matrix.length - 3) + "-line";

                } else if (EQ_matrix != "") {

                    chart_id = EQ_matrix.substring(0, EQ_matrix.length - 2) + "-line";

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

                if (NI_matrix != "") {
                    data_info = data_info + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + NI_matrix + '" target = "_blank">Northern Ireland level</a>, ';
                }

                if (LGD_matrix != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + LGD_matrix + '" target = "_blank">Local Government District</a>, ';
                }

                if (AA_matrix != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + AA_matrix + '" target = "_blank">Assembly Area</a>, ';
                }

                if (EQ_matrix != "") {
                    data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + EQ_matrix + '" target = "_blank">Equality Groups</a>, ';
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
                if (NI_matrix != "") {
                    base_id = NI_matrix + "-base-statement"
                } else if (LGD_matrix != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD", "INDHSTRESLGD", "INDSPORTSLGD"].includes(LGD_matrix)) {
                    base_id = LGD_matrix + "-base-statement"
                } else if (EQ_matrix != "" & !["INDGRADSEQ", "INDHOMELNEQ", "INDHSTRESEQ", "INDSPORTSEQ"].includes(EQ_matrix)) {
                    base_id = EQ_matrix + "-base-statement"
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

// Click back button
var back_button_1 = document.getElementById("back-button-1");

back_button_1.onclick = function() {
    domains_heading.style.display = "block";
        domain_intro.style.display = "block";
        domain_info.style.display = "none";
        domains_grid_container.style.display = "block";
        click_to_see.style.display = "block";
        indicator_intro.style.display = "none";
}

var back_button_2 = document.getElementById("back-button-2");

back_button_2.onclick = function () {
    document.getElementById("domains-scrn").style.display = "block";
    document.getElementById("indicator-scrn").style.display = "none";
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

        indicators = Object.keys(domains_data[domains[i]].indicators);

        for (let j = 0; j < indicators.length; j++) {
            
            NI_data = domains_data[domains[i]].indicators[indicators[j]].data.NI;
            LGD_data = domains_data[domains[i]].indicators[indicators[j]].data.LGD;
            EQ_data = domains_data[domains[i]].indicators[indicators[j]].data.EQ;
            importance = domains_data[domains[i]].indicators[indicators[j]].importance;
            source = domains_data[domains[i]].indicators[indicators[j]].source;

            if (NI_data != "") {
                base_id = NI_data + "-base-statement";

                if (["INDGREENHGNI", "INDNICEINI", "INDRIVERQNI"].includes(NI_data)) {
                    chart_id = NI_data + "-line";
                } else {
                    chart_id = NI_data.substring(0, NI_data.length - 2) + "-line";
                }

            } else if (LGD_data != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD", "INDGRADSLGD", "INDHOMELNLGD", "INDHSTRESLGD", "INDSPORTSLGD"].includes(LGD_data)) {
                base_id = LGD_data + "-base-statement";

                chart_id = LGD_data.substring(0, LGD_data.length - 3) + "-line";

            } else if (EQ_data != "" & !["INDGRADSEQ", "INDHOMELNEQ", "INDHSTRESEQ", "INDSPORTSEQ"].includes(EQ_data)) {
                base_id = EQ_data + "-base-statement";

                chart_id = EQ_data.substring(0, EQ_data.length - 2) + "-line";

            }
            
            base_text = document.getElementById(base_id).textContent;

            if (base_text.includes("improved")) {
                improving_indicator.push(indicators[j]);
                improving_domain.push(domains[i]);
                improving_importance.push(importance);
                improving_base_id.push(base_id);
                improving_source.push(source);
                improving_chart.push(chart_id);
            } else if (base_text.includes("worsened")) {
                worsening_indicator.push(indicators[j]);
                worsening_domain.push(domains[i]);
                worsening_importance.push(importance);
                worsening_base_id.push(base_id);
                worsening_source.push(source);
                worsening_chart.push(chart_id);
            } else {
                no_change_indicator.push(indicators[j]);
                no_change_domain.push(domains[i]);
                no_change_importance.push(importance);
                no_change_base_id.push(base_id);
                no_change_source.push(source);
                no_change_chart.push(chart_id);
            }

        }

    }

    for (let i = 0; i < improving_indicator.length; i++) {

        if (i % 6 == 0) {
            var hex_row = document.createElement("div");
            hex_row.classList.add("row");
            hex_row.classList.add("improving-hex-row");
            document.getElementById("improving-hexes").appendChild(hex_row);
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
        var label_text = document.createTextNode(improving_indicator[i]);

        hex_container.classList.add("ind-hex-container");
        hex.classList.add("ind-hex");            
        hex_label.classList.add("ind-hex-label");

        hex_label.appendChild(label_text);
        hex_container.appendChild(hex);
        hex_container.appendChild(hex_label);

        hex.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        hex.classList.add("positive");
        hex_row.appendChild(hex_container);

        hex_container.onclick = function() {
            document.getElementById("domains-btn").classList.add("selected-item");
            document.getElementById("overall-btn").classList.remove("selected-item");
            document.getElementById("overall-btn").firstChild.classList.remove("selected-icon");
            document.getElementById("overall-scrn").style.display = "none";
            document.getElementById("indicator-scrn").style.display = "block";
            document.getElementById("indicator-title").innerHTML = improving_indicator[i];
            document.getElementById("domain-title").innerHTML = improving_domain[i];
            document.getElementById("ind-important").innerHTML = improving_importance[i];
            document.getElementById("source-info").innerHTML = improving_source[i];

            base_statements = document.getElementsByClassName("base-statement");

            for (let j = 0; j < base_statements.length; j++) {
                base_statements[j].style.display = "none";
            }

            document.getElementById(improving_base_id[i]).style.display = "block";

            line_charts = document.getElementsByClassName("line-chart");

            for (let j = 0; j < line_charts.length; j++) {
                line_charts[j].style.display = "none";
            }

            document.getElementById(improving_chart[i]).style.display = "block";

            NI_matrix = domains_data[improving_domain[i]].indicators[improving_indicator[i]].data.NI;
            LGD_matrix = domains_data[improving_domain[i]].indicators[improving_indicator[i]].data.LGD;
            AA_matrix = domains_data[improving_domain[i]].indicators[improving_indicator[i]].data.AA;
            EQ_matrix = domains_data[improving_domain[i]].indicators[improving_indicator[i]].data.EQ;


            // Output "More data" paragraph
            var data_info = "You can view data ";

            if (NI_matrix != "") {
                data_info = data_info + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + NI_matrix + '" target = "_blank">Northern Ireland level</a>, ';
            }

            if (LGD_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + LGD_matrix + '" target = "_blank">Local Government District</a>, ';
            }

            if (AA_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + AA_matrix + '" target = "_blank">Assembly Area</a>, ';
            }

            if (EQ_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + EQ_matrix + '" target = "_blank">Equality Groups</a>, ';
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

    for (let i = 0; i < no_change_indicator.length; i++) {

        if (i % 6 == 0) {
            var hex_row = document.createElement("div");
            hex_row.classList.add("row");
            hex_row.classList.add("no-change-hex-row");
            document.getElementById("no-change-hexes").appendChild(hex_row);
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
        var label_text = document.createTextNode(no_change_indicator[i]);
    
        hex_container.classList.add("ind-hex-container");
        hex.classList.add("ind-hex");            
        hex_label.classList.add("ind-hex-label");
    
        hex_label.appendChild(label_text);
        hex_container.appendChild(hex);
        hex_container.appendChild(hex_label);
    
        hex.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
        hex_row.appendChild(hex_container);
    
        hex_container.onclick = function() {
            document.getElementById("domains-btn").classList.add("selected-item");
            document.getElementById("overall-btn").classList.remove("selected-item");
            document.getElementById("overall-btn").firstChild.classList.remove("selected-icon");
            document.getElementById("overall-scrn").style.display = "none";
            document.getElementById("indicator-scrn").style.display = "block";
            document.getElementById("indicator-title").innerHTML = no_change_indicator[i];
            document.getElementById("domain-title").innerHTML = no_change_domain[i];
            document.getElementById("ind-important").innerHTML = no_change_importance[i];
            document.getElementById("source-info").innerHTML = no_change_source[i];
    
            base_statements = document.getElementsByClassName("base-statement");
    
            for (let j = 0; j < base_statements.length; j++) {
                base_statements[j].style.display = "none";
            }
    
            document.getElementById(no_change_base_id[i]).style.display = "block";
    
            line_charts = document.getElementsByClassName("line-chart");
    
            for (let j = 0; j < line_charts.length; j++) {
                line_charts[j].style.display = "none";
            }
    
            document.getElementById(no_change_chart[i]).style.display = "block";
    
            NI_matrix = domains_data[no_change_domain[i]].indicators[no_change_indicator[i]].data.NI;
            LGD_matrix = domains_data[no_change_domain[i]].indicators[no_change_indicator[i]].data.LGD;
            AA_matrix = domains_data[no_change_domain[i]].indicators[no_change_indicator[i]].data.AA;
            EQ_matrix = domains_data[no_change_domain[i]].indicators[no_change_indicator[i]].data.EQ;
    
    
            // Output "More data" paragraph
            var data_info = "You can view data ";
    
            if (NI_matrix != "") {
                data_info = data_info + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + NI_matrix + '" target = "_blank">Northern Ireland level</a>, ';
            }
    
            if (LGD_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + LGD_matrix + '" target = "_blank">Local Government District</a>, ';
            }
    
            if (AA_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + AA_matrix + '" target = "_blank">Assembly Area</a>, ';
            }
    
            if (EQ_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + EQ_matrix + '" target = "_blank">Equality Groups</a>, ';
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

    for (let i = 0; i < worsening_indicator.length; i++) {

        if (i % 6 == 0) {
            var hex_row = document.createElement("div");
            hex_row.classList.add("row");
            hex_row.classList.add("worsening-hex-row");
            document.getElementById("worsening-hexes").appendChild(hex_row);
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
        var label_text = document.createTextNode(worsening_indicator[i]);
    
        hex_container.classList.add("ind-hex-container");
        hex.classList.add("ind-hex");            
        hex_label.classList.add("ind-hex-label");
    
        hex_label.appendChild(label_text);
        hex_container.appendChild(hex);
        hex_container.appendChild(hex_label);
    
        hex.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        hex.classList.add("negative");
        hex_row.appendChild(hex_container);
    
        hex_container.onclick = function() {
            document.getElementById("domains-btn").classList.add("selected-item");
            document.getElementById("overall-btn").classList.remove("selected-item");
            document.getElementById("overall-btn").firstChild.classList.remove("selected-icon");
            document.getElementById("overall-scrn").style.display = "none";
            document.getElementById("indicator-scrn").style.display = "block";
            document.getElementById("indicator-title").innerHTML = worsening_indicator[i];
            document.getElementById("domain-title").innerHTML = worsening_domain[i];
            document.getElementById("ind-important").innerHTML = worsening_importance[i];
            document.getElementById("source-info").innerHTML = worsening_source[i];
    
            base_statements = document.getElementsByClassName("base-statement");
    
            for (let j = 0; j < base_statements.length; j++) {
                base_statements[j].style.display = "none";
            }
    
            document.getElementById(worsening_base_id[i]).style.display = "block";
    
            line_charts = document.getElementsByClassName("line-chart");
    
            for (let j = 0; j < line_charts.length; j++) {
                line_charts[j].style.display = "none";
            }
    
            document.getElementById(worsening_chart[i]).style.display = "block";
    
            NI_matrix = domains_data[worsening_domain[i]].indicators[worsening_indicator[i]].data.NI;
            LGD_matrix = domains_data[worsening_domain[i]].indicators[worsening_indicator[i]].data.LGD;
            AA_matrix = domains_data[worsening_domain[i]].indicators[worsening_indicator[i]].data.AA;
            EQ_matrix = domains_data[worsening_domain[i]].indicators[worsening_indicator[i]].data.EQ;
    
    
            // Output "More data" paragraph
            var data_info = "You can view data ";
    
            if (NI_matrix != "") {
                data_info = data_info + 'at <a href = "https://ppdata.nisra.gov.uk/table/' + NI_matrix + '" target = "_blank">Northern Ireland level</a>, ';
            }
    
            if (LGD_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + LGD_matrix + '" target = "_blank">Local Government District</a>, ';
            }
    
            if (AA_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + AA_matrix + '" target = "_blank">Assembly Area</a>, ';
            }
    
            if (EQ_matrix != "") {
                data_info = data_info + 'by <a href = "https://ppdata.nisra.gov.uk/table/' + EQ_matrix + '" target = "_blank">Equality Groups</a>, ';
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

}, 5000)