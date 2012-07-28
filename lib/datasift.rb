require 'rubygems'
require 'datasift'
require 'yaml'

# Authentication
puts 'Creating user...'
user = DataSift::User.new("rich_caudle", "bc583ac6e70761eb16f4f67e128ea824")

# Create the consumer
puts 'Getting the consumer...'
consumer = user.getConsumer(DataSift::StreamConsumer::TYPE_HTTP, "899fce4c43ad0a4c0ecbf06a4495e9cf")

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
		#puts interaction.to_yaml
		
		content = interaction['interaction']['content']
		retweets = interaction['links']['retweet_count'].first
		url = interaction['links']['url'].first
		
		puts 'Content: ' + content
		puts 'Retweet count: ' + retweets.to_s
		puts 'Image URL: ' + url
				
		image = Image.find_or_initialize_by_url(url)
		image.retweets = retweets
		image.save

		puts 'Saved to db'
		puts '-------------'
	end
end

puts
puts 'Finished consuming.'
puts