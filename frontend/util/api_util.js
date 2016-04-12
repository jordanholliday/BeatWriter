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
  }
};

module.exports = ApiUtil;
