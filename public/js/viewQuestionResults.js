'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// add any functionality and listeners you want here
}

function createPieChart(e){
	var questionID = document.getElementById("questionID").value;
	var classID = document.getElementById("classID").value;
	console.log(classID);
	$.get("/pieChartData?questionID="+questionID+"&classID="+classID, function(jsonData){
		console.log("gotData");
		var data = new google.visualization.DataTable();
		data.addColumn('string', "Answers");
		data.addColumn('number', "Number of Students");
		data.addRows(jsonData.array.length);
		for(var i=0; i<jsonData.array.length; i++){
			data.setValue(jsonData.array[i][0], jsonData.array[i][1]);
		}
	      
		var options = {
		  backgroundColor: '#004A4F',
	      legend: 'none',
	      pieSliceText: 'label',
	      tooltip: {text: 'value'},
	      slices: {
	        0: { color: 'yellow' },
	        1: { color: 'transparent' }
	      }
	    };
	    // Create our data table out of JSON data loaded from server.
        var data = new google.visualization.DataTable(jsonData);

	    // Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	});
}