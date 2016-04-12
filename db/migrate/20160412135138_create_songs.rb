class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.integer :youtube_id, null: false
      t.timestamps null: false
    end
  end
end
