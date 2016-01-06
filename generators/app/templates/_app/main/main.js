import {App, IonicApp, Config, Platform} from 'ionic/ionic';
import {TabsPage} from './../tabs/tabs';
import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
     android: {
       navbarStyle: 'primary',
       tabbarStyle: 'primary'
     }
    },
    backButtonText: '',
    locale: 'en'
  }

})
class App {
  constructor(app: IonicApp, config: Config, platform: Platform) {
    // retrieve the conference data
    this.app = app;
    this.isTablet = platform.platforms().indexOf('tablet') != - 1;
    this.isMD = config.get('mode') == 'md' ? '' : null;
    this.root = TabsPage;
  }
}
