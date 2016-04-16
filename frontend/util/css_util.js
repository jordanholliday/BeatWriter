var CssUtil = {
  flashRules: function (timeTillNextBeat) {
    $('.selected-before')[0].style.transitionDuration = timeTillNextBeat + "s";
    $('.selected-after')[0].style.transitionDuration = timeTillNextBeat + "s";


    $('.selected-before').addClass("new-beat")
                           .delay(25)
                           .queue(function() {
                               $(this).removeClass("new-beat");
                               $(this).dequeue();
                           });

    $('.selected-after').addClass("new-beat")
                           .delay(25)
                           .queue(function() {
                               $(this).removeClass("new-beat");
                               $(this).dequeue();
                           });
  },

  removeHighlights: function () {
    $('.selected-before').removeClass('highlight');
    $('.selected-after').removeClass('highlight');
  }
};

module.exports = CssUtil;
