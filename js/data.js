'use strict';

(function () {
  var PIN_LOCATION_X_MIN = 0;
  var PIN_LOCATION_X_MAX = 1200;
  var PIN_LOCATION_Y_MIN = 130;
  var PIN_LOCATION_Y_MAX = 630;
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
  var generatePin = function (index) {
    var avatar = 'img/avatars/user0' + index + '.png';
    var title = 'Заголовок предложения';
    var locationX = window.util.getRandomNumber(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX);
    var locationY = window.util.getRandomNumber(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX);
    var address = locationX + ', ' + locationY;
    var price = window.util.getRandomElement(pinsGeneratedData['prices']);
    var type = window.util.getRandomElement(pinsGeneratedData['types']);
    var rooms = window.util.getRandomElement(pinsGeneratedData['rooms']);
    var guests = window.util.getRandomElement(pinsGeneratedData['guests']);
    var checkin = window.util.getRandomElement(pinsGeneratedData['checkin']);
    var checkout = window.util.getRandomElement(pinsGeneratedData['checkout']);
    var features = window.util.getRandomElements(pinsGeneratedData['features']);
    var description = 'Описание предложения';
    var photos = window.util.getRandomElements(pinsGeneratedData['photos']);
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
  window.data = {
    getPins: getPins,
  };
})();
