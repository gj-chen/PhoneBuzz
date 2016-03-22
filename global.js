//Populate Table with Call Information 
//Data array for filling in info box 
var callHistoryData = []; 

//DOM ready 
$(document).ready(function(){
	//Populate table on initial page load 
	populateTable(); 
}); 

//Functions =========================
//Fill in table with data 
function populateTable(){
	//Empty content string 
	var tableContent = ''; 

	//jQuery AJAX call for JSON 
	$.getJSON('/getnumber', function(data){
		//For each item in our JSON, add table row and cells to the content shown 
		$.each(data, function(){
			tableContent += '<tr>'; 
			tableContent += '<td>' + this.phonenumber + '</td>'; 
			tableContent += '<td>' + this.timedelay + '</td>'; 
			tableContent += '</tr>'; 
		}); 
	
	//Inject the whole content string into existing HTML table 
	$('#callHistory table tbody').html(tableContent);
	});
}; 
