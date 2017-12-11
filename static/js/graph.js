// utilize queue libraty for async loading of apis for single analysis
// use queue.js to delay rendering the dashboard until the data is loaded from the database
// fetches data hosted from the api (the Flask server)
// and passes it into a function.
queue()
.defer(d3.json, "/data")
.await(makeGraphs);

function print_filter(filter){
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

// if error occurs here then most likely due to
// server or database problem
function makeGraphs(error, data) { //later, change back to residentialPurchases
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }


};

