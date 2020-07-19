'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var LOAD_METHOD = 'GET';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';
  var SAVE_METHOD = 'POST';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };

  var sendRequest = function (url, method, data, onLoad, onError) {
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
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    sendRequest(LOAD_URL, LOAD_METHOD, null, onLoad, onError);
  };

  var upload = function (data, onLoad, onError) {
    sendRequest(SAVE_URL, SAVE_METHOD, data, onLoad, onError);
  };

  window.data = {
    load: load,
    upload: upload,
  };
})();
