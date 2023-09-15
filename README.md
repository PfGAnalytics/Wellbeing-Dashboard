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
| `datavis prep.R` | R script used to prepare the files for upload to the DataVis server |
| `*.png, *.jpg` | Logos, photographs, icons |

### Input and outputs expected

**Needed for this dashboard? Add something about data coming stright from data portal? Short section on how api's work and include links at bottom?

### Code structure

| Section | Purpose  |
| --- | --- |
| Head | Page title, import css and js dependencies, Google Analytics code and header |
| Body | Header and branding, more Google Analytics code, cookie banner, top menu, overall screen, domains screen, indicator screen, maps screen, help screen, footer |
| Domains Screen | 10x hexagons for each domain |
| Overall Screen | Hexagons generated for each indicator and categorised as 'improving', 'no change' or 'worsening' based on the data |
| Indicator Screen | Chart.js line chart for each indicator alongside additional information |
| Map Screen | Maps to display indicator data, dropdown menu to swicth between indicators |
| Help Screen | |
| Footer | Standard NISRA footer |

## :bell: Processes

### Link with Data Portal
- Dashboard will automatically update when new data is uploaded to the data portal (provided it is named the same)
- Add something here for guidance if an indicator changes?

### Update the dashboard with any necessary changes :chart_with_upwards_trend:
These may be things such as:
- Updating text or definitions/information boxes
- Adding/removing charts or sections
- Replacing images

### Testing phase :mortar_board:
When modifications have been made (new data or otherwise), carry out a systematic testing of content:
- Spelling and definitions
- Data is being presented accurately in text, charts, images etc.
- All links are still working e.g. Downloads, share buttons, links to external websites, links that make referene to other parts of the dashboard etc.

### Datavis hosting :computer:
1. Ensure the dashboard project is 'flat' i.e. there are no subfolders. All files must be at the same level e.g. `.html`, `.js`, `.png`, `.css` etc. files must all be in the same folder beside each other **Add instructions for datavis prep Rscript **
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
