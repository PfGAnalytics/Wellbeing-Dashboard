
library("magrittr")
library("base64enc")
library("httpuv")

# Folder to store uploads in
uploadDir <- "dashboard-to-upload/"

# List all svg files in img folder
SVGs <- list.files("img", pattern = "*.svg")

# List all png files in img folder
PNGs <- list.files("img", pattern = "*.png")

suppressWarnings({ # Turn off warnings
  
  # Read in quick-read.js as "originalJS" and take copy of it "fixedJS"
  originalJS <- readLines("scripts/quick-read.js")
  fixedJS <- originalJS
  
  # Fix image paths in quick-read.js by converting svg images to xml
  for (svg in SVGs) {
    fixedJS <- gsub(paste0("img/", svg),
                     paste0("data:image/svg+xml,",
                            readLines(paste0("img/", svg)) %>%
                              paste(collapse = " ") %>%
                              encodeURIComponent()),
                     fixedJS,
                     fixed = TRUE)
    
  }
  
  # Embed gif in quick-read.js
  fixedJS <- gsub("img/page-loading.gif",
                    paste0("data:image/gif;base64,", base64encode("img/page-loading.gif")),
                    fixedJS,
                    fixed = TRUE)
  
  # Write out fixedJS to quick-read.js
  writeLines(fixedJS, "scripts/quick-read.js")


  # Convert html to character vector
  index <- readLines("quick-read.html")
  
  # Embed css in html
  index <- gsub("custom.css",
                paste0("data:text/css;base64,", base64encode("custom.css")),
                index,
                fixed = TRUE)
  
  # Embed all javascript files in scripts folder

  json_path <- "scripts/updated.json"
  json_b64  <- base64encode(readBin(json_path, "raw", file.info(json_path)$size))
  json_data_url <- paste0("data:application/json;base64,", json_b64)

  domains_path <- "scripts/domains_data.js"
  domains_b64  <- base64encode(readBin(domains_path, "raw", file.info(domains_path)$size))
  domains_data_url <- paste0("data:text/javascript;base64,", domains_b64)

  quick_js <- "scripts/quick-read.js"

  js_code <- readLines(quick_js, warn = FALSE)

  js_code <- gsub(
    "scripts/updated.json",
    json_data_url,  
    js_code,
    fixed = TRUE
  )

  cat(js_code, file = quick_js, sep = "\n")

  js_code <- readLines(quick_js, warn = FALSE)

  js_code <- gsub(
    "scripts/domains_data.js",
    domains_data_url, 
    js_code,
    fixed = TRUE
  )

  cat(js_code, file = quick_js, sep = "\n")

  index <- gsub(
    paste0('<script type="text/javascript" src="', quick_js, '"></script>'),
    paste0(
      '<script type = "text/javascript" src = "data:text/javascript;base64,',
      base64encode(quick_js),
      '"></script>'
    ),
    index,
    fixed = TRUE
  )

  # Replace all occurrences of the path as a string literal
  index <- gsub('scripts/updated.json', json_data_url, index, fixed = TRUE)

  for (svg in SVGs) {
    
    index <- gsub(paste0("img/", svg),
                  paste0("data:image/svg+xml,",
                         readLines(paste0("img/", svg)) %>%
                           paste(collapse = " ") %>%
                           encodeURIComponent()),
                  index,
                  fixed = TRUE)
    
  }

  for (png in PNGs) {
    
    index <- gsub(paste0("img/", png),
                  paste0("data:image/png;base64,", base64encode(paste0("img/", png))),
                  index,
                  fixed = TRUE)
    
  }
  
  # Write out new html file
  writeLines(index, paste0(uploadDir, "quick-read.html"))
  
  # Restore navigation_functions.js to its original state
  writeLines(originalJS, "scripts/quick-read.js")
  
})