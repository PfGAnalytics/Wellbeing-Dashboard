library("magrittr")
library("base64enc")
library("httpuv")

# Folder to store uploads in
upload_dir <- "dashboard-to-upload/"

# List all svg files in img folder
svg_list <- list.files("img", pattern = "*.svg")

# List all png files in img folder
png_list <- list.files("img", pattern = "*.png")

suppressWarnings({ # Turn off warnings

  # Read in navigation_functions.js as "original_nav"
  # and take copy of it "fixed_nav"
  original_nav <- readLines("scripts/navigation_functions.js")
  fixed_nav <- original_nav

  # Read in data_functions.js as "original_data"
  # and take copy of it "fixed_data"
  original_data <- readLines("scripts/data_functions.js")
  fixed_data <- original_data

  # Fix image paths in navigation_functions.js by converting svg images to xml
  for (svg in svg_list) {
    fixed_nav <- gsub(
      paste0("img/", svg),
      paste0(
        "data:image/svg+xml,",
        readLines(paste0("img/", svg)) %>%
          paste(collapse = " ") %>%
          encodeURIComponent()
      ),
      fixed_nav,
      fixed = TRUE
    )

  }

  # Fix image paths in data_functions.js by converting svg images to xml
  for (svg in svg_list) {
    fixed_data <- gsub(
      paste0("img/", svg),
      paste0(
        "data:image/svg+xml,",
        readLines(paste0("img/", svg)) %>%
          paste(collapse = " ") %>%
          encodeURIComponent()
      ),
      fixed_data,
      fixed = TRUE
    )
  }

  # and png images to base64
  for (png in png_list) {
    fixed_data <- gsub(
      paste0("img/", png),
      paste0(
        "data:image/png;base64,",
        base64encode(paste0("img/", png))
      ),
      fixed_data,
      fixed = TRUE
    )
  }

  # Fix images in navigation_functions.js by converting png images to base64
  for (png in png_list) {
    fixed_nav <- gsub(
      paste0("img/", png),
      paste0(
        "data:image/png;base64,",
        base64encode(paste0("img/", png))
      ),
      fixed_nav,
      fixed = TRUE
    )
  }

  # Embed gif in navigation_functions.js
  fixed_nav <- gsub(
    "img/page-loading.gif",
    paste0("data:image/gif;base64,", base64encode("img/page-loading.gif")),
    fixed_nav,
    fixed = TRUE
  )

  # Embed gif in data_functions.js
  fixed_data <- gsub(
    "img/page-loading.gif",
    paste0("data:image/gif;base64,", base64encode("img/page-loading.gif")),
    fixed_data,
    fixed = TRUE
  )

  # Write out fixed_nav to navigation_functions.js
  writeLines(fixed_nav, "scripts/navigation_functions.js")
  writeLines(fixed_data, "scripts/data_functions.js")

  # Convert html to character vector
  index <- readLines("index.html")

  # Embed css in html
  index <- gsub(
    "style.css",
    paste0("data:text/css;base64,", base64encode("style.css")),
    index,
    fixed = TRUE
  )

  # Embed gif in html
  index <- gsub(
    "img/page-loading.gif",
    paste0("data:image/gif;base64,", base64encode("img/page-loading.gif")),
    index,
    fixed = TRUE
  )

  # Embed all javascript files in scripts folder
  scripts <-  list.files("scripts", pattern = "*.js", full.names = TRUE)

  for (script in scripts) {

    index <- gsub(
      paste0('<script src = "', script, '"></script>'),
      paste0(
        '<script type = "text/javascript" src = "data:text/javascript;base64,',
        base64encode(script),
        '"></script>'
      ),
      index,
      fixed = TRUE
    )
  }


  for (svg in svg_list) {

    index <- gsub(paste0("img/", svg),
                  paste0("data:image/svg+xml,",
                         readLines(paste0("img/", svg)) %>%
                           paste(collapse = " ") %>%
                           encodeURIComponent()),
                  index,
                  fixed = TRUE)

  }

  for (png in png_list) {

    index <- gsub(
      paste0("img/", png),
      paste0("data:image/png;base64,", base64encode(paste0("img/", png))),
      index,
      fixed = TRUE
    )

  }

  # Write out new html file
  writeLines(index, paste0(upload_dir, "pfg_wellbeing_dashboard.html"))

  # Restore navigation_functions.js to its original state
  writeLines(original_nav, "scripts/navigation_functions.js")
  writeLines(original_data, "scripts/data_functions.js")

})