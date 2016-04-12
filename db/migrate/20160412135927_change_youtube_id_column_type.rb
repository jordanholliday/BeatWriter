class ChangeYoutubeIdColumnType < ActiveRecord::Migration
  def up
      change_column :songs, :youtube_id, :string
    end

    def down
      change_column :songs, :youtube_id, :integer
    end
end
