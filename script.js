function createTable(widget, title, matrix) {

    pxWidget.queue('table',
    widget, {
        "autoupdate": true,
        "matrix": null,
        "fluidTime": [0, 1, 2, 3, 4, 5, 6, 7],
        "copyright": false,
        "title": title,
        "link": "https://ppdata.nisra.gov.uk/table/" + matrix,
        "pivot": null,
        "hideColumns": [],
        "internationalisation": {
            "unit": "Unit",
            "value": "Value"
        },
        "defaultContent": "..",
        "data": {
            "api": {
                "query": {
                    "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
                    "data": {
                        "jsonrpc": "2.0",
                        "method": "PxStat.Data.Cube_API.ReadDataset",
                        "params": {
                            "class": "query",
                            "id": [],
                            "dimension": {},
                            "extension": {
                                "pivot": null,
                                "codes": false,
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
            }
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
            "language": {
                "decimal": ".",
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "Showing 0 to 0 of 0 entries",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Show _MENU_ entries",
                "loadingRecords": "Loading...",
                "processing": "Processing...",
                "search": "Search:",
                "zeroRecords": "No matching records found",
                "paginate": {
                    "first": "First",
                    "last": "Last",
                    "next": "Next",
                    "previous": "Previous"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            "search": {
                "search": ""
            },
            "dom": "Bfltip",
            "responsive": true,
            "buttons": [{
                    "extend": "csv",
                    "text": "Download CSV",
                    "className": "export-button",
                    "title": matrix,
                    "exportOptions": {
                        "columns": []
                    }
                },
                {
                    "extend": "print",
                    "text": "Print",
                    "className": "export-button",
                    "title": "",
                    "exportOptions": {
                        "columns": []
                    }
                }
            ],
            "order": []
        }
    });


}

createTable("self_eff","PfG Indicator - Self-efficacy", "PFGIND02T03")
createTable("lonely", "PfG Indicator - Loneliness", "PFGIND0301")


var breakdowns = {
    "NI": {
        "var": "LGD2014",
        "groups": {
            "N92000002": "Northern Ireland"
        }
    },
    "LGD2014": {
        "var": "LGD2014",
        "groups": {
            "N09000001": "Antrim and Newtownabbey",
            "N09000002": "Armagh City, Banbridge and Craigavon",
            "N09000003": "Belfast",
            "N09000004": "Causeway Coast and Glens",
            "N09000005": "Derry City and Strabane",
            "N09000006": "Fermanagh and Omagh",
            "N09000007": "Lisburn and Castlereagh",
            "N09000008": "Mid and East Antrim",
            "N09000009": "Mid Ulster",
            "N09000010": "Newry, Mourne and Down",
            "N09000011": "Ards and North Down"
        }
    },
    "DEP": {
        "var": "DEP",
        "groups": {
            "1": "Quantile 1 - Most deprived",
            "2": "Quantile 2",
            "3": "Quantile 3",
            "4": "Quantile 4",
            "5": "Quantile 5 - Least deprived"
        }
    },
    "Gender": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "1": "Male",
            "2": "Female"
        }
    },
    "Age": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "3": "16-24",
            "4": "25-34",
            "5": "35-49",
            "6": "50-64",
            "7": "65-74",
            "8": "75+"
        }
    },
    "Marital": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "9": "Single",
            "10": "Married/Civil Partnership",
            "11": "Separated",
            "12": "Divorced",
            "13": "Widowed"
        }
    },
    "Sexuality": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "14": "Heterosexual",
            "15": "Gay/Lesibian, Bisexual and Other"
        }
    },
    "Ethnicity": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "16": "White",
            "17": "Other"
        }
    },
    "Religion": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "18": "Catholic",
            "19": "Protestant",
            "20": "Other/no religion"
        }
    },
    "Dependants": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "21": "With dependants (overall)",
            "22": "Without dependants"
        }
    },
    "Disability": {
        "var": "EQUALSUBPOPS",
        "groups": {
            "23": "Yes",
            "24": "No"
        }
    }
};


function createLineChart (id, title, indicator, breakdown, matrix) {    

        var lines_to_draw = [];                 

        for (let i = 0; i < Object.keys(breakdowns[breakdown].groups).length; i++) {
            
            lines_to_draw.push({
                "label": Object.values(breakdowns[breakdown].groups)[i],
                "pointRadius": 2,
                "pointHoverRadius": 4,
                "maxBarThickness": 90,
                "api": {
                    "query": {
                        "url": "https://ppws-data.nisra.gov.uk/public/api.jsonrpc",
                        "data": {
                            "jsonrpc": "2.0",
                            "method": "PxStat.Data.Cube_API.ReadDataset",
                            "params": {
                                "class": "query",
                                "id": ["STATISTIC", breakdowns[breakdown].var],
                                "dimension": {
                                    "STATISTIC": {
                                        "category": {
                                            "index": [indicator]
                                        }
                                    },
                                    [breakdowns[breakdown].var]: {
                                        "category": {
                                            "index": [Object.keys(breakdowns[breakdown].groups)[i]]
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
                                    "matrix": matrix,
                                    "m2m": false
                                },
                                "version": "2.0"
                            }
                        }
                    },
                    "response": {}
                },
                "data": [],
                "unit": [],
                "decimal": [],
                "fluidTime": [],
                "fill": false
            })        

    }
    
    pxWidget.queue('chart', id, {
        "autoupdate": true,
        "matrix": null,
        "type": "line",
        "copyright": false,
        "link": "https://ppdata.nisra.gov.uk/table/" + matrix,
        "sort": false,
        "metadata": {
            "xAxis": {
                "TLIST(A1)": [],
                "role": "time"
            },
            "fluidTime": [],
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
        "data": {
            "labels": [],
            "datasets": lines_to_draw,
            "null": ".."
        },
        "options": {
            "responsive": true,
            "maintainAspectRatio": false,
            "title": {
                "display": true,
                "text": [title]
            },
            "tooltips": {
                "mode": "index",
                "callbacks": {}
            },
            "hover": {
                "mode": "nearest",
                "intersect": true
            },
            "scales": {
                "xAxes": [{
                    "ticks": {
                        "beginAtZero": false,
                        "maxTicksLimit": null,
                        "reverse": false
                    },
                    "gridLines": {
                        "display": false
                    },
                    "scaleLabel": {
                        "display": false,
                        "labelString": null
                    },
                    "stacked": false
                }],
                "yAxes": [{
                    "display": true,
                    "position": "left",
                    "id": "y-axis-1",
                    "ticks": {
                        "beginAtZero": true
                    },
                    "callback": null,
                    "scaleLabel": {
                        "display": false,
                        "labelString": null
                    },
                    "stacked": false
                }]
            },
            "plugins": {
                "stacked100": {
                    "enable": false
                },
                "colorschemes": {
                    "scheme": "tableau.Tableau10"
                }
            },
            "legend": {
                "display": true,
                "position": "bottom"
            },
            "elements": {
                "line": {
                    "tension": 0.4
                }
            },
            "layout": {
                "padding": {
                    "left": 22,
                    "right": 22,
                    "top": 0,
                    "bottom": 22
                }
            }
        },
        "datasetLabels": ["Northern"],
        "plugins": [{}]
    });
}



createLineChart(id = "self_eff_line",
                title = "PfG Indicator - Self-efficacy",
                indicator = "PFGINDSELFEFF", 
                breakdown = "NI",
                matrix = "PFGIND02T02")

createLineChart(id = "self_eff_line_lgd",
                title = "PfG Indicator - Self-efficacy by Local Government District",
                indicator = "PFGINDSELFEFF", 
                breakdown = "LGD2014",
                matrix = "PFGIND02T02")

// createLineChart(id = "self_eff_line_lgd",
//                 title = "PfG Indicator - Employment Rate by Local Government District",
//                 indicator = "PFGINDEMPRATE", 
//                 breakdown = "LGD2014",
//                 matrix = "PFGIND04T02")

createLineChart(id = "self_eff_line_dep",
                title = "PfG Indicator - Self-efficacy by Deprivation Group",
                indicator = "PFGINDSELFEFF", 
                breakdown = "DEP",
                matrix = "PFGIND02T03")

createLineChart(id = "self_eff_line_gender",
                title = "PfG Indicator - Self-efficacy by Gender",
                indicator = "PFGINDSELFEFF", 
                breakdown = "Gender",
                matrix = "PFGIND02T01")

createLineChart(id = "self_eff_line_age",
                title = "PfG Indicator - Self-efficacy by Age Group",
                indicator = "PFGINDSELFEFF", 
                breakdown = "Age",
                matrix = "PFGIND02T01")

createLineChart(id = "self_eff_line_mar",
                title = "PfG Indicator - Self-efficacy by Marital Status",
                indicator = "PFGINDSELFEFF", 
                breakdown = "Marital",
                matrix = "PFGIND02T01")
