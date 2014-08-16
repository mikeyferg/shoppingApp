$(document).ready(function() {
	
	$('#add').on('click submit', 'button', function(e) {
		
		/* prevent clearing on new element added */
		e.preventDefault();
		
		/* grab user input */
		var newItem = $(this).closest("#add").find(".itemUser").val();
		
		/*create new elements w/ user inputs */
		var row = $('<tr></tr>');

		var item = $(row).addClass(newItem);

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

	/* clear placeholder text on click */
	$('input').on('click', function() {
		$(this).attr('placeholder', '');
	})

	/* store usr input values for quantity, price and total inputs */
	$('input').on('keyup', function() {
		var value = $(this).val();
		$(this).text(value);

		/* calcuate total cost for a row */
		if ( $(this).closest('tr').find('.quantity').text().length > 0 && $(this).closest('tr').find('.value').text().length > 0) {

			var price = +$(this).closest('tr').find('.value').text();
			var quantity = +$(this).closest('tr').find('.quantity').text();

			console.log(price * quantity)
			if (price * quantity){
				$(this).closest('td').siblings('.total').text(price * quantity);
				}
		}
		/* calculate total costs */
    	    var sum = 0;
    
	    	for (var i=0; i < $('.total').length; i++ ){
	    		if (parseInt(parseInt($($('.total')[i]).text()))) {
	    			sum = sum + parseInt($($('.total')[i]).text());
	    		}
	    	}
	    	/* subtract checked items */
    		var crossedOff = 0

			for (var i=0; i < $('.total.checked2').length; i++ ){
    			if (parseInt(parseInt($($('.total.checked2')[i]).text()))) {
    				crossedOff = crossedOff + parseInt($($('.total.checked2')[i]).text());
    			}
    		}

    		$('#total p').text(sum-crossedOff);
    })

	/* click event to cross item off list */
    	$('.status').on('click', function(){
    		
    		/* check to see if row is checked off or not */
    		if ($(this).hasClass('checked') == false) {

	    		$(this).addClass('checked');
	    		$(this).closest('tr').find('td').addClass('checked2');
	    	}
	    	else {
	    		$(this).removeClass('checked');
	    		$(this).closest('tr').find('td').removeClass('checked2');
	    	}


    		/* calculate total costs */
    		var sum = 0;
    
	    	for (var i=0; i < $('.total').length; i++ ){
	    		if (parseInt(parseInt($($('.total')[i]).text()))) {
	    			sum = sum + parseInt($($('.total')[i]).text());
	    		}
	    	}
	    	/* subtract checked items */
    		var crossedOff = 0

			for (var i=0; i < $('.total.checked2').length; i++ ){
    			if (parseInt(parseInt($($('.total.checked2')[i]).text()))) {
    				crossedOff = crossedOff + parseInt($($('.total.checked2')[i]).text());
    			}
    		}

    		$('#total p').text(sum-crossedOff);

   

	})


})




















