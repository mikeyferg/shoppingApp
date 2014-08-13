$(document).ready(function() {
	
	$('#add').on('click', 'button', function(e) {
		
		/* prevent clearing on new element added */
		e.preventDefault();
		
		/* grab user input */
		var newItem = $(this).closest("#add").find(".itemUser").val();
		
		/*create new elements w/ user inputs */
		var element = $("<tr><td></td><td>"  + newItem +  "</td><td></td><td></td><td></td></tr>");
		
		/* append to DOM! */
		$('tbody').append(element);	
	})
})