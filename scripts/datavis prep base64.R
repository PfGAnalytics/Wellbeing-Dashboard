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
p_load("magrittr", "base64enc", "httpuv")

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

originalNav <- readLines("../scripts/navigation_functions.js")
fixedNav <- originalNav

suppressWarnings({ # Turn off warnings
  
  # Fix image paths in navigation_functions.js
  for (svg in SVGs) {
    fixedNav <- gsub(paste0("img/", svg),
                     paste0("data:image/svg+xml,",
                            readLines(paste0("../img/", svg)) %>%
                              paste(collapse = " ") %>%
                              encodeURIComponent()),
                     fixedNav,
                     fixed = TRUE)
  }
  
  writeLines(fixedNav, "../scripts/navigation_functions.js")

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
  
})