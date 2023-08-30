
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
for (filename in list.files("../img")) {
  file.copy(paste0("../img/", filename), uploadDir)
}

# Move scripts folder content
for (filename in list.files("../scripts", pattern = "*.js")) {
  file.copy(paste0("../scripts/", filename), uploadDir)
}

suppressWarnings({
 
  # Rewrite html folder paths in index.html
  index <- readLines(paste0(uploadDir, "index.html")) %>%
    gsub("img/", "", ., fixed = TRUE) %>%
    gsub("scripts/", "", ., fixed = TRUE)
  
  writeLines(index, paste0(uploadDir, "index.html"))
  
})

# Add to zip file
project_root <- getwd()
setwd(uploadDir)
zip(zipfile = zipName, files = dir(getwd()))
setwd(project_root)