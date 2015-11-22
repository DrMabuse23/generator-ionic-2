require("babel-polyfill");
import os from 'os';
import { Base } from 'yeoman-generator';
import welcome from 'yeoman-welcome';
import chalk from 'chalk';
import _ from 'lodash';
import cordova from 'cordova-lib';
import Validate from './../utils/Validate';

/**
 * Base Generator class
 */
export default class GeneratorIonic2 extends Base {
  
  constructor(...args){
    super(...args);
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
    this.genPrompts = [];
  }
  
  init(){
    this.getStartPrompts()
    this.log(welcome);
    this.log(`Welcome to ${chalk.yellow.bold(this.pkg.name)}! v. ${chalk.red(this.pkg.version)}`);
  }
  
  writing(){
    let done = this.async();
    cordova.cordova.create('.', this.answers.id, this.answers.name, this.answers.name, (err, res) => {
      ['package.json'].forEach((file) => {
        this.createTemplate(file, this.answers);  
      });
      this.answers.platforms.forEach((platform) => {
        cordova.cordova.platform('add', platform, {save: true});
      });
      var all = [];
      ['.gitignore', 'app', 'resources', 'tsconfig.json', 'gulpfile.js', 'webpack.config.js', 'webpack.production.config.js'].forEach((file) => {
        all.push(this._copy(file));  
      });
      Promise.all(all).then(() => {
        console.log('templates are written');
        done();
      });
    });
  }
  
  prompting() {
    let done = this.async();
    this.prompt(this.genPrompts, (answers) => {
      this.answers = answers;
      done();
    });
  }
  getStartPrompts() {
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
  }
  
  _copy(file=undefined) {
    if (!file) {
      return false;
    }
    return this.fs.copy(this.templatePath(`_${file}`), this.destinationPath(file), (err) => {
      throw Error(err);
    });
  }
  
  createTemplate(file=undefined, options = undefined){
    if (!file){
      return false;
    }
    return this.fs.copyTpl(
      this.templatePath(`_${file}`),
      this.destinationPath(file),
      options
    );
  }
  
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
    });
  }
}