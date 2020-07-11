'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var ROUND_MAIN_PIN_HEIGHT = 65;
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressControl = form.querySelector('#address');
  var typeControl = form.querySelector('#type');
  var priceControl = form.querySelector('#price');
  var timeinControl = form.querySelector('#timein');
  var timeoutControl = form.querySelector('#timeout');
  var roomControl = form.querySelector('#room_number');
  var capacityControl = form.querySelector('#capacity');
  var minPriceValidValues = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };
  var capacityValidValues = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var setAddress = function () {
    var locationX = mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var locationY = mainPin.offsetTop + Math.round(ROUND_MAIN_PIN_HEIGHT / 2);
    addressControl.value = locationX + ', ' + locationY;
  };

  var changeAddress = function () {
    var locationX = mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var locationY = mainPin.offsetTop + Math.round(MAIN_PIN_HEIGHT);
    addressControl.value = locationX + ', ' + locationY;
  };

  var setPrice = function () {
    var type = typeControl.value;
    priceControl.min = minPriceValidValues[type];
    priceControl.placeholder = minPriceValidValues[type];
    validFormPrice();
  };

  var validFormPrice = function () {
    if (priceControl.validity.rangeOverflow) {
      priceControl.setCustomValidity('Максимальная цена за ночь ' + priceControl.max);
    } else if (priceControl.validity.rangeUnderflow) {
      priceControl.setCustomValidity('Минимальная цена за ночь ' + priceControl.min);
    } else {
      priceControl.setCustomValidity('');
    }
  };

  var setTimeout = function () {
    timeoutControl.value = timeinControl.value;
  };

  var setTimein = function () {
    timeinControl.value = timeoutControl.value;
  };

  var setCapacity = function () {
    var rooms = roomControl.value;
    var options = capacityControl.querySelectorAll('option');
    options.forEach(function (option) {
      option.disabled = capacityValidValues[rooms].indexOf(option.value) === -1;
    });
    if (options[capacityControl.selectedIndex].disabled) {
      capacityControl.querySelector('option:not([disabled])').selected = true;
    }
  };

  typeControl.addEventListener('change', function () {
    setPrice();
  });

  priceControl.addEventListener('input', function () {
    validFormPrice();
  });

  timeinControl.addEventListener('change', function () {
    setTimeout();
  });

  timeoutControl.addEventListener('change', function () {
    setTimein();
  });

  roomControl.addEventListener('change', function () {
    setCapacity();
  });

  window.form = {
    setAddress: setAddress,
    changeAddress: changeAddress,
    setCapacity: setCapacity,
  };
})();

