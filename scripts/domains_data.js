// This script contains a single object "domains_data".

// At a high level is has the structure:

// domains_data = {
//    "Domain 1": {
//       description: "A description of Domain 1",
//       mission: "People", "Planet", "Prosperity" or "Peace",
//       indicators: {
//          ...
//       }
//    },
//    "Domain 2": {
//       description: "A description of Domain 2",
//       mission: "People", "Planet", "Prosperity" or "Peace",
//       indicators: {
//          ...
//       }
//    }
// }

// Inside each "indicators" key there is the following structure:

// indicators: {
//    "Indicator 1": {
//       importance: "A couple of sentences detailing the importance of this indicator",
//       base_year: "The base year for measuring improvement on this indicator can be in YYYY, YYYY/YY or YYYY-YY format depending on how time series is defined for indicator"
//                   "Set base year to null if there is insufficient data in order to measure improving/worsening"
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
//          worsened: "Sentence to output when indicator performance is worsening",
//          insufficient: "Sentence to output when indicator performance cannot be measured due to insufficient data"
//       }
//    },
//    "Indicator 2": {
//       ...
//    }
// }

var domains_data = {
    "Happier Children": {
       description: "Our children and young people have the best start in life",
       mission: "People",
       indicators: {
         "Children's social care": {
            importance: 'The indicator gives an important insight into the overarching "Happier Children" domain.  It illustrates that services provided to looked after children/care leavers are, for example, closing the education attainment gap between care-experienced children and other young people and that they have the same opportunities for training and employment as their peers.   It is also to be used as a key indicator for monitoring success in the "A life Deserved Strategy".',
            base_year: "2018/19",
            ci: "1c",
            data: {
               NI: "",
               AA: "INDCHSCAA",
               LGD: "INDCHSCLGD",
               EQ: "INDCHSCEQ"
            },
            improvement: "increase",
            telling: {
               improved: "Although the proportion of young care leavers aged 19 in education, training or employment is lower than the last three years, it is higher than five years ago.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Small for gestational age": {
            importance: "Birth weight that is not within normal ranges has a strong association with poor health outcomes in infancy, childhood and across the whole life course.",
            base_year: null,
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
               worsened: "This commentary is a placeholder.",
               insufficient: "With only four reporting years available, it is not yet possible to provide an indication on what this indicator is telling us."
            }
         },
      }
    },
    "Cleaner Environment": {
       description: "We live and work sustainably - protecting, improving and enjoying the environment",
       mission: "Planet",
       indicators: {
         "Active travel - public transport": {
            importance: "Encouraging more sustainable and efficient ways of travelling will help build connectivity, improve air quality by reducing emissions and promote health and well-being for all.",
            base_year: null,
            ci: 1.1,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDATPUBEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: "There were a number of significant changes to the survey methodology from 2020, due to the COVID-19 pandemic.  In addition to these changes, the impact of the pandemic and the resultant introduction of new public health regulations, guidance and advice may have also fundamentally changed peoples’ behaviour and attitudes.  While 2020 and 2021 results can be compared to each other, care should be taken in reaching any conclusions based on these data and comparisons to previous years. The comparison year for this indicator has been set to 2022."
            }
         },
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
               improved: "NO2 levels have shown a gradual reducing trend from 2011 to 2019. Emission dipped in 2020 to 24.3μg/m3 coinciding with restrictions implemented in response to the Covid-19 pandemic.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
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
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "Thirteen water bodies (52 per cent) have been assessed at good or better ecological condition in 2022. Excessive nutrient (dissolved inorganic nitrogen) was the most frequent failing element and was reported in 10 of the 12 water bodies that failed to achieve good condition.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Condition of protected sites": {
            importance: "Our natural environment is our life support system and our greatest asset. For its size, Northern Ireland is amongst the most geologically diverse areas in the world and this shapes its varied and beautiful landscapes and rich nature, wildlife and habitats. Our natural environment contributes to our prosperity and well-being. The state of our biodiversity reflects the state of our air, water and land environments. ",
            base_year: "2019/20",
            ci: 0,
            data: {
               NI: "INDCONDSTENI", 
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "In 2022/23 54.9 per cent of features within protected sites were in favourable condition which is higher than the 54.8 per cent in favourable condition in 2019/20. Restoring features that are currently in unfavourable condition to favourable condition can take a long time.",
               no_change: "This commentary is a placeholder",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Greenhouse gas emissions": {
            importance: "Greenhouse gases are a key driver of climate change.  The continuation of climate changes will have adverse impacts on the nature of our summers and winters.  As such, these changes in weather patterns, along with rising sea levels will have bring risks to Northern Ireland’s ecosystem, economy and to its community as whole.",
            base_year: "2017",
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
               no_change: "In 2021 a 'bounce back' was experienced in GHG emissions after the drop off in admissions associated with COVID restrictions.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""

            }
         },
         "Outdoor recreation": {
            importance: "Connection with nature during time spent outdoors is aligned with greater care and concern for biodiversity, landscapes and the environment and increased pro-nature conservation behaviours. Outdoor recreation in nature brings additional benefits to society including improving health and well-being (exercise, social engagement and mental well-being), increasing active travel, growing and greening the economy, tackling inequality and enhancing education and learning. ",
            base_year: null,
            ci: 0,
            data: {
               NI: "INDOUTRECNI", 
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
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
               no_change: "The household waste recycling rate increased from 27.7 per cent in 2006/07 to a high of 51.7 per cent in 2019/20.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Renewable electricity": {
            importance: "The decarbonisation of electricity generation contributes to the reduction of greenhouse gas emissions, to enhancing energy security of supply and affordability in addition to the wider contribution to the economy of the associated developments.",
            base_year: "2019",
            ci: 0,
            data: {
               NI: "INDRENEWNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "The growth in the proportion of electricity consumption that is renewably generated from 17.3% in 2013 to 49.2% in 2020 has not been sustained in recent years and has averaged 46.8% between 2020 and 2023.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
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
               worsened: "Levels of soluble reactive phosphorus (SRP) in the 93 Surveillance Rivers have increased from 0.063 mg/l in 2019 to 0.073 mg/l in 2022.",
               insufficient: ""
            }
         }
       }
    },
    "Equal Society": {
       description: "We have an equal and inclusive society where everyone is valued and treated with respect",
       mission: "People",
       indicators: {
         "Cultural identity": {
            importance: "Building and promoting respect for cultural identity helps support tackling sectarianism and therefore provides a foundation for good relations.",
            base_year: "2018",
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
               worsened: "This means that a smaller proportion of adults in 2022 feel their cultural identity is respected by society than in 2018.",
               insufficient: ""
            }
         },
         "Income deprivation": {
            importance: "Absolute poverty is a measure of whether the lowest income households are seeing their incomes rise in real terms over time. Poverty can impact on health, education, living arrangements, employment opportunities and interaction with family, friends and wider society.",
            base_year: "2018/19",
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
               no_change: "Over the last ten years, the proportion of individuals in absolute poverty (BHC) generally decreased slowly from a high of 21% in 2013/14 to a low of 12% in 2020/21 before increasing slightly to the current position of 14% in 2022/23.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Income inequality": {
            importance: "Relative poverty is a measure of whether the lowest income households are seeing their incomes keep pace with the population as a whole. Poverty can impact on health, education, living arrangements, employment opportunities and interaction with family, friends and wider society.",
            base_year: "2018/19",
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
               no_change: "Over the last ten years, the proportion of individuals in relative poverty (BHC) has fluctuated between a high of 22% in 2014/15 and lows of 16% in 2017/18 and 2021/22.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Respect": {
            importance: "Building and promoting respect helps support the development of an inclusive society and therefore provides a foundation for good relations.",
            base_year: "2017",
            ci: 2.7,
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
               worsened: "This means that adults living in Northern Ireland in 2021 feel less respected on multiple measures than they did in 2017.",
               insufficient: ""
            }
         }
      }
    },
    "Healthier Lives": {
       description: "We all enjoy long, healthy active lives",
       mission: "People",
       indicators: {
         "Active travel - walking and cycling": {
            importance: "Encouraging more active and sustainable ways of travelling will help build connectivity, improve air quality by reducing emissions and promote health and well-being for all.",
            base_year: null,
            ci: 2.4,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDATWALKEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: "There were a number of significant changes to the survey methodology from 2020, due to the COVID-19 pandemic.  In addition to these changes, the impact of the pandemic and the resultant introduction of new public health regulations, guidance and advice may have also fundamentally changed peoples’ behaviour and attitudes.  While 2020 and 2021 results can be compared to each other, care should be taken in reaching any conclusions based on these data and comparisons to previous years. The comparison year for this indicator has been set to 2022."
            }
         },
         "Healthy life expectancy (females)": {
            importance: "Healthy Life Expectancy gives an indication of the extent of good or very good health among the population by providing the average number of years that an individual might expect to live in 'good health' or 'very good health' from birth.",
            base_year: "2016-18",
            ci: 1.5,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDHLEFEQ"
            },
            improvement: "increase",
            telling: {
               improved: "HLE increased by 1.9 years from 60.8 years in 2016/18 to 62.7 years in 2020-22. The change was statistically significant.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Healthy life expectancy (males)": {
            importance: "Healthy Life Expectancy gives an indication of the extent of good or very good health among the population by providing the average number of years that an individual might expect to live in 'good health' or 'very good health' from birth.",
            base_year: "2016-18",
            ci: 1.5,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDHLEMEQ"
            },
            improvement: "increase",
            telling: {
               improved: "HLE increased by 1.5 years from 59.7 years in 2016-18 to 61.2 years in 2020-22. Although the change was not statistically significant, the overlap in confidence intervals was relativley small and there was a clear and consistent upward trend over the five-year period. Despite an initial drop in male HLE between 2016-18 and 2017-19, HLE increased notably in each of the following years resulting in an overall increase of 1.5 years.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Mental health": {
            importance: "GHQ-12 is a measure of current mental health among the population. Poor mental health while not only affecting social circumstances such as employment, family relationships and community participation can also be a key factor in determining physical wellbeing as well.",
            base_year: "2018/19",
            ci: 1.3,
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
               worsened: "The proportion of males with a high GHQ12 score is unchanged from 2018/19, however the proportion of females with a high GHQ12 score has risen from 2018/19.  Considering the longer term trend, the proportion scoring highly is at a similar level to 2010/11. There was a significant increase during the pandemic however the latest findings suggest an overall return to pre-pandemic levels. There are differences between subgroups of the population and a consistent gap remains between the most and least deprived areas.",
               insufficient: ""
            }
         },
         "Preventable deaths": {
            importance: "Preventable deaths relate to causes of deaths that could potentially be avoided by the public health interventions in the broadest sense.",
            base_year: "2014-18",
            ci: 4.8,
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
               worsened: "The preventable mortality rate increased by 11 deaths per 100,000 population from 168 deaths per 100,000 population in 2014-18 to 179 deaths per 100,000 population in 2018-22. The change was statistically significant.",
               insufficient: ""
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
               no_change: "The comparison year has been set to 2021/22 due to changes in the data collection method as a result of COVID-19. While comparisons can be made between 2021/22 and 2022/23, it is important to note that participation in sport and physical activity in 2021/22 would have been impacted by closures due to COVID-19 .In both 2022/23 and 2021/22  gaps can be seen in participation in sports physical activity between the people with a disability compared with those without and people with dependants compared with those without. Gaps also exist for people living in urban and rural areas.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         }
       }
    },
    "Brighter Futures": {
       description: "Everyone can reach their potential",
       mission: "People",
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
               improved: "The comparison year has been set to 2021/22 due to changes in the data collection method as a result of COVID-19. While comparisons can be made between 2021/22 and 2022/23, it is important to note that engaging in arts/cultural activities in 2021/22 would have been impacted by closures due to COVID-19. In both 2022/23 and 2021/22 gaps can be seen between males and females, people with a disability compared with those without and people with dependants compared with those without. Gaps also exist for most and least deprived areas and urban and rural areas.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Life satisfaction": {
            importance: "Life satisfaction is a key aspect of personal wellbeing and is strongly linked to health, employment and relationships.",
            base_year: "2021/22",
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
               worsened: "The comparison year has been set to 2021/22 due to changes in the data collection method as a result of COVID-19. The longer term trend shows no change in average life satisfaction. However, consistent gaps remain between the most and least deprived areas, and also between people with a disability compared to those without a disability.",
               insufficient: ""
            }
         },
         "School leavers attainment gap": {
            importance: "Ensuring children have the best start in life includes empowering young people to achieve their potential and make informed and effective decisions throughout their lives. It supports our young people to develop as individuals and as contributors to society, the economy, and the environment. Educational attainment provides a measure of their life chances and readiness for future health and wellbeing, and the gap in attainment provides a measure of educational disadvantage.",
            base_year: null,
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
               worsened: "This commentary is a placeholder.",
               insufficient: "This is due to changes in how academic grades were awarded in response to Covid-19."
            }
         },
         "Self-efficacy": {
            importance: "Self-efficacy is the degree to which people feel they can influence the events that affect their lives. Higher self-efficacy contributes to an accountable society where people feel more able to effect change within their own lives, which can lead to reduced pressures on public services.",
            base_year: "2021/22",
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
               no_change: "The comparison has been set to 2021/22 due to changes in the data collection method as a result of COVID-19. The longer term trend shows an improvement in self-efficacy since reporting began in 2014/15. However, consistent gaps remain between males and females, the most and least deprived areas, people with a disability compared with those without and also between people with a white ethnicity compared with any other ethnicity.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         }
       }
    },
    "Stronger Economy": {
       description: "Our economy is globally competitive, regionally balanced and carbon-neutral",
       mission: "Prosperity",
       indicators: {
         "Economic inactivity": {
            importance: "This indicator shows the percentage of people who are not engaged in the labour market. It is important as a high economic inactivity rate can restrict labour supply which may in turn affect economic growth.",
            base_year: "2018",
            ci: 1.5,
            data: {
               NI: "",
               AA: "INDECONINACTAA",
               LGD: "INDECONINACTLGD",
               EQ: "INDECONINACTEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "The proportion of people who are economically inactive for any reason apart from being a student has remained unchanged from 2018.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Employment rate": {
            importance: "The employment rate is important as a key labour market indicator. Those who are employed have money to spend which can contribute towards economic growth.",
            base_year: "2018",
            ci: 1.7,
            data: {
               NI: "",
               AA: "INDEMPRATEAA",
               LGD: "INDEMPRATELGD",
               EQ: "INDEMPRATEEQ"
            },
            improvement: "increase",
            telling: {
               improved: "The proportion of people aged 16 to 64 in employment has statistically increased from 2018.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "External sales rate": {
            importance: 'Exports are a major driver of our economy. It is generally accepted that that businesses that export are more productive, create more jobs, and pay higher wages. DFE has developed a "Trade and Investment Strategy for a 10x economy" in which they note "Trade can support the ambitions of our \'10X Economy\' across the board: inclusive, green growth; diffusion of technology and innovation; and increased competitiveness. That is because trade is an engine of growth, without which the ability of our economy to grow would be constrained by its relatively small domestic market. Put simply, the more we trade the more competitive and prosperous we become."',
            base_year: "2018",
            ci: 0.6,
            data: {
               NI: "INDEXSALENI",
               AA: "",
               LGD: "INDEXSALELGD",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "There has been no statistically significant change in the proportion of survey eligible businesses that sell outside Northern Ireland.",               
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         // "Local graduates in narrow STEM subjects": {
         //    importance: "We need to drive increased participation in Narrow STEM subjects, which have particular economic relevance in Northern Ireland and include some of the best opportunities for individuals to develop rewarding careers in the coming decades. As low participation of women in this area is a particular concern, increasing involvement of females in Narrow STEM study and careers is a strategic priority for our economy and society.",
         //    base_year: "2021/22",
         //    ci: 1,
         //    data: {
         //       NI: "",
         //       AA: "INDGRADSAA",
         //       LGD: "INDGRADSLGD",
         //       EQ: "INDGRADSEQ"
         //    },
         //    improvement: "increase",
         //    telling: {
         //       improved: "This commentary is a placeholder.",
         //       no_change: "This commentary is a placeholder.",
         //       worsened: "This commentary is a placeholder.",
         //       insufficient: ""
         //    }
         // },
         "International reputation": {
            importance: "It has become increasingly important to understand how Northern Ireland is viewed and thought about by other countries. Our international reputation will affect people’s willingness to live, study, visit, do business with and invest in NI and this has a significant impact on our economy.",
            base_year: "2019",
            ci: 1,
            data: {
               NI: "INDINTREPNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "Northern Ireland achieved a higher score on the Nation Brands Index, indicating an improved reputation internationally.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Labour productivity": {
            importance: "Productivity is a key determinant of living standards and economic competitiveness over the long term. The ability to produce the same output with less input or more output with the same input outlay is also relevant to the transition towards a more sustainable economy.",
            base_year: null,
            ci: 1,
            data: {
               NI: "INDLABPRDTNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Northern Ireland Composite Economic Index": {
            importance: "The NICEI provides information on the performance of economic activity in NI on a quarterly basis. The NICEI is used to help monitor the progress of a range of key government strategies in NI. The statistic is also used by a broad range of users with an interest in assessing and reporting on the level of economic activity here, such as the ONS, economists in the public and private sector, academics and the media.",
            base_year: "2017",
            ci: 1,
            data: {
               NI: "INDNICEINI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "Economic activity has increased gradually in recent years. Economic activity post-pandemic has recovered substantially following a decline in 2020, and the latest data in 2022 is at a series high. ",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Research and development": {
            importance: "Research and development (R&D) is an essential component of a strong and sustainable economy, investment in R&D helps drive increased innovation, leads to increased productivity and higher levels of economic growth.",
            base_year: "2018",
            ci: 1,
            data: {
               NI: "INDRESDEVNI",
               AA: "",
               LGD: "",
               EQ: ""
            },
            improvement: "increase",
            telling: {
               improved: "There has been a 10.3% increase in real terms between 2018 and 2022.  There has been a real terms decrease of 5.5% in GERD between 2021 and 2022. An improving trend is defined as anything more than a 0.1% increase on the 2018 GERD value; a worsening trend is defined as anything more than a 0.1% decrease on the 2018 GERD value.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Skills": {
            importance: "The proportion of the workforce with low or no qualifications (level 2 or below) has been a persistent problem in Northern Ireland. Whilst substantial progress was made, continued improvement will be required to keep pace with other comparable small advanced economies.",
            base_year: "2018",
            ci: 1.6,
            data: {
               NI: "",
               AA: "",
               LGD: "INDSKILLSLGD",
               EQ: "INDSKILLSEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "There has been no significant changes to the proportion of people qualified to Level 2 and above.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         }
       }
    },
    "Safer Communities": {
       description: "Everyone feels safe, we all protect the law and each other",
       mission: "People",
       indicators: {
         "Crime prevalence rate": {
            importance: "The crime prevalence rate gives the proportion of households/adults who have been a victim of a crime covered by the survey. It will capture incidents experienced by people living in private households, irrespective of whether or not these crimes were reported to, or recorded by, the police.",
            base_year: "2017/18",
            ci: 1.9,
            data: {
               NI: "",
               AA: "INDCRIMEAA",
               LGD: "INDCRIMELGD",
               EQ: "INDCRIMEEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "The proportion who have been a victim of a crime measured through the survey has fallen.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Reoffending rate": {
            importance: "Within the broad category of people who have offended, there are particular groups who have additional needs and require further support in order to address this behaviour. A reduction in reoffending links with helping these individuals to confront and resolve the factors that lead to offending.",
            base_year: "2016/17",
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
               no_change: "However, despite the overall proportion of individuals who reoffend remaining unchanged, annual cohorts have been consistently declining. This is positive news for the Department and wider Justice organisations who are working to address reoffending in Northern Ireland.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
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
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Safe towns and city centres": {
            importance: "Town centres must be seen as places where people can feel safe in moving around, and where life choices are not inhibited by fears around safety. This is a key aspect of social and physical wellbeing for people living in or visiting towns and cities.",
            base_year: "2018",
            ci: 2.7,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDSAFETOWNEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder",
               worsened: "This means that a smaller proportion of people aged 18+ see towns and city centres as safe and welcoming places for people of all walks of life than did in 2018.",
               insufficient: ""
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
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         }
       }
    },
    "Caring Society": {
       description: "We have a caring society that supports people throughout their lives",
       mission: "People",
       indicators: {
         "Adult social care": {
            importance: "The HSC has a duty to provide social services to meet the health and social well-being needs of older people and adults with disabilities and health conditions, including people with learning disabilities and mental health conditions.  The established direction is the provision of services to individuals which promote independence in order that adults with care and support needs can live in their own home and outside of institutional settings. This indicator measures the delivery of the DoH’s policy objective to provide services which support adults with care needs to live independently in their own homes and which delay or avoid the need for provision of institutional care. It measures the number of people being provided with care at home comparative to the overall number of people identified as having a social care need and whose needs are not being met through provision of social care services in their own home. This indicator is important for monitoring the effectiveness of social care services in meeting the needs of the population, and for identifying areas where additional support may be required to meet the needs of those who are not currently receiving services, all of which can inform policy and resource allocation decisions.",
            base_year: "2019",
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
               no_change: "The proportion of adults receiving social care services at home, or self directed support, has remained fairly constant throughout this time period.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Loneliness": {
            importance: "Everyone is likely to experience feelings of loneliness at some point during their lifetime, however, frequent feelings of loneliness can have a serious negative impact, not only on a person’s mental health and wellbeing, but also on their physical health, as frequent loneliness is associated with early death.",
            base_year: "2021/22",
            ci: 2,
            data: {
               NI: "",
               AA: "INDLONEAA",
               LGD: "INDLONELGD",
               EQ: "INDLONEEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "The comparison year has been set to 2021/22 due to changes in the data collection method as a result of COVID-19. The longer term trend shows a spike in loneliness during the pandemic and appears to be returning to pre-pandemic levels in 2022/23. However, consistent gaps remain between the most and least deprived areas, people with a disability compared with those without, people who are married or in a civil partnership compared with those who are separated, and also between people with a white ethnicity compared with any other ethnicity.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
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
               improved: "The comparison year has been set to 2021/22 due to changes in the data collection method as a result of COVID-19. While comparisons can be made between 2021/22 and 2022/23, it is important to note that volunteering in 2021/22 would have been impacted by closures due to COVID-19.                                                                                                                                                                                                                             In both 2022/23 and 2021/22 gaps can be seen in participation in volunteering between the protestant and catholic communities, people with a disability compared with those without and people with dependants compared with those without. Gaps also exist for most and least deprived areas and urban and rural areas.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         }
       }
    },
    "Better Homes": {
       description: "Everyone has access to good quality, affordable and sustainable homes that are appropriate for their needs",
       mission: "People",
       indicators: {
         "Availability of suitable housing": {
            importance: "This indicator provides the proportion of households who are satisfied with their house or flat.  Access to good quality, sustainable and affordable housing that is appropriate for the household' s needs, enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2021/22",
            ci: 2,
            data: {
               NI: "",
               AA: "",
               LGD: "INDSUITHOUSLGD",
               EQ: "INDSUITHOUSEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Homelessness": {
            importance: "Indicator provides information on the number of households who have presented and been accepted as homeless by the NI Housing Executive. Access to good quality, sustainable and affordable housing enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2018/19",
            ci: 0,
            data: {
               NI: "",
               AA: "",
               LGD: "INDHOMELNLGD",
               EQ: "INDHOMELNEQ"
            },
            improvement: "decrease",
            telling: {
               improved: "Since 2018/19 the number of Households that have been accepted as homelessness has fallen. There was a reduction in the number of acceptances in the period of time immediately after the COVID-19 pandemic with 2020/21 representing the lowest number of acceptances over recent years. In 2021/22 and 2022/23 the number of acceptances has increased, albeit not to pre-pandemic levels. It should be noted that a significant impact of the pandemic in respect of demand for homelessness services has been an increase in demand for temporary accommodation. All of those who are accepted as statutorily homeless have a statutory duty to temporary accommodation and there has been an increase from 3,354 placements in 2018/19 to 10,253 in 2022/23.",
               no_change: "This commentary is a placeholder.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Housing costs as a proportion of household income": {
            importance: "This indicator provides one measure of the affordability of housing.  Access to good quality, sustainable and affordable housing enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2017/18",
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
               no_change: "Over the last ten years, the proportion of individuals in households spending 30% or more of household income on housing costs generally decreased slowly from a high of 13% in 2011/12 to a low of 6% in 2021/22. However, there has consistently been a larger proportion spending 30% or more of household income on housing costs in the rental sectors compared to the overall population.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Housing stress": {
            importance: "A household in housing stress is defined as an applicant on the waiting list (with no existing NIHE/Housing Association tenancy) having 30 or more points under the Common Selection Scheme.  Access to good quality, sustainable and affordable housing enables people to thrive and maintain their quality of life, with links to better outcomes in health, education and employment.",
            base_year: "2018/19",
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
               worsened: "The number of households in housing stress has steadily increased in the last 5 years.",
               insufficient: ""
            }
         }
       }
    },
    "Living Peacefully": {
      description: "We have a lasting peace, ensuring a stable and harmonious society for all",
      mission: "Peace",
      indicators: {
         "Community relations": {
            importance: "Perceptions of relations between Protestants and Catholics are an important part of public life in Northern Ireland and affect citizens' perceptions of peace and stability, which in turn affects mental wellbeing.",
            base_year: "2018",
            ci: 2.8,
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
               worsened: "This means that a smaller proportion of people aged 18+ think that relations between Protestants and Catholics are better now than they were five years ago than thought this in 2018.",
               insufficient: ""
            }
         },
         "Shared community": {
            importance: "Preference for mixed religion neighbourhoods is an important indicator of attitudes towards other communities, as well as an indicator of preference for a shared community, which in turn is an important aspect of social wellbeing in Northern Ireland.",
            base_year: "2018",
            ci: 2.4,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDSHARCOMEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "This means that roughly the same proportion of people aged 18+ would prefer a mixed religion neighbourhood as in 2018.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Trust in the media": {
            importance: "Integrity of the media is important in ensuring that people can access reliable information about matters of public interest that impact them. Trust in the media contributes to democratic wellbeing which can impact directly on personal wellbeing.",
            base_year: "2019",
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
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         },
         "Trust in the NI Assembly": {
            importance: "Trust in elected representatives is central to a functioning, democratic society.  Lack of trust in elected representatives can discourage people from democratic participation and people can feel as though they do not have a voice in decisions that affect them.  This in turn can influence wellbeing.",
            base_year: "2019",
            ci: 1,
            data: {
               NI: "",
               AA: "",
               LGD: "",
               EQ: "INDTRUSTASMBEQ"
            },
            improvement: "increase",
            telling: {
               improved: "This commentary is a placeholder.",
               no_change: "However, the level of trust in the NI Assembly was higher in 2020 and 2021, compared to 2019 and 2022.",
               worsened: "This commentary is a placeholder.",
               insufficient: ""
            }
         }
      }
    }
 };