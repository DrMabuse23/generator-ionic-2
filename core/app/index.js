require("babel-polyfill");
import os from 'os';
import { Base } from 'yeoman-generator';
import welcome from 'yeoman-welcome';
import chalk from 'chalk';
import _ from 'lodash';
import fs from 'fs';
import cordova from 'cordova-lib';
import Validate from './../utils/Validate';
import Plugins from './../utils/Plugins';

/**
* Base Generator class to create a empty project
*/
export default class GeneratorIonic2 extends Base {
  constructor(...args) {
    super(...args);
    let plug = new Plugins();
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
    this.platforms = [
      'ios',
      'android'
    ];
    if (os.platform !== 'darwin') {
      this.platforms.push('windows');
    }
    this.plugins = plug.getPlugins();
    this.genPrompts = [];

    // greet and shit
    this._init();
    this._getStartPrompts();
  }
  /**
  * create the basic prompts for the empty app creation
  * @return {Array} []
  */
  _getStartPrompts() {

    var keys = Object.keys(this.options);

    keys.forEach((option, key) => {
      this.genPrompts.push(
        {
          type: 'input',
          name: option,
          message: `Enter a ${option} for your app:`,
          default: this.options[option]
        });
      if (typeof Validate[option] === 'function') {
        this.genPrompts[key].validate = Validate[option];
      }
    });

    this.genPrompts.push({
      type: 'checkbox',
      name: 'platforms',
      message: 'Please choose a Platform',
      choices: this.platforms
    });

    this.genPrompts.push(
      {
        type: 'checkbox',
        name: 'plugins',
        message: 'Please choose your Plugins',
        choices: this.plugins
      }
    );
  }
  /**
  * copy some files from root to destination
  */
  _copy(file = undefined) {
    if (!file) {
      return false;
    }
    if (file === 'scripts') {
      return this.fs.copy(this.templatePath(`${file}`), this.destinationPath(file), (err) => {
        throw Error(err);
      });
    }
    return this.fs.copy(this.templatePath(`_${file}`), this.destinationPath(file), (err) => {
      throw Error(err);
    });
  }
  /**
  * create some templates with the params
  */
  createTemplate(file = undefined, options = undefined) {
    if (!file) {
      return false;
    }
    return this.fs.copyTpl(
      this.templatePath(`_${file}`),
      this.destinationPath(file),
      options
    );
  }
  /**
  * yeoman uses this like a constructor, but since this is getting
  * transpiled from es6, it won't work as it should. we're calling
  * it from constructor
  */
  _init() {
    this.fileCount = fs.readdirSync('.').length;

    // abort when directory is not empty on first run
    if (this.fileCount > 0) {
      this.log(chalk.red('Non-empty directory. Cordova needs an empty directory to set up project'));
      process.exit(1);
    }

    // console.log('cordova', cordova);
    this.log(welcome);
    this.log(`Welcome to ${chalk.yellow.bold(this.pkg.name) }! v. ${chalk.red(this.pkg.version) }`);
  }
  /**
  * question prompting
  */
  prompting() {
    let done = this.async();
    this.prompt(this.genPrompts, (answers) => {
      this.answers = answers;
      done();
    });
  }
  /**
  * create a cordova project into the destination folder
  */
  _initCordovaProject() {
    return cordova.cordova.raw.create('.', this.answers.id, this.answers.name, this.answers.name)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err.message);
      // process.exit();
      return err;
    });
  }
  /**
  * add one or many platforms to the destination
  */
  _addPlatforms() {
    return cordova.cordova.raw.platform('add', this.answers.platforms, { save: true }).then(() => {
      console.log(`add platforms ${this.answers.platforms}`);
      return true;
    })
    .catch((err) => {
      console.log(err.message);
      // process.exit();
      return err;
    });
  }
  /**
  * add one or more Plugins to the destination
  */
  _addPlugins() {
    return cordova.cordova.raw.plugin('add', this.answers.plugins, { save: true })
    .then(() => {
      console.log(`add plugins ${this.answers.plugins}`);
      return true;
    })
    .catch((err) => {
      console.log(err.message);
      // process.exit();
      return err;
    });
  }
  /**
  * copy the ionic2angular stuff starter template
  */
  _createIonicApp() {
    ['.gitignore', 'app', 'scripts', 'resources', 'tsconfig.json', 'gulpfile.js', 'webpack.config.js', 'webpack.production.config.js'].forEach((file) => {
      this._copy(file);
    });
    ['package.json'].forEach((file) => {
      this.createTemplate(file, this.answers);
    });
  }
  /**
  * promise the writing process
  */
  writing() {
    let done = this.async();
    this._initCordovaProject().then(() => {
      this._addPlatforms().then(() => {
        this._addPlugins();
      });
    })
    // no matter what we've picked by cordova selections (or if we
    // picked no platforms or plugins, we'll continue execution)
    .finally(() => {
      this._createIonicApp();
      done();
    });
  }
  /**
  * npm install after create the app
  */
  install() {
    let done = this.async();
    return new Promise((resolve, reject) => {
      let i = 0;
      this.log(`☕  ☕  ☕  ☕  ☕   Start npm install   ☕  ☕  ☕  ☕  ☕`);
      let process = this.spawnCommand('npm', ['install']);
      process.on('close', (code, signal) => {
        resolve(code);
        done();
      });
    })
  }
}