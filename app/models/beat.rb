class Beat < ActiveRecord::Base
  validates :time, :song_id, presence: true

  belongs_to :song
end
