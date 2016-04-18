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
  },

  assignLetters: function (beats) {
    var rightHand = true;
    beats.forEach( function (beat) {
      beat.letter = rightHand ? this.randomRightHand() : this.randomLeftHand();
      rightHand = !rightHand;
    }.bind(this));

    // add empty beat to beginning of array to offset first real beat
    beats.unshift({time: 0, letter: null});

    return beats;
  },

  codeToLowerCase: function (e) {
    return String.fromCharCode(e.which).toLowerCase();
  }

};

module.exports = LetterUtil;
