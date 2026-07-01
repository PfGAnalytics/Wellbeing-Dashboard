library("magrittr")
library("base64enc")
library("httpuv")

# Folder to store uploads in
upload_dir <- "dashboard-to-upload/"

# List all svg files in img folder
svg_list <- list.files("img", pattern = "*.svg")

# List all png files in img folder
png_list <- list.files("img", pattern = "*.png")

suppressWarnings({  # Turn off warnings

  # Read in quick-read.js as "original_js" and take copy of it "fixed_js"
  original_js <- readLines("scripts/quick-read.js", warn = FALSE)
  fixed_js <- original_js

  # Fix image paths in quick-read.js by converting svg images to xml
  for (svg in svg_list) {
    fixed_js <- gsub(
      paste0("img/", svg),
      paste0(
        "data:image/svg+xml,",
        readLines(paste0("img/", svg), warn = FALSE) %>%
          paste(collapse = " ") %>%
          encodeURIComponent()
      ),
      fixed_js,
      fixed = TRUE
    )
  }

  # Embed gif in quick-read.js
  fixed_js <- gsub(
    "img/page-loading.gif",
    paste0("data:image/gif;base64,", base64encode("img/page-loading.gif")),
    fixed_js,
    fixed = TRUE
  )

  # Write out temporary inlined quick-read.js
  writeLines(fixed_js, "scripts/quick-read.js")

  # Convert html to character vector
  index <- readLines("quick-read.html", warn = FALSE)

  # remove reference to index.html
  index <- gsub(
    "index.html",
    "pfg_wellbeing_dashboard.html",
    index,
    fixed = TRUE
  )

  # Embed css in html
  index <- gsub(
    "custom.css",
    paste0("data:text/css;base64,", base64encode("custom.css")),
    index,
    fixed = TRUE
  )

  # ---- Embed new JSON data sources ----

  # domains_data.js
  domains_path <- "scripts/domains_data.js"
  domains_b64 <- base64encode(
    readBin(domains_path, "raw", file.info(domains_path)$size)
  )
  domains_data_url <- paste0("data:text/javascript;base64,", domains_b64)

  # Path to main JS
  quick_js <- "scripts/quick-read.js"

  # Read JS so we can replace any file path references with embedded data URLs
  js_code <- readLines(quick_js, warn = FALSE)

  # Replace domains_data.js reference in JS
  js_code <- gsub(
    "scripts/domains_data.js",
    domains_data_url,
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


  # Embed svg_list in HTML
  for (svg in svg_list) {
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

  # Embed png_list in HTML
  for (png in png_list) {
    index <- gsub(
      paste0("img/", png),
      paste0("data:image/png;base64,", base64encode(paste0("img/", png))),
      index,
      fixed = TRUE
    )
  }

  # Write out new self-contained html file
  writeLines(index, paste0(upload_dir, "quick-read.html"))

  # Restore quick-read.js to its original state
  writeLines(original_js, "scripts/quick-read.js")

})
