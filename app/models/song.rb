class Song < ActiveRecord::Base
  validates :name, :youtube_id, presence: true

  has_many :beats

  def bpm
    song_beats = self.beats.sort
    # total beat count divided by time from first beat to last beat
    song_beats.count / ((song_beats.last.time - song_beats.first.time) / 60)
  end
end
