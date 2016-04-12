class CreateBeats < ActiveRecord::Migration
  def change
    create_table :beats do |t|
      t.float :time, null: false
      t.string :letter
      t.integer :song_id, null: false
      t.timestamps null: false
    end

    add_index :beats, :song_id
  end
end
