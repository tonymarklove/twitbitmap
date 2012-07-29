require 'pusher'
require 'yaml'
require 'imageresult.rb'

puts 'Connecting to Pusher'

Pusher.app_id = '24863'
Pusher.key = '651abc8191b7410a7343'
Pusher.secret = '83ade541391bf9cc27f8'

push_most_popular = 5

while true do

	if push_most_popular > 0
	
		puts 'Doing top ten images...'
		limit = 10
		
		push_most_popular = push_most_popular - 1
		
	else
	
		puts 'Doing most popular image...'
		limit = 1
		
		push_most_popular = 5
	end
	
	images = Image.find(:all, :order => "(retweets + 1) * (retweets + 1) / (julianday('now') - julianday(created_at)) DESC", :limit => limit)

	results = images.sort_by{|image|image.retweets}.reverse.each_with_index.map do |image,index|
		ImageResult.new(image.url,image.retweets,true,(10 - index) ** 2, image.caption)
	end
	
	puts 'Pushing image results to Pusher channel'
	Pusher['image-results'].trigger!('update', results)

	puts 'Sleeping...'
	sleep 10
	
end