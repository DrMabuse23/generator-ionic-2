import cordova from 'cordova-lib';
import _ from 'lodash';
import chalk from 'chalk';
export default class CordovaCommands{
  constructor(args){
    this.args = args;
    
    if (typeof this[args[0]] !== 'function') {
      throw Error (`method ${args[0]} not exist`);
      process.exit();
    }
    this[args[0]]();
  }
  
  platform(){
    if (!this.args[1] && !this.args[2]) {
      console.log('platform is needed to params like "add ios"');
      return false;
    }
    cordova.cordova.platform(this.args[1], this.args[2], {save: true}, (err, res) => {
      if (err) {
        console.log(chalk.red(err.message));
        process.exit();
      }
      console.log(`${chalk.green(this.args.toString())} is done`);
    });
  }
  
  plugin(){
    cordova.cordova.plugin(this.args[1], this.args[2], {save: true}, (err, res) => {
      if (err) {
        console.log(chalk.red(err.message));
        process.exit();
      }
      console.log(`${chalk.green(this.args.toString())} is done`);
    });
  }
  build(){
    cordova.cordova.build(this.args[1], (err, res) => {
      if (err) {
        console.log(chalk.red(err.message));
        process.exit();
      }
      console.log(`${chalk.green(this.args.toString())} is done`);
    });
  }
  prepare(){
    cordova.cordova.prepare(this.args[1], (err, res) => {
      if (err) {
        console.log(chalk.red(err.message));
        process.exit();
      }
      console.log(`${chalk.green(this.args.toString())} is done`);
    });
  }
  run(){
    cordova.cordova.run(this.args[1],{device: this.args[2] === '--device' ? true : false}, (err, res) => {
      if (err) {
        console.log(chalk.red(err.message));
        process.exit();
      }
      console.log(`${chalk.green(this.args.toString())} is done`);
    });
  }
}
// console.log('process', process);
var c = new CordovaCommands(_.drop(process.argv, 3));
