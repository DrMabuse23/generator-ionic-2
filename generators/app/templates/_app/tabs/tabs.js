import {NavController, Page} from 'ionic/ionic';
import {AboutPage} from '../about/about';
import {DevicePage} from '../device/device';

@Page({
  templateUrl: 'tabs/tabs.html'
})
export class TabsPage {
  constructor(nav: NavController) {
    this.tab1Root = AboutPage;
    this.tab2Root = DevicePage;
  }
}
