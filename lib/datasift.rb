require 'rubygems'
require 'datasift'
require 'yaml'
require 'nokogiri'
require 'open-uri'

# Authentication
puts 'Creating user...'
user = DataSift::User.new("rich_caudle", "bc583ac6e70761eb16f4f67e128ea824")

# Create the consumer
puts 'Getting the consumer...'
consumer = user.getConsumer(DataSift::StreamConsumer::TYPE_HTTP, "56c2d1370bb9005374d9408c84e0e7d2")

# Setting up the onStopped handler
consumer.onStopped do |reason|
	puts 'Stopped: ' + reason
end

# Set up the warning event handler.
consumer.onWarning do |message|
	puts 'WARNING: ' + message
end

# Set up the error event handler.
consumer.onError do |message|
	puts 'ERROR: ' + message
end

# And start consuming
puts 'Consuming...'
puts '----------------'
consumer.consume(true) do |interaction|
	if interaction
		begin
		
			# puts interaction.to_yaml
			
			content = interaction['interaction']['content']
			retweets = interaction['links']['retweet_count'].first
			url = interaction['links']['url'].first
			created_at = interaction['links']['created_at'].first
			
			puts 'Content: ' + content
			puts 'Retweet count: ' + retweets.to_s
			puts 'Link URL: ' + url
			puts 'Link Created At: ' + created_at
			
			# Get page using Nokogiri
			doc = Nokogiri::HTML(open(url))
			imageUrl = doc.xpath('//div[@id="media_photo"]/span[@class="img"]/img').first.attr('src')
			caption = doc.xpath('//div[@id="media_photo"]/p[@class="media-caption"]/span[@class="caption-text"]').first.content
			
			puts 'Image URL: ' + imageUrl		
			puts 'Caption: ' + caption
			
			image = Image.find_or_initialize_by_url(imageUrl)
			image.retweets = retweets
			image.caption = caption
			image.created_at = created_at
			image.save

			puts 'Saved to db'
			puts '-------------'
			
		rescue Exception => e  
		  puts 'Caught exception: ' + e.message
		end
	end
end

puts
puts 'Finished consuming.'
puts