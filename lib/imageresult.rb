class ImageResult
	
	attr_accessor :url, :retweets, :updated, :size, :caption
	
	def initialize(url, retweets, updated, size, caption)
		@url = url
		@retweets = retweets
		@updated = updated
		@size = size
		@caption = caption
	end
	
end