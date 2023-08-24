
local({
r <- getOption("repos")
r["CRAN"] <- "https://cran.rstudio.com/"
r["CRANextra"] <- "https://cran.rstudio.com/"
options(repos = r)
})

if(!require(pacman)) install.packages("pacman")
library(pacman)

p_load("magrittr")

# Folder to store uploads in
uploadDir <- "../dashboard-to-upload/"

if (file.exists(uploadDir)) {
  unlink(uploadDir, recursive = TRUE)
}

dir.create(uploadDir)

# Copy main html and css
file.copy("../index.html", uploadDir)
file.copy("../style.css", uploadDir)

# Copy img folder contents
for (filename in list.files("../img")) {
  file.copy(paste0("../img/", filename), uploadDir)
}

# Move scripts folder content
for (filename in list.files("../scripts", pattern = "*.js")) {
  file.copy(paste0("../scripts/", filename), uploadDir)
}

# Move maps folder content
for (filename in list.files("../maps")) {
  file.copy(paste0("../maps/", filename), uploadDir)
}

suppressWarnings({
 
  # Rewrite html folder paths in index.html
  index <- readLines(paste0(uploadDir, "index.html")) %>%
    gsub("img/", "", ., fixed = TRUE) %>%
    gsub("scripts/", "", ., fixed = TRUE)
  
  writeLines(index, paste0(uploadDir, "index.html"))
  
  # Rewrite link to maps in navigation_functions.js
  navigation_functions <- readLines(paste0(uploadDir, "navigation_functions.js")) %>%
    gsub('\"maps/\" + ', "", ., fixed = TRUE)
  
  writeLines(navigation_functions, paste0(uploadDir, "navigation_functions.js"))
  
  # Rewrite html file paths for all maps
  htmlMaps <- list.files(uploadDir, pattern = ".html") %>% .[. != "index.html"]
  
  for (map in htmlMaps) {
    map_text <- readLines(paste0(uploadDir, map)) %>%
      gsub("../scripts/", "", ., fixed = TRUE)
      
    writeLines(map_text, paste0(uploadDir, map))
  }
  
})

# Add to zip file
project_root <- getwd()
setwd(uploadDir)
files2zip <- dir(getwd())
zip(zipfile = '../dashboard-to-upload', files = files2zip)

setwd(project_root)