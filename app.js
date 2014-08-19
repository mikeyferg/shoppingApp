


$(document).ready(function() {


	/*add a new item */
	$('#add').on('click submit', 'button', function(e) {
		
		/* prevent clearing on new element added */
		e.preventDefault();
		
		/* grab user input */
		var newItem = $(this).closest("#add").find(".itemUser").val();
		
		/*create new elements w/ user inputs */
		var row = $('<tr></tr>');

		var item = $(row).addClass(newItem);

		var status = $('<td></td>', {
			class: "status",
		});

		var itemInput = $('<td>' + newItem + '</td>')

			var item = $(itemInput).addClass('item');

			$(item).attr('contenteditable', 'true');

		var quantity = $('<td></td>', {
			class: "quantity",
			contenteditable: "true"
		});

	
		var value = $('<td></td>', {
			class: "value",
			contenteditable: "true"
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


	
		/* enter key triggers blur event */
		$("td").on('keydown', function(e) {  
		    if(e.keyCode == 13)
		    {
		        e.preventDefault();
		        $(this).blur();
		    }
		});


		/* only allow floats for values and quantities */
		$('.quantity, .value').on('keypress', function(event){
		    if(event.which < 46
		    || event.which > 59) {
		        event.preventDefault();
		    } // prevent if not number/dot

		    if(event.which == 46
		    && $(this).val().indexOf('.') != -1) {
		        event.preventDefault();
		    } // prevent if already dot
		});

	
		/* 2 decimal round on blur for price for new items */
		$('.value').on('blur', function() {
	   		var value = parseFloat($(this).text());
	    	$(this).text( value.toFixed(2) );
	  	});
		/* integer on blur for quantity for new items */
		$('.quantity').on('blur', function() {
	   		var value = parseFloat($(this).text());
	    	$(this).text( value.toFixed(0) );
	  	});


		/* add click event to newly created inputs */
		$('td').on('blur', function() {
			
			/* calcuate total cost for a row */
			if ($(this).closest('tr').find('.quantity').text().length > 0 && $(this).closest('tr').find('.value').text().length > 0) {

				var price = +$(this).closest('tr').find('.value').text();
				
				
				var quantity = +$(this).closest('tr').find('.quantity').text();
			

				if (price * quantity){
					$(this).closest('td').siblings('.total').text(price * quantity);
					}
			}

			/* calculate total costs */
    		var sum = 0;
    
	    	for (var i=0; i < $('.total').length; i++ ){
	    		if (parseFloat(parseFloat($($('.total')[i]).text()))) {
	    			sum = sum + parseFloat($($('.total')[i]).text());
	    		}
	    	}

	    	/* subtract checked items */
    		var crossedOff = 0

			for (var i=0; i < $('.total.checked2').length; i++ ){
    			if (parseFloat(parseFloat($($('.total.checked2')[i]).text()))) {
    				crossedOff = crossedOff + parseFloat($($('.total.checked2')[i]).text());
    			}
    		}
    		var sumFloat = parseFloat(sum-crossedOff);
    		
    		$('#total p').text(sumFloat.toFixed(2));
    	})	
	

	 	/* clear user input */
		$('input').val('');
	})


	/*end of newly created 

							elements section */






	/* only allow floats for values and quantities */
	$('.quantity, .value').on('keypress', function(event){
	    if(event.which < 46
	    || event.which > 59) {
	        event.preventDefault();
	    } // prevent if not number/dot

	    if(event.which == 46
	    && $(this).val().indexOf('.') != -1) {
	        event.preventDefault();
	    } // prevent if already dot
	});



	/* 2 decimals on blur for value */
	$('.value, .quantity').on('blur', function() {
   		var value = parseFloat($(this).text());
    	$(this).text( value.toFixed(2) );
  	});

	/* integer on blur for quantity */
	$('.quantity').on('blur', function() {
		var value = parseFloat($(this).text());
		$(this).text( value.toFixed(0) );
	});



	/* editing prices and quantites */
	$('td').on('blur', function() {
		
		/* calcuate total cost for a row */
		if ($(this).closest('tr').find('.quantity').text().length > 0 && $(this).closest('tr').find('.value').text().length > 0) {

			var price = +$(this).closest('tr').find('.value').text();
			
			
			var quantity = +$(this).closest('tr').find('.quantity').text();
			
			
			$(this).closest('tr').find('.total').text(price * quantity);	
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
    		if (parseFloat(parseFloat($($('.total')[i]).text()))) {
    			sum = sum + parseFloat($($('.total')[i]).text());
    		}
    	}

    	/* subtract checked items */
		var crossedOff = 0

		for (var i=0; i < $('.total.checked2').length; i++ ){
			if (parseFloat(parseFloat($($('.total.checked2')[i]).text()))) {
				crossedOff = crossedOff + parseFloat($($('.total.checked2')[i]).text());
			}
		}

		$('#total p').text(sum-crossedOff);

	})


    /* delete a for with a user double click */
    $('tbody').on('dblclick', '.status', function(){

    	$(this).closest('tr').remove();

    	/* calculate total costs */
		var sum = 0;

    	for (var i=0; i < $('.total').length; i++ ){
    		if (parseFloat(parseFloat($($('.total')[i]).text()))) {
    			sum = sum + parseFloat($($('.total')[i]).text());
    		}
    	}

    	/* subtract checked items */
		var crossedOff = 0

		for (var i=0; i < $('.total.checked2').length; i++ ){
			if (parseFloat(parseFloat($($('.total.checked2')[i]).text()))) {
				crossedOff = crossedOff + parseFloat($($('.total.checked2')[i]).text());
			}
		}

		$('#total p').text(sum-crossedOff);

    })

    /* clear whole list */
    $('.eraser').on('click', function() {
    	$('tbody').find('tr').remove();
    	$('#total').find('p').text('');
    })


    /* exit an element with enter button (blur) */
	$("td").on('keydown', function(e) {  
	    if(e.keyCode == 13)
	    {
	        e.preventDefault();
	        $(this).blur();
	    }
	});



})




















