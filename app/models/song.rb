class Song < ActiveRecord::Base
  validates :name, :youtube_id, presence: true

  has_many :beats

  def bpm
    # total beat count divided by time from first beat to last beat
    self.beats.count / ((self.beats.last.time - self.beats.first.time) / 60)
  end
end
