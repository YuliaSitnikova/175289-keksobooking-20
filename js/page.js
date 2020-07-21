'use strict';

(function () {
  var PIN_X = 570;
  var PIN_Y = 375;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('[name]');
  var formSubmit = form.querySelector('.ad-form__submit');
  var formReset = form.querySelector('.ad-form__reset');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('[name]');
  var filterType = filter.querySelector('#housing-type');
  var pins = [];

  var onLoadSuccess = function (data) {
    pins = data;
    renderPins();
    filterControls.forEach(function (control) {
      control.disabled = false;
    });
  };

  var onLoadError = function (errorText) {
    var node = window.util.createElement('div', null, errorText);
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 100; padding: 5px; font-size: 14px; line-height: 14px; text-align: center; background-color: #ff5635; color: #ffffff';
    document.querySelector('.map').prepend(node);
    setTimeout(function () {
      node.remove();
    }, 5000);
  };

  var onSaveSuccess = function () {
    window.message.showSuccess();
    blockPage();
  };

  var onSaveError = function () {
    window.message.showError();
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

  var renderPins = function () {
    var filteredPins = pins;
    var type = filterType.value;
    if (type !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return pin.offer.type === type;
      });
    }
    window.pin.delete();
    window.pin.render(filteredPins);
  };

  var blockPage = function () {
    map.classList.add('map--faded');
    window.card.close();
    window.pin.delete();
    form.reset();
    form.classList.add('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = true;
    });
    formSubmit.blur();
    formSubmit.disabled = true;
    formReset.disabled = true;
    filter.reset();
    filterControls.forEach(function (control) {
      control.disabled = true;
    });
    mainPin.style.top = PIN_Y + 'px';
    mainPin.style.left = PIN_X + 'px';
    window.form.setAddress();
    window.form.setCapacity();
    mainPin.addEventListener('mousedown', onMainPinMousedown);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
  };

  var unblockPage = function () {
    map.classList.remove('map--faded');
    window.data.load(onLoadSuccess, onLoadError);
    form.classList.remove('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = false;
    });
    formSubmit.disabled = false;
    formReset.disabled = false;
    window.form.changeAddress();
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(form), onSaveSuccess, onSaveError);
  });

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    blockPage();
  });

  filterType.addEventListener('change', function () {
    window.card.close();
    renderPins();
  });

  blockPage();
})();
