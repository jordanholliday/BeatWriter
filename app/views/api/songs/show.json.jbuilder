json.song_id @song.id
json.name @song.name
json.beats @song.beats.sort_by { |beat| beat.time }
json.youtube_id @song.youtube_id
