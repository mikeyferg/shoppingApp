$(document).ready(function() {
	
	$('#add').on('click', 'button', function(e) {
		
		/* prevent clearing on new element added */
		e.preventDefault();
		
		/* grab user input */
		var newItem = $(this).closest("#add").find(".itemUser").val();
		
		/*create new elements w/ user inputs */
		
		var row = $('<tr></tr>');

		var status = $('<td></td>', {
			class: "status"
		});

		var itemInput = $('<td>' + newItem + '</td>')

		var item = $(itemInput).addClass('item');

		var quantity = $('<td></td>', {
			class: "quantity"
		});

		var value = $('<td></td>', {
			class: "value"
		});
		var total = $('<td></td>', {
			class: "total"
		});


		/* append to DOM! */
		$('tbody').append(row);
		$(row).append(status);
		$(row).append(item);
		$(row).append(quantity);
		$(row).append(value);
		$(row).append(total);

		/* clear user input */
		$('input').val('');
	})
})