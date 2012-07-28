require 'pusher'

puts 'Connecting to Pusher'

Pusher.app_id = '24863'
Pusher.key = '651abc8191b7410a7343'
Pusher.secret = '83ade541391bf9cc27f8'

while true do

	puts 'Getting images from db'
	@images = Image.find(:all, :order => "retweets DESC", :limit => 10)
	
	puts 'Pushing image results to Pusher channel'
	Pusher['image-results'].trigger!('update', @images)

	puts 'Sleeping...'
	sleep 10
	
end