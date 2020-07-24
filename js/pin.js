'use strict';

(function () {
  var PIN_COUNT = 5;
  var map = document.querySelector('.map');

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
      window.card.close();
      window.card.open(pin);
      pinElement.classList.add('map__pin--active');
    });
    return pinElement;
  };

  var renderPins = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    pins.slice(0, PIN_COUNT).forEach(function (pin) {
      if (pin.hasOwnProperty('offer')) {
        fragment.appendChild(createPin(pin));
      }
    });
    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length) {
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
