$(window).scroll(function() {
    // get current scroll top in px, add window height and
    // check if this is greater than the document height minus 300
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
        loadMoreContent();
	masonry_gallery();
    }
});

function loadMoreContent() {
    // there should be a button, which leads to next posts
    var next = $("a.next").first();
    var paginationnav = $("div.paginationnav").first();
    next.each(function(key, value) {
        var url = $(value).attr('href');
        // remove paginationnav, so we can't load multiple times
        next.remove();
        // adding a temp. dom object to load the next page
        var list = $("<div></div>");
        // call load method and get the div.post-list node
        list.load(url + " div.post-list", function(response, status, xhr) {
            // check if we doesn't get any error
            if ( status != "error" ) {
                // copy all childrens of our temp container to the real container
                // note: jQuery load will copy the div.post-list node as well,
                // so use the childrens and move them
                var container = $("div.post-list");
                list.children("div.post-list").children().each(
                    function(key, value){
                        container.append(value);
                    }
                );
            }
        });
	paginationnav.load(url + " div.paginationnav")
    });
    
}




/* ********* WINDOW LOAD ********** */
$(window).load(function() {
    masonry_gallery()
    beforeafter()
    var paginationnav = $("div.paginationnav").first();
    paginationnav.hide();
});	
	
function masonry_gallery()
{
    var $masonry_gallery = $('div.post-list');
    var next = $("a.next").first();
    next.each(function(key, value) {
      var url = $(value).attr('href');
      masonry_gallery.load(url + " div.paginationnav");
    }
    if ( $masonry_gallery.length > 0 ) {

	    $masonry_gallery.each( function(index, element) {
		    var $masonry_items = $(element).find('.gallery-item');
	    
		    // set masonry layout
		    $(element).isotope({
			    masonry: { columnWidth: $(element).find('.gallery-item')[0] },
			    itemSelector: '.gallery-item'
		    });
		    $(element).isotope('layout');
			    
		    // filtering
		    $('#gallery-filter li a').on('click', function(){
			    $('#gallery-filter li a').removeClass('active');
			    $(this).addClass('active');
			    var selector = $(this).attr('data-filter');
			    $masonry_gallery.isotope({ filter: selector });
			    return false;
		    });

		    // changing layout
		    $('#grid-changer li a').on('click', function(){
			    $('#grid-changer li a').removeClass('active');
			    $(this).toggleClass('active');

			    $masonry_items.removeClass('col-3');
			    $masonry_items.removeClass('col-4');
			    $masonry_items.removeClass('col-5');
			    $masonry_items.toggleClass($(this).closest('li').attr('class'));
			    $masonry_gallery.isotope('layout');
		    });
	    
	    });
    }
}
		
function beforeafter(){
    var $before_after = $('.before-after.gallery');
    if ( $before_after.length > 0 ) {
	    $before_after.imageReveal({
		    barWidth: 4,
		    touchBarWidth: 50,
		    startPosition: 0.5,
		    width: $('.before-after img').width(),
		    height:  $('.before-after img').height()
	    });
    }
}



