$(window).scroll(function() {
    // get current scroll top in px, add window height and
    // check if this is greater than the document height minus 300
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
        loadMoreContent(jQuery);
	masonry_gallery(jQuery);
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
	paginationnav.load(url + " div.paginationnav");
    });
    
}




/* ********* WINDOW LOAD ********** */
$(window).load(function() {
    masonry_gallery(jQuery)
    beforeafter(jQuery)
    var paginationnav = $("div.paginationnav").first();
    paginationnav.hide();
});	
	
function masonry_gallery($)
{
  
    jQuery(window).load(function() {
	var $masonry_gallery = jQuery("div.gallery.masonry-gallery.post-list").first();
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
			jQuery('#gallery-filter li a').on('click', function(){
				jQuery('#gallery-filter li a').removeClass('active');
				jQuery(this).addClass('active');
				var selector = jQuery(this).attr('data-filter');
				$masonry_gallery.isotope({ filter: selector });
				return false;
			});

			// changing layout
			jQuery('#grid-changer li a').on('click', function(){
				jQuery('#grid-changer li a').removeClass('active');
				jQuery(this).toggleClass('active');

				$masonry_items.removeClass('col-3');
				$masonry_items.removeClass('col-4');
				$masonry_items.removeClass('col-5');
				$masonry_items.toggleClass(jQuery(this).closest('li').attr('class'));
				$masonry_gallery.isotope('layout');
			});
		
		});
	}
    }
}
		
function beforeafter($){
    var $before_after = jQuery('.before-after.gallery');
    if ( $before_after.length > 0 ) {
	    $before_after.imageReveal({
		    barWidth: 4,
		    touchBarWidth: 50,
		    startPosition: 0.5,
		    width: jQuery('.before-after img').width(),
		    height:  jQuery('.before-after img').height()
	    });
    }
}
