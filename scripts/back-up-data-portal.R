library(jsonlite)
library(dplyr)
library(stringr)
library(purrr)

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
eq_groups <- readLines("scripts/eqgroups.js") %>%
  str_c(collapse = "\n") %>%
  str_remove("var eqgroups\\s*=\\s*") %>%
  str_remove(";$") %>%
  str_replace_all("([\\{|,])\\s*\"?(\\w[^\"]*?)\"?\\s*:", "\\1\"\\2\":") %>%
  str_replace_all("'", "\"") %>%
  fromJSON() %>%
  map(~ .x %>%
        str_replace_all("\\s+", "") %>%          # remove whitespace
        str_c('"', ., '"') %>%                   # wrap each item in quotes
        str_c(collapse = ",") %>%                # join into one string
        str_replace_all('"', "%22"))

updated <- list()

# Loop through all matrices ####
for (matrix in matrix_list) {
  
  ## Read all data for each matrix ####
  json_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22", 
                                               matrix, "%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=", apiKey))
  
  json_data$result$note <- list(json_data$result$note)
  json_data$result$updated <- sub("\\..*", "", json_data$result$updated)

  updated[[matrix]] <- list(updated = json_data$result$updated)
  
  if (!"error" %in% names(json_data)) {
    write_json(json_data, paste0("backup/", matrix, ".json"), pretty = TRUE, auto_unbox = TRUE, na = "null")
  }
  
  ## NI data sets ####
  if (str_sub(matrix, -2) == "NI") {
    matrix_line <- which(grepl(matrix, js_lines))
    base_year_line <- max(setdiff(which(grepl("base_year", js_lines)), matrix_line:length(js_lines)))
    ci_line <- max(setdiff(which(grepl("ci", js_lines)), matrix_line:length(js_lines)))
    improvement_line <- min(setdiff(which(grepl("improvement", js_lines)), 1:matrix_line))
    
    base_year <- trimws(sub(",", "", gsub('"', "", sub("base_year:", "", js_lines[base_year_line]))))
    ci <- trimws(sub(",", "", gsub('"', "", sub("ci:", "", js_lines[ci_line]))))
    improvement <- trimws(sub(",", "", gsub('"', "", sub("improvement:", "", js_lines[improvement_line]))))
    
    if (base_year == "null") {
      performance <- "insufficient data"
    } else {
      base_position <- which(json_data$result$dimension$`TLIST(A1)`$category$index == base_year)
      base_value <- json_data$result$value[base_position]
      current_value <- json_data$result$value[length(json_data$result$value)]
      
      if (grepl("c", ci)) {
        ci_num <- as.numeric(sub("c", "", ci)) * (length(json_data$result$value) - base_position)
      } else {
        ci_num <- as.numeric(ci)
      }
      
      performance <- if (improvement == "increase") {
        if (current_value > base_value + ci_num) {
          "improving"
        } else if (current_value < base_value - ci_num) {
          "worsening"
        } else {
          "no change"
        }
      } else {
        if (current_value < base_value - ci_num) {
          "improving"
        } else if (current_value > base_value + ci_num) {
          "worsening"
        } else {
          "no change"
        }
      }
    }
    
    updated[[matrix]]$performance <- performance
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
        
        matrix_line <- which(grepl(matrix, js_lines))
        base_year_line <- max(setdiff(which(grepl("base_year", js_lines)), matrix_line:length(js_lines)))
        ci_line <- max(setdiff(which(grepl("ci", js_lines)), matrix_line:length(js_lines)))
        improvement_line <- min(setdiff(which(grepl("improvement", js_lines)), 1:matrix_line))
        
        base_year <- trimws(sub(",", "", gsub('"', "", sub("base_year:", "", js_lines[base_year_line]))))
        ci <- trimws(sub(",", "", gsub('"', "", sub("ci:", "", js_lines[ci_line]))))
        improvement <- trimws(sub(",", "", gsub('"', "", sub("improvement:", "", js_lines[improvement_line]))))
        
        if (base_year == "null") {
          performance <- "insufficient data"
        } else {
          base_position <- which(eq_data$result$dimension$`TLIST(A1)`$category$index == base_year)
          base_value <- eq_data$result$value[base_position]
          current_value <- eq_data$result$value[length(eq_data$result$value)]
          
          if (grepl("c", ci)) {
            ci_num <- as.numeric(sub("c", "", ci)) * (length(eq_data$result$value) - base_position)
          } else {
            ci_num <- as.numeric(ci)
          }
          
          performance <- if (matrix == "INDOUTRECEQ") {
              if (current_value > base_value) {
                "improving"
              } else if (current_value < base_value) {
                "worsening"
              } else {
                "no change"
              }
          } else if (improvement == "increase") {
            if (current_value > base_value + ci_num) {
              "improving"
            } else if (current_value < base_value - ci_num) {
              "worsening"
            } else {
              "no change"
            }
          } else {
            if (current_value < base_value - ci_num) {
              "improving"
            } else if (current_value > base_value + ci_num) {
              "worsening"
            } else {
              "no change"
            }
          }
        }
        
        updated[[matrix]]$performance <- performance
        
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
  paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22INDSKILLSLEV%22%7D,%22version%22:%222.0%22%7D%7D&apiKey=", apiKey)
)


if (!"error" %in% names(skills_data)) {
  skills_data$result$note <- list(skills_data$result$note)  
  write_json(skills_data, "backup/INDSKILLSLEV.json", pretty = TRUE, auto_unbox = TRUE, na = "null")
}

# Write out updated dates ####
write_json(updated, "scripts/updated.json", pretty = TRUE, auto_unbox = TRUE, na = "null")
