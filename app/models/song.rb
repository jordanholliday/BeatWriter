class Song < ActiveRecord::Base
  validates :name, :youtube_id, presence: true

  has_many :beats
end
