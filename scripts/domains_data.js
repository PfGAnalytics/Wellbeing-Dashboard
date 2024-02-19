// This script contains a single object "domains_data".

// At a high level is has the structure:

// domains_data = {
//    "Domain 1": {
//       description: "A description of Domain 1",
//       indicators: {
//          ...
//       }
//    },
//    "Domain 2": {
//       description: "A description of Domain 2",
//       indicators: {
//          ...
//       }
//    }
// }

// Inside each "indicators" key there is the following structure:

// indicators: {
//    "Indicator 1": {
//       importance: "A couple of sentences detailing the importance of this indicator",
//       base_year: "The base year for measuring improvement on this indicator can be in YYYY, YYYY/YY or YYYY-YY format depending on how time series is defined for indicator",
//       ci: "The change interval for this interval. Can be a number or number followed by letter c if improvement cumulates year on year",
//       data: {
//          NI: "NI data portal matrix", (or blank "" if not available)
//          AA: "AA data portal matrix", (or blank "" if not available)
//          LGD: "LGD data portal matrix", (or blank "" if not available)
//          EQ: "EQ data portal matrix" (or blank "" if not available)
//       },
//       improvement: "increase" or "decrease",
//       telling: {
//          improved: "Sentence to output when indicator performance is improving",
//          no_change: "Sentence to output when indicator performance is not changing",
//          worsened: "Sentence to output when indicator performance is worsening"
//       }
//    },
//    "Indicator 2": {
//       ...
//    }
// }

var domains_data = {
    "Happier Children": {
       description: "Our children and young people have the best start in life",
       indicators: {
         "Children's social care": {
            importance: 'The indicator gives an important insight into the overarching "We will give our children and young people the best start in life" outcome.  It illustrates that services provided to looked after children/care leavers are, for example, closing the education attainment gap between care-experienced children and other young people and that they have the same opportunities for training and employment as their peers.   It is also to be used as a key indicator for monitoring success in the "A life Deserved Strategy".',
            base_year: "2019/20",
            ci: "1c",
            data: {
               NI: "",
               AA: "INDCHSCAA",
               LGD: "INDCHSCLGD",
               EQ: "INDCHSCEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Small for gestational age": {
            importance: "Birth weight that is not within normal ranges has a strong association with poor health outcomes in infancy, childhood and across the whole life course.",
            base_year: "2019",
            ci: 1,
            data: {
               NI: "INDSFGANI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
      }
    },
    "Cleaner Environment": {
       description: "We live and work sustainably - protecting, improving and enjoying the environment",
       indicators: {
         "Air pollution": {
            importance: "The air that we breathe is vital to our health and wellbeing. Good air quality is essential for human health, the climate, habitats and the built environment. Pollutants from human activity are present in our atmosphere which may adversely impact upon our health and natural environment. Nitrogen dioxide is part of a group of gaseous air pollutants produced as a result of road traffic and other fossil fuel combustion processes. It can irritate the lungs and lower resistance to respiratory infections such as influenza.",
            base_year: "2019",
            ci: 1,
            data: {
               NI: "INDAIRPOLNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Coastal water condition": {
            importance: "Water is an essential natural resource and plays a vital role in maintaining biodiversity, our health and social welfare and our economic development. Our rivers, lakes, estuaries, seas and groundwater provide water to sustain many of our core social and economic activities, and also provide drinking water for our population. The majority of Northern Ireland’s 650 km of coastline is protected for its special interest and a number of our coastal species and habitats are recognised as internationally important. ",
            base_year: "2019",
            ci: 1,
            data: {
               NI: "INDCOASTQNI", 
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Greenhouse gas emissions": {
            importance: "Greenhouse gases are a key driver of climate change.  The continuation of climate changes will have adverse impacts on the nature of our summers and winters.  As such, these changes in weather patterns, along with rising sea levels will have bring risks to Northern Ireland’s ecosystem, economy and to its community as whole.",
            base_year: "2019",
            ci: "1c",
            data: {
               NI: "INDGREENHGNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Low carbon and renewable energy employment": {
            importance: "This indicator reports the number of full-time equivalent employees in the low carbon and renewable energy economy to enable change over time to be monitored in line with the aims of the Energy Strategy - Path to Net Zero Energy.",
            base_year: "2019",
            ci: 2000,
            data: {
               NI: "INDLCREENI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Recycled waste": {
            importance: "The Earth has limited resources which need to be utilised in a sustainable manner while minimising impacts on the environment. A low carbon, resource efficient society in which resources are valued and reused, putting them back into the economy while preventing waste is desired. Waste is produced by households, by industrial processes, by the construction and demolition industry, through commercial activities and agricultural practices and by public services and utilities. Waste can affect the environment through its visual impact or by emissions to the air, groundwater and surface water as well as the contamination of land. Increasing the amount of waste reused, recycled or composted will reduce the total going to landfill and contribute to better resource use.",
            base_year: "2019/20",
            ci: "0.5c",
            data: {
               NI: "INDRECWSTENI",
               AA: "",
               LGD: "INDRECWSTELGD",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "River water quality": {
            importance: "Water is an essential natural resource and plays a vital role in maintaining biodiversity, our health and social welfare and our economic development. Our rivers, lakes, estuaries, seas and groundwater provide water to sustain many of our core social and economic activities, and also provide drinking water for our population. Soluble reactive phosphorus is a plant nutrient, which, when present in rivers in elevated concentrations, can lead to accelerated growth of algae and other plants. The impact on the composition and abundance of plant species can have adverse implications for other aspects of water quality, such as oxygen levels, and for the characteristics of river habitats. These various changes can cause undesirable disturbances to populations of water animals, such as invertebrates and fish.",
            base_year: "2019",
            ci: 0.01,
            data: {
               NI: "INDRIVERQNI", 
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Equal Society": {
       description: "We have an equal and inclusive society where everyone is valued and treated with respect",
       indicators: {
         "Cultural identity": {
            importance: "Building and promoting respect for cultural identity helps support tackling sectarianism and therefore provides a foundation for good relations.",
            base_year: "2020",
            ci: 2.7,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDCULTIDEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Income deprivation": {
            importance: "Absolute poverty is a measure of whether the lowest income households are seeing their incomes rise in real terms over time. Poverty can impact on health, education, living arrangements, employment opportunities and interaction with family, friends and wider society.",
            base_year: "2021/22",
            ci: 4,
            data: {
               NI: "",
               AA: "",
               LGD: "INDINCDPLGD",
               EQ: "INDINCDPEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Income inequality": {
            importance: "Relative poverty is a measure of whether the lowest income households are seeing their incomes keep pace with the population as a whole. Poverty can impact on health, education, living arrangements, employment opportunities and interaction with family, friends and wider society.",
            base_year: "2021/22",
            ci: 4,
            data: {
               NI: "",
               AA: "",
               LGD: "INDINCIEQLGD",
               EQ: "INDINCIEQEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Respect": {
            importance: "Building and promoting respect helps support the development of an inclusive society and therefore provides a foundation for good relations.",
            base_year: "2020",
            ci: 2.2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDRESPECTEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
      }
    },
    "Healthier Lives": {
       description: "We all enjoy long, healthy active lives",
       indicators: {
         "Healthy life expectancy (females)": {
            importance: "Healthy Life Expectancy gives an indication of the extent of good or very good health among the population by providing the average number of years that an individual might expect to live in 'good health' or 'very good health' from birth.",
            base_year: "2017-19",
            ci: 1.5,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDHLEFEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Healthy life expectancy (males)": {
            importance: "Healthy Life Expectancy gives an indication of the extent of good or very good health among the population by providing the average number of years that an individual might expect to live in 'good health' or 'very good health' from birth.",
            base_year: "2017-19",
            ci: 1.5,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDHLEMEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Mental health": {
            importance: "GHQ-12 is a measure of current mental health among the population. Poor mental health while not only affecting social circumstances such as employment, family relationships and community participation can also be a key factor in determining physical wellbeing as well.",
            base_year: "2019/20",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDMHEALTHEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Preventable deaths": {
            importance: "Preventable deaths relate to causes of deaths that could potentially be avoided by the public health interventions in the broadest sense.",
            base_year: "2015-19",
            ci: 5,
            data: {
               NI: "",
               AA: "INDPREVDTHAA",
               LGD: "INDPREVDTHLGD",
               EQ: "INDPREVDTHEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Sports and physical activity": {
            importance: "This indicator provides the proportion of adults in Northern Ireland who engage sport and physical activity.  There is a correlation between engagement in sport and physical activities and higher levels of personal wellbeing.",
            base_year: "2021/22",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "INDSPORTSLGD",
               EQ: "INDSPORTSEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Brighter Futures": {
       description: "Everyone can reach their potential",
       indicators: {
         "Arts and cultural activities": {
            importance: "This indicator provides the proportion of adults in Northern Ireland who engage with art and cultural activities.  There is a correlation between engagement in cultural activities and higher levels of personal wellbeing.",
            base_year: "2021/22",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "INDARTCULLGD",
               EQ: "INDARTCULEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Life satisfaction": {
            importance: "Life satisfaction is a key aspect of personal wellbeing and is strongly linked to health, employment and relationships.",
            base_year: "2019/20",
            ci: 0.1,
            data: {
               NI: "",
               AA: "INDLIFESATAA",
               LGD: "INDLIFESATLGD",
               EQ: "INDLIFESATEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "School leavers' attainment gap": {
            importance: "Ensuring children have the best start in life includes empowering young people to achieve their potential and make informed and effective decisions throughout their lives. It supports our young people to develop as individuals and as contributors to society, the economy, and the environment. Educational attainment provides a measure of their life chances and readiness for future health and wellbeing, and the gap in attainment provides a measure of educational disadvantage.",
            base_year: "2019/20",
            ci: 4,
            data: {
               NI: "",
               AA: "INDSLATTGAPAA",
               LGD: "INDSLATTGAPLGD",
               EQ: "INDSLATTGAPEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Self-efficacy": {
            importance: "Self-efficacy is the degree to which people feel they can influence the events that affect their lives. Higher self-efficacy contributes to an accountable society where people feel more able to effect change within their own lives, which can lead to reduced pressures on public services.",
            base_year: "2019/20",
            ci: 2,
            data: {
               NI: "",
               AA: "INDSELFEFFAA",
               LGD: "INDSELFEFFLGD",
               EQ: "INDSELFEFFEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Stronger Economy": {
       description: "Our economy is globally competitive, regionally balanced and carbon-neutral",
       indicators: {
         "Economic inactivity": {
            importance: "This indicator shows the percentage of people who are not engaged in the labour market. It is important as a high economic inactivity rate can restrict labour supply which may in turn affect economic growth.",
            base_year: "2020",
            ci: 1.6,
            data: {
               NI: "",
               AA: "INDECONINACTAA",
               LGD: "INDECONINACTLGD",
               EQ: "INDECONINACTEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Employment rate": {
            importance: "The employment rate is important as a key labour market indicator. Those who are employed have money to spend which can contribute towards economic growth.",
            base_year: "2020",
            ci: 1.8,
            data: {
               NI: "",
               AA: "INDEMPRATEAA",
               LGD: "INDEMPRATELGD",
               EQ: "INDEMPRATEEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "External sales rate": {
            importance: 'Exports are a major driver of our economy. It is generally accepted that that businesses that export are more productive, create more jobs, and pay higher wages. DFE has developed a "Trade and Investment Strategy for a 10x economy" in which they note "Trade can support the ambitions of our \'10X Economy\' across the board: inclusive, green growth; diffusion of technology and innovation; and increased competitiveness. That is because trade is an engine of growth, without which the ability of our economy to grow would be constrained by its relatively small domestic market. Put simply, the more we trade the more competitive and prosperous we become."',
            base_year: "2019",
            ci: 0.7,
            data: {
               NI: "INDEXSALENI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Local graduates in narrow STEM subjects": {
            importance: "We need to drive increased participation in Narrow STEM subjects, which have particular economic relevance in Northern Ireland and include some of the best opportunities for individuals to develop rewarding careers in the coming decades. As low participation of women in this area is a particular concern, increasing involvement of females in Narrow STEM study and careers is a strategic priority for our economy and society.",
            base_year: "2021/22",
            ci: 1,
            data: {
               NI: "",
               AA: "INDGRADSAA",
               LGD: "INDGRADSLGD",
               EQ: "INDGRADSEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "International reputation": {
            importance: "It has become increasingly important to understand how Northern Ireland is viewed and thought about by other countries. Our international reputation will affect people’s willingness to live, study, visit, do business with and invest in NI and this has a significant impact on our economy.",
            base_year: "2020",
            ci: 1,
            data: {
               NI: "INDINTREPNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Northern Ireland Composite Economic Index": {
            importance: "The NICEI provides information on the performance of economic activity in NI on a quarterly basis. The NICEI is used to help monitor the progress of a range of key government strategies in NI. The statistic is also used by a broad range of users with an interest in assessing and reporting on the level of economic activity here, such as the ONS, economists in the public and private sector, academics and the media.",
            base_year: "2019",
            ci: 1,
            data: {
               NI: "INDNICEINI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Skills": {
            importance: "The proportion of the workforce with low or no qualifications (level 2 or below) has been a persistent problem in Northern Ireland. Whilst substantial progress was made, continued improvement will be required to keep pace with other comparable small advanced economies.",
            base_year: "2020",
            ci: 1.7,
            data: {
               NI: "",
               AA: "",
               LGD: "INDSKILLSLGD",
               EQ: "INDSKILLSEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Safer Communities": {
       description: "Everyone feels safe, we all protect the law and each other",
       indicators: {
         "Crime prevalence rate": {
            importance: "The crime prevalence rate gives the proportion of households/adults who have been a victim of a crime covered by the survey. It will capture incidents experienced by people living in private households, irrespective of whether or not these crimes were reported to, or recorded by, the police.",
            base_year: "2019/20",
            ci: 1,
            data: {
               NI: "",
               AA: "INDCRIMEAA",
               LGD: "INDCRIMELGD",
               EQ: "INDCRIMEEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Reoffending rate": {
            importance: "Within the broad category of people who have offended, there are particular groups who have additional needs and require further support in order to address this behaviour. A reduction in reoffending links with helping these individuals to confront and resolve the factors that lead to offending.",
            base_year: "2017/18",
            ci: "0.5c",
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDREOFREQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Personal safety": {
            importance: "It is important that everyone feels safe",
            base_year: "2019/20",
            ci: 2,
            data: {
               NI: "INDPERSSAFENI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Safe towns and city centres": {
            importance: "It is important that towns and city centres are safe for everyone.",
            base_year: "2020",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDSAFETOWNEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Worry about crime": {
            importance: "It is important that people worry less about crime.",
            base_year: "2019/20",
            ci: 2,
            data: {
               NI: "INDWORRYACNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Caring Society": {
       description: "We have a caring society that supports people throughout their lives",
       indicators: {
         "Adult social care": {
            importance: "The HSC has a duty to provide social services to meet the health and social well-being needs of older people and adults with disabilities and health conditions, including people with learning disabilities and mental health conditions.  The established direction is the provision of services to individuals which promote independence in order that adults with care and support needs can live in their own home and outside of institutional settings. This indicator measures the delivery of the DoH’s policy objective to provide services which support adults with care needs to live independently in their own homes and which delay or avoid the need for provision of institutional care. It measures the number of people being provided with care at home comparative to the overall number of people identified as having a social care need and whose needs are not being met through provision of social care services in their own home. This indicator is important for monitoring the effectiveness of social care services in meeting the needs of the population, and for identifying areas where additional support may be required to meet the needs of those who are not currently receiving services, all of which can inform policy and resource allocation decisions.",
            base_year: "2020",
            ci: 1,
            data: {
               NI: "INDADSCNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Loneliness": {
            importance: "Everyone is likely to experience feelings of loneliness at some point during their lifetime, however, frequent feelings of loneliness can have a serious negative impact, not only on a person’s mental health and wellbeing, but also on their physical health, as frequent loneliness is associated with early death.",
            base_year: "2019/20",
            ci: 1.96,
            data: {
               NI: "",
               AA: "INDLONEAA",
               LGD: "INDLONELGD",
               EQ: "INDLONEEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Volunteering": {
            importance: "This indicator provides the proportion of adults in Northern Ireland who volunteer, providing a measure of civic engagement.",
            base_year: "2021/22",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "INDVOLLGD",
               EQ: "INDVOLEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Better Homes": {
       description: "Everyone has access to good quality, affordable and sustainable homes that are appropriate for their needs",
       indicators: {
         "Homelessness": {
            importance: "Indicator provides information on the number of households who have presented and been accepted as homeless by the NI Housing Executive. Access to good quality, sustainable and affordable housing enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2019/20",
            ci: 0,
            data: {
               NI: "INDHOMELNNI",
               AA: "INDHOMELNAA",
               LGD: "INDHOMELNLGD",
               EQ: "INDHOMELNEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Housing costs as a proportion of household income": {
            importance: "This indicator provides one measure of the affordability of housing.  Access to good quality, sustainable and affordable housing enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2019/20",
            ci: 3,
            data: {
               NI: "",
               AA: "",
               LGD: "INDHOUSCTLGD",
               EQ: "INDHOUSCTEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Housing stress": {
            importance: "A household in housing stress is defined as an applicant on the waiting list (with no existing NIHE/Housing Association tenancy) having 30 or more points under the Common Selection Scheme.  Access to good quality, sustainable and affordable housing enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2019/20",
            ci: 0,
            data: {
               NI: "",
               AA: "",
               LGD: "INDHOUSTRSLGD",
               EQ: "INDHOUSTRSEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
       }
    },
    "Living Peacefully": {
      description: "We have a lasting peace, ensuring a stable and harmonious society for all",
      indicators: {
         "Community relations": {
            importance: "It is important that relations between Protestants and Catholics improve",
            base_year: "2020",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDCOMRELEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Shared community": {
            importance: "It is important that more people are welcoming of mixed communities",
            base_year: "2020",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDSHARCOMEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Trust in the media": {
            importance: "Integrity of the media is important in ensuring that people can access reliable information about matters of public interest that impact them. Trust in the media contributes to democratic wellbeing which can impact directly on personal wellbeing.",
            base_year: "2021",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDTRUSTMEDIAEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         },
         "Trust in the NI Assembly": {
            importance: "Trust in elected representatives is central to a functioning, democratic society.  Lack of trust in elected representatives can discourage people from democratic participation and people can feel as though they do not have a voice in decisions that affect them.  This in turn can influence wellbeing.",
            base_year: "2019",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDTRUSTASMBEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder."
            }
         }
      }
    }
 };