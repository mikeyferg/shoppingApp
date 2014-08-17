$(document).ready(function() {
	
	$('#add').on('click submit', 'button', function(e) {
		
		/* prevent clearing on new element added */
		e.preventDefault();
		e.stopPropagation()
		
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

			var inputQuantity = $('<input></input>');

			$(inputQuantity).attr('type', 'text');
			$(inputQuantity).attr('placeholder', '#');

			$(quantity).append(inputQuantity)



		var value = $('<td></td>', {
			class: "value"
		});

		var inputValue = $('<input></input>');

			$(inputValue).attr('type', 'text');
			$(inputValue).attr('placeholder', '$');

			$(value).append(inputValue);

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

		/* add click event to newly created inputs */
		$('td').on('keyup', 'input', function() {
			var value = $(this).val();
			$(this).text(value);
			
			/* calcuate total cost for a row */
			if ($(this).closest('tr').find('.quantity').text().length > 0 && $(this).closest('tr').find('.value').text().length > 0) {

				var price = +$(this).closest('tr').find('.value').text();
				console.log(price);
				
				var quantity = +$(this).closest('tr').find('.quantity').text();
				console.log(quantity)

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







    		/*repopulate user input values*/
    		$('input.test').val($('.test').attr('quantity'));




    	})	
		


	})

	/* clear placeholder text on click */
	$('input').on('click', function() {
		$(this).attr('placeholder', '');
	})

	/* store user input values for quantity, price and total inputs */
	$('td').on('keyup', 'input', function(e) {
		var value = +$(this).val();
		$(this).text(value);
		e.stopPropagation();

		/*$(this).closest('td').attr('quantity', value)
		console.log($('.test').attr('quantity')); */

		/* calcuate total cost for a row */
		if ($(this).closest('tr').find('.quantity').text().length > 0 && $(this).closest('tr').find('.value').text().length > 0) {

			var price = +$(this).closest('tr').find('.value').text();
			
			
			var quantity = +$(this).closest('tr').find('.quantity').text();
			

			if (price * quantity){
				$(this).closest('td').siblings('.total').text(price * quantity);
				}


		}
		/*console.log($(this).next('.item').text()); */


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
    	$('tbody').on('click', '.status', function(){
    		
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

    /* delete a for with a user double click */
    $('tbody').on('dblclick', '.status', function(){
    	$(this).closest('tr').remove();
    })

    $('.eraser').on('click', function(){
    	$('tbody').find('tr').remove();

    })





})




















