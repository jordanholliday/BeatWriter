var _leftHandLetters = "qwertasdfgzxcvb";

var _rightHandLetters = "yuiophjklbnm";

var LetterUtil = {


  randomLeftHand: function () {
    var selection = Math.floor(Math.random() * _leftHandLetters.length);

    if (selection === _leftHandLetters.length) {
      selection--;
    }

    return _leftHandLetters[selection];
  },

  randomRightHand: function () {
    var selection = Math.floor(Math.random() * _rightHandLetters.length);

    if (selection === _rightHandLetters.length) {
      selection--;
    }

    return _rightHandLetters[selection];
  }

};

module.exports = LetterUtil;
