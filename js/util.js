'use strict';

(function () {
  var createElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  };
  var getWordDeclension = function (number, words) {
    number = Math.abs(number) % 100;
    var numberMod = number % 10;
    if (number > 10 && number < 20) {
      return words[2];
    }
    if (numberMod > 1 && numberMod < 5) {
      return words[1];
    }
    if (numberMod === 1) {
      return words[0];
    }
    return words[2];
  };
  window.util = {
    createElement: createElement,
    getWordDeclension: getWordDeclension
  };
})();
