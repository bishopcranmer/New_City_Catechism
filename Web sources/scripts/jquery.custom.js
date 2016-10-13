function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
  separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function buildQueryString() {
	var isESV = ($('input[name="bible"]:checked').val() == 'esv');
	var isSHOW = ($('input[name="answers"]:checked').val() == 'show');
	var query = '';


	if ( isESV ) {
		if ( isSHOW ) {
			query = '?verse=esv&show=true';
		}
		else {
			query = '?verse=esv&show=false';
		}
	} else {
		if ( isSHOW ) {
			query = '?verse=niv&show=true';
		}
		else {
			query = '?verse=niv&show=false';
		}
	}
	return query;

}

$(function() {

var dashEl = $('#dashboard');

var part1Pos = 0;
var part2Pos = 3600; // (9x158=1422) + (198x10=1980) = 3402
var part3Pos = 6570; // (9x158=1422) + (198x26=5148) = 6570



var anim = false;

$('.parts-bar .part1-link a').click(function(e){
	anim = true;
	dashEl.removeClass('part1 part2 part3').addClass('part1');
	$('.q-bar').animate({scrollLeft:part1Pos}, 1000,function(){anim = false;});
	e.preventDefault();	
});
$('.parts-bar .part2-link a').click(function(e){
	anim = true;
	dashEl.removeClass('part1 part2 part3').addClass('part2');
	$('.q-bar').animate({scrollLeft:part2Pos+2}, 1000,function(){anim = false;});
	e.preventDefault();	
});
$('.parts-bar .part3-link a').click(function(e){
	anim = true;
	dashEl.removeClass('part1 part2 part3').addClass('part3');
	$('.q-bar').animate({scrollLeft:part3Pos+2}, 1000,function(){anim = false;});
    e.preventDefault();	
});

$('.q-bar').scroll(function(){
	
  if (anim == false) {	
	
  var scrollLeftPos = $('.q-bar').scrollLeft();
	
  if ((dashEl.is(':not(.part1)'))&&(scrollLeftPos <= part2Pos)) {
	  dashEl.removeClass('part2 part3').addClass('part1');
  } else if ((dashEl.is(':not(.part2)'))&&(scrollLeftPos >= part2Pos)&&(scrollLeftPos <= part3Pos)) {
	  dashEl.removeClass('part1 part3').addClass('part2');
  } else if ((dashEl.is(':not(.part3)'))&&(scrollLeftPos >= part3Pos)) {
	  dashEl.removeClass('part1 part2').addClass('part3');
  }

  }

});



$('.content-toggle a').click(function(e){
	
	var theLi = $(this).parent('li');
	
	$('.content-toggle li').removeClass('on');
	theLi.addClass('on');
	
	if(theLi.is('.m-verse')) {
		$('.content-commentary,.content-play,.content-prayer,.content-music').hide();
		$('.content-verse').show();
	} else if (theLi.is('.m-commentary')) {
		$('.content-verse,.content-play,.content-prayer,.content-music').hide();
		$('.content-commentary').show();
		
	} else if (theLi.is('.m-play')) {
		$('.content-commentary,.content-verse,.content-prayer,.content-music').hide();
		$('.content-play').show();
		
	} else if (theLi.is('.m-prayer')) {
		$('.content-commentary,.content-play,.content-verse,.content-music').hide();
		$('.content-prayer').show();
		
	} else if (theLi.is('.m-music')) {
		$('.content-commentary,.content-play,.content-verse,.content-prayer').hide();
		$('.content-music').show();
		
	}
		
	
	e.preventDefault();		
});

$('.answer,.btn-show').click(function(e){
   $('.answer').toggleClass('blurred');
   if($('.btn-show').is(':visible')) {
     $('.btn-show').hide();
   } else {
	 $('.btn-show').show();
   }
});

$('.btn-show').click(function(e){
   e.preventDefault();
});

	$('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".modal_close" });

	

	// SETTINGS
	$('input[name="bible"]').click(function(e){
		var $radio = $(e.currentTarget);
		$('ul.q-list li a').attr('href')
		window.location = buildQueryString();
	});
	$('input[name="answers"]').click(function(e){
		var $radio = $(e.currentTarget);
		window.location = buildQueryString();
	});

	$('ul.q-list li a').click(function (e) {
		e.preventDefault();
		window.location =  '/q-' + $('input[name="question"]:checked').val() + '/'  + $(e.currentTarget).html().toLowerCase() + '.php' + window.location.search;
	});

}); // End Onload