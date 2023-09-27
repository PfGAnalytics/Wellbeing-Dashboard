# #50 PfG Wellbeing Framework dashboard

## :newspaper: Aim
Documentation to outline the structure and processes needed to create or modify the PfG Wellbeing Framework dashboard.

## :house: Structure

### File structure 

| File | Purpose  |
| --- | --- |
| `index.html` | The dashboard main page |
| `style.css` | Pre-defined styling for the dashboards - colours, fonts, sizing, spacing etc. |
| `domains_data.js` | Additional indicator information |
| `data_functions.js` | Javascript functionality used for data throughout dashboard |
| `navigation_functions.js` | Javascript functionality used for navigation throughout dashboard |
| `cookies_script.js` | Javascript functionality for cookies |
| `ni_map.js` | Javascript used to create NI basemap |
| `maps` | Folder containing shape files for maps |
| `datavis prep base64.R` | R script used to prepare the files for upload to the DataVis server |
| `*.png, *.jpg` | Logos, photographs, icons |

### Data Input

Data for the dashboard is directly linked to data available for each indicator stored in the 'Programme for Government' folder on the NISRA Data Portal. The relevant datasets on NISRA Data Portal are linked to the dashboard using an API query. The dashboard will automatically update as data is updated on the NISRA Data Portal provided it is uploaded using the same naming conventions.

The `domains_data.js` script is an additional 'input' which contains additional domain/indiactor information. 

### Code structure

| Section | Purpose  |
| --- | --- |
| Head | Page title, import css and js dependencies, Google Analytics code and header |
| Body | Header and branding, more Google Analytics code, cookie banner, top menu, overall screen, domains screen, indicator screen, maps screen, help screen, footer |
| Domains Screen | 9x hexagons for each domain |
| Overall Screen | Hexagons generated for each indicator and categorised as 'improving', 'no change' or 'worsening' based on the data |
| Indicator Screen | Chart.js line chart for each indicator alongside additional information |
| Map Screen | Maps to display indicator data, dropdown menu to swicth between indicators |
| Help Screen | |
| Footer | Standard NISRA footer |

## :bell: Processes

### Process Diagram

<div style="width: 100%;">
  <img src="img/data-flow-chart.svg" style="width: 100%;" alt="Click to see the source">
</div>

### Indicator sources
<div style="width: 100%; margin-bottom: 20px">
  <img src="img/indicator-sources.svg" style="width: 100%;" alt="Click to see the source">
</div>

a. __Domain title__ This comes from the _domain_ name found in [`domains_data.js`](scripts/domains_data.js)

b. __Indicator title__ This comes from the _indicator_ name found in [`domains_data.js`](scripts/domains_data.js)

c. __Why is this indicator important?__ This is the value of the _importance_ object for the particular indicator found in [`domains_data.js`](scripts/domains_data.js)

d. __Chart title__ This is the value of the _label_ object taken from the result of the NISRA Data Portal query.

e. __Source__ This is taken from the _notes_ object from the NISRA Data Portal query. The contents of the paragraph labelled __Notes__ are extracted. The preferred format for source information is: `Title of publication http://link.to.publication`

f. __More data__ This sentence is outputted based on the values present under the _data_ object within each indicator in [`domains_data.js`](scripts/domains_data.js)

g. __y axis label__ This is the value of the _unit_ object taken from the result of the NISRA Data Portal query.

h. __data points__ These are obtained from the _value_ object in the result of the NISRA Data Portal query.

i. __The real change interval__ This is the value of the _ci_ object for the particular indicator found in [`domains_data.js`](scripts/domains_data.js)

j. __Further information__ This is taken from the _notes_ object from the NISRA Data Portal query. The contents of the paragraph labelled __Further information__ are extracted.

k. __x axis values__ These are obtained from the _TLIST(A1)_ object in the result of the NISRA Data Portal query.

l. __Last updated date__  This is obtained from the _updated_ object in the result of the NISRA Data Portal query.

m. __Things have improved/not changed/worsened__ This part of the sentence is outputted based on the results of the NISRA Data Portal Query.

n. __Baseline year__ This is obtained from the _base_year_ value for the particular indicator found in [`domains_data.js`](scripts/domains_data.js)

o. __Statement on performance__ This is output as one of the three values (_improved_, _no_change_ or _worsened_) found under the _telling_ object for the particular indicator in [`domains_data.js`](scripts/domains_data.js) 

p. __How do we measure this?__ This is taken from the _notes_ object from the NISRA Data Portal query. The contents of the paragraph labelled __How do we measure this__ are extracted.

### Link with Data Portal
- Dashboard will automatically update when new data is uploaded to the data portal (provided it is named the same)
- If an indicator is added or changes this will need to be updated in the [`domains_data.js`](scripts/domains_data.js) script.

### Update the dashboard with any commentary on trends :chart_with_upwards_trend:
Commentary on indicator trends should be added to the [`domains_data.js`](scripts/domains_data.js) script.

### Testing phase :mortar_board:
When modifications have been made (new data or otherwise), carry out a systematic testing of content:
- Spelling and definitions
- Data is being presented accurately in text, charts, images etc.
- All links are still working e.g. Downloads, share buttons, links to external websites, links that make referene to other parts of the dashboard etc.

### Datavis hosting :computer:
1. Ensure the dashboard project is 'flat' i.e. there are no subfolders. All files must be at the same level e.g. `.html`, `.js`, `.png`, `.css` etc. files must all be in the same folder beside each other. The simplest way to do this is to open R Studio and run the `datavis prep base64.R` script. 
1. Arrange for all files to be uploaded to the DataVis server - ensure that the files are scheduled for release in line with your pre-announced publication date (for new statistics) or as necessary for fixes/minor updates.
1. ITassist will need to create:
   - A subdomain e.g. `spending.nisra.gov.uk`
   - An automatic redirect for that domain to the URL of your dashboard on Datavis

### 'Live' check :sun_with_face:
1. Once the dashboard has gone live, re-run the 'Testing phase' actions from above to ensure they have translated to the DataVis platform
2. Perform checks on mobile devices as necessary to ensure functionality and accessibility

## :warning: Troubleshooting
- No charts are appearing
  - Check for changes to Javascript - a single issue with JS/data can result in all charts failing to render

## :question: Links
- [Chart.js documentation](https://www.chartjs.org/docs/latest/)
- [Chart.js YouTube tutorials](https://www.youtube.com/c/ChartJS-tutorials)
- [CSS / styling guide on W3schools](https://www.w3schools.com/Css/)
- [HTML guide on W3schools](https://www.w3schools.com/html/default.asp)
- [Javascript guide on W3schools](https://www.w3schools.com/js/default.asp)
- [Test HTML/css/javascript on web sandbox - DO NOT UPLOAD SENSITIVE DATA](https://jsfiddle.net/)
- [Visual Studio Code documentation](https://code.visualstudio.com/Docs)
- [Github.com documentation](https://docs.github.com/en)
- [R cheatsheet PDFs](https://github.com/rstudio/cheatsheets)
