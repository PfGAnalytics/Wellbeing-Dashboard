library("magrittr")
library("base64enc")
library("httpuv")

# Folder to store uploads in
uploadDir <- "dashboard-to-upload/"

# List all svg files in img folder
SVGs <- list.files("img", pattern = "*.svg")

# List all png files in img folder
PNGs <- list.files("img", pattern = "*.png")

suppressWarnings({  # Turn off warnings
  
  # Read in quick-read.js as "originalJS" and take copy of it "fixedJS"
  originalJS <- readLines("scripts/quick-read.js", warn = FALSE)
  fixedJS <- originalJS
  
  # Fix image paths in quick-read.js by converting svg images to xml
  for (svg in SVGs) {
    fixedJS <- gsub(
      paste0("img/", svg),
      paste0(
        "data:image/svg+xml,",
        readLines(paste0("img/", svg), warn = FALSE) %>%
          paste(collapse = " ") %>%
          encodeURIComponent()
      ),
      fixedJS,
      fixed = TRUE
    )
  }
  
  # Embed gif in quick-read.js
  fixedJS <- gsub(
    "img/page-loading.gif",
    paste0("data:image/gif;base64,", base64encode("img/page-loading.gif")),
    fixedJS,
    fixed = TRUE
  )
  
  # Write out temporary inlined quick-read.js
  writeLines(fixedJS, "scripts/quick-read.js")
  
  # Convert html to character vector
  index <- readLines("quick-read.html", warn = FALSE)
  
  # Embed css in html
  index <- gsub(
    "custom.css",
    paste0("data:text/css;base64,", base64encode("custom.css")),
    index,
    fixed = TRUE
  )
  
  # ---- Embed new JSON data sources ----
  
  # performance.json
  # perf_path <- "scripts/performance.json"
  # perf_b64 <- base64encode(readBin(perf_path, "raw", file.info(perf_path)$size))
  # perf_data_url <- paste0("data:application/json;base64,", perf_b64)
  
  # # performance-meta.json
  # perf_meta_path <- "scripts/performance-meta.json"
  # perf_meta_b64 <- base64encode(readBin(perf_meta_path, "raw", file.info(perf_meta_path)$size))
  # perf_meta_data_url <- paste0("data:application/json;base64,", perf_meta_b64)
  
  # domains_data.js
  domains_path <- "scripts/domains_data.js"
  domains_b64 <- base64encode(readBin(domains_path, "raw", file.info(domains_path)$size))
  domains_data_url <- paste0("data:text/javascript;base64,", domains_b64)
  
  # Path to main JS
  quick_js <- "scripts/quick-read.js"
  
  # Read JS so we can replace any file path references with embedded data URLs
  js_code <- readLines(quick_js, warn = FALSE)
  
  # Replace new JSON references in JS
  # js_code <- gsub(
  #   "scripts/performance.json",
  #   perf_data_url,
  #   js_code,
  #   fixed = TRUE
  # )
  
  # js_code <- gsub(
  #   "scripts/performance-meta.json",
  #   perf_meta_data_url,
  #   js_code,
  #   fixed = TRUE
  # )
  
  # Replace domains_data.js reference in JS
  js_code <- gsub(
    "scripts/domains_data.js",
    domains_data_url,
    js_code,
    fixed = TRUE
  )
  
  # Optional backward compatibility:
  # if any old reference to updated.json still exists, replace it with performance.json
  js_code <- gsub(
    "scripts/updated.json",
    perf_data_url,
    js_code,
    fixed = TRUE
  )
  
  cat(js_code, file = quick_js, sep = "\n")
  
  # Embed quick-read.js itself into the HTML
  index <- gsub(
    paste0('<script type="text/javascript" src="', quick_js, '"></script>'),
    paste0(
      '<script type="text/javascript" src="data:text/javascript;base64,',
      base64encode(quick_js),
      '"></script>'
    ),
    index,
    fixed = TRUE
  )
  

  
  
  # Embed SVGs in HTML
  for (svg in SVGs) {
    index <- gsub(
      paste0("img/", svg),
      paste0(
        "data:image/svg+xml,",
        readLines(paste0("img/", svg), warn = FALSE) %>%
          paste(collapse = " ") %>%
          encodeURIComponent()
      ),
      index,
      fixed = TRUE
    )
  }
  
  # Embed PNGs in HTML
  for (png in PNGs) {
    index <- gsub(
      paste0("img/", png),
      paste0("data:image/png;base64,", base64encode(paste0("img/", png))),
      index,
      fixed = TRUE
    )
  }
  
  # Write out new self-contained html file
  writeLines(index, paste0(uploadDir, "quick-read.html"))
  
  # Restore quick-read.js to its original state
  writeLines(originalJS, "scripts/quick-read.js")
  
})
