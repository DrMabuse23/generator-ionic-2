import _ from 'lodash';
import fetch from 'node-fetch';

export default class PluginsBook {
  constructor() {
    this.api = {
      url: 'http://npmsearch.com/query?fields=name,author,modified,homepage,version,rating&q=keywords:%22ecosystem:cordova%22&sort=rating:desc&size=500&start=0',
      url2: 'http://npmsearch.com/query?fields=name,author,modified,homepage,version,rating&q=keywords:%22ecosystem:cordova%22&sort=rating:desc&size=296&start=500'
    };
    this.plugins = require(`${__dirname}/../plugins.json`);
    this.plugins = _.dropRight(this.plugins, this.plugins.length-10);
  }
  getPlugins() {
    //console.log(this.plugins);
    let names = [];
    _(this.plugins).forEach((plugin) => {
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