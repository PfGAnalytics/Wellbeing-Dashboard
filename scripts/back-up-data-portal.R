library(jsonlite)
library(dplyr)
library(stringr)

apiKey <- "7e4c5f0c683d5c56976d28cb39bb05e0e7f8ab1171bb3cbd5499fac715e009e6"

# Read in domains_data.js ####
js_lines <- readLines("scripts/domains_data.js", warn = FALSE)

## Get list of all Data Portal matrices required ####
matrix_list <- c()

for (line in js_lines) {
  for (data_type in c("NI", "AA", "LGD", "EQ")) {
    if (grepl(data_type, line)) {
      matrix <- gsub(paste0(data_type, ": "), "", trimws(line)) %>% 
        gsub('"', '', .) %>% 
        gsub(",", "", .)
      if (substr(matrix, 1, 3) == "IND") {
        matrix_list <- c(matrix_list, matrix)
      }
    }
  }
}

# Get grouping values for EQ groups ####
data_lines <- readLines("scripts/data_functions.js", warn = FALSE)
start_line <- which(grepl('Contruct api query based on which grouping is selected', data_lines))
end_line <- which(data_lines == "")[which(data_lines == "") > start_line][1]

eq_groups <- list()

for (i in start_line:end_line) {
  if(grepl("eq_groups", data_lines[i])) {
    eq_group <- sub('.*?"(.*?)".*', '\\1', data_lines[i])
    group_vals <- sub(".*\\[(.*)\\].*", "\\1", data_lines[i + 1])
    if (!eq_group %in% c("backup/", "Skills Level", "-", " ")) {
      eq_groups[[eq_group]] <- gsub('"', "%22", group_vals) %>% 
        gsub(" ", "", .)
    }
  }
}

# Loop through all matrices ####
for (matrix in matrix_list) {
  
  ## Read all data for each matrix ####
  json_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22", 
                                               matrix, "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=", apiKey))
  
  json_data$result$note <- list(json_data$result$note)
  
  if (!"error" %in% names(json_data)) {
    write_json(json_data, paste0("backup/", matrix, ".json"), pretty = TRUE, auto_unbox = TRUE, na = "null")
  }
  
  # LGD data sets - create NI only line (if available)
  if (str_sub(matrix, -3) == "LGD") {
    lgd_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22LGD2014%22%5D,%22dimension%22:%7B%22LGD2014%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22",
                                                 matrix, "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=", apiKey))
    if (!"error" %in% names(lgd_data)) {
      if (length(lgd_data$result$value) > 0) {
        lgd_data$result$note <- list(lgd_data$result$note)
        write_json(lgd_data, paste0("backup/", matrix, "-NI-line.json"), pretty = TRUE, auto_unbox = TRUE, na = "null")
      }
    }
  }
    
  ## EQ data sets ####
  if (str_sub(matrix, -2) == "EQ") {
    ### Create NI line only line (if available) ####
    eq_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B%22N92000002%22%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22",
                                                 matrix, "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=", apiKey))
    
    if (!"error" %in% names(eq_data)) {
      
      if (length(eq_data$result$value) > 0) {
        eq_data$result$note <- list(eq_data$result$note)
        write_json(eq_data, paste0("backup/", matrix, "-NI-line.json"), pretty = TRUE, auto_unbox = TRUE, na = "null")
      }
      
    }
    
    ### Create list of EQ groups ####
    groups_present <- unlist(json_data$result$dimension$EQUALGROUPS$category$label) %>% 
      gsub("Age ", "Age - ", .) %>% 
      sub("-.*", "", .) %>% 
      trimws() %>% 
      unique() %>% 
      setdiff("Northern Ireland")
    
    ### Create EQ datasets ####
    for (group in groups_present) {
      
      group_data <- jsonlite::fromJSON(
        paste0(
          "https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%22EQUALGROUPS%22%5D,%22dimension%22:%7B%22EQUALGROUPS%22:%7B%22category%22:%7B%22index%22:%5B",
          eq_groups[[group]],
          "%5D%7D%7D%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22",
          matrix,
          "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=", apiKey)
        )
      
      if (!"error" %in% names(group_data)) {

        if (length(group_data$result$value) > 0) {
          group_data$result$note <- list(group_data$result$note)
          if (length(group_data$result$dimension$EQUALGROUPS$category$index) == 1) {
            group_data$result$dimension$EQUALGROUPS$category$index <- list(group_data$result$dimension$EQUALGROUPS$category$index)
          }
          write_json(group_data, paste0("backup/", matrix, "-", gsub(" ", "-", group, fixed = TRUE), ".json"), pretty = TRUE, auto_unbox = TRUE, na = "null")
        }
      }
      
    }
    
    }
    
}

# INDSKILLSLEV ####

skills_data <- jsonlite::fromJSON(
  "https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22INDSKILLSLEV%22%7D,%22version%22:%222.0%22%7D%7D"
)

skills_data$result$note <- list(skills_data$result$note)
  
write_json(skills_data, "backup/INDSKILLSLEV.json", pretty = TRUE, auto_unbox = TRUE, na = "null")