# generator-ionic-2 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

a Generator to generate a mobile Hybrid Application with Ionic 2

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ionic-2 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).
<div>
<img height="155" src="http://yeoman.io/static/yeoman-005.caffeeaba0.png" title="yeoman"/>
<img src="https://camo.githubusercontent.com/ebc085019011ababb0d35024824304831c7dc72a/68747470733a2f2f7765627061636b2e6769746875622e696f2f6173736574732f6c6f676f2e706e67" alt="webpack" data-canonical-src="https://webpack.github.io/assets/logo.png" style="max-height:155px;">
</div>

```bash
npm i -g webpack 
npm i -g yo 
npm i -g generator-ionic-2
```

Then generate your new project:

```bash
mkdir myProject && cd myProject
yo ionic-2
npm start
```

open now [http://localhost:3000](http://localhost:3000)

//or prod
```bash
npm run build
```
//cordova commands
```bash
npm run cordova --command platform add ios|android
npm run cordova --command build ios|android
npm run cordova --command run ios|android
npm run cordova --command plugin add cordova-plugin-device
```
//or bundle
```bash
npm run bundle
npm run bundle-android
```

[API](https://drmabuse23.github.io/generator-ionic-2/index.html)
## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [DrMabuse](pascal-brewing.de)


[npm-image]: https://badge.fury.io/js/generator-ionic-2.svg
[npm-url]: https://npmjs.org/package/generator-ionic-2
[travis-image]: https://travis-ci.org/DrMabuse23/generator-ionic-2.svg?branch=master
[travis-url]: https://travis-ci.org/DrMabuse23/generator-ionic-2
[daviddm-image]: https://david-dm.org/DrMabuse23/generator-ionic-2.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/DrMabuse23/generator-ionic-2
[coveralls-image]: https://coveralls.io/repos/DrMabuse23/generator-ionic-2/badge.svg
[coveralls-url]: https://coveralls.io/r/DrMabuse23/generator-ionic-2
# generator-ionic-2
