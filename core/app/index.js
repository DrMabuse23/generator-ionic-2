require("babel-polyfill");
import { Base } from 'yeoman-generator';
import welcome from 'yeoman-welcome';
import chalk from 'chalk';
import _ from 'lodash';

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
    
    this.genPrompts = [];
  }
  
  init(){
    this.getStartPrompts()
    this.log(welcome);
    this.log(`Welcome to ${chalk.yellow.bold(this.pkg.name)}! v. ${chalk.red(this.pkg.version)}`);
  }
  
  prompting() {
    let done = this.async();
    this.prompt(this.genPrompts, (answers) => {
      ['config.xml', 'package.json'].forEach((file) => {
        this.createTemplate(file, answers);  
      });
      var all = [];
      ['.gitignore', 'app', 'tsconfig.json', 'webpack.config.js'].forEach((file) => {
        all.push(this._copy(file));  
      });
      done();
      
      Promise.all(all).then(() => {
        this.nodeInstall().then((code) => {
          console.log('npm install done', code);
        });
      });
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
  
  nodeInstall() {
    
    return new Promise((resolve, reject) => {
      let i = 0;
      this.log('☕  ☕  Start  ☕  npm install  ☕');
      let interval = setInterval(() => {
        this.log(`☕  ☕  ☕  ☕  ☕  ${i + 5} sec ☕  ☕  ☕  ☕  ☕`);
        i += 5;
      }, 5000);
      let process = this.spawnCommand('npm', ['install']);
      process.on('close', (code, signal) => {
        clearInterval(interval);
        resolve(code);
      });
    });
  }
}