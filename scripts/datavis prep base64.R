## See for set up instructions https://code.visualstudio.com/docs/languages/r

# Set CRAN repo
local({
  r <- getOption("repos")
  r["CRAN"] <- "https://cran.rstudio.com/"
  r["CRANextra"] <- "https://cran.rstudio.com/"
  options(repos = r)
})

# Load package manager
if(!require(pacman)) install.packages("pacman")
library(pacman)

# Load packages
p_load("rstudioapi", "magrittr", "base64enc", "httpuv")

# Set working directory
setwd(sub("datavis prep base64.R", "", rstudioapi::getActiveDocumentContext()$path))

# Folder to store uploads in
uploadDir <- "../dashboard-to-upload/"

# Delete any previous version
if (file.exists(uploadDir)) {
  unlink(uploadDir, recursive = TRUE)
}

# Create folder again
dir.create(uploadDir)

# List all svg files in img folder
SVGs <- list.files("../img", pattern = "*.svg")

suppressWarnings({ # Turn off warnings
  
  # Read in navigation_functions.js as "originalNav" and take copy of it "fixedNav"
  originalNav <- readLines("../scripts/navigation_functions.js")
  fixedNav <- originalNav
  
  # Read in data_functions.js as "originalData" and take copy of it "fixedData"
  originalData <- readLines("../scripts/data_functions.js")
  fixedData <- originalData
  
  # Fix image paths in navigation_functions.js by converting svg images to xml
  for (svg in SVGs) {
    fixedNav <- gsub(paste0("img/", svg),
                     paste0("data:image/svg+xml,",
                            readLines(paste0("../img/", svg)) %>%
                              paste(collapse = " ") %>%
                              encodeURIComponent()),
                     fixedNav,
                     fixed = TRUE)
    
  }
  
  # Embed gif in navigation_functions.js
  fixedNav <- gsub("img/page-loading.gif",
                    paste0("data:image/gif;base64,", base64encode("../img/page-loading.gif")),
                    fixedNav,
                    fixed = TRUE)
  
  # Embed gif in data_functions.js
  fixedData <- gsub("img/page-loading.gif",
                paste0("data:image/gif;base64,", base64encode("../img/page-loading.gif")),
                fixedData,
                fixed = TRUE)
  
  # Write out fixedNav to navigation_functions.js
  writeLines(fixedNav, "../scripts/navigation_functions.js")
  writeLines(fixedData, "../scripts/data_functions.js")

  # Convert html to character vector
  index <- readLines("../index.html")
  
  # Embed css in html
  index <- gsub("style.css",
                paste0("data:text/css;base64,", base64encode("../style.css")),
                index,
                fixed = TRUE)
  
  # Embed gif in html
  index <- gsub("img/page-loading.gif",
                paste0("data:image/gif;base64,", base64encode("../img/page-loading.gif")),
                index,
                fixed = TRUE)

  # Embed all javascript files in scripts folder
  scripts <-  list.files("../scripts", pattern = "*.js")
  for (script in scripts) {
    
    index <- gsub(paste0('<script src = "scripts/', script, '"></script>'),
                  paste0('<script type = "text/javascript" src = "data:text/javascript;base64,', base64encode(script), '"></script>'),
                  index,
                  fixed = TRUE)
  }
  
  
  for (svg in SVGs) {
    
    index <- gsub(paste0("img/", svg),
                  paste0("data:image/svg+xml,",
                         readLines(paste0("../img/", svg)) %>%
                           paste(collapse = " ") %>%
                           encodeURIComponent()),
                  index,
                  fixed = TRUE)
    
    
    
  }
  
  # Write out new html file
  writeLines(index, paste0(uploadDir, "index.html"))
  
  # Restore navigation_functions.js to its original state
  writeLines(originalNav, "../scripts/navigation_functions.js")
  writeLines(originalData, "../scripts/data_functions.js")
  
})