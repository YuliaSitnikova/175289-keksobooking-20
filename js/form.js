'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('[name');
  var addressControl = form.querySelector('#address');
  var typeControl = form.querySelector('#type');
  var priceControl = form.querySelector('#price');
  var timeinControl = form.querySelector('#timein');
  var timeoutControl = form.querySelector('#timeout');
  var roomControl = form.querySelector('#room_number');
  var capacityControl = form.querySelector('#capacity');
  var avatarControl = form.querySelector('#avatar');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var avatarDefault = 'img/muffin-grey.svg';
  var imagesControl = form.querySelector('#images');
  var imagesPreview = form.querySelector('.ad-form__photo');
  var MinPriceValues = {
    FLAT: 1000,
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000
  };
  var CapacityValues = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var setAddress = function (locationX, locationY) {
    addressControl.value = locationX + ', ' + locationY;
  };

  var setPrice = function () {
    var type = typeControl.value;
    priceControl.min = MinPriceValues[type.toUpperCase()];
    priceControl.placeholder = MinPriceValues[type.toUpperCase()];
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
      option.disabled = !CapacityValues[rooms].includes(option.value);
    });
    if (options[capacityControl.selectedIndex].disabled) {
      capacityControl.querySelector('option:not([disabled])').selected = true;
    }
  };

  var validFileType = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    return matches;
  };

  var updateAvatar = function () {
    var file = avatarControl.files[0];
    if (file) {
      if (validFileType(file)) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    } else {
      avatarPreview.src = avatarDefault;
    }
  };

  var updateImages = function () {
    var file = imagesControl.files[0];
    if (file) {
      if (validFileType(file)) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          imagesPreview.style.backgroundImage = 'url(' + reader.result + ')';
        });
        reader.readAsDataURL(file);
      }
    } else {
      imagesPreview.removeAttribute('style');
    }
  };

  avatarControl.addEventListener('change', function () {
    updateAvatar();
  });

  imagesControl.addEventListener('change', function () {
    updateImages();
  });

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

  formControls.forEach(function (control) {
    control.addEventListener('change', function () {
      if (!control.validity.valid) {
        control.style.borderColor = 'red';
      } else {
        control.removeAttribute('style');
      }
    });
  });

  window.form = {
    setAddress: setAddress,
    setCapacity: setCapacity,
    updateAvatar: updateAvatar,
    updateImages: updateImages
  };
})();

