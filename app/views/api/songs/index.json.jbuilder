json.array! @songs do |song|
  json.song_id song.id
  json.name song.name
  json.bpm song.bpm
  json.youtube_id song.youtube_id
end
