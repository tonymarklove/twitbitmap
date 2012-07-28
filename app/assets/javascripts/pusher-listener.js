function initPusher()
{
	// Enable pusher logging - don't include this in production
	Pusher.log = function(message) {
	  if (window.console && window.console.log) window.console.log(message);
	};

	var pusher = new Pusher('651abc8191b7410a7343');
	var channel = pusher.subscribe('image-results');

	channel.bind('update', function(data) {
	  
	});

}