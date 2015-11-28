'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var PluginsBook = (function () {
  function PluginsBook() {
    _classCallCheck(this, PluginsBook);

    this.api = {
      url: 'http://npmsearch.com/query?fields=name,author,modified,homepage,version,rating&q=keywords:%22ecosystem:cordova%22&sort=rating:desc&size=500&start=0',
      url2: 'http://npmsearch.com/query?fields=name,author,modified,homepage,version,rating&q=keywords:%22ecosystem:cordova%22&sort=rating:desc&size=296&start=500'
    };
    this.plugins = require(__dirname + '/../plugins.json');
    this.plugins = _lodash2['default'].dropRight(this.plugins, this.plugins.length - 10);
  }

  // var a = new PluginsBook();
  // var p = a.getPlugins();
  // .then((res) => {
  //   //console.log('res', res);
  //   var a = res[0].results;
  //   var b = res[1].results;
  //   var all = _.sortBy(_.assign(a, b), 'modified');
  //   console.log(all.length);
  //   all = _.filter(all, (plugin) => {
  //     if (plugin.name[0].match('cordova-plugin')) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   all = _.dropRight(all, all.length-30);
  //   console.log(all, all.length);
  // }).catch(e => console.log(e));

  _createClass(PluginsBook, [{
    key: 'getPlugins',
    value: function getPlugins() {
      //console.log(this.plugins);
      var names = [];
      (0, _lodash2['default'])(this.plugins).forEach(function (plugin) {
        names.push(plugin.name[0]);
      }).value();
      return names;
    }

    // fetchApi(start) {
    //   return fetch(start)
    //     .then(function (res) {
    //       return res.json();
    //     });
    // }
  }]);

  return PluginsBook;
})();

exports['default'] = PluginsBook;
module.exports = exports['default'];