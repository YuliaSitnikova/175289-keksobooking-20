'use strict';

(function () {
  var createPin = function (pin) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = template.cloneNode(true);
    var left = pin.location.x - PIN_WIDTH / 2;
    var top = pin.location.y - PIN_HEIGHT;
    pinElement.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;');
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.addEventListener('click', function () {
      window.card.open(pin);
    });
    return pinElement;
  };
  var renderPins = function (data) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    data.forEach(function (pin) {
      fragment.appendChild(createPin(pin));
    });
    mapPins.appendChild(fragment);
  };
  window.pin = {
    renderPins: renderPins
  };
})();
