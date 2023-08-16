function createMap(id, title, matrix, indicator) {

    pxWidget.queue('map', id, {
       "autoupdate": true,
       "matrix": null,
       "mapDimension": "LGD2014",
       "copyright": true,
       "link": `<a href="https://ppdata.nisra.gov.uk/table/${matrix}" target="_blank">See data here</a>`,
       "title": title,
       "borders": true,
       "colorScale": "red",
       "tooltipTitle": null,
       "fullScreen": {
       "title": "View Fullscreen",
       "titleCancel": "Exit Fullscreen",
       "center": [54.65, -6.8]
       },
       "data": {
       "datasets": [{
           "api": {
               "query": {
                   "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
                   "data": {
                   "jsonrpc": "2.0",
                   "method": "PxStat.Data.Cube_API.ReadDataset",
                   "params": {
                       "class": "query",
                       "id": ["STATISTIC", "TLIST(A1)"],
                       "dimension": {
                           "STATISTIC": {
                               "category": {
                               "index": [indicator]
                               }
                           },
                           "TLIST(A1)": {
                               "category": {
                               "index": ["2020/21"]
                               }
                           }
                       },
                       "extension": {
                           "language": {
                               "code": "en"
                           },
                           "format": {
                               "type": "JSON-stat",
                               "version": "2.0"
                           },
                           "matrix": matrix
                       },
                       "version": "2.0",
                       "m2m": false
                   }
                   }
               },
               "response": {}
           },
           "fluidTime": [0]
       }]
       },
       "metadata": {
       "api": {
           "query": {
               "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
               "data": {
                   "jsonrpc": "2.0",
                   "method": "PxStat.Data.Cube_API.ReadMetadata",
                   "params": {
                   "matrix": matrix,
                   "language": "en",
                   "format": {
                       "type": "JSON-stat",
                       "version": "2.0"
                   }
                   },
                   "version": "2.0"
               }
           },
           "response": {}
       }
       },
       "options": {
       "mode": "e",
       },
       "baseMap": {
       "leaflet": [],
       "esri": []
       }
    });
    
}