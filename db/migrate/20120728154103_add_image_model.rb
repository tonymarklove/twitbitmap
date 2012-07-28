class AddImageModel < ActiveRecord::Migration
  def up
    create_table :images do |t|
      t.string :url
      t.integer :retweets
	  t.string :caption
	  
      t.timestamps
    end
  end
 
  def down
    drop_table :images
  end
end
