(function( $ ){

	// kenburns on one featured image header image
	var $kenburns = jQuery('.kenburns-gallery.gallery');
	if ( $kenburns.length > 0 ) {
		var gallery_set = [];
		$kenburns.find('.gallery-icon img').each( function() {
			gallery_set.push(jQuery(this).attr('src'));
		});

		jQuery('#kenburns').attr('width', jQuery(window).width());
		jQuery('#kenburns').attr('height', jQuery(window).height());
		jQuery('#kenburns').kenburns({
			images: gallery_set,
			frames_per_second: 30,
			display_time: 5000,
			fade_time: 1000,
			zoom: 1.2,
			background_color:'#F7F6F5'
		});
	}

} )( jQuery );
