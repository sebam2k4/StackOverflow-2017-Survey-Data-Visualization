# School Donations Data Visualization

## Demo

## Overview

### What is this app for

An interactive data visualization that represents...

### What does it do

visualize data in charts, graphs, etc. Filter data...etc. (more details will follow)

### How does it work

The app uses D3.js and DC.js to renders charts from a large MongoDB database and uses Crossfilter.js to allow exploration of the datasets for analysis. The charts are styled with Dc.css and then bootstrap is used in conjuction with keen.js & keen-dashboards.css to layout the dashboard elements.

Flask is used for building the server that interacts with MongoDB and renders the HMTL page that contains our charts.

The following data collection attributes/fields will be used as the basis of the project:

- Languages used
- Frameworks, libraries, and tools used
- Databases used
- Level of Formal education
- Undergraduate major
- Other Coding Education Type
- Country of residence
- Developer type
- Professional type
- Tabs or spaces used

### The Data

The data is a set of responses from Stack Overflow's 2017 Annual Developer Survey. The original Data set is available in .csv format only and needed to be imported into MongoDB.

Original data set from Stack Overflow can be found [here](https://insights.stackoverflow.com/survey/)

## App Features

### Existing Features

- Python server for database content to be served to the web interface.
- Rendered the data to the dashboard elements and charts.
- Dashboard and charts layed out and styles.

## Tech Used

### Back End

The back end code is written in Python 2.7.14

- **[Mongo DB](https://www.mongodb.com/)**
  - NoSQL Database used to convert and present our data in JSON format.
- **[Flask](http://flask.pocoo.org/)**
  - A Python based micro framework used to serve our data from the server to our web based interface.

### Front End

- **[D3.js](https://d3js.org/)**
  - A JavaScript based visualization engine, which will render interactive charts and graphs based on the data.
- **[Dc.js](https://dc-js.github.io/dc.js/)**
  - A JavaScript based wrapper library for D3.js, which makes plotting the charts a lot easier.
- **[Crossfilter.js 1.4.0](http://square.github.io/crossfilter/)**
  - A JavaScript based data manipulation library that enables two way data binding.
  - Crossfilter supports dimensions with arrays since version 1.4.0 which has been very helpful in developing this project
- **[Queue.js 1.0.7](https://github.com/d3/d3-queue)**
  - An asynchronous helper library for data ingestion involving multiple apis.
  - Used to delay rendering the dashboard until the data is loaded from the database
- **[Bootstrap 3](http://getbootstrap.com/docs/3.3/getting-started/)**
  - Used in conjunction with keen.js to layout the dashboard elements
- **[Keen Dashboards](https://github.com/keen/dashboards)**
  - A dashboard template library
- **[D3-tip](https://github.com/Caged/d3-tip)**
  - Tooltips for d3.js visualizations
- **[intro.js](https://introjs.com/)**
  - Used to create the dashboard tour

## Getting the code up and running

1. Firstly you will need to clone this repository by running the `git clone https://github.com/sebam2k4/StackOverflow-2017-Survey-Data-Visualization` command
2. add more steps...

## Testing



## Bugs

Flickering tooltip when hovering over pie chart slice labels.

## Contributing

As this is a graded project for a course, no contributions are accepted at this moment :) I suppose after it's been graded then it can be opened to contributions. However, feel free to clone the project's repository and experiment!

## Credit

To make the top bar chart responsive, I've adapted code from the following [source](https://css-tricks.com/snippets/jquery/done-resizing-event/) to reset chart's width and redraw it after window resizing by user has stopped (either by dragging the browser window with or changing orientation portrait/landscape).

Information about creating 'fake groups' to filter data before it is charted - [source](https://github.com/dc-js/dc.js/wiki/FAQ#how-do-i-filter-the-data-before-its-charted) I have used the described technique to filter out 'NA' fields from the dataset.
