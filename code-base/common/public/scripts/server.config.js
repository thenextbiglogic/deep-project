var  version= '1.0.0.0',
name= 'App-Name';

var server = {

  getVersion: function () {
    return this.version;
  },
  getExpress: function () {
    return require('express');
  },
  getName: function () {
    return this.name;
  }
};

Object.defineProperty(server, 'version', {
  get: function () {
    return version;
  },
  IEnumerable: true,
  configurable: false,
});

Object.defineProperty(server, 'name', {
  get: function () {
    return name;
  },
  set: function (value) {
    server.name = value;
  },
  IEnumerable: true,
  configurable: false,
});

module.exports = server;