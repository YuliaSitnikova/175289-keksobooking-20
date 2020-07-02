'use strict';

var PINS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_LOCATION_X_MIN = 0;
var PIN_LOCATION_X_MAX = 1200;
var PIN_LOCATION_Y_MIN = 130;
var PIN_LOCATION_Y_MAX = 630;

var map = document.querySelector('.map');
var pinsGeneratedData = {
  'prices': [1000, 1200, 1500, 2500, 3000],
  'types': ['palace', 'flat', 'house', 'bungalo'],
  'rooms': [1, 2, 3, 4],
  'guests': [1, 2, 3, 4],
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};
var typeMap = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
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

var showMap = function () {
  map.classList.remove('map--faded');
};

var generatePin = function (index) {
  var avatar = 'img/avatars/user0' + index + '.png';
  var title = 'Заголовок предложения';
  var locationX = getRandomNumber(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX);
  var locationY = getRandomNumber(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX);
  var address = locationX + ', ' + locationY;
  var price = getRandomElement(pinsGeneratedData['prices']);
  var type = getRandomElement(pinsGeneratedData['types']);
  var rooms = getRandomElement(pinsGeneratedData['rooms']);
  var guests = getRandomElement(pinsGeneratedData['guests']);
  var checkin = getRandomElement(pinsGeneratedData['checkin']);
  var checkout = getRandomElement(pinsGeneratedData['checkout']);
  var features = getRandomElements(pinsGeneratedData['features']);
  var description = 'Описание предложения';
  var photos = getRandomElements(pinsGeneratedData['photos']);
  var pin = {
    'author': {
      'avatar': avatar,
    },
    'offer': {
      'title': title,
      'address': address,
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin,
      'checkout': checkout,
      'features': features,
      'description': description,
      'photos': photos
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
  return pin;
};

var getPins = function (count) {
  var pins = [];
  for (var i = 1; i <= count; i++) {
    pins.push(generatePin(i));
  }
  return pins;
};

var createPin = function (pin) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = template.cloneNode(true);
  var left = pin.location.x - PIN_WIDTH / 2;
  var top = pin.location.y - PIN_HEIGHT;
  pinElement.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;');
  pinElement.querySelector('img').src = pin.author.avatar;
  return pinElement;
};

var renderPins = function (pins) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  pins.forEach(function (pin) {
    fragment.appendChild(createPin(pin));
  });
  mapPins.appendChild(fragment);
};

var createElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textConten = text;
  }
  return element;
};

var renderCard = function (pin) {
  var mapFilters = document.querySelector('.map__filters-container');
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var card = template.cloneNode(true);
  card.querySelector('.popup__title').textContent = pin.offer.title;
  card.querySelector('.popup__text--address').textContent = pin.offer.address;
  card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = typeMap[pin.offer.type];
  card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  pin.offer.features.forEach(function (feature) {
    var item = createElement('li', 'popup__feature');
    item.classList.add('popup__feature--' + feature);
    card.querySelector('.popup__features').append(item);
  });
  card.querySelector('.popup__description').textContent = pin.offer.description;
  pin.offer.photos.forEach(function (photo) {
    var img = createElement('img', 'popup__photo');
    img.src = photo;
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    card.querySelector('.popup__photos').append(img);
  });
  card.querySelector('.popup__avatar').src = pin.author.avatar;
  map.insertBefore(card, mapFilters);
};

showMap();
var pins = getPins(PINS_COUNT);
renderPins(pins);
renderCard(pins[0]);
