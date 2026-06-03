library(jsonlite)
library(dplyr)
library(stringr)
library(purrr)
library(openxlsx)
library(V8)
library(lubridate)

apiKey <- "7e4c5f0c683d5c56976d28cb39bb05e0e7f8ab1171bb3cbd5499fac715e009e6"

# Read in domains_data.js ####
js_code <- readLines("scripts/domains_data.js", warn = FALSE)
js_code <- paste(js_code, collapse = "\n")

ctx <- V8::v8()
ctx$eval(js_code)

# Extract all information from domains_data
domains_data <- ctx$get("domains_data")

# Create a data frame to store the following variables. 
# To add a variable from domains_data, add a new column and data type here and then populate it later where rows are appended to 'summary'
# To remove a variable, remove it here and from the bind_rows() further down
summary <- data.frame(
  date = as.Date(character()),
  domain = character(),
  indicator = character(),
  comparison_year = character(),
  comparison_year_value = numeric(),
  confidence_interval = character(),
  latest_year = character(),
  latest_year_value = numeric(),
  performance = character(),
  commentary = character()
)

domains <- names(domains_data)

for (domain in domains) {
  
  indicators <- names(domains_data[[domain]]$indicators)
  
  for (indicator in indicators) {
    
    ind_obj <- domains_data[[domain]]$indicators[[indicator]]
    
    base_year <- ind_obj$base_year
    if (is.null(base_year)) base_year <- NA_character_
    
    ci <- ind_obj$ci
    improvement <- ind_obj$improvement
    
    if (ind_obj$data$NI != "") {
      statistic <- substr(ind_obj$data$NI, 1 , nchar(ind_obj$data$NI) - 2)
      json_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22STATISTIC%22%5D,%22dimension%22:%7B%22STATISTIC%22:%7B%22category%22:%7B%22index%22:%5B%22",
                                                   statistic,
                                                   "%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22",
                                                   ind_obj$data$NI,
                                                   "%22%7D,%22version%22:%222.0%22%7D%7D"))
    } else {
      statistic <- substr(ind_obj$data$EQ, 1 , nchar(ind_obj$data$EQ) - 2)
      json_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22STATISTIC%22,%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22STATISTIC%22:%7B%22category%22:%7B%22index%22:%5B%22",
                                                   statistic,
                                                   "%22%5D%7D%7D,%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22",
                                                   ind_obj$data$EQ,
                                                   "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=",
                                                   apiKey))
    }
    
    ni_data <- data.frame(
      year = json_data$result$dimension$`TLIST(A1)`$category$index,
      value = json_data$result$value
    )
    
    if (is.na(base_year)) {
      
      performance <- "insufficient_data"
      commentary <- ind_obj$telling$insufficient
      latest_year <- tail(ni_data$year, 1)
      latest_year_value <- tail(ni_data$value, 1)
      comparison_year_value <- NA
      
    } else {
      
      comparison_year_value <- ni_data$value[ni_data$year == base_year]
      latest_year <- tail(ni_data$year, 1)
      latest_year_value <- ni_data$value[ni_data$year == latest_year]
      
      if (is.numeric(ci)) {
        ci_n <- ci
      } else {
        ci_value <- as.numeric(sub("c", "", ci))
        n_years <- which(ni_data$year == latest_year) - which(ni_data$year == base_year)
        ci_n <- ci_value * n_years
      }
      
      performance <- if ((latest_year_value >= comparison_year_value + ci_n & improvement == "increase")
                         | (latest_year_value <= comparison_year_value - ci_n & improvement == "decrease")) {
        "improved"
      } else if ((latest_year_value <= comparison_year_value - ci_n & improvement == "increase")
                 | (latest_year_value >= comparison_year_value + ci_n & improvement == "decrease")) {
        "worsened"
      } else {
        "no_change"
      }
      
      commentary <- ind_obj$telling[[performance]]
      
    }
    
    # Add or remove variables here
    # If you add a new variable to 'summary' above, you must do it here also
    # If a variable is added to 'summary' above, but not here, the script will fail
    summary <- bind_rows(
      summary,
      data.frame(date = today(),
                 domain = domain,
                 indicator = indicator,
                 comparison_year = base_year,
                 comparison_year_value = comparison_year_value,
                 confidence_interval = as.character(ci),
                 latest_year = latest_year,
                 latest_year_value = latest_year_value,
                 performance = performance,
                 commentary = commentary)
    )
    
  }
  
}

summary_list <- list()

for (domain in names(domains_data)) {
  summary_list[[domain]] <- list()
  for (indicator in names(domains_data[[domain]]$indicators)) {
    summary_list[[domain]][[indicator]] <- summary$performance[summary$indicator == indicator]
  }
}


write_json(summary_list, "scripts/performance.json", auto_unbox = TRUE, pretty = TRUE)


# Combine latest results with historical data to keep a running record

summary_history <- readRDS("backup/indicator-performance-summary.RDS") %>% 
  filter(date != today()) %>% 
  bind_rows(summary)

saveRDS(summary_history, file = "backup/indicator-performance-summary.RDS")

# Create an excel version of the data
wb <- createWorkbook()

addWorksheet(wb, "indicator-performance")

writeDataTable(wb,
               "indicator-performance",
               summary_history)

addStyle(wb,
         "indicator-performance",
         cols = 1,
         rows = 1:nrow(summary_history) + 1,
         style = createStyle(numFmt = "dd/mm/yyyy"))

addStyle(wb,
         "indicator-performance",
         cols = 4:8,
         rows = 1:nrow(summary_history) + 1,
         style = createStyle(halign = "right"),
         gridExpand = TRUE)

setColWidths(wb, "indicator-performance", c(2, 3, 10), c(20, 50, 255))

saveWorkbook(wb, "indicator-performance-table.xlsx", overwrite = TRUE)
# openXL("indicator-performance-table.xlsx")

