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
        hex_rows[i].style.marginLeft = "90px";
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

for (let i = 0; i < hexagons.length; i++) {

    hexagons[i].onclick = function() {

        domains_heading.style.display = "none";
        indicators_intro.style.display = "block";
        domain_intro.style.display = "none";
        domain_info.style.display = "block";
        domains_grid_container.style.display = "none";
        click_to_see.style.display = "none";

        clicked_hex.innerHTML = hexagons[i].innerHTML;

        clicked_desc.innerHTML = domains_data[hexagons[i].innerHTML].description;

    }

}

// Click back button
var back_button = document.getElementById("back-button");

back_button.onclick = function() {
    domains_heading.style.display = "block";
        indicators_intro.style.display = "none";
        domain_intro.style.display = "block";
        domain_info.style.display = "none";
        domains_grid_container.style.display = "block";
        click_to_see.style.display = "block";
}