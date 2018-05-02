# Programming Language Popularity Data Visualization

## Overview

### What is this app for

This is a dashboard for interactive data visualization that represents coding languages popularity among over 51,000 Stack Overflow's 2017 Developer Survey respondants.

### What does it do

The dashboard visualizes data in bar, row, and pie charts, as well as provides select menus to filter the data. The graphs are interactive and react to user selections.

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

Nothing from the original data was removed or modified.

## App Features

### Existing Features

- Python server for database content to be served to the web interface.
- Render the data to the dashboard elements and charts.
- Dashboard and charts laid out and styled.
- Interactive tour of the charts
- clear selections button

## Tech Used

### Back End

The back end code is written in Python 2.7.14

- **[Mongo DB](https://www.mongodb.com/)**
  - NoSQL Database used to convert and present data in JSON format.
- **[Flask](http://flask.pocoo.org/)**
  - A Python based micro framework used to serve the data from the server to the web based interface/dashboard.

### Front End

- **[D3.js](https://d3js.org/)**
  - A JavaScript based visualization engine which renders interactive charts and graphs based on the data.
- **[Dc.js](https://dc-js.github.io/dc.js/)**
  - A JavaScript based wrapper library for D3.js which makes plotting the charts a lot easier.
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

## Getting the code up and running for local development (Windows)

First, make sure you have [Python 2.7](https://www.python.org/) and [MongoDB](https://www.mongodb.com/download-center#production) installed

1. Clone this repository by running the `git clone https://github.com/sebam2k4/StackOverflow-2017-Survey-Data-Visualization` command

2. Download the full data set for Stack Overflow's 2017 Developer Survey [here](https://insights.stackoverflow.com/survey/) and copy it into the apps root directory.

3. While still in the root directory, install 'virtualenv' and create a virtual environment for your python app:

``` shell
pip install virtualenv
```

then create a virtual environment named '.venv':

```shell
virtualenv .venv
```

4. Activate your new virtual environment:

```shell
. .venv/Scripts/activate
```

5. Once your virtual environment is active, Install app's dependencies from requirements.txt:

```shell
pip install -r requirements.txt
```

6. import data into MongoDB with the following command:

```shell
mongoimport -d dashboard_data -c stack2017 --type csv --file survey_results_public.csv --headerline
```

7. start the mongodb server:

```shell
mongod --dbpath c:\path\to\your\mongodb\data\directory --port 27017
```

8. open a new terminal or cmd window, activate your virtual environment, and start the Flask server:

```shell
python dashboard_app.py
```

This will start the application on localhost:5000. Navigate to that address in your browser.

9. Make changes to the code and refresh the browser window to see your changes.

10. Have fun!

## Deployment

The application is deployed on Heroku and uses a free mLab MongoDB add-on for storing the data.

The deployed application can be access here: [https://stack-overflow-2017-dev-survey.herokuapp.com/](https://stack-overflow-2017-dev-survey.herokuapp.com/)

## Testing

A number of manual tests was performed to make sure the app is working as expected and is responsive accross different devices and screen sizes.

- Checked all the select menus and charts work by making different selections and seeing the charts respond without any errors in the Chrome console.

- Tested the intro.js tour by activating it with the 'Take a Tour' button and following through all the steps to make sure no tour windows and text is cut off or out of view.

- Tested the 'Clear Selection' button by clicking it while having different selection made on the charts and select menus.

For testing layout responsiveness I have used both an Android and Windows phone as well as Chrome Developer Tools' device toolbar. The application's responsiveness was checked against different mobile orientations (portrait/landscape) as well as different screen sizes on desktop. I've also tested on different desktop borowsers: Chrome, Mozilla, Brave, and Edge.

I've also checked the application for valid html and css with the W3C CSS and W3C HTML validation services. The html validator returned 3 warnings related to missing language attribute, and unecessarily defining type for script tags, which I was able to easily fix. On the other hand the CSS validator returned 0 problems with my own css code. It did however return hundreds of errors and warning for most of the libraries used in the project, like bootstrap.css, dc.css, and introjs.css.

## Bugs

Some bugs discovered after testing the application:

- Flickering tooltip when hovering over pie chart slice labels and tooltip itself. Not sure why this is. Possible fix would involve offseting the tooltip to prevent user from being able to hover over it.

- The Pie charts cut off on the right side on small mobile devices in portrait orientation. This is due to the width being fixed on these charts. Possible fix would be to use an event handler to check for the chart's container width and apply it dynamically to the chart's width (similar to how bar and row charts are handled)

- The bars of the Languages chart get very narrow and its labels overlap on small mobile devices in portrait mode. One solution could be to create a hidden row chart that displays the same data, but the bars are horizontal instead of vertical. It would only become visible on mobile devices in portrait mode while hiding the original bar chart at the same time. Alternatively, a less elegant solution would be to prompt the user to chenge their phone's orientation to landscape with a pop-up - this would provide more space for rendering the bar chart correctly.

## Credit

- To make the bar and row charts responsive, I've adapted code from the following [source](https://css-tricks.com/snippets/jquery/done-resizing-event/) to reset each chart's width and redraw it after window resizing has stopped (either by dragging the browser window width or changing orientation portrait/landscape).

- Information about creating 'fake groups' to filter data before it is charted - [source](https://github.com/dc-js/dc.js/wiki/FAQ#how-do-i-filter-the-data-before-its-charted) I have used the described technique to filter out 'NA' fields from the dataset.

- Stack Overflow for their 2017 Developer Survey data.

- old-mathematics.png background image obtained from [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/)

## Contributing

As this is a graded project for a course, no contributions are accepted at this moment :) I suppose after it's been graded then it can be opened to contributions. However, feel free to clone the project's repository and experiment!