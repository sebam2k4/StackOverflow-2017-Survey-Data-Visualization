// utilize queue library for async loading of APIs for single analysis
// use queue.js to delay rendering the dashboard until the data is loaded from the database
// fetches data hosted from the api (the Flask server) and passes it into a function.
queue()
    .defer(d3.json, "/data")
    .await(makeGraphs);

// if error occurs here then most likely due to server or database problem
function makeGraphs(error, data) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    // remove loader
    $("#loader").fadeOut();

    /* a method used to filter out "NA" fields from the data before it is
    charted. It takes a group and produces a 'fake group' which is then passed
    to dc.js instead of the original group. */
    function remove_NA_keys(source_group) {
        return {
            all:function() {
                return source_group.all().filter(function(d) {
                    return d.key != "NA";
                });
            }
        };
    }

    // function to clear all filters applied on charts and redraw the charts
    clear_charts = function() {
        dc.filterAll();
        dc.renderAll();
    }

    //Create a Crossfilter instance
    var stack2017 = crossfilter(data);

    data.forEach(function (d) {
        /* define the data types & split multiple survey answer strings to arrays */
        d.HaveWorkedLanguage = d.HaveWorkedLanguage.split("; ");
        d.HaveWorkedFramework = d.HaveWorkedFramework.split("; ");
        d.HaveWorkedDatabase = d.HaveWorkedDatabase.split("; ");
        d.DeveloperType = d.DeveloperType.split("; ");
        d.EducationTypes = d.EducationTypes.split("; ");
    });


    /**
     *  TOTAL SELECTED RESULTS Display
     */
    var all = stack2017.groupAll();
    var numberSelectedND = dc.numberDisplay("#numberSelectedND");
    numberSelectedND
        .formatNumber(d3.format(",.0f"))
        .valueAccessor(function (d) {return d;})
        .group(all);


    /**
     * DEVELOPER TYPE menu select
     */
    var developerTypeDim = stack2017.dimension(function (d) {
        return d.DeveloperType;
    }, true); 
    /* the "true" argument is used in crossfilter v1.4 to indicate
    that the dimension is array-valued */

    var languageByDeveloperTypeGroup = developerTypeDim.group();
    var languageByDeveloperTypeGroup_filtered = remove_NA_keys(languageByDeveloperTypeGroup);
    // filter out "NA" data keys from chart
    var developerTypeMenu = dc.selectMenu("#developerTypeMenu");
    developerTypeMenu
        .dimension(developerTypeDim)
        .group(languageByDeveloperTypeGroup_filtered);


    /**
     *  PROFESSIONAL TYPE menu select
     */
    var professionalDim = stack2017.dimension(function (d) {
        return d.Professional;
    });

    var languageByProfessionalGroup = professionalDim.group();
    var professionalMenu = dc.selectMenu("#professional");
    professionalMenu 
        .dimension(professionalDim)
        .group(languageByProfessionalGroup);


    /**
     * LANGUAGE BAR CHART - ordinal scale
     */ 
    var languageDim = stack2017.dimension(function (d) {
        return d.HaveWorkedLanguage;
    }, true);
    var languageGroup = languageDim.group();
    // filter out 'NA' keys from data
    var languageGroup_filtered = remove_NA_keys(languageGroup);
    var languageChart = dc.barChart("#languageChart");

    // get width for initial render of the bar chart. The bar chart is responsive
    // and its width will adapt to screen width - see onresize event handler at bottom.
    var barChartWidth = $('#languageChartContainer').offsetWidth;

    languageChart
        .width(barChartWidth)
        .height(350)
        .margins({ top: 30, right: 50, bottom: 80, left: 50 })
        .dimension(languageDim)
        .group(languageGroup_filtered)
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .gap(3)
        .renderHorizontalGridLines(true)
        .title(function(d) {return "";}) // don't show html title tooltip on hover
        .yAxis().ticks(6);


    /**
     * EMPLOYMENT STATUS menu select
     */
    var employmentStatusDim = stack2017.dimension(function (d) {
        return d.EmploymentStatus;
    });
    var languageByEmploymentStatus = employmentStatusDim.group();
    var employmentStatusMenu = dc.selectMenu("#employmentStatusMenu");
    employmentStatusMenu
        .dimension(employmentStatusDim)
        .group(languageByEmploymentStatus);


    /**
     * RELATED LANGUAGES menu select
     */
    var relatedLanguagesDim = stack2017.dimension(function(d) {
        return d.HaveWorkedLanguage;
    }, true);
    var relatedLanguagesGroup = relatedLanguagesDim.group();
    // filter out "NA" data keys from chart
    var relatedLanguagesGroup_filtered = remove_NA_keys(relatedLanguagesGroup);
    var relatedLanguagesMenu = dc.selectMenu("#relatedLanguages");
    relatedLanguagesMenu
        .dimension(relatedLanguagesDim)
        .group(relatedLanguagesGroup_filtered);


    /**
     * DATABASES row chart
     */
    var databaseDim = stack2017.dimension(function (d) {
        return d.HaveWorkedDatabase;
    }, true);
    var languageByDatabaseGroup = databaseDim.group();
    // filter out "NA" data keys from chart
    var languageByDatabaseGroup_filtered = remove_NA_keys(languageByDatabaseGroup);
    var databaseChart = dc.rowChart("#databaseChart");

    var databaseChartWidth = $("#databaseChart").offsetWidth;

    databaseChart
        .width(databaseChartWidth)
        .height(300)
        .dimension(databaseDim)
        .group(languageByDatabaseGroup_filtered)
        .ordinalColors(["#1f77b4"])
        .transitionDuration(1000)
        .othersGrouper(false)
        .elasticX(true)
        .xAxis().ticks(4);


    /**
     * FRAMEWORKS row chart
     */
    var frameworkDim = stack2017.dimension(function (d) {
        return d.HaveWorkedFramework;
    }, true)
    var languageByFrameworkGroup = frameworkDim.group();
    // filter out "NA" data keys from chart
    var languageByFrameworkGroup_filtered = remove_NA_keys(languageByFrameworkGroup);
    var frameworkChart = dc.rowChart("#frameworkChart");

    var frameworkChartWidth = $("#frameworkChart").offsetWidth;

    frameworkChart
        .width(frameworkChartWidth)
        .height(300)
        .dimension(frameworkDim)
        .group(languageByFrameworkGroup_filtered)
        .ordinalColors(["#1f77b4"])
        .transitionDuration(1000)
        .othersGrouper(false)
        .elasticX(true)
        .xAxis().ticks(4);


    /**
     * FORMAL EDUCATION menu select
     */
    var formalEducationDim = stack2017.dimension(function (d) {
        return d.FormalEducation;
    });
    var languageByFormalEducation = formalEducationDim.group();
    var formalEducationMenu = dc.selectMenu("#formalEducationMenu");
    formalEducationMenu
        .dimension(formalEducationDim)
        .group(languageByFormalEducation);

    /**
     * UNDERGRADUATE MAJOR menu select
     */
    var majorUndergradDim = stack2017.dimension(function (d) {
        return d.MajorUndergrad;
    });
    var languageByMajorUndergradGroup = majorUndergradDim.group();
    var majorUndergradMenu = dc.selectMenu("#majorUndergradMenu");
    majorUndergradMenu
        .dimension(majorUndergradDim)
        .group(languageByMajorUndergradGroup);


    /**
     * EDUCATION TYPE (Outside of formal) Selector
     */
    var educationTypesDim = stack2017.dimension(function (d) {
        return d.EducationTypes;
    }, true);
    var languageByEducationTypesGroup = educationTypesDim.group();
    // filter out "NA" data keys from chart
    var languageByEducationTypesGroup_filtered = remove_NA_keys(languageByEducationTypesGroup);
    var educationTypesMenu = dc.selectMenu("#educationTypesMenu");
    educationTypesMenu
        .dimension(educationTypesDim)
        .group(languageByEducationTypesGroup_filtered);


    /**
     * COUNTRY - pie chart
     */
    var countryDim = stack2017.dimension(function (d) {
        return d.Country
    });
    var countryGroup = countryDim.group();
    // create another group to calculcate percentage affected by other filters
    var countryPercentGroup = countryDim.groupAll().reduceCount();
    var countryChart = dc.pieChart("#countryPieChart");
    countryChart
        .height(350)
        .width(350)
        .innerRadius(60)
        .dimension(countryDim)
        .group(countryGroup)
        .transitionDuration(700)
        .slicesCap(10) // max slices to generate (from high to low)
        .label(function(d) { 
            return d.key
               + ' (' + (d.value / countryPercentGroup.value() * 100).toFixed(1) + '%)';
        })
        .title(function(d) {return "";}) // don't show html title tooltip on hover
        .othersGrouper(false)


    /**
     * TABS OR SPACES - pie chart
     */
    var tabsSpacesDim = stack2017.dimension(function (d) {
        return d.TabsSpaces
    });
    var tabsSpacesGroup = tabsSpacesDim.group();
    //create another group to calculcate percentage affected by other filters
    var  tabsSpacesPercentGroup = tabsSpacesDim.groupAll().reduceCount();
    var  tabsSpacesChart = dc.pieChart("#tabsSpaces");
    tabsSpacesChart
        .height(350)
        .width(350)
        .innerRadius(60)
        .dimension(tabsSpacesDim)
        .group(tabsSpacesGroup)
        .transitionDuration(700)
        .label(function(d) { 
            return d.key
               + ' (' + (d.value / tabsSpacesPercentGroup.value() * 100).toFixed(1) + '%)';
        })
        .title(function(d) {return "";}) // don't show html title tooltip on hover
        .othersGrouper(false)


    /* make the bar and row charts responsive on window resize */
    // adapted from: https://css-tricks.com/snippets/jquery/done-resizing-event/
    var resizeTimeout;
    window.onresize = function() {
        clearTimeout(resizeTimeout);
        // resize and redraw the chart after a short delay once window resizing stops
        resizeTimeout = setTimeout(function() {
            // recalculate chart width
            var newBarChartWidth = $('#languageChartContainer').offsetWidth;
            var newFrameworkChartWidth = $('#frameworkChart').offsetWidth;
            var newDatabaseChartWidth = $('#databaseChart').offsetWidth;

            // set new width and redraw the charts
            languageChart
                .width(newBarChartWidth)
                .rescale() // resets the scale and bars widths & bar margins (gaps between bars)
                .redraw();

            frameworkChart
                .width(newFrameworkChartWidth)
                .redraw();

            databaseChart
                .width(newDatabaseChartWidth)
                .redraw();

        }, 150);
    };
    
    dc.renderAll();


    /* TOOLTIPS */
    // initialize tooltips for languages bar chart tooltip
    var bar_tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>" + d.data.key + ":</strong> <span class='tooltip-value'>"
                   + d.data.value + "</span>";
        });

    d3.selectAll("#languageChart .bar")
        .call(bar_tooltip)
        .on('mouseover', bar_tooltip.show)
        .on('mouseout', bar_tooltip.hide);

    // initialize tooptips for pie charts
    var pie_tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([20, 0])
        .html(function(d) { 
            return "<strong>" +d.data.key + ":</strong> <span class='tooltip-value'>" + d.value
                   + " (" + (d.value / countryPercentGroup.value() * 100).toFixed(1) + "%)";
        });

    d3.selectAll(".pie-slice")
        .call(pie_tooltip)
        .on('mouseover', pie_tooltip.show)
        .on('mouseout', pie_tooltip.hide);
    
    // initialize tooltips for row charts
    var row_tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>" + d.key + ":</strong> <span class='tooltip-value'>" + d.value + "</span>";
        });

    d3.selectAll("#databaseChart .row")
        .call(row_tooltip)
        .on('mouseover', row_tooltip.show)
        .on('mouseout', row_tooltip.hide);

    d3.selectAll("#frameworkChart .row")
        .call(row_tooltip)
        .on('mouseover', row_tooltip.show)
        .on('mouseout', row_tooltip.hide);

};

