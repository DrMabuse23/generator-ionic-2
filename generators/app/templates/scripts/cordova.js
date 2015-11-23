'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cordovaLib = require('cordova-lib');

var _cordovaLib2 = _interopRequireDefault(_cordovaLib);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var CordovaCommands = (function () {
  function CordovaCommands(args) {
    _classCallCheck(this, CordovaCommands);

    this.args = args;

    if (typeof this[args[0]] !== 'function') {
      throw Error('method ' + args[0] + ' not exist');
      process.exit();
    }
    this[args[0]]();
  }

  // console.log('process', process);

  _createClass(CordovaCommands, [{
    key: 'platform',
    value: function platform() {
      var _this = this;

      if (!this.args[1] && !this.args[2]) {
        console.log('platform is needed to params like "add ios"');
        return false;
      }
      _cordovaLib2['default'].cordova.platform(this.args[1], this.args[2], { save: true }, function (err, res) {
        if (err) {
          console.log(_chalk2['default'].red(err.message));
          process.exit();
        }
        console.log(_chalk2['default'].green(_this.args.toString()) + ' is done');
      });
    }
  }, {
    key: 'plugin',
    value: function plugin() {
      var _this2 = this;

      _cordovaLib2['default'].cordova.plugin(this.args[1], this.args[2], { save: true }, function (err, res) {
        if (err) {
          console.log(_chalk2['default'].red(err.message));
          process.exit();
        }
        console.log(_chalk2['default'].green(_this2.args.toString()) + ' is done');
      });
    }
  }, {
    key: 'build',
    value: function build() {
      var _this3 = this;

      _cordovaLib2['default'].cordova.build(this.args[1], function (err, res) {
        if (err) {
          console.log(_chalk2['default'].red(err.message));
          process.exit();
        }
        console.log(_chalk2['default'].green(_this3.args.toString()) + ' is done');
      });
    }
  }, {
    key: 'prepare',
    value: function prepare() {
      var _this4 = this;

      _cordovaLib2['default'].cordova.prepare(this.args[1], function (err, res) {
        if (err) {
          console.log(_chalk2['default'].red(err.message));
          process.exit();
        }
        console.log(_chalk2['default'].green(_this4.args.toString()) + ' is done');
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this5 = this;

      _cordovaLib2['default'].cordova.run(this.args[1], { device: this.args[2] === '--device' ? true : false }, function (err, res) {
        if (err) {
          console.log(_chalk2['default'].red(err.message));
          process.exit();
        }
        console.log(_chalk2['default'].green(_this5.args.toString()) + ' is done');
      });
    }
  }]);

  return CordovaCommands;
})();

exports['default'] = CordovaCommands;
var c = new CordovaCommands(_lodash2['default'].drop(process.argv, 3));
module.exports = exports['default'];