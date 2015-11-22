import {Page} from 'ionic/ionic';

@Page({
  templateUrl: 'about/about.html'
})
export class AboutPage {
  constructor() {
    this.info = `Welcome to Generator ionic2`;
  }
}
