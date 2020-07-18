'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.data = {
    load: load,
    upload: upload,
  };
})();
