function createMap(id, title, matrix, statistic, dimension) {

    pxWidget.queue('map', id, {
       "autoupdate": true,
       "matrix": null,
       "mapDimension": dimension,
       "copyright": false,
       "link": null,
       "title": title,
       "borders": true,
       "colorScale": "blue",
       "tooltipTitle": null,
       "fullScreen": {
       "title": "View Fullscreen",
       "titleCancel": "Exit Fullscreen"
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
                               "index": [statistic]
                               }
                           },
                           "TLIST(A1)": {
                               "category": {
                               "index": []
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
       "mode": "q",
       },
       "baseMap": {
       "leaflet": [],
       "esri": []
       }
    });
    
}