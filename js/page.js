'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('[name]');
  var formButtons = form.querySelectorAll('.ad-form__element--submit button');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('[name]');

  var onLoadSuccess = function (data) {
    window.pin.render(data);
  };

  var onLoadError = function (errorText) {
    var node = window.util.createElement('div', null, errorText);
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 100; padding: 5px; font-size: 14px; line-height: 14px; text-align: center; background-color: #ff5635; color: #ffffff';
    document.querySelector('.map').prepend(node);
    setTimeout(function () {
      node.remove();
    }, 5000);
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      unblockPage();
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      unblockPage();
    }
  };

  var blockPage = function () {
    window.form.setAddress();
    window.form.setCapacity();
    map.classList.add('map--faded');
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length) {
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
    form.classList.add('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = true;
    });
    filterControls.forEach(function (control) {
      control.disabled = true;
    });
    formButtons.forEach(function (button) {
      button.disabled = true;
    });
    mainPin.addEventListener('mousedown', onMainPinMousedown);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
  };

  var unblockPage = function () {
    window.form.changeAddress();
    map.classList.remove('map--faded');
    window.data.load(onLoadSuccess, onLoadError);
    form.classList.remove('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = false;
    });
    formButtons.forEach(function (button) {
      button.disabled = false;
    });
    filterControls.forEach(function (control) {
      control.disabled = false;
    });
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  blockPage();
})();
