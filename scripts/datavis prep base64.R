
local({
  r <- getOption("repos")
  r["CRAN"] <- "https://cran.rstudio.com/"
  r["CRANextra"] <- "https://cran.rstudio.com/"
  options(repos = r)
})

if(!require(pacman)) install.packages("pacman")
library(pacman)

p_load("magrittr", "base64enc", "httpuv")

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

# Copy main html
file.copy("../index.html", uploadDir)


suppressWarnings({

  index <- readLines(paste0(uploadDir, "index.html"))
  
  # Embed css
  index <- gsub("style.css",
                paste0("data:text/css;base64,", base64encode("../style.css")),
                index,
                fixed = TRUE)
  
  # Embed gif
  index <- gsub("img/page-loading.gif",
                paste0("data:image/gif;base64,", base64encode("../img/page-loading.gif")),
                index,
                fixed = TRUE)

  # Embed script folder content
  scripts <-  list.files("../scripts", pattern = "*.js")
  
  for (script in scripts) {
    
    index <- gsub(paste0('<script src = "scripts/', script, '"></script>'),
                  paste0('<script type = "text/javascript" src = "data:text/javascript;base64,', base64encode(script), '"></script>'),
                  index,
                  fixed = TRUE)
  }
  
  # Embed svgs
  SVGs <- list.files("../img", pattern = "*.svg")
  
  for (svg in SVGs) {
    
    index <- gsub(paste0("img/", svg),
                  paste0("data:image/svg+xml,",
                         readLines(paste0("../img/", svg)) %>%
                           paste(collapse = " ") %>%
                           encodeURIComponent()),
                  index,
                  fixed = TRUE)
    
  }
  
  writeLines(index, paste0(uploadDir, "index.html"))
  
})