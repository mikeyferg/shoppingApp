/********* Declare variables *****************/


/* enter key triggers blur event */
var enterButton = function() {
		/* enter key triggers blur event */
		$("td").on('keydown', function(e) {  
	    	if(e.keyCode == 13)
	    	{
	       	e.preventDefault();
	       	$(this).blur();
		    }
		});
};

/* only allow numbers and decimals w/rules */
var inputReq = function() {
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
	$('.value').on('blur', function() {
		if ($(this).text() == '') {
			$(this).closest('tr').find('.total').text('');
		}
		else {
	   		var value = parseFloat($(this).text());
	    	$(this).text( value.toFixed(2) );
    	}
  	});

	/* no decimals on blur for quantity */
	$('.quantity').on('blur', function() {
		if ($(this).text() == '') {
			$(this).closest('tr').find('.total').text('');
		} 
		else {
			var value = parseFloat($(this).text());
			$(this).text( value.toFixed(0) );
		}
	});
};

/* calculate sums and totals */
var totalSum = function() {
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
		$('#total p').text((sum-crossedOff).toFixed(2));
};

/* blur event for editing prices and quantites */
var totalSumBlur = function() {
	$('td').on('blur', function() {
		
		/* calcuate total cost for a row */
		if ($(this).closest('tr').find('.quantity').text().length > 0 && $(this).closest('tr').find('.value').text().length > 0) {
			var price = +$(this).closest('tr').find('.value').text();
			var quantity = +$(this).closest('tr').find('.quantity').text();
			$(this).closest('tr').find('.total').text((price * quantity).toFixed(2));	
		}
		/*recalculate total */
		totalSum();
	})
};

/* click event to cross item off list or add back on */
var totalSumCrossOff = function() {
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
    	/*recalculate total */
		totalSum();
	})	
};



/********************** onLoad events *******************************/
$(document).ready(function() {

	/* enter key triggers blur event */
	enterButton();
		
	/* when users adds a new item */
	$('#add').on('click submit', 'button', function(e) {
		
		/* prevent clearing on new element added */
		e.preventDefault();
	
		/* grab user input */
		var newItem = $(this).closest("#add").find(".itemUser").val();
		
		/* create new elements w/ user inputs */
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

		/* append elements to DOM! */
		$('tbody').append(row);
		$(row).append(status);
		$(row).append(item);
		$(row).append(quantity);
		$(row).append(value);
		$(row).append(total);
		
		/* enter key triggers blur event */
		enterButton();
		/*only allow numbers and decimals w/rules*/
		inputReq();

		/*calculate sums and totals*
			/* blur event for editing prices and quantites */
			totalSumBlur();

	 	/* clear user input on add item bar*/
		$('input').val('');
	})


	/*************** end of newly created elements section *************************/


	/*only allow numbers and decimals w/rules*/
	inputReq();

	/* blur event for editing prices and quantites */
	totalSumBlur();

	/* click event to cross item off list or add back on */
	totalSumCrossOff();

    /* delete a row with a user double click */
    $('tbody').on('dblclick', '.status', function(){
    	/* remove row */
    	$(this).closest('tr').remove();
    	/*recalculate total */
		totalSum();
    })

    /* clear whole list on eraser click */
    $('.eraser').on('click', function() {
    	$('tbody').find('tr').remove();
    	$('#total').find('p').text('');
    })

})





