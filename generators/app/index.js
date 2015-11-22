'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanWelcome = require('yeoman-welcome');

var _yeomanWelcome2 = _interopRequireDefault(_yeomanWelcome);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cordovaLib = require('cordova-lib');

var _cordovaLib2 = _interopRequireDefault(_cordovaLib);

var _utilsValidate = require('./../utils/Validate');

var _utilsValidate2 = _interopRequireDefault(_utilsValidate);

/**
 * Base Generator class
 */
require("babel-polyfill");

var GeneratorIonic2 = (function (_Base) {
  _inherits(GeneratorIonic2, _Base);

  function GeneratorIonic2() {
    _classCallCheck(this, GeneratorIonic2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(GeneratorIonic2.prototype), 'constructor', this).apply(this, args);
    this.pkg = require(this.sourceRoot() + '/../../../package.json');
    this.options = {
      name: 'test-app',
      id: 'com.ionic2.gen.nice',
      version: '0.0.1',
      description: 'My Ionic 2 App',
      email: 'example@example.com',
      url: 'https://github.com/DrMabuse23/generator-ionic-2',
      author: 'DrMabuse'
    };
    this.answers = null;
    this.platforms = ['ios', 'android'];
    if (_os2['default'].platform !== 'darwin') {
      this.platforms.push('windows');
    }
    this.genPrompts = [];
  }

  _createClass(GeneratorIonic2, [{
    key: 'init',
    value: function init() {
      this.getStartPrompts();
      this.log(_yeomanWelcome2['default']);
      this.log('Welcome to ' + _chalk2['default'].yellow.bold(this.pkg.name) + '! v. ' + _chalk2['default'].red(this.pkg.version));
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _this = this;

      var done = this.async();
      _cordovaLib2['default'].cordova.create('.', this.answers.id, this.answers.name, this.answers.name, function (err, res) {
        ['package.json'].forEach(function (file) {
          _this.createTemplate(file, _this.answers);
        });
        _this.answers.platforms.forEach(function (platform) {
          _cordovaLib2['default'].cordova.platform('add', platform, { save: true });
        });
        var all = [];
        ['.gitignore', 'app', 'resources', 'tsconfig.json', 'gulpfile.js', 'webpack.config.js', 'webpack.production.config.js'].forEach(function (file) {
          all.push(_this._copy(file));
        });
        Promise.all(all).then(function () {
          console.log('templates are written');
          done();
        });
      });
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      var done = this.async();
      this.prompt(this.genPrompts, function (answers) {
        _this2.answers = answers;
        done();
      });
    }
  }, {
    key: 'getStartPrompts',
    value: function getStartPrompts() {
      var _this3 = this;

      var keys = Object.keys(this.options);

      keys.forEach(function (option, key) {
        _this3.genPrompts.push({
          type: 'input',
          name: option,
          message: 'Enter a ' + option + ' for your app:',
          'default': _this3.options[option]
        });
        if (typeof _utilsValidate2['default'][option] === 'function') {
          _this3.genPrompts[key].validate = _utilsValidate2['default'][option];
        }
      });

      this.genPrompts.push({
        type: 'checkbox',
        name: 'platforms',
        message: 'Please choose a Platform',
        choices: this.platforms
      });
    }
  }, {
    key: '_copy',
    value: function _copy() {
      var file = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

      if (!file) {
        return false;
      }
      return this.fs.copy(this.templatePath('_' + file), this.destinationPath(file), function (err) {
        throw Error(err);
      });
    }
  }, {
    key: 'createTemplate',
    value: function createTemplate() {
      var file = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

      if (!file) {
        return false;
      }
      return this.fs.copyTpl(this.templatePath('_' + file), this.destinationPath(file), options);
    }
  }, {
    key: 'install',
    value: function install() {
      var _this4 = this;

      var done = this.async();
      return new Promise(function (resolve, reject) {
        var i = 0;
        _this4.log('☕  ☕  ☕  ☕  ☕   Start npm install   ☕  ☕  ☕  ☕  ☕');
        var process = _this4.spawnCommand('npm', ['install']);
        process.on('close', function (code, signal) {
          resolve(code);
          done();
        });
      });
    }
  }]);

  return GeneratorIonic2;
})(_yeomanGenerator.Base);

exports['default'] = GeneratorIonic2;
module.exports = exports['default'];