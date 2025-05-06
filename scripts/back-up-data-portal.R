library(jsonlite)
library(dplyr)

js_file_path <- "scripts/domains_data.js"
js_lines <- readLines(js_file_path, warn = FALSE)

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

for (matrix in matrix_list) {
  
  json_data <- jsonlite::fromJSON(txt = paste0("https://ws-data.nisra.gov.uk/public/api.jsonrpc?data=%7B%22jsonrpc%22:%222.0%22,%22method%22:%22PxStat.Data.Cube_API.ReadDataset%22,%22params%22:%7B%22class%22:%22query%22,%22id%22:%5B%5D,%22dimension%22:%7B%7D,%22extension%22:%7B%22pivot%22:null,%22codes%22:false,%22language%22:%7B%22code%22:%22en%22%7D,%22format%22:%7B%22type%22:%22JSON-stat%22,%22version%22:%222.0%22%7D,%22matrix%22:%22", 
         matrix, "%22%7D,%22version%22:%222.0%22%7D%7D"))
  
  write_json(json_data, paste0("backup/", matrix, ".json"), pretty = TRUE, auto_unbox = TRUE)
  
}
