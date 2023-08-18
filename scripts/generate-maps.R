# Change CRAN repository from http:// to https:// (less firewall problems)
local({
  r <- getOption("repos")
  r["CRAN"] <- "https://cran.rstudio.com/"
  r["CRANextra"] <- "https://cran.rstudio.com/"
  options(repos = r)
})

if(!require(pacman)) install.packages("pacman")
library(pacman)

p_load("V8")

cx <- v8()
cx$source("../scripts/domains_data.js")
domains <- cx$get("domains_data")


for (i in 1:length(domains)) {
  
  if (i == 1) {
    map_matrices <- c()
    map_titles <- c()
  }
  
  indicators <- domains[[i]]$indicators
  
  for (j in 1:length(indicators)) {
    
    if(indicators[[j]]$data$AA != "") {
      map_matrices[length(map_matrices) + 1] <- indicators[[j]]$data$AA
      map_titles[length(map_titles) + 1] <- indicators[[j]]$chart_title
    }
    
    if(indicators[[j]]$data$LGD != "") {
      map_matrices[length(map_matrices) + 1] <- indicators[[j]]$data$LGD
      map_titles[length(map_titles) + 1] <- indicators[[j]]$chart_title}
  }
    
}

for (i in 1:length(map_matrices)) {
  
  indicator <- if (substr(map_matrices[i], nchar(map_matrices[i]) - 2, nchar(map_matrices[i])) == "LGD") {
    substr(map_matrices[i], 1, nchar(map_matrices[i]) - 3)
  } else {
    substr(map_matrices[i], 1, nchar(map_matrices[i]) - 2)
  }
  
  html_code <- c("<!DOCTYPE html>",
                 "<html>",
                 "<head>",
                 '    <script src="https://cdn.jsdelivr.net/gh/DisseminationNI/PxWidget@1.1.6/js/isogram.min.js"></script>',
                 '    <link rel ="stylesheet" href ="map-style.css">',
                 "</head>",
                 "",
                 "<body>",
                 paste0('    <div id = "', map_matrices[i], '-map" class = "pxwidget" style = "width: 700px;"></div>'),
                 "</body>",
                 "",
                 '<script src = "../scripts/map_function.js"></script>',
                 "",
                 "<script>",
                 "",
                 paste0('   createMap(id = "', map_matrices[i], '-map",'),
                 paste0('           title = "', map_titles[i], '",'),
                 paste0('           matrix = "', map_matrices[i], '",'),
                 paste0('           indicator = "', indicator, '")'),
                 "",
                 "</script>",
                 "</html>")
  
  writeLines(html_code, paste0("../maps/", map_matrices[i], ".html"))
  
}


