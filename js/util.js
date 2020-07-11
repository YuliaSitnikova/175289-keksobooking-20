'use strict';

(function () {
  var createElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textConten = text;
    }
    return element;
  };
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * (elements.length))];
  };
  var getRandomElements = function (elements) {
    var randomElements = elements.slice();
    for (var i = randomElements.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * randomElements.length);
      var swap = randomElements[j];
      randomElements[j] = randomElements[i];
      randomElements[i] = swap;
    }
    randomElements = randomElements.slice(0, getRandomNumber(1, randomElements.length));
    return randomElements;
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
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    getWordDeclension: getWordDeclension
  };
})();
