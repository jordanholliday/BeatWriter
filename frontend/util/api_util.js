var ApiUtil = {
  addBeat: function (beat) {
    $.ajax({
      type: 'POST',
      url: 'api/beats',
      dataType: 'json',
      data: {beat: beat},
      success: function (beat) {
        console.log(beat);
      },
      error: function () {
        console.log("ApiUtil#addBeat error");
      }
    });
  },

  getSongBeats: function (songId, callback) {
    $.ajax({
      type: 'GET',
      url: 'api/songs/' + songId,
      dataType: 'json',
      success: function (songBeats) {
        callback(songBeats);
      },
      error: function () {
        console.log("ApiUtil#getSongBeats error");
      }
    });
  },

  getSongs: function (callback) {
    $.ajax({
      type: 'GET',
      url: 'api/songs',
      dataType: 'json',
      success: function (songs) {
        callback(songs);
      },
      error: function () {
        console.log("ApiUtil#getSongs error");
      }
    });
  }
};

module.exports = ApiUtil;
