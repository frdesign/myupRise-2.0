(function ($) {

/**
 * OverlayHelper() - handles window scroll when opening and closing overlays
 */
Drupal.behaviors.overlayHelper =
{
	attach: function (context, settings)
	{
		var pageIdentifier = window.location.host+window.location.pathname+window.location.search;
		
		$(document).bind('drupalOverlayCloseDone',function()
		{
			Drupal.overlayHelper.checkScroll(pageIdentifier);
		});
		
		$(document).bind('drupalOverlayBeforeOpen',function()
		{
			window.name = 'overlay_helper_scroll['+pageIdentifier+']='+$(window).scrollTop();
		});
		
		Drupal.overlayHelper.checkScroll(pageIdentifier);
	}
}

Drupal.overlayHelper = Drupal.overlayHelper || {};
Drupal.overlayHelper.checkScroll = function(pageIdentifier)
{
	if(!Drupal.overlay.isOpen)
	{
		// test if window.name starts with overlay_helper_scroll...
		var search = 'overlay_helper_scroll['+pageIdentifier+']=';
		if(window.name != '' && window.name.substring(0, search.length) === search)
		{
			// now get the value, and test if it's numeric
			var val = parseInt( window.name.substring(search.length), 10 );
			if(val > 0)
			{
				$('html,body').scrollTop(val);
			}
			//clear the window.name, so that we don't jump to the scroll value on the next refresh as well
			window.name = '';
		}
	}
}

})(jQuery);