'use strict';

(function () {
  var map = document.querySelector('.map');
  var declensionMap = {
    'rooms': ['комната', 'комнаты', 'комнат'],
    'guest': ['гостя', 'гостей', 'гостей']
  };
  var typeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var onCardEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeCard();
    }
  };

  var customizeAvatar = function (element, src) {
    element.src = src;
  };

  var customizeElement = function (element, value) {
    element.innerHTML = '';
    if (value) {
      element.textContent = value;
    } else {
      element.style.display = 'none';
    }
  };

  var customizeCapacity = function (capacityElement, rooms, guest) {
    capacityElement.innerHTML = '';
    if (rooms && guest) {
      var roomsCount = rooms + ' ' + window.util.getWordDeclension(rooms, declensionMap['rooms']);
      var guestsCount = guest + ' ' + window.util.getWordDeclension(guest, declensionMap['guest']);
      capacityElement.textContent = roomsCount + ' для ' + guestsCount;
    } else {
      capacityElement.style.display = 'none';
    }
  };

  var customizeTime = function (timeElement, checkin, checkout) {
    timeElement.innerHTML = '';
    if (checkin && checkout) {
      timeElement.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    } else {
      timeElement.style.display = 'none';
    }
  };

  var createCardFeature = function (feature) {
    var cardFeature = window.util.createElement('li', 'popup__feature');
    cardFeature.classList.add('popup__feature--' + feature);
    return cardFeature;
  };

  var customizeFeatures = function (featuresElement, features) {
    featuresElement.innerHTML = '';
    if (features.length > 0) {
      var fragment = document.createDocumentFragment();
      features.forEach(function (feature) {
        fragment.append(createCardFeature(feature));
      });
      featuresElement.append(fragment);
    } else {
      featuresElement.style.display = 'none';
    }
  };

  var createCardImage = function (photo) {
    var cardImage = window.util.createElement('img', 'popup__photo');
    cardImage.src = photo;
    cardImage.width = 45;
    cardImage.height = 40;
    cardImage.alt = 'Фотография жилья';
    return cardImage;
  };

  var customizePhotos = function (photosElement, photos) {
    photosElement.innerHTML = '';
    if (photos.length > 0) {
      var fragment = document.createDocumentFragment();
      photos.forEach(function (photo) {
        fragment.append(createCardImage(photo));
      });
      photosElement.append(fragment);
    } else {
      photosElement.style.display = 'none';
    }
  };

  var renderCard = function (pin) {
    var mapFilters = document.querySelector('.map__filters-container');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var card = template.cloneNode(true);
    var closeCardButton = card.querySelector('.popup__close');
    closeCardButton.addEventListener('click', function () {
      closeCard();
    });
    customizeAvatar(card.querySelector('.popup__avatar'), pin.author.avatar);
    customizeElement(card.querySelector('.popup__title'), pin.offer.title);
    customizeElement(card.querySelector('.popup__text--address'), pin.offer.address);
    customizeElement(card.querySelector('.popup__text--price'), pin.offer.price + '₽/ночь');
    customizeElement(card.querySelector('.popup__type'), typeMap[pin.offer.type]);
    customizeCapacity(card.querySelector('.popup__text--capacity'), pin.offer.rooms, pin.offer.guests);
    customizeTime(card.querySelector('.popup__text--time'), pin.offer.checkin, pin.offer.checkout);
    customizeFeatures(card.querySelector('.popup__features'), pin.offer.features);
    customizeElement(card.querySelector('.popup__description'), pin.offer.description);
    customizePhotos(card.querySelector('.popup__photos'), pin.offer.photos);
    map.insertBefore(card, mapFilters);
  };

  var openCard = function (pin) {
    renderCard(pin);
    document.addEventListener('keydown', onCardEscPress);
  };

  var closeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      var pinActive = map.querySelector('.map__pin--active');
      pinActive.classList.remove('map__pin--active');
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    open: openCard,
    close: closeCard
  };
})();
