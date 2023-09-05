
local({
  r <- getOption("repos")
  r["CRAN"] <- "https://cran.rstudio.com/"
  r["CRANextra"] <- "https://cran.rstudio.com/"
  options(repos = r)
})

if(!require(pacman)) install.packages("pacman")
library(pacman)

p_load("magrittr", "base64enc")

# Folder to store uploads in
uploadDir <- "../dashboard-to-upload/"
zipName <- paste0(substring(uploadDir, 1, nchar(uploadDir) - 1), ".zip")

if (file.exists(uploadDir)) {
  unlink(uploadDir, recursive = TRUE)
}

if (file.exists(zipName)) {
  unlink(zipName, recursive = TRUE)
}

dir.create(uploadDir)

# Copy main html and css
file.copy("../index.html", uploadDir)
file.copy("../style.css", uploadDir)

# Copy img folder contents
images <- list.files("../img") %>%
  .[. != "Northern_Ireland_Executive_logo.svg"]

for (filename in images) {
  file.copy(paste0("../img/", filename), uploadDir)
}


suppressWarnings({
  
  ni_exec_logo <- readLines("../img/Northern_Ireland_Executive_logo.svg")
  ni_exec_logo <- ni_exec_logo[which(ni_exec_logo == "<svg"): length(ni_exec_logo)]
  ni_exec_logo[which(ni_exec_logo == "<svg")] <- '<svg id = "top-menu-exec-logo"'
  ni_exec_logo <- paste(ni_exec_logo, collapse = " ")
  
  # Rewrite html folder paths in index.html
  index <- readLines(paste0(uploadDir, "index.html")) %>%
     gsub("img/", "", ., fixed = TRUE) %>%
    gsub('<img id = "top-menu-exec-logo" src = "Northern_Ireland_Executive_logo.svg">',
         ni_exec_logo,
         ., fixed = TRUE)
  
  # Move scripts folder content
  scripts <-  list.files("../scripts", pattern = "*.js")
  
  for (script in scripts) {
    
    index <- gsub(paste0('<script src = "scripts/', script, '"></script>'),
                  paste0('<script type = "text/javascript" src = "data:text/javascript;base64,', base64encode(script), '"></script>'),
                  index,
                  fixed = TRUE)
  }
  
  
  writeLines(index, paste0(uploadDir, "index.html"))
  
})

# Add to zip file
project_root <- getwd()
setwd(uploadDir)
zip(zipfile = zipName, files = dir(getwd()))
setwd(project_root)