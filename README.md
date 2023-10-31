# #50 PfG Wellbeing Framework dashboard

## Table of Contents

- [#50 PfG Wellbeing Framework dashboard](#50-pfg-wellbeing-framework-dashboard)
  - [Table of Contents](#table-of-contents)
  - [:newspaper: Aim](#newspaper-aim)
  - [:house: Structure](#house-structure)
    - [File structure](#file-structure)
    - [Data Input](#data-input)
    - [Code structure](#code-structure)
    - [Software Checklist](#software-checklist)
      - [Git set up](#git-set-up)
  - [:arrows\_clockwise: Processes](#arrows_clockwise-processes)
    - [Process Diagram](#process-diagram)
    - [:information\_source: Indicator sources](#information_source-indicator-sources)
      - [Updating an indicator](#updating-an-indicator)
      - [Adding a new indicator/domain](#adding-a-new-indicatordomain)
    - [Link with Data Portal](#link-with-data-portal)
    - [Update the dashboard with any commentary on trends :chart\_with\_upwards\_trend:](#update-the-dashboard-with-any-commentary-on-trends-chart_with_upwards_trend)
    - [Process for updating code](#process-for-updating-code)
    - [Testing phase :mortar\_board:](#testing-phase-mortar_board)
    - [Datavis hosting :computer:](#datavis-hosting-computer)
    - ['Live' check :sun\_with\_face:](#live-check-sun_with_face)
  - [:warning: Troubleshooting](#warning-troubleshooting)
  - [Frequently Asked Questions](#frequently-asked-questions)
    - [How do we add an indicator?](#how-do-we-add-an-indicator)
    - [How do we add a domain?](#how-do-we-add-a-domain)
    - [How do we add a new map?](#how-do-we-add-a-new-map)
    - [How do we move indicators between domains?](#how-do-we-move-indicators-between-domains)
    - [How do we change improving/worsening on charts?](#how-do-we-change-improvingworsening-on-charts)
    - [How do we add a new page, e.g. notes?](#how-do-we-add-a-new-page-eg-notes)
    - [How do we hide pages?](#how-do-we-hide-pages)
    - [How do we change branding, logos, etc.?](#how-do-we-change-branding-logos-etc)
    - [How do we change colours of chart, maps, boxes?](#how-do-we-change-colours-of-chart-maps-boxes)
    - [How do we change chart styles?](#how-do-we-change-chart-styles)
    - [How do we move hexagons from between the improving/worsening/no change sections on the Overall page?](#how-do-we-move-hexagons-from-between-the-improvingworseningno-change-sections-on-the-overall-page)
    - [What parts of the script do we need to update if we move to the live data portal?](#what-parts-of-the-script-do-we-need-to-update-if-we-move-to-the-live-data-portal)
    - [The process of updating GitHub when we make changes?](#the-process-of-updating-github-when-we-make-changes)
    - [What's the process for publishing the dashboard?](#whats-the-process-for-publishing-the-dashboard)
  - [:question: Links](#question-links)

## :newspaper: Aim
Documentation to outline the structure and processes needed to create or modify the PfG Wellbeing Framework dashboard.

## :house: Structure

### File structure 

| File | Purpose  |
| --- | --- |
| `index.html` | The dashboard main page |
| `style.css` | Pre-defined styling for the dashboards - colours, fonts, sizing, spacing etc. |
| `domains_data.js` | Additional indicator information |
| `data_functions.js` | JavaScript functionality used for data throughout dashboard |
| `navigation_functions.js` | JavaScript functionality used for navigation throughout dashboard |
| `cookies_script.js` | JavaScript functionality for cookies |
| `ni_map.js` | JavaScript used to display NI LGD and Assembly Area maps |
| `maps` | Folder containing original shape files for maps |
| `datavis prep base64.R` | R script used to prepare the files for upload to the DataVis server |
| `*.svg, *.gif` | Logos, icons and placeholder images |

### Data Input

Data for the dashboard is directly linked to data available for each indicator stored in the 'Programme for Government' folder on the NISRA Data Portal. The relevant datasets on NISRA Data Portal are linked to the dashboard using an API query. The dashboard will automatically update as data is updated on the NISRA Data Portal provided it is uploaded using the same naming conventions.

The `domains_data.js` script is an additional 'input' which contains additional domain/indiactor information. 

### Code structure

| Section | Purpose  |
| --- | --- |
| Head | Page title, import css and js dependencies, Google Analytics code and header |
| Body | Header and branding, cookie banner, top menu, overall screen, domains screen, indicator screen, maps screen, user guide, footer |
| Domains Screen | Hexagons for showing the high level domains, clicking a domain shows the indicators for that domain |
| Overall Screen | Hexagons generated for each indicator and categorised as 'improving', 'no change' or 'worsening' based on the data |
| Indicator Screen | Chart.js line chart for each indicator alongside additional information |
| Map Screen | Maps to display indicator data, dropdown menu to swicth between indicators |
| User Guide | Background information on the indicators and their framework |
| Footer | Standard NISRA footer |

### Software Checklist

- Visual Studio Code (with "Live Server" Extension)
- R Studio
- Git for Windows
 
#### Git set up

If you are using Git for the first time follow these configuration steps before cloning the Git Repository:
1. Register an account on github.com with your work email address.
2. Open Visual Studio Code
3. Open a new Terminal, either by clicking `Terminal` in the top menu and choosing `New Terminal` or pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>'</kbd>
4. In the Terminal pane enter each line of code, pressing <kbd>Enter</kbd> __after each line__:
    -  `git config --global http.sslVerify false`
    - `git config --global http.proxy http://cloud-lb.nigov.net:8080`
    - `git config --global https.proxy https://cloud-lb.nigov.net:8080`
    - `git config --global user.name "YourUserName"`
    - `git config --global user.email first.last@nisra.gov.uk`

You will need to enter the username and email address you registered your github.com account with. 

## :arrows_clockwise: Processes

### Process Diagram

The diagram below shows how the functionality behind this dashboard renders all the code. Some parts of the process are _independent_ (they occur automatically as the page loads) and some are _dependent_ (they occur in response to some interaction from the user).

<div style="width: 100%;">
  <img src="img/data-flow-chart.svg" style="width: 100%;" alt="Click to see the source">
</div>

### :information_source: Indicator sources

The diagram below depicts the _Economic inactivity_ indicator page with the source of each page of information on it highlighted. To change or update any piece of information below (for any indicator) refer to this diagram:

<div style="width: 100%; margin-bottom: 20px">
  <img src="img/indicator-sources.svg" style="width: 100%;" alt="Click to see the source">
</div>

a. __Domain title__ This comes from the _domain_ name found in [`domains_data.js`](scripts/domains_data.js)

b. __Indicator title__ This comes from the _indicator_ name found in [`domains_data.js`](scripts/domains_data.js)

c. __How do we measure this?__ This is taken from the _notes_ object from the NISRA Data Portal query. The contents of the paragraph labelled __How do we measure this__ are extracted.

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

p. __Why is this indicator important?__ This is the value of the _importance_ object for the particular indicator found in [`domains_data.js`](scripts/domains_data.js)

q. __Links to maps__ These links are generated if AA or LGD data are listed in [`domains_data.js`](scripts/domains_data.js)

r. __Pop-up charts for Equality Groups__ These links are generated depending on the category values of the _EQUALGROUPS_ variable on the NISRA Data Portal.

#### Updating an indicator

The diagram above, and its footnote, should be referred to when changing any piece of information about an indicator.

If a change is being made within the [`domains_data.js`](scripts/domains_data.js) script then you must follow this up with steps 4-7 in the [Process for updating code](#process-for-updating-code) section below.

Under the _telling_ obect for each indicator you should ensure all placeholder text is complete, even for text which will not be rendered in the current scenario as the indicator performance may change following a data portal update and we don't want to display commentary that contradicts the data displayed on the chart.

#### Adding a new indicator/domain

To add a new indicator to the Data Portal all the information highlighted in yellow above must be entered in the correct place as detailed in the notes below the diagram.

After the new indicator has been added to the Data Portal the [`domains_data.js`](scripts/domains_data.js) script can then be updated with all the items highlighted in blue above. The formatting and object nesting for a typical indicator is described in the commented out code at the top of the script.

After the script has been updated follow steps 4-7 in the [Process for updating code](#process-for-updating-code) section below.

### Link with Data Portal
- Dashboard will automatically update when new data is uploaded to the data portal (provided it is named the same)
- If an indicator is added or changes this will need to be updated in the [`domains_data.js`](scripts/domains_data.js) script.

### Update the dashboard with any commentary on trends :chart_with_upwards_trend:
Commentary on indicator trends should be added to the [`domains_data.js`](scripts/domains_data.js) script.

### Process for updating code

1. Open Visual Studio Code.
2. Run a "Git pull" to ensure code is up to date with repository.
3. Make any changes to the code.
4. Save changes, Stage changes, Commit changes and then Push changes to Github.
5. Open R Studio by double clicking the `scripts.Rproj` file (using Windows Explorer not Visual Studio Code)
6. Run the script `datavis prep base64.R` (Press <kbd>Ctrl</kbd>+<kbd>A</kbd> followed by <kbd>Ctrl</kbd>+<kbd>Enter</kbd>) to embed JavaScript files, images and css stylesheets in the [`index.html`](scripts/index.html) file.
7. This will automatically render a __new copy__ of `index.html` in a sub-folder named `dashboard-to-upload`. Upload __this copy__ of `index.html` to the Datavis server to the same location where it was previously hosted. 

### Testing phase :mortar_board:
When modifications have been made (new data or otherwise), carry out a systematic testing of content:
- Spelling and definitions
- Data is being presented accurately in text, charts, images etc.
- All links are still working e.g. Downloads, share buttons, links to external websites, links that make reference to other parts of the dashboard etc.

### Datavis hosting :computer:
1. Ensure the you are using a self-contained version of [`index.html`](index.html). This can be generated by following steps 5-7 of the [Process for updating code](#process-for-updating-code)
1. Arrange for the file to be uploaded to the DataVis server
1. ITassist will need to create:
   - A subdomain e.g. `wellbeing.nisra.gov.uk`
   - An automatic redirect for that domain to the URL of your dashboard on Datavis

### 'Live' check :sun_with_face:
1. Once the dashboard has gone live, re-run the 'Testing phase' actions from above to ensure they have translated to the DataVis platform
2. Perform checks on mobile devices as necessary to ensure functionality and accessibility

## :warning: Troubleshooting
- Chart isn't appearing
  - This is likely an issue with the live fetch from Data Portal. Open your browsers Dev Tools and check the Console for warnings. Try refreshing the page. If the problem persists, try increasing the wait time in the _setTimeout()_ functions found in [`navigation_functions.js`](scripts/navigation_functions.js) script.
- Source information, Further information or How we measure this not appearing on indicator page
  - Check the "notes" text for that indicator on the Data Portal. Heading should read "Source" "How do we measure this" or "Futher information" and be spelled correctly for _createLineChart()_ and _drawMap()_ functions to pick them up and display them.

## Frequently Asked Questions

### How do we add an indicator?
### How do we add a domain?
### How do we add a new map?
### How do we move indicators between domains?
### How do we change improving/worsening on charts?

### How do we add a new page, e.g. notes?
There are two changes that need to be made in the [`index.html`](index.html) script to add a page:

 1. Inside the `<div>` element with the id `top-container` there is a `<form>` element with the id `top-menu-items`:
   
    ```
    <form id = "top-menu-items" class = "row" action = "">
      <button id = "domains-btn" class = "top-menu-item selected-item" name = "tab" value = "domains"><i class = "fas fa-chart-line"></i> Domains</button>
      <button id = "overall-btn" class = "top-menu-item" name = "tab" value = "overall"><img id = "hex-icon" src = "img/three-hexagons.svg" alt = "Hexagons logo" style = "width: 20px;"> Overall</button>
      <button id = "maps-btn" class = "top-menu-item" name = "tab" value = "maps"><img id = "ni-icon" src = "img/Northern_Ireland_outline.svg" alt = "Outline of Northern Ireland icon" style = "width: 20px;"> Maps</button>
      <button id = "help-btn" class = "top-menu-item" name = "tab" value = "help"><i class="fa-regular fa-address-book"></i></i> Notes</button>
    </form>
    ```

    It is here we must first add a new `<button>` element. Suppose we want to name the page __"New"__, then we would define the button as follows:

    `<button id = "new-btn" class = "top-menu-item" name = "tab" value = "new">New</button>`

    The `id` and `value` properties must correspond to each other (ie `new-btn` and `new` respectively). The `class` should always be `top-menu-item` and the `name` should always be `tab`.

    Button icons (those found in`<i>` tags) are sourced from [FontAwesome](https://fontawesome.com/icons). Those which are inside `<img>` tags have been sourced online and placed in this projects [`img`](img) directory.

 2. Inside the `<div>` element with the id `main-container` add a new `<div>` element as follows:
   
    ```
    <div id = "new-scrn" class = "screen">
       Page content goes in here
    </div>
    ```
    Note that the `id` of this `div` must always correspond to the `id` and `value` entered when adding the `<button>` element in Step 1.

    That's it. The [`navigation_functions.js`](scripts/navigation_functions.js) script will take care of the rest.  

### How do we hide pages?
Referring to the [question above](#how-do-we-add-a-new-page-eg-notes), there are 2 steps to hiding a page.

 1. Inside the `<form>` with the id `top-menu-items` highlight the corresponding button for that page and press <kbd>Ctrl</kbd> + <kbd>?</kbd>. This will transform that line of code to a text comment.

 2. For the corresponding `<div>` element with the class `screen`. Highlight the code and press <kbd>Ctrl</kbd> + <kbd>?</kbd>.

### How do we change branding, logos, etc.?
### How do we change colours of chart, maps, boxes?
### How do we change chart styles?

### How do we move hexagons from between the improving/worsening/no change sections on the Overall page?
This is done automatically.

The `indicatorPerformace()` function in the [`data_functions.js`](scripts/data_functions.js) script will categorise each indicator based on its performance.

The `plotOverallHexes()` function in the [`navigation_functions.js`](scripts/navigation_functions.js) script then plots the hexagons on the Overall based on the results of `indicatorPerformace()`.

The `indicatorPerformance()` function obtains the data values for each indicator from the Data Portal. It then uses the properties `base_year`, `ci` and `improvement` for each indicator found in [`domains_data.js`](scripts/domains_data.js) to determine performance. There is more information on how each of these properties should be defined in the annotations in this script.

### What parts of the script do we need to update if we move to the live data portal?
Updating the `baseURL` value in the [`config.js`](scripts/config.js) script to read from the live data portal will point all data portal queries to the new location.

Updating the `tableURL` value in this script will ensure that all links in the "More data" section are updated.

### The process of updating GitHub when we make changes?
See [Process for updating code](#process-for-updating-code).

### What's the process for publishing the dashboard?
See [Datavis hosting :computer:](#datavis-hosting-computer).


## :question: Links
- [Chart.js documentation](https://www.chartjs.org/docs/latest/)
- [Chart.js YouTube tutorials](https://www.youtube.com/c/ChartJS-tutorials)
- [CSS / styling guide on W3schools](https://www.w3schools.com/Css/)
- [HTML guide on W3schools](https://www.w3schools.com/html/default.asp)
- [Javascript guide on W3schools](https://www.w3schools.com/js/default.asp)
- [Free introductory html/css/js courses](https://www.codecademy.com/)
- [Test HTML/css/javascript on web sandbox - DO NOT UPLOAD SENSITIVE DATA](https://jsfiddle.net/)
- [Visual Studio Code documentation](https://code.visualstudio.com/Docs)
- [Github.com documentation](https://docs.github.com/en)
- [R cheatsheet PDFs](https://github.com/rstudio/cheatsheets)
