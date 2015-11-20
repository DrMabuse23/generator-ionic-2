import { Base } from 'yeoman-generator';
import os from 'os';
import { platform } from 'cordova-lib';

export default class Platforms extends Base {
  constructor(...args){
    super(...args);
    this.platforms = [
      'ios',
      'android'
    ];
    if (os.platform !== 'darwin') {
      this.platforms.push('windows');
    }
  }
  
  prompting(){
    this.prompt({
      type: 'checkbox',
      name: 'choosed',
      message: 'Please choose a Platform',
      choices: this.platforms
    }, this.addPlatforms);
  }
  
  addPlatforms(choices = []){
    if (choices.length) {
      choices.forEach((platform) => {
        //platform.add(platform);
        console.log(platform);
      })
    }
  } 
}