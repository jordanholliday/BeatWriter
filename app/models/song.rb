class Song < ActiveRecord::Base
  validates :name, :youtube_id, presence: true

  has_many :beats, dependent: :destroy

  def bpm
    song_beats = self.beats.sort
    # bpm = total beat count divided by time btwn first beat & last
    song_beats.count / ((song_beats.last.time - song_beats.first.time) / 60)
  end
end
