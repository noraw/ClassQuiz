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
		console.log(jsonData);
		var data = google.visualization.arrayToDataTable(jsonData.array);

		var slices = {};
		for(var i=1; i<jsonData.array.length; i++){
			var slice = jsonData.array[i];
			console.log(i);
			console.log(slice[0])
			if(slice[0]=="Unanswered"){
				slices[i-1] = {color: 'grey'};
			}else if(slice[0]==jsonData.correctAnswer){
				slices[i-1] = {color: 'green'};
			}else{
				slices[i-1] = {color: 'red'};
			}
		}
	      
		var options = {
		  backgroundColor: '#FCFAF7',
	      legend: 'none',
	      pieSliceText: 'label',
	      tooltip: {text: 'value'},
	      slices: slices,
	      chartArea: {left:0,top:20,width:"100%",height:"85%"},
	    };

	    // Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	});
}