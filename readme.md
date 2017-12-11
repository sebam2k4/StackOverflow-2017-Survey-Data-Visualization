# School Donations Data Visualization

## Demo

## Overview

### What is this app for?

An interactive data visualization that represents...

### What does it do?

visualize data in charts, graphs, etc. Filter data...etc. (more details will follow)

### How does it work

The app uses D3.js and DC.js to renders charts from a large MongoDB database and uses Crossfilter.js to allow exploration of the datasets for analysis. The charts are styled with Dc.css and then bootstrap is used in conjuction with keen.js & keen-dashboards.css to layout the dashboard elements.

Flask is used for building the server that interacts with MongoDB and renders the HMTL page that contains our charts.

The following data collection attributes/fields will be used as the basis of the project:

- Languages used
- Frameworks, tools, etc used
- education
- career satisfaction
- etc.

## App Features
 
### Existing Features

- Python server for database content to be served to the web interface.
- Rendered the data to the dashboard elements and charts.
- Dashboard and charts layed out and styles.

### Features Left to Implement
- lots

## Tech Used

### Tech used includes:
- **[D3.js](https://d3js.org/)**
  - A JavaScript based visualization engine, which will render interactive charts and graphs based on the data.
- **[Dc.js](https://dc-js.github.io/dc.js/)**
  - A JavaScript based wrapper library for D3.js, which makes plotting the charts a lot easier.
- **[Crossfilter.js](http://square.github.io/crossfilter/)**
  - A JavaScript based data manipulation library that enables two way data binding.
- **[Queue.js]()**
  - An asynchronous helper library for data ingestion involving multiple apis.
- **[Mongo DB](https://www.mongodb.com/)**
  - NoSQL Database used to convert and present our data in JSON format.
- **[Flask](http://flask.pocoo.org/)**
  - A Python based  micro – framework  used to serve our data from the server to our web based interface.
- **[Bootstrap]()**
  - description
- **[Keen Dashboards](https://github.com/keen/dashboards)**
  - description

### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. add more steps...

## Bugs

## Other Issues and notes

## Contributing
