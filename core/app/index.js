import { Base } from 'yeoman-generator';
import welcome from 'yeoman-welcome';
/**
 * Base Generator class
 */
export default class Ionic2 extends Base {

  constructor( ...args ) {
    super(...args);
    this.argument('appname');
  }

  method1() {
    console.log(`The name is: ${ this.appname }`);
  }
}