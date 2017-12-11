// utilize queue libraty for async loading of apis for single analysis
// use queue.js to delay rendering the dashboard until the data is loaded from the database
// fetches data hosted from the api (the Flask server)
// and passes it into a function.
queue()
    .defer(d3.json, "/data")
    .await(makeGraphs);

function print_filter(filter) {
    var f = eval(filter);
    if (typeof (f.length) != "undefined") { } else { }
    if (typeof (f.top) != "undefined") { f = f.top(Infinity); } else { }
    if (typeof (f.dimension) != "undefined") { f = f.dimension(function (d) { return ""; }).top(Infinity); } else { }
    console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
}

// if error occurs here then most likely due to
// server or database problem
function makeGraphs(error, data) { //later, change back to residentialPurchases
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    data.forEach(function (d) {
        // define the types
        // split multiple answer strings to arrays
        d.HaveWorkedLanguage = d.HaveWorkedLanguage.split("; ");
    });

    var stack2017 = crossfilter(data);

    // Main Language chart - ordinal scale
    var languageDim = stack2017.dimension(function (d) {
        return d.HaveWorkedLanguage;
    }, true); /* the "true" argument is used in crossfilter v1.4 to indicate
    that the dimension is array-valued */

    var languagesGroup = languageDim.group();

    print_filter(languagesGroup);
    console.log(languagesGroup);

    var languageChart = dc.barChart("#languageChart");

    // get width for initial render of the bar chart. The bar chart is responsive
    // and it's width will adapt to screen width - see code at end
    var width = document.getElementById('languageChartContainer').offsetWidth;

    languageChart
        .width(width) // see if I can pass in a function that gets the width of the bootstrap container like clo-sm-12 dynamically?
        .height(350)
        .margins({ top: 30, right: 50, bottom: 80, left: 50 })
        .dimension(languageDim)
        .group(languagesGroup)
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .elasticX(true)
        .yAxis().ticks(6);

    //Employment Status selector:
    var employmentStatusDim = stack2017.dimension(function (d) {
        return d.EmploymentStatus;
    });

    var languageByEmploymentStatus = employmentStatusDim.group();
    var employmentStatusMenu = dc.selectMenu("#employmentStatusMenu")
    employmentStatusMenu
        .dimension(employmentStatusDim)
        .group(languageByEmploymentStatus);


    //Employment Status selector:
    var formalEducationDim = stack2017.dimension(function (d) {
        return d.FormalEducation;
    });

    var languageByFormalEducation = formalEducationDim.group();
    var formalEducationMenu = dc.selectMenu("#formalEducationMenu")
    formalEducationMenu
        .dimension(formalEducationDim)
        .group(languageByFormalEducation);


    // Education Type Selector:
    var educationTypesDim = stack2017.dimension(function (d) {
        return d.EducationTypes;
    }, true);

    var languageByEducationTypesGroup = educationTypesDim.group();
    var educationTypesMenu = dc.selectMenu("#educationTypesMenu")
    educationTypesMenu
        .dimension(educationTypesDim)
        .group(languageByEducationTypesGroup);

    //Developer Type selector:
    var developerTypeDim = stack2017.dimension(function (d) {
        return d.DeveloperType;
    }, true);

    var languageByDeveloperTypeGroup = developerTypeDim.group();
    var developerTypeMenu = dc.selectMenu("#developerTypeMenu")
    developerTypeMenu
        .dimension(developerTypeDim)
        .group(languageByDeveloperTypeGroup);


    //Major Undergrad selector:
    var majorUndergradDim = stack2017.dimension(function (d) {
        return d.MajorUndergrad;
    });

    var languageByMajorUndergradGroup = majorUndergradDim.group();
    var majorUndergradMenu = dc.selectMenu("#majorUndergradMenu")
    majorUndergradMenu
        .dimension(majorUndergradDim)
        .group(languageByMajorUndergradGroup);


    // Career Satisfaction Selector:
    var careerSatisfactionDim = stack2017.dimension(function (d) {
        return d.CareerSatisfaction;
    }, true);

    var languageByCareerSatisfactionGroup = careerSatisfactionDim.group();
    var careerSatisfactionMenu = dc.selectMenu("#careerSatisfactionMenu")
    careerSatisfactionMenu
        .dimension(careerSatisfactionDim)
        .group(languageByCareerSatisfactionGroup);


    // Database chart:
    var databaseDim = stack2017.dimension(function (d) {
        return d.HaveWorkedDatabase;
    }, true);

    var languageByDatabaseGroup = databaseDim.group();

    var databaseChart = dc.rowChart("#databaseChart");

    databaseChart
        .width(400)
        .height(250)
        .dimension(databaseDim)
        .group(languageByDatabaseGroup)
        .ordinalColors(["#1f77b4"])
        .transitionDuration(1000)
        .othersGrouper(false)
        .elasticX(true)
        .xAxis().ticks(4);


    //Framework chart:
    var frameworkDim = stack2017.dimension(function (d) {
        return d.HaveWorkedFramework;
    }, true)

    var languageByFrameworkGroup = frameworkDim.group();
    var frameworkChart = dc.rowChart("#frameworkChart");

    frameworkChart
        .width(400)
        .height(250)
        .dimension(frameworkDim)
        .group(languageByFrameworkGroup)
        .ordinalColors(["#1f77b4"])
        .transitionDuration(1000)
        .othersGrouper(false)
        .elasticX(true)
        .xAxis().ticks(4);

    dc.renderAll();
};

