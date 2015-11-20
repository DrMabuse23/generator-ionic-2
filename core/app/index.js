import { Base } from 'yeoman-generator';
import welcome from 'yeoman-welcome';

/**
 * Base Generator class
 */
export default class Ionic2 extends Base {
  get prompting() {
    return {
      appName() {
        let done = this.async();
        let prompt = [
          {
            type: 'input',
            name: 'appName',
            message: 'Enter a name for your app:',
          },
        ];

        this.prompt(prompt, ({ appName }) => {
          this.options.appName = appName;
          done();
        });
      },
    };
  }
  method1() {
    console.log(welcome);
  }
}