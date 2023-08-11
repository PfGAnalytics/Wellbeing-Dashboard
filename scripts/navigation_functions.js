// Menu navigation function
var top_menu_items = document.getElementsByClassName("top-menu-item");

for (let i = 0; i < top_menu_items.length; i++) {

    top_menu_items[i].onclick = function() {

        for (let j = 0; j < top_menu_items.length; j++) {

            var clicked_id = document.getElementById(top_menu_items[j].id);

            if (document.getElementById(top_menu_items[i].id) == clicked_id) {
                clicked_id.classList.add("selected-item");
                clicked_id.firstChild.classList.add("selected-icon");
            } else {
                clicked_id.classList.remove("selected-item");
                clicked_id.firstChild.classList.remove("selected-icon");
            }

        }
    }

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
var indicators_intro = document.getElementById("indicators-intro");
var domain_intro = document.getElementById("domain-intro");
var domain_info = document.getElementById("domain-info");
var clicked_hex = document.getElementById("clicked-hex");
var click_to_see = document.getElementById("click-to-see");
var clicked_desc = document.getElementById("clicked-desc");
var indicator_hexes = document.getElementById("indicator-hexes");

for (let i = 0; i < hexagons.length - 1; i++) {

    hexagons[i].parentElement.classList.add("shake-hex");

    hexagons[i].onclick = function() {

        domains_heading.style.display = "none";
        indicators_intro.style.display = "block";
        domain_intro.style.display = "none";
        domain_info.style.display = "block";
        domains_grid_container.style.display = "none";
        click_to_see.style.display = "none";

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

            hex_container.classList.add("ind-hex-container");
            hex.classList.add("ind-hex");
            hex.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
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
        var indicator_links = document.getElementsByClassName("ind-hex-container");

        for (let j = 0; j < indicator_links.length; j++) {

            indicator_links[j].onclick = function() {

                var indicator_name = indicator_links[j].getElementsByClassName("ind-hex-label")[0].innerHTML;

                document.getElementById("domains-scrn").style.display = "none";
                indicators_intro.style.display = "none";
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

                } else if (LGD_matrix != "" & !["INDCHSCLGD", "INDINCDPLGD", "INDINCIEQLGD"].includes(LGD_matrix)) {

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
                } else {
                    base_id = ""
                }

                base_statements = document.getElementsByClassName("base-statement");

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
        indicators_intro.style.display = "none";
        domain_intro.style.display = "block";
        domain_info.style.display = "none";
        domains_grid_container.style.display = "block";
        click_to_see.style.display = "block";
}

var back_button_2 = document.getElementById("back-button-2");

back_button_2.onclick = function () {
    document.getElementById("domains-scrn").style.display = "block";
    indicators_intro.style.display = "block";
    document.getElementById("indicator-scrn").style.display = "none";
}


